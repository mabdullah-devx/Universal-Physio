import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const distDir = './dist';

const SITE_ORIGIN = 'https://www.universalphysio.fit';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fadmrbtnmfrvvmwnycth.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG1yYnRubWZydnZtd255Y3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTk1MDIsImV4cCI6MjA5MzYzNTUwMn0.Ck-UsOBpoeHCmDAMmq49L-4Yey4iBW-yG-bxjuc7poM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Escape values injected into HTML attributes (content="...", href="...").
// A blog title containing a double quote or `&` would otherwise break the tag.
function escapeHtmlAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Escape values injected as HTML text content.
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function generateRouteNoscriptHtml(route) {
  const p = route.path;
  let bodyContent = '';

  if (p === '/about') {
    bodyContent = `
<header><nav><a href="/">Home</a> | <a href="/services">Services</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/booking">Book Visit</a></nav></header>
<main>
  <h1>About Universal Physio Care - DPT Specialists in Lahore</h1>
  <p>Universal Physio Care is Lahore's leading Doctor of Physical Therapy (DPT) home visit service. Founded with a mission to deliver evidence-based, compassionate, and patient-centered rehabilitation, our team of licensed physical therapists provides specialized care right in the comfort and privacy of your home.</p>
  <p>Our clinical team comprises highly qualified DPT doctors with extensive clinical training in musculoskeletal rehabilitation, neuro-physiotherapy, spinal manual therapy, post-surgical recovery, and geriatric care. We believe every patient deserves individual focus without the stress, pain, and delay of hospital commuting.</p>
  <section>
    <h2>Our Clinical Mission &amp; Core Values</h2>
    <p>We are dedicated to restoring physical independence, eliminating pain, and empowering patients with sustainable movement habits. All therapeutic interventions strictly follow international physical therapy protocols and peer-reviewed clinical science.</p>
    <ul>
      <li><strong>500+ Patients Treated:</strong> Proven track record of successful home rehabilitations across all Lahore residential sectors.</li>
      <li><strong>98% Patient Satisfaction:</strong> High clinical outcomes backed by patient trust and family recommendations.</li>
      <li><strong>100% Home Coverage in Lahore:</strong> Direct service to DHA, Gulberg, Johar Town, Model Town, Bahria Town, Valencia, Wapda Town, Faisal Town, and Iqbal Town.</li>
    </ul>
  </section>
  <section>
    <h2>Contact &amp; Accreditation</h2>
    <p>Universal Physio Care - Gulberg III, Lahore, Punjab 54000, Pakistan</p>
    <p>Direct Call: +92 306 4954970 | Email: info@universalphysio.fit</p>
  </section>
</main>`;
  } else if (p === '/contact') {
    bodyContent = `
<header><nav><a href="/">Home</a> | <a href="/services">Services</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/booking">Book Visit</a></nav></header>
<main>
  <h1>Contact Universal Physio Care - Book Home Visit in Lahore</h1>
  <p>Get in touch with Universal Physio Care to schedule a Doctor of Physical Therapy (DPT) home visit in Lahore or inquire about our clinical physical therapy treatments. Our patient care coordinators are available to answer your questions and match you with a clinical specialist near your location.</p>
  <section>
    <h2>Direct Contact Channels</h2>
    <ul>
      <li><strong>Phone / WhatsApp:</strong> +92 306 4954970</li>
      <li><strong>Email:</strong> info@universalphysio.fit</li>
      <li><strong>Clinic Address:</strong> Gulberg III, Lahore, Punjab 54000, Pakistan</li>
      <li><strong>Operating Hours:</strong> Monday through Sunday, 8:00 AM – 9:00 PM PKT</li>
    </ul>
  </section>
  <section>
    <h2>Service Coverage Areas</h2>
    <p>We provide rapid-response home physical therapy visits across DHA Lahore (Phases 1-13), Gulberg I-III, Johar Town, Model Town, Bahria Town, Valencia Town, Wapda Town, Faisal Town, and Allama Iqbal Town.</p>
    <a href="/booking">Schedule an Appointment Online</a>
  </section>
</main>`;
  } else if (p === '/privacy-policy') {
    bodyContent = `
<header><nav><a href="/">Home</a> | <a href="/services">Services</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/privacy-policy">Privacy Policy</a></nav></header>
<main>
  <h1>Privacy Policy - Universal Physio Care</h1>
  <p>Universal Physio Care ("we", "our", or "us") is dedicated to safeguarding the personal privacy, medical data confidentiality, and security of our patients and site visitors in Lahore, Pakistan. This Privacy Policy details how we collect, use, store, and protect your information when you access our website at https://www.universalphysio.fit or schedule home physical therapy services with our Doctor of Physical Therapy (DPT) team.</p>
  <section>
    <h2>1. Information We Collect</h2>
    <p>To schedule and deliver professional home physical therapy visits, we collect personal and medical details that you voluntarily submit through our booking forms, contact requests, or telephone consultations. This information includes:</p>
    <ul>
      <li><strong>Contact Information:</strong> Full name, telephone number, email address, and home physical address in Lahore.</li>
      <li><strong>Clinical Data:</strong> Primary physical complaint, treatment service requested, relevant medical history, and mobility assessment details.</li>
      <li><strong>Technical Data:</strong> Standard web analytics logs (IP address, browser type, device information) collected anonymously to optimize site performance.</li>
    </ul>
  </section>
  <section>
    <h2>2. How We Use Your Information</h2>
    <p>Your information is processed strictly for clinical and operational purposes, including scheduling DPT doctor home visits, sending automated appointment confirmations via email or WhatsApp, processing medical records, and improving patient care.</p>
  </section>
  <section>
    <h2>3. Data Protection &amp; Confidentiality</h2>
    <p>We implement stringent medical data security standards. Patient health records are strictly confidential and shared solely with your assigned Doctor of Physical Therapy. We never sell, rent, or trade your personal data to third parties for marketing purposes.</p>
    <p>For privacy inquiries, contact our data protection coordinator at info@universalphysio.fit or +92 306 4954970.</p>
  </section>
</main>`;
  } else if (p === '/services') {
    bodyContent = `
<header><nav><a href="/">Home</a> | <a href="/services">Services</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/booking">Book Visit</a></nav></header>
<main>
  <h1>Doctor of Physical Therapy Home Visit Services in Lahore</h1>
  <p>Universal Physio Care provides specialized, hospital-grade in-home physical therapy services in Lahore. Our accredited Doctor of Physical Therapy (DPT) doctors bring manual therapy, exercise equipment, and advanced rehabilitation techniques directly to your residence.</p>
  <section>
    <h2>Our Specialized Treatment Offerings</h2>
    <ul>
      <li><strong><a href="/services/back-and-neck-pain-physiotherapy">Back &amp; Neck Pain Therapy:</a></strong> Sciatica relief, lumbar disc herniation rehab, cervical stiffness treatment, and spinal mobilization.</li>
      <li><strong><a href="/services/stroke-rehabilitation-physiotherapy">Stroke Rehabilitation:</a></strong> Neuro-physiotherapy for paralysis recovery, gait re-training, motor re-education, and balance restoration.</li>
      <li><strong><a href="/services/sports-injury-physiotherapy">Sports Injury Recovery:</a></strong> Sprains, muscle strains, ACL/MCL ligament rehab, joint dislocations, and rotator cuff therapy.</li>
      <li><strong><a href="/services/post-surgery-rehabilitation-physiotherapy">Post-Surgical Rehab:</a></strong> Knee replacement (TKR), hip replacement (THR), spine post-op care, and fracture rehabilitation.</li>
      <li><strong><a href="/services/elderly-care-physiotherapy">Elderly Care &amp; Fall Prevention:</a></strong> Senior mobility, arthritis joint care, balance preserving exercises, and fall hazard assessment.</li>
    </ul>
    <a href="/booking">Book a DPT Home Visit Today</a>
  </section>
</main>`;
  } else {
    bodyContent = `
<header><nav><a href="/">Universal Physio Care</a> | <a href="/services">Services</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/booking">Book Home Visit</a> | <a href="/blog">Blog</a></nav></header>
<main>
  <section>
    <h1>Universal Physio Care - Doctor of Physical Therapy (DPT) Home Visit Services in Lahore</h1>
    <p>Universal Physio Care brings licensed Doctor of Physical Therapy (DPT) specialists directly to your doorstep in Lahore, Pakistan. We specialize in evidence-based home physical therapy, spinal rehabilitation, post-stroke recovery, sports injury therapy, post-operative care, and elderly fall prevention.</p>
    <p>Avoid travel discomfort and hospital queues. Our certified physiotherapists arrive equipped with professional medical modalities and personalized exercise equipment to deliver hospital-grade physical therapy in the safety and comfort of your home.</p>
    <a href="/booking">Book Home Physical Therapy Visit</a> | <a href="tel:+923064954970">Call Doctor of Physical Therapy: +92 306 4954970</a>
  </section>
  <section>
    <h2>Specialized In-Home Physical Therapy Services</h2>
    <article><h3>Back &amp; Neck Pain Therapy</h3><p>Targeted manual therapy, spinal decompression, sciatica relief, and cervical posture correction.</p></article>
    <article><h3>Stroke &amp; Neurological Rehabilitation</h3><p>Specialized neuro-physiotherapy home visits focused on motor recovery, balance enhancement, and gait re-training.</p></article>
    <article><h3>Sports Injury Recovery</h3><p>Rehabilitation for sprains, muscle strains, ligament tears, and joint dislocations.</p></article>
    <article><h3>Post-Surgical Rehabilitation</h3><p>In-home physical therapy protocols following total knee replacement, hip replacement, and spine surgeries.</p></article>
    <article><h3>Elderly Mobility &amp; Fall Prevention</h3><p>Gentle senior physical therapy designed for arthritis management, joint mobility, and balance restoration.</p></article>
  </section>
  <section>
    <h2>Coverage Areas Across Lahore</h2>
    <p>We deliver home visit physical therapy across DHA Lahore, Gulberg, Johar Town, Model Town, Bahria Town, Valencia, Wapda Town, Faisal Town, and Iqbal Town.</p>
  </section>
  <section>
    <h2>Contact &amp; Booking Information</h2>
    <p>Universal Physio Care - Gulberg III, Lahore, Punjab 54000, Pakistan | Phone: +92 306 4954970 | Email: info@universalphysio.fit</p>
    <p><a href="/llms.txt">View Machine-Readable LLMs Guide</a> | <a href="/sitemap.xml">View Site Map</a> | <a href="/agent-instructions.md">Agent Instructions</a></p>
  </section>
</main>`;
  }

  return `<noscript>${bodyContent}\n  </noscript>`;
}

