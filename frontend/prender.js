import fs from 'fs';
import path from 'path';

const distDir = './dist';

const schemaOrgJSON = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Universal Physio Care",
  "image": "https://universalphysio.fit/og-image.jpg",
  "@id": "https://universalphysio.fit",
  "url": "https://universalphysio.fit",
  "telephone": "+923064954970",
  "email": "info@universalphysio.fit",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gulberg III",
    "addressLocality": "Lahore",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.5204,
    "longitude": 74.3587
  },
  "medicalSpecialty": "Physiotherapy",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  }
});

const routes = [
  {
    path: '/',
    title: 'Universal Physio Care | DPT Home Visit Physiotherapy Lahore',
    description: 'Certified Doctor of Physical Therapy (DPT) home visit services in Lahore. Expert treatment for spine, joints, stroke rehabilitation & sports injuries.',
    canonical: 'https://universalphysio.fit/'
  },
  {
    path: '/about',
    title: 'About Us | Universal Physio Care Lahore',
    description: 'Learn about our team of certified Doctors of Physical Therapy (DPT) providing home visit rehabilitation services across Lahore.',
    canonical: 'https://universalphysio.fit/about'
  },
  {
    path: '/contact',
    title: 'Contact Us | Universal Physio Care Lahore',
    description: 'Get in touch with Universal Physio Care. Call +92 3064954970 or email info@universalphysio.fit for home physical therapy visits.',
    canonical: 'https://universalphysio.fit/contact'
  },
  {
    path: '/booking',
    title: 'Book Appointment | Universal Physio Care',
    description: 'Schedule your home physical therapy appointment in Lahore. Select your preferred date, time, and specialized treatment.',
    canonical: 'https://universalphysio.fit/booking'
  },
  {
    path: '/areas-we-cover',
    title: 'Areas We Cover in Lahore | Universal Physio Care',
    description: 'DPT home visit physical therapy available in Gulberg, DHA, Model Town, Johar Town, Bahria Town, and across Lahore.',
    canonical: 'https://universalphysio.fit/areas-we-cover'
  },
  {
    path: '/blog',
    title: 'Health Blog & Recovery Tips | Universal Physio Care',
    description: 'Evidence-based physical therapy insights, back pain advice, stroke recovery exercises, and wellness guides from certified DPT specialists.',
    canonical: 'https://universalphysio.fit/blog'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Universal Physio Care',
    description: 'Privacy Policy and patient data protection guidelines for Universal Physio Care.',
    canonical: 'https://universalphysio.fit/privacy-policy'
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Universal Physio Care',
    description: 'Terms of Service and treatment agreement guidelines for Universal Physio Care.',
    canonical: 'https://universalphysio.fit/terms-of-service'
  }
];

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

routes.forEach(route => {
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${route.title}</title>`);

  // Replace or Inject Description Meta
  const descTag = `<meta name="description" content="${route.description}">`;
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*>/gi, descTag);
  } else {
    html = html.replace('</head>', `  ${descTag}\n</head>`);
  }

  // Inject Canonical
  const canonicalTag = `<link rel="canonical" href="${route.canonical}">`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/gi, canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // Inject Open Graph Metadata
  const ogTags = `
  <meta property="og:title" content="${route.title}">
  <meta property="og:description" content="${route.description}">
  <meta property="og:url" content="${route.canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Universal Physio Care">
  <meta property="og:image" content="https://universalphysio.fit/og-image.jpg">
  <script type="application/ld+json">${schemaOrgJSON}</script>
`;
  html = html.replace('</head>', `${ogTags}\n</head>`);

  if (route.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
    console.log(`Pre-rendered HTML output for root: /`);
  } else {
    const targetFolder = path.join(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }
    fs.writeFileSync(path.join(targetFolder, 'index.html'), html, 'utf8');
    console.log(`Pre-rendered HTML output for route: ${route.path} -> ${targetFolder}/index.html`);
  }
});

console.log('✅ Static pre-rendering completed successfully.');
