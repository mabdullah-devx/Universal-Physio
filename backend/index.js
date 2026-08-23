require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? require('stripe')(stripeSecretKey) : null;
const { z } = require('zod');
const { sendBookingConfirmationEmail } = require('./services/emailService');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean);
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
}));

// Webhook must be parsed as raw body for signature verification
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(400).send('Stripe webhook handling disabled: Missing STRIPE_WEBHOOK_SECRET');
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const bookingId = paymentIntent.metadata?.bookingId;

    if (bookingId) {
      const { error } = await supabaseAdmin
        .from('bookings')
        .update({ status: 'Confirmed' })
        .eq('id', bookingId);
      
      if (error) {
        console.error('Error updating booking status:', error);
      }
    }
  }

  res.send();
});

// JSON parsing for all other routes
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || 'https://fadmrbtnmfrvvmwnycth.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG1yYnRubWZydnZtd255Y3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTk1MDIsImV4cCI6MjA5MzYzNTUwMn0.Ck-UsOBpoeHCmDAMmq49L-4Yey4iBW-yG-bxjuc7poM';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Client for Auth verification (uses Anon key)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Client for DB operations (uses Service Role key to bypass RLS safely on server)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PhysioCare API is running' });
});

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
  if (!token || token === 'undefined' || token === 'null') {
    return res.status(401).json({ error: 'Unauthorized: Token missing. Please sign in.' });
  }
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Unauthorized: Session expired. Please log out and sign in again.' });
  }

  // If ADMIN_EMAIL environment variable is explicitly set, enforce it
  if (process.env.ADMIN_EMAIL && user.email !== process.env.ADMIN_EMAIL && user.app_metadata?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin privilege required' });
  }

  req.user = user;
  next();
};

// Booking validation schema
const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  phone: z.string().transform((val) => {
    let clean = val.replace(/\D/g, '');
    if (clean.startsWith('03') && clean.length === 11) {
      clean = '92' + clean.slice(1);
    }
    return clean;
  }).refine((val) => /^923\d{9}$/.test(val) || /^03\d{9}$/.test(val), 'Invalid Pakistani phone number (e.g. 03001234567 or 923001234567)'),
  email: z.string().email('Invalid email address').trim(),
  area: z.string().min(1, 'Area is required'),
  address: z.string().min(1, 'Address is required').trim(),
  service: z.string().min(1, 'Service is required'),
  date: z.string().refine((val) => {
    if (!val) return false;
    const selectedDate = new Date(val + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Date cannot be in the past'),
  time: z.string().min(1, 'Time is required')
});

const rateLimit = require('express-rate-limit');

// Rate limiting: max 5 booking attempts per IP per 15-minute window
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many booking requests from this IP. Please try again in 15 minutes.' }
});

const crypto = require('crypto');
const generateStatusToken = () => {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return crypto.randomBytes(16).toString('hex');
};