function cleanHeadTags(html, r) {
  const title = escapeHtmlAttr(r.title);
  const description = escapeHtmlAttr(r.description);
  const canonical = escapeHtmlAttr(r.canonical);
  const image = escapeHtmlAttr(r.image || 'https://www.universalphysio.fit/hero-bg.png');
  const type = escapeHtmlAttr(r.type || 'website');

  html = html.replace(/<title>.*?<\/title>/gi, '');
  html = html.replace('</head>', `  <title>${escapeHtml(r.title)}</title>\n</head>`);

  html = html.replace(/<meta name="description"[^>]*>/gi, '');
  html = html.replace('</head>', `  <meta name="description" content="${description}">\n</head>`);

  html = html.replace(/<meta name="keywords"[^>]*>/gi, '');

  html = html.replace(/<link rel="canonical"[^>]*>/gi, '');
  html = html.replace('</head>', `  <link rel="canonical" href="${canonical}">\n</head>`);

  // Strip any existing OG and Twitter tags to prevent duplicates
  html = html.replace(/<meta property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/gi, '');

  // Emit clean, single set of OG and Twitter tags
  html = html.replace('</head>', `  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta property="og:site_name" content="Universal Physio Care">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
</head>`);

  return html;
}

function getRoutesToPrerender() {
  return [
    { path: '/', title: 'Physiotherapy in Lahore | Doctor of Physical Therapy Home Visits | Universal Physio Care', description: 'Restore mobility fast with certified Doctor of Physical Therapy home visits across Lahore. Relief for stroke, spine & joint pain. Book your session now.', canonical: 'https://www.universalphysio.fit/' },
    { path: '/services', title: 'Physiotherapy Services in Lahore | In-Home Rehabilitation | Universal Physio Care', description: 'Explore specialized in-home physiotherapy services in Lahore: back & neck pain relief, stroke rehabilitation, sports recovery & elderly care. Book today.', canonical: 'https://www.universalphysio.fit/services' },
    { path: '/services/back-and-neck-pain-physiotherapy', title: 'Back Pain Physiotherapy in Lahore | In-Home Care | Universal Physio Care', description: 'Relieve spinal stiffness and sciatica fast. Certified DPT doctors provide targeted back pain physiotherapy at home in Lahore. Book online today.', canonical: 'https://www.universalphysio.fit/services/back-and-neck-pain-physiotherapy' },
    { path: '/services/stroke-rehabilitation-physiotherapy', title: 'Stroke Rehabilitation Physiotherapy in Lahore | In-Home | Universal Physio Care', description: 'Rebuild motor function and walking ability with specialized stroke neuro-physiotherapy at home in Lahore. Certified DPT care. Book your visit today.', canonical: 'https://www.universalphysio.fit/services/stroke-rehabilitation-physiotherapy' },
    { path: '/services/sports-injury-physiotherapy', title: 'Sports Injury Physiotherapy in Lahore | In-Home Rehab | Universal Physio Care', description: 'Targeted home sports injury physiotherapy in Lahore for sprains, muscle strains, ACL recovery & joint rehab. Book a certified DPT specialist today.', canonical: 'https://www.universalphysio.fit/services/sports-injury-physiotherapy' },
    { path: '/services/post-surgery-rehabilitation-physiotherapy', title: 'Post-Surgery Rehabilitation in Lahore | In-Home Care | Universal Physio Care', description: 'In-home post-surgery physiotherapy in Lahore for ACL repairs, joint replacements, and spinal surgery recovery. Safe mobility. Schedule your visit today.', canonical: 'https://www.universalphysio.fit/services/post-surgery-rehabilitation-physiotherapy' },
    { path: '/services/elderly-care-physiotherapy', title: 'Elderly Care Physiotherapy in Lahore | Senior Mobility | Universal Physio Care', description: 'Gentle home physical therapy in Lahore for seniors. Fall prevention, arthritis management, and balance enhancement by certified DPTs. Book online today.', canonical: 'https://www.universalphysio.fit/services/elderly-care-physiotherapy' },
    { path: '/about', title: 'About Universal Physio Care | DPT Specialists in Lahore', description: 'Meet Lahore\'s trusted Doctor of Physical Therapy team. Certified DPT specialists delivering evidence-based in-home physiotherapy. Learn about our care.', canonical: 'https://www.universalphysio.fit/about' },
    { path: '/contact', title: 'Contact Universal Physio Care | Home Visits in Lahore', description: 'Contact Universal Physio Care in Lahore. Schedule your Doctor of Physical Therapy home visit, call +92 306 4954970 or message us on WhatsApp today.', canonical: 'https://www.universalphysio.fit/contact' },
    { path: '/booking', title: 'Book Physiotherapist Home Visit in Lahore | Universal Physio', description: 'Schedule your certified Doctor of Physical Therapy home visit in Lahore in under 60 seconds. Flexible morning & evening slots. Reserve your session now.', canonical: 'https://www.universalphysio.fit/booking' },
    { path: '/areas-we-cover', title: 'Physiotherapy Service Areas in Lahore | In-Home Coverage | Universal Physio Care', description: 'Discover Doctor of Physical Therapy home visit coverage across Lahore: DHA, Gulberg, Johar Town, Model Town & Bahria Town. Book your session today.', canonical: 'https://www.universalphysio.fit/areas-we-cover' },
    { path: '/areas-we-cover/dha-lahore', title: 'Home Physiotherapy in DHA Lahore | Universal Physio', description: 'Book Doctor of Physical Therapy (DPT) home visits in DHA Lahore (Phases 1-9). Specialized spine, neuro, post-surgery & geriatric care at your doorstep.', canonical: 'https://www.universalphysio.fit/areas-we-cover/dha-lahore' },
    { path: '/areas-we-cover/gulberg-lahore', title: 'Home Physiotherapy in Gulberg Lahore | Universal Physio', description: 'Professional home visit physical therapy in Gulberg Lahore (Blocks 1-3 & Main Boulevard). DPT specialists for back pain & stroke rehab.', canonical: 'https://www.universalphysio.fit/areas-we-cover/gulberg-lahore' },
    { path: '/areas-we-cover/johar-town-lahore', title: 'Home Physiotherapy in Johar Town Lahore | Universal Physio', description: 'Certified Doctor of Physical Therapy home visit sessions in Johar Town Lahore (Phase 1 & Phase 2). Professional spine, joint & neuro rehab.', canonical: 'https://www.universalphysio.fit/areas-we-cover/johar-town-lahore' },
    { path: '/areas-we-cover/model-town-lahore', title: 'Home Physiotherapy in Model Town Lahore | Universal Physio', description: 'In-home Doctor of Physical Therapy visits across Model Town Lahore (Blocks A-S). Specialized treatment for back pain, knee rehab & senior mobility.', canonical: 'https://www.universalphysio.fit/areas-we-cover/model-town-lahore' },
    { path: '/areas-we-cover/bahria-town-lahore', title: 'Home Physiotherapy in Bahria Town Lahore | Universal Physio', description: 'Home visit physical therapy in Bahria Town Lahore (Sectors A-F). Professional rehabilitation delivered to your residence.', canonical: 'https://www.universalphysio.fit/areas-we-cover/bahria-town-lahore' },
    { path: '/areas-we-cover/valencia-lahore', title: 'Home Physiotherapy in Valencia Lahore | Universal Physio', description: 'Home physical therapy visits in Valencia Town Lahore. Specialized DPT care for joint pain, stroke recovery & post-operative rehabilitation.', canonical: 'https://www.universalphysio.fit/areas-we-cover/valencia-lahore' },
    { path: '/areas-we-cover/wapda-town-lahore', title: 'Home Physiotherapy in Wapda Town Lahore | Universal Physio', description: 'Doctor of Physical Therapy (DPT) home visit services in Wapda Town Lahore across Phase 1, Phase 2, and all residential blocks.', canonical: 'https://www.universalphysio.fit/areas-we-cover/wapda-town-lahore' },
    { path: '/areas-we-cover/faisal-town-lahore', title: 'Home Physiotherapy in Faisal Town Lahore | Universal Physio', description: 'In-home Doctor of Physical Therapy visits delivered to your residence in Faisal Town Lahore across Blocks A, B, C & FAST University vicinity.', canonical: 'https://www.universalphysio.fit/areas-we-cover/faisal-town-lahore' },
    { path: '/areas-we-cover/iqbal-town-lahore', title: 'Home Physiotherapy in Iqbal Town Lahore | Universal Physio', description: 'Professional home visit physical therapy in Allama Iqbal Town Lahore across Khyaban-e-Iqbal, Chenab, Moon Market & surrounding blocks.', canonical: 'https://www.universalphysio.fit/areas-we-cover/iqbal-town-lahore' },
    { path: '/blog', title: 'Physiotherapy & Health Recovery Blog | Universal Physio', description: 'Evidence-based physical therapy insights, spine health advice, stroke recovery exercises, and wellness guides from certified DPT specialists in Lahore.', canonical: 'https://www.universalphysio.fit/blog' },
    { path: '/privacy-policy', title: 'Privacy Policy | Universal Physio', description: 'Privacy Policy and patient data protection guidelines for Universal Physio Care in Lahore.', canonical: 'https://www.universalphysio.fit/privacy-policy' },
    { path: '/terms-of-service', title: 'Terms of Service | Universal Physio', description: 'Terms of Service and treatment agreement guidelines for Universal Physio Care home visits in Lahore.', canonical: 'https://www.universalphysio.fit/terms-of-service' }
  ];
}

