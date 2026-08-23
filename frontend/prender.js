import fs from 'fs';
import path from 'path';

const distDir = './dist';

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
      <li><strong>1,500+ Patients Treated:</strong> Proven track record of successful home rehabilitations across all Lahore residential sectors.</li>
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
  } else if (p === '/privacy-policy' || p === '/privacy') {
    bodyContent = `
<header><nav><a href="/">Home</a> | <a href="/services">Services</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a></nav></header>
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
  html = html.replace(/<title>.*?<\/title>/gi, '');
  html = html.replace('</head>', `  <title>${r.title}</title>\n</head>`);

  html = html.replace(/<meta name="description"[^>]*>/gi, '');
  html = html.replace('</head>', `  <meta name="description" content="${r.description}">\n</head>`);

  html = html.replace(/<link rel="canonical"[^>]*>/gi, '');
  html = html.replace('</head>', `  <link rel="canonical" href="${r.canonical}">\n</head>`);

  return html;
}

function getRoutesToPrerender() {
  return [
    { path: '/', title: 'Home Physiotherapy in Lahore | Universal Physio Care', description: 'Book certified Doctor of Physical Therapy (DPT) home visit sessions in Lahore for back pain, stroke rehabilitation, sports injuries & elderly care.', canonical: 'https://www.universalphysio.fit/' },
    { path: '/services', title: 'Physiotherapy Services in Lahore | Universal Physio Care', description: 'Explore specialized in-home physiotherapy services in Lahore: back & neck pain relief, stroke rehabilitation, sports recovery & elderly care.', canonical: 'https://www.universalphysio.fit/services' },
    { path: '/services/back-and-neck-pain-physiotherapy', title: 'Back Pain Physiotherapy in Lahore | Universal Physio Care', description: 'Specialized home physiotherapy in Lahore for back & neck pain, sciatica, disc bulge & cervical stiffness. Book a Doctor of Physical Therapy visit.', canonical: 'https://www.universalphysio.fit/services/back-and-neck-pain-physiotherapy' },
    { path: '/services/stroke-rehabilitation-physiotherapy', title: 'Stroke Rehabilitation Physiotherapy in Lahore | Universal Physio Care', description: 'Expert in-home stroke rehabilitation in Lahore. Neuro-physiotherapy to restore gait, balance, arm mobility & independence for stroke survivors.', canonical: 'https://www.universalphysio.fit/services/stroke-rehabilitation-physiotherapy' },
    { path: '/services/sports-injury-physiotherapy', title: 'Sports Injury Physiotherapy in Lahore | Universal Physio Care', description: 'Targeted home sports injury physiotherapy in Lahore for sprains, strains, ligament recovery & joint rehab. Book a certified DPT specialist.', canonical: 'https://www.universalphysio.fit/services/sports-injury-physiotherapy' },
    { path: '/services/post-surgery-rehabilitation-physiotherapy', title: 'Post-Surgery Rehabilitation in Lahore | Universal Physio Care', description: 'In-home post-surgery physiotherapy in Lahore for ACL repairs, joint replacements, and spinal surgery recovery. Safe, progressive mobility.', canonical: 'https://www.universalphysio.fit/services/post-surgery-rehabilitation-physiotherapy' },
    { path: '/services/elderly-care-physiotherapy', title: 'Elderly Care Physiotherapy in Lahore | Universal Physio Care', description: 'Gentle home physical therapy in Lahore for seniors. Fall prevention, arthritis management, and joint mobility enhancement by certified DPT doctors.', canonical: 'https://www.universalphysio.fit/services/elderly-care-physiotherapy' },
    { path: '/about', title: 'About Universal Physio Care | Physiotherapy Services in Lahore', description: 'Learn about Universal Physio Care, Lahore\'s premier Doctor of Physical Therapy home service. Certified DPT specialists providing evidence-based in-home rehabilitation.', canonical: 'https://www.universalphysio.fit/about' },
    { path: '/contact', title: 'Contact Universal Physio Care | Book Physiotherapy in Lahore', description: 'Contact Universal Physio Care in Lahore. Schedule your Doctor of Physical Therapy (DPT) home visit, call +92 3064954970 or message our support team.', canonical: 'https://www.universalphysio.fit/contact' },
    { path: '/booking', title: 'Book Home Physiotherapy Session in Lahore | Universal Physio Care', description: 'Schedule your home physical therapy appointment in Lahore. Select your preferred date, time, service area (DHA, Gulberg, Johar Town, etc.) and DPT treatment.', canonical: 'https://www.universalphysio.fit/booking' },
    { path: '/areas-we-cover', title: 'Home Physiotherapy Service Areas in Lahore | Universal Physio Care', description: 'Discover Universal Physio Care home visit coverage across Lahore: DHA, Gulberg, Johar Town, Model Town, Bahria Town, Valencia & surrounding sectors.', canonical: 'https://www.universalphysio.fit/areas-we-cover' },
    { path: '/areas-we-cover/dha-lahore', title: 'Home Physiotherapy in DHA Lahore | Universal Physio Care', description: 'Book Doctor of Physical Therapy (DPT) home visits in DHA Lahore (Phases 1-13). Expert spine, neuro, post-surgery & geriatric care at your doorstep.', canonical: 'https://www.universalphysio.fit/areas-we-cover/dha-lahore' },
    { path: '/areas-we-cover/gulberg-lahore', title: 'Home Physiotherapy in Gulberg Lahore | Universal Physio Care', description: 'Professional home visit physical therapy in Gulberg Lahore (Blocks 1-3 & Main Boulevard). Certified DPT specialists for back pain & stroke rehab.', canonical: 'https://www.universalphysio.fit/areas-we-cover/gulberg-lahore' },
    { path: '/areas-we-cover/johar-town-lahore', title: 'Home Physiotherapy in Johar Town Lahore | Universal Physio Care', description: 'Certified Doctor of Physical Therapy home visit sessions in Johar Town Lahore (Phase 1 & Phase 2). Professional spine, joint & neuro rehab.', canonical: 'https://www.universalphysio.fit/areas-we-cover/johar-town-lahore' },
    { path: '/areas-we-cover/model-town-lahore', title: 'Home Physiotherapy in Model Town Lahore | Universal Physio Care', description: 'In-home Doctor of Physical Therapy visits across Model Town Lahore (Blocks A-S). Specialized treatment for back pain, knee rehab & senior mobility.', canonical: 'https://www.universalphysio.fit/areas-we-cover/model-town-lahore' },
    { path: '/areas-we-cover/bahria-town-lahore', title: 'Home Physiotherapy in Bahria Town Lahore | Universal Physio Care', description: 'Certified home visit physical therapy in Bahria Town Lahore (Sectors A-F). Hospital-grade rehabilitation delivered to your residence.', canonical: 'https://www.universalphysio.fit/areas-we-cover/bahria-town-lahore' },
    { path: '/areas-we-cover/valencia-lahore', title: 'Home Physiotherapy in Valencia Lahore | Universal Physio Care', description: 'Home physical therapy visits in Valencia Town Lahore. Specialized DPT care for joint pain, stroke recovery & post-operative rehabilitation.', canonical: 'https://www.universalphysio.fit/areas-we-cover/valencia-lahore' },
    { path: '/areas-we-cover/wapda-town-lahore', title: 'Home Physiotherapy in Wapda Town Lahore | Universal Physio Care', description: 'Doctor of Physical Therapy (DPT) home visit services in Wapda Town Lahore across Phase 1, Phase 2, and all residential blocks.', canonical: 'https://www.universalphysio.fit/areas-we-cover/wapda-town-lahore' },
    { path: '/areas-we-cover/faisal-town-lahore', title: 'Home Physiotherapy in Faisal Town Lahore | Universal Physio Care', description: 'In-home Doctor of Physical Therapy visits delivered to your residence in Faisal Town Lahore across Blocks A, B, C & FAST University vicinity.', canonical: 'https://www.universalphysio.fit/areas-we-cover/faisal-town-lahore' },
    { path: '/areas-we-cover/iqbal-town-lahore', title: 'Home Physiotherapy in Iqbal Town Lahore | Universal Physio Care', description: 'Professional home visit physical therapy in Allama Iqbal Town Lahore across Khyaban-e-Iqbal, Chenab, Moon Market & surrounding blocks.', canonical: 'https://www.universalphysio.fit/areas-we-cover/iqbal-town-lahore' },
    { path: '/blog', title: 'Physiotherapy & Health Recovery Blog | Universal Physio Care', description: 'Evidence-based physical therapy insights, spine health advice, stroke recovery exercises, and wellness guides from certified DPT specialists in Lahore.', canonical: 'https://www.universalphysio.fit/blog' },
    { path: '/privacy-policy', title: 'Privacy Policy | Universal Physio Care', description: 'Privacy Policy and patient data protection guidelines for Universal Physio Care in Lahore.', canonical: 'https://www.universalphysio.fit/privacy-policy' },
    { path: '/privacy', title: 'Privacy Policy | Universal Physio Care', description: 'Privacy Policy and patient data protection guidelines for Universal Physio Care in Lahore.', canonical: 'https://www.universalphysio.fit/privacy' },
    { path: '/terms-of-service', title: 'Terms of Service | Universal Physio Care', description: 'Terms of Service and treatment agreement guidelines for Universal Physio Care home visits in Lahore.', canonical: 'https://www.universalphysio.fit/terms-of-service' }
  ];
}

function runPrenderer() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist. Run vite build first.');
    process.exit(1);
  }

  const routes = getRoutesToPrerender();
  console.log('⚡ Generating static route HTML with noscript fallback & clean loading spinner...');
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  routes.forEach(r => {
    let html = template;
    html = cleanHeadTags(html, r);

    const noscriptBlock = generateRouteNoscriptHtml(r);
    if (html.includes('<noscript>')) {
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptBlock);
    } else {
      html = html.replace('</body>', `  ${noscriptBlock}\n</body>`);
    }

    if (r.path === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    } else {
      const targetFolder = path.join(distDir, r.path.replace(/^\//, ''));
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
      }
      fs.writeFileSync(path.join(targetFolder, 'index.html'), html, 'utf8');
    }
  });

  console.log('✅ Static pre-rendering completed successfully.');
}

try {
  runPrenderer();
} catch (err) {
  console.error('Pre-rendering error:', err);
  process.exit(1);
}