// Create a booking
app.post('/api/bookings', bookingLimiter, async (req, res) => {
  try {
    // Honeypot spam check (bots filling out hidden website field are silently trapped)
    if (req.body.website && String(req.body.website).trim() !== '') {
      console.log('🤖 Honeypot trapped spam bot submission.');
      return res.status(201).json({ message: 'Booking created successfully' });
    }

    const validatedData = bookingSchema.parse(req.body);
    const { name, phone, email, area, address, service, date, time } = validatedData;
    const statusToken = generateStatusToken();

    let insertResult = await supabaseAdmin
      .from('bookings')
      .insert([
        { name, phone, email, area, address, service, booking_date: date, booking_time: time, status: 'Pending', status_token: statusToken }
      ])
      .select('id, name, phone, email, area, address, service, booking_date, booking_time, status, status_token');

    if (insertResult.error) {
      console.warn('First insert attempt with status_token failed, retrying standard insert:', insertResult.error.message);
      insertResult = await supabaseAdmin
        .from('bookings')
        .insert([
          { name, phone, email, area, address, service, booking_date: date, booking_time: time, status: 'Pending' }
        ])
        .select('id, name, phone, email, area, address, service, booking_date, booking_time, status');
    }

    if (insertResult.error) throw insertResult.error;

    const createdBooking = insertResult.data && insertResult.data[0] ? insertResult.data[0] : { name, phone, email, area, address, service, booking_date: date, booking_time: time, status_token: statusToken };
    
    // Send automated email via Brevo (must be awaited in Vercel serverless environment)
    try {
      await sendBookingConfirmationEmail(createdBooking);
    } catch (err) {
      console.error('Brevo email trigger error:', err);
    }
    
    res.status(201).json({ message: 'Booking created successfully', booking: createdBooking });
  } catch (error) {
    if (error instanceof z.ZodError || error.name === 'ZodError' || error.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues || error.errors });
    }
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Secure Token-Protected Booking Status Verification (GET)
app.get('/api/booking-status', async (req, res) => {
  try {
    const { id, token } = req.query;
    if (!id || !token) {
      return res.status(400).json({ error: 'Missing booking ID or status token' });
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('id, service, booking_date, booking_time, status, status_token, created_at')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Booking record not found' });
    }

    if (data.status_token !== token) {
      return res.status(403).json({ error: 'Invalid or unauthorized status token' });
    }

    // Return strictly minimal non-sensitive status details
    res.json({
      id: data.id,
      status: data.status,
      service: data.service,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      created_at: data.created_at
    });
  } catch (err) {
    console.error('Error verifying booking status:', err);
    res.status(500).json({ error: 'Failed to retrieve booking status' });
  }
});

// Fetch bookings (Admin)
app.get('/api/bookings', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update booking status
app.patch('/api/bookings/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    const updatedBooking = data[0];

    res.json({ message: 'Status updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete booking
app.delete('/api/bookings/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Stripe mock payment
const SERVICE_PRICES = {
  'Back & Neck Pain': 8000,
  'Musculoskeletal': 9000,
  'Stroke Rehabilitation': 12000,
  'Sports Injury Recovery': 10000,
  'Elderly Care': 7000
};

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { service, bookingId } = req.body;
    const amount = SERVICE_PRICES[service] || 5000; // default fallback
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { bookingId }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Valid frontend page routes registry
const VALID_PAGE_ROUTES = new Set([
  '/',
  '/services',
  '/services/back-and-neck-pain-physiotherapy',
  '/services/stroke-rehabilitation-physiotherapy',
  '/services/sports-injury-physiotherapy',
  '/services/post-surgery-rehabilitation-physiotherapy',
  '/services/elderly-care-physiotherapy',
  '/booking',
  '/booking-status',
  '/about',
  '/contact',
  '/areas-we-cover',
  '/areas-we-cover/dha-lahore',
  '/areas-we-cover/gulberg-lahore',
  '/areas-we-cover/johar-town-lahore',
  '/areas-we-cover/model-town-lahore',
  '/areas-we-cover/bahria-town-lahore',
  '/areas-we-cover/valencia-lahore',
  '/areas-we-cover/wapda-town-lahore',
  '/areas-we-cover/faisal-town-lahore',
  '/areas-we-cover/iqbal-town-lahore',
  '/blog',
  '/privacy',
  '/privacy-policy',
  '/terms-of-service',
  '/admin',
  '/agent-instructions',
  '/agent-instructions.md',
  '/llms.txt',
  '/sitemap.xml',
  '/sitemap_index.xml',
  '/robots.txt'
]);

function isValidRoute(pathname) {
  const cleanPath = pathname.split('?')[0].replace(/\/$/, '') || '/';
  if (VALID_PAGE_ROUTES.has(cleanPath)) return true;
  if (cleanPath.startsWith('/blog/')) return true;
  return false;
}

function getMarkdownForRoute(cleanPath) {
  if (cleanPath === '/' || cleanPath === '') {
    return `# Universal Physio Care - In-Home Physical Therapy in Lahore

> Premium In-Home Physical Therapy & Doctor of Physical Therapy (DPT) Home Visit Services in Lahore, Pakistan.

## Contact & Direct Booking
- **Website**: https://www.universalphysio.fit
- **Phone**: +92 306 4954970
- **Email**: info@universalphysio.fit
- **Address**: Gulberg III, Lahore, Punjab 54000, Pakistan
- **Online Booking**: https://www.universalphysio.fit/booking

## When to Reach for Universal Physio Care
1. **In-Home DPT Visits**: Qualified Doctor of Physical Therapy home sessions in DHA, Gulberg, Johar Town, Model Town, Bahria Town, Valencia, Wapda Town, Faisal Town, or Iqbal Town Lahore.
2. **Back & Neck Pain**: Manual therapy, spinal mobilization, sciatica relief, and lumbar/cervical care.
3. **Stroke Rehabilitation**: Neuro-physiotherapy home visits for gait restoration, balance training, and motor recovery.
4. **Sports Injury Recovery**: Rehabilitation for sprains, muscle strains, ACL/MCL repairs, and joint pain.
5. **Post-Surgical Rehab**: Recovery following total knee replacement (TKR), total hip replacement (THR), and spine surgery.
6. **Elderly Mobility**: Balance training, arthritis management, and senior fall prevention.

## Clinical Authority & Medical Accreditation
- All sessions conducted by accredited Doctors of Physical Therapy (DPT).
- Over 1,500+ patient sessions completed in Lahore with a 98% satisfaction score.

## Machine-Readable Resources
- [LLMs Guide](https://www.universalphysio.fit/llms.txt)
- [Agent Instructions](https://www.universalphysio.fit/agent-instructions.md)
- [Sitemap](https://www.universalphysio.fit/sitemap.xml)
`;
  }

  if (cleanPath === '/services') {
    return `# In-Home Physical Therapy Services in Lahore | Universal Physio Care

Universal Physio Care delivers licensed Doctor of Physical Therapy (DPT) home visit sessions across Lahore, Pakistan.

## Core Clinical Services
- **Back & Neck Pain Therapy**: https://www.universalphysio.fit/services/back-and-neck-pain-physiotherapy
- **Stroke Rehabilitation**: https://www.universalphysio.fit/services/stroke-rehabilitation-physiotherapy
- **Sports Injury Recovery**: https://www.universalphysio.fit/services/sports-injury-physiotherapy
- **Post-Surgical Rehabilitation**: https://www.universalphysio.fit/services/post-surgery-rehabilitation-physiotherapy
- **Elderly Care & Fall Prevention**: https://www.universalphysio.fit/services/elderly-care-physiotherapy

## Schedule an Appointment
Book online at https://www.universalphysio.fit/booking or call +92 306 4954970.
`;
  }

  if (cleanPath.startsWith('/services/back-and-neck-pain')) {
    return `# Back & Neck Pain Home Physiotherapy in Lahore | Universal Physio Care

Specialized home visit physical therapy in Lahore for lower back pain, neck stiffness, sciatica, disc bulge, and postural dysfunction.

- **Treatments**: Spinal manual therapy, joint mobilization, core stabilization, nerve gliding exercises.
- **Service Areas**: All Lahore residential sectors (DHA, Gulberg, Johar Town, Model Town, etc.).
- **Book Visit**: https://www.universalphysio.fit/booking | Phone: +92 306 4954970
`;
  }

  if (cleanPath.startsWith('/services/stroke-rehabilitation')) {
    return `# Stroke Rehabilitation Home Physiotherapy in Lahore | Universal Physio Care

Expert in-home neuro-physiotherapy for stroke survivors across Lahore.

- **Clinical Focus**: Motor re-education, gait re-training, balance enhancement, upper limb functional rehab, daily living independence.
- **Accreditation**: Certified Doctor of Physical Therapy (DPT) specialists.
- **Book Visit**: https://www.universalphysio.fit/booking | Phone: +92 306 4954970
`;
  }

  if (cleanPath.startsWith('/services/sports-injury')) {
    return `# Sports Injury Home Physiotherapy in Lahore | Universal Physio Care

Targeted home physical therapy for athletes and active individuals recovering from muscle strains, sprains, ligament tears (ACL/MCL), and joint dislocations.

- **Book Visit**: https://www.universalphysio.fit/booking | Phone: +92 306 4954970
`;
  }

  if (cleanPath.startsWith('/services/post-surgery')) {
    return `# Post-Surgery Rehabilitation in Lahore | Universal Physio Care

Safe, progressive in-home rehabilitation following Total Knee Replacement (TKR), Total Hip Replacement (THR), ACL reconstruction, and spinal procedures.

- **Book Visit**: https://www.universalphysio.fit/booking | Phone: +92 306 4954970
`;
  }

  if (cleanPath.startsWith('/services/elderly-care')) {
    return `# Elderly Care & Fall Prevention Physiotherapy in Lahore | Universal Physio Care

Gentle senior physical therapy delivered at home in Lahore. Focuses on arthritis management, joint mobility, balance restoration, and fall prevention.

- **Book Visit**: https://www.universalphysio.fit/booking | Phone: +92 306 4954970
`;
  }

  if (cleanPath === '/about') {
    return `# About Universal Physio Care

Universal Physio Care is Lahore's premier Doctor of Physical Therapy (DPT) home service provider, having completed over 1,500+ home rehab sessions with a 98% satisfaction rate.

## Our Mission
To deliver hospital-grade physical therapy in the safety, privacy, and comfort of patients' homes. Our certified DPT specialists create individualized care plans for spine health, neurological recovery, orthopedics, and senior mobility.

## Contact Information
- **Phone**: +92 306 4954970
- **Email**: info@universalphysio.fit
- **Address**: Gulberg III, Lahore, Punjab 54000, Pakistan
- **Website**: https://www.universalphysio.fit
`;
  }

  if (cleanPath === '/contact') {
    return `# Contact Universal Physio Care

Get in touch with Universal Physio Care to schedule a home physical therapy appointment in Lahore.

- **Phone / WhatsApp**: +92 306 4954970
- **Email**: info@universalphysio.fit
- **Address**: Gulberg III, Lahore, Punjab 54000, Pakistan
- **Hours**: Monday - Sunday, 8:00 AM - 9:00 PM PKT
- **Online Booking Form**: https://www.universalphysio.fit/booking
`;
  }

  if (cleanPath === '/privacy' || cleanPath === '/privacy-policy') {
    return `# Privacy Policy | Universal Physio Care

Universal Physio Care protects patient data and medical record confidentiality in Lahore, Pakistan.

## Information Collection & Use
We collect contact details and clinical details required for home physical therapy sessions. Information is used strictly for care coordination and never sold to third parties.

## Contact
Email: info@universalphysio.fit | Phone: +92 306 4954970
`;
  }

  if (cleanPath === '/terms-of-service') {
    return `# Terms of Service | Universal Physio Care

Terms of Service and patient agreement for home physical therapy visits in Lahore by Universal Physio Care.
`;
  }

  if (cleanPath === '/booking') {
    return `# Book Home Physical Therapy Session in Lahore | Universal Physio Care

Schedule a Doctor of Physical Therapy (DPT) home visit session in Lahore.

- **Online Booking Form**: https://www.universalphysio.fit/booking
- **API Booking Endpoint**: POST https://www.universalphysio.fit/api/bookings
- **Direct Phone Booking**: +92 306 4954970
`;
  }

  if (cleanPath.startsWith('/areas-we-cover')) {
    return `# Home Physiotherapy Service Coverage in Lahore | Universal Physio Care

Universal Physio Care provides Doctor of Physical Therapy (DPT) home visit services across all major sectors in Lahore, Pakistan:

- DHA Lahore (Phases 1-13)
- Gulberg (I, II, III)
- Johar Town (Phase 1 & 2)
- Model Town & Garden Town
- Bahria Town Lahore
- Valencia Town
- Wapda Town
- Faisal Town
- Allama Iqbal Town

Book your home visit at https://www.universalphysio.fit/booking or call +92 306 4954970.
`;
  }

  if (cleanPath === '/blog' || cleanPath.startsWith('/blog/')) {
    return `# Universal Physio Care Health & Recovery Blog

Evidence-based physical therapy articles, spine care guides, stroke recovery tips, and wellness advice from Doctor of Physical Therapy specialists in Lahore.

Visit https://www.universalphysio.fit/blog for latest articles.
`;
  }

  return `# Universal Physio Care - ${cleanPath}

For full information, visit https://www.universalphysio.fit or call +92 306 4954970.
`;
}

// Global Vary header for content negotiation compliance
app.use((req, res, next) => {
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  next();
});

// Serve static frontend assets from dist directory
const distPath = path.resolve(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { index: false, redirect: false }));
}

// Catch-all handler for page routes, content negotiation, & 404s
app.use((req, res) => {
  const acceptHeader = req.headers.accept || '';
  const pathname = req.path || '/';
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  // Check if route is valid
  if (!isValidRoute(cleanPath)) {
    // Return real HTTP 404
    res.status(404);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Vary', 'Accept, Accept-Encoding');
    return res.send(`# 404 Not Found

The requested resource \`${pathname}\` does not exist on Universal Physio Care.

- **Sitemap**: https://www.universalphysio.fit/sitemap.xml
- **LLMs Guide**: https://www.universalphysio.fit/llms.txt
- **Agent Instructions**: https://www.universalphysio.fit/agent-instructions.md
- **Homepage**: https://www.universalphysio.fit/
`);
  }

  // If request accepts markdown (Accept: text/markdown)
  if (acceptHeader.includes('text/markdown')) {
    res.status(200);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Vary', 'Accept, Accept-Encoding');
    return res.send(getMarkdownForRoute(cleanPath));
  }

  // Handle static text files directly if requested
  if (cleanPath === '/llms.txt' || cleanPath === '/agent-instructions.md' || cleanPath === '/robots.txt' || cleanPath === '/sitemap.xml' || cleanPath === '/sitemap_index.xml' || cleanPath === '/sitemap') {
    let filename = cleanPath.replace(/^\//, '');
    if (filename === 'sitemap') filename = 'sitemap.xml';
    const publicFilePath = path.resolve(__dirname, '../frontend/public', filename);
    const distFilePath = path.resolve(distPath, filename);
    const targetFile = fs.existsSync(distFilePath) ? distFilePath : publicFilePath;
    if (fs.existsSync(targetFile)) {
      const mime = filename.endsWith('.xml') ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8';
      res.setHeader('Content-Type', mime);
      res.setHeader('Vary', 'Accept, Accept-Encoding');
      return res.send(fs.readFileSync(targetFile, 'utf8'));
    }
  }

  // Otherwise serve pre-rendered HTML for valid page route
  let targetHtmlFile = path.join(distPath, cleanPath.replace(/^\//, ''), 'index.html');
  if (cleanPath === '/') {
    targetHtmlFile = path.join(distPath, 'index.html');
  }

  if (fs.existsSync(targetHtmlFile)) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Vary', 'Accept, Accept-Encoding');
    return res.sendFile(targetHtmlFile);
  }

  const fallbackHtml = path.join(distPath, 'index.html');
  if (fs.existsSync(fallbackHtml)) {
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Vary', 'Accept, Accept-Encoding');
    return res.sendFile(fallbackHtml);
  }

  res.status(200);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  res.send('<!doctype html><html><body><div id="root"><h1>Universal Physio Care</h1></div></body></html>');
});

if (require.main === module && (process.env.NODE_ENV !== 'production' || !process.env.VERCEL)) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