// Blog posts are listed in the sitemap but were not prerendered, so they used
// to serve dist/index.html verbatim - homepage <title> and a canonical
// pointing at "/". Helmet fixed that client-side only.
async function getBlogRoutesToPrerender() {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, title, excerpt, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!blogs || blogs.length === 0) {
      console.warn('⚠️  WARNING: Supabase returned 0 blog posts - no blog pages will be prerendered.');
      return [];
    }

    return blogs
      .filter(b => b.slug)
      .map(b => ({
        path: `/blog/${b.slug}`,
        // Matches the title BlogPost.jsx sets client-side, so the raw and
        // hydrated documents agree.
        title: `${b.title} | Universal Physio Blog`,
        description: b.excerpt || 'Evidence-based physiotherapy insights from certified Doctor of Physical Therapy specialists in Lahore.',
        canonical: `${SITE_ORIGIN}/blog/${b.slug}`,
        image: b.image_url || 'https://www.universalphysio.fit/hero-bg.png',
        type: 'article',
        blog: b
      }));
  } catch (err) {
    console.warn('⚠️  WARNING: Unable to fetch blog posts from Supabase - no blog pages will be prerendered.');
    console.warn(`   Reason: ${err.message}`);
    return [];
  }
}

function generateBlogNoscriptHtml(route) {
  const { blog } = route;
  return `<noscript>
<header><nav><a href="/">Home</a> | <a href="/services">Services</a> | <a href="/blog">Blog</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/booking">Book Visit</a></nav></header>
<main>
  <article>
    <h1>${escapeHtml(blog.title)}</h1>
    <p>${escapeHtml(blog.excerpt || '')}</p>
    <p>Read the full article at <a href="${escapeHtmlAttr(route.canonical)}">${escapeHtml(route.canonical)}</a>.</p>
  </article>
  <section>
    <h2>More from Universal Physio Care</h2>
    <p>Browse all articles at <a href="/blog">our physiotherapy blog</a>, or <a href="/booking">book a Doctor of Physical Therapy home visit in Lahore</a>.</p>
    <p>Universal Physio Care - Gulberg III, Lahore, Punjab 54000, Pakistan | Phone: +92 306 4954970</p>
  </section>
</main>
  </noscript>`;
}

function writeRouteHtml(template, route, noscriptBlock) {
  let html = cleanHeadTags(template, route);

  if (html.includes('<noscript>')) {
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptBlock);
  } else {
    html = html.replace('</body>', `  ${noscriptBlock}\n</body>`);
  }

  if (route.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  const targetFolder = path.join(distDir, route.path.replace(/^\//, ''));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }
  fs.writeFileSync(path.join(targetFolder, 'index.html'), html, 'utf8');
}

async function runPrenderer() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist. Run vite build first.');
    process.exit(1);
  }

  const routes = getRoutesToPrerender();
  console.log('⚡ Generating static route HTML with noscript fallback & clean loading spinner...');
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  routes.forEach(r => {
    writeRouteHtml(template, r, generateRouteNoscriptHtml(r));
  });

  const blogRoutes = await getBlogRoutesToPrerender();
  blogRoutes.forEach(r => {
    writeRouteHtml(template, r, generateBlogNoscriptHtml(r));
  });

  console.log(`✅ Static pre-rendering completed (${routes.length} static + ${blogRoutes.length} blog pages).`);
}

runPrenderer().catch(err => {
  console.error('Pre-rendering error:', err);
  process.exit(1);
});
