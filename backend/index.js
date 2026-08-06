require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
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
    const statusToken = randomUUID();

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([
        { name, phone, email, area, address, service, booking_date: date, booking_time: time, status: 'Pending', status_token: statusToken }
      ])
      .select('id, name, phone, email, area, address, service, booking_date, booking_time, status, status_token');

    if (error) throw error;

    const createdBooking = data && data[0] ? data[0] : { name, phone, email, area, address, service, booking_date: date, booking_time: time, status_token: statusToken };
    
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

    // Trigger email notification on status approval/confirmation
    if (updatedBooking && (status === 'approved' || status === 'confirmed')) {
      sendBookingConfirmationEmail(updatedBooking).catch(err => console.error('Brevo email trigger error:', err));
    }

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

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
