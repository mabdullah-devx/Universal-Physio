import fs from 'fs';
import path from 'path';
import http from 'http';
import { createClient } from '@supabase/supabase-js';

const distDir = './dist';
const PORT = 4567;

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fadmrbtnmfrvvmwnycth.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG1yYnRubWZydnZtd255Y3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTk1MDIsImV4cCI6MjA5MzYzNTUwMn0.Ck-UsOBpoeHCmDAMmq49L-4Yey4iBW-yG-bxjuc7poM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(distDir, req.url.split('?')[0]);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distDir, 'index.html');
      }

      const ext = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      };

      const contentType = mimeTypes[ext] || 'application/octet-stream';
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Server error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(PORT, () => {
      console.log(`🚀 Static pre-render server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function getRoutesToPrerender() {
  const staticRoutes = [
    { path: '/', title: 'Universal Physio Care | DPT Home Visit Physiotherapy Lahore', description: 'Certified Doctor of Physical Therapy (DPT) home visit services in Lahore. Expert treatment for spine, joints, stroke rehabilitation & sports injuries.', canonical: 'https://universalphysio.fit/' },
    { path: '/about', title: 'About Us | Universal Physio Care Lahore', description: 'Learn about our team of certified Doctors of Physical Therapy (DPT) providing home visit rehabilitation services across Lahore.', canonical: 'https://universalphysio.fit/about' },
    { path: '/contact', title: 'Contact Us | Universal Physio Care Lahore', description: 'Get in touch with Universal Physio Care. Call +92 3064954970 or email info@universalphysio.fit for home physical therapy visits.', canonical: 'https://universalphysio.fit/contact' },
    { path: '/booking', title: 'Book Appointment | Universal Physio Care', description: 'Schedule your home physical therapy appointment in Lahore. Select your preferred date, time, and specialized treatment.', canonical: 'https://universalphysio.fit/booking' },
    { path: '/areas-we-cover', title: 'Areas We Cover in Lahore | Universal Physio Care', description: 'DPT home visit physical therapy available in Gulberg, DHA, Model Town, Johar Town, Bahria Town, and across Lahore.', canonical: 'https://universalphysio.fit/areas-we-cover' },
    { path: '/blog', title: 'Health Blog & Recovery Tips | Universal Physio Care', description: 'Evidence-based physical therapy insights, back pain advice, stroke recovery exercises, and wellness guides from certified DPT specialists.', canonical: 'https://universalphysio.fit/blog' },
    { path: '/privacy-policy', title: 'Privacy Policy | Universal Physio Care', description: 'Privacy Policy and patient data protection guidelines for Universal Physio Care.', canonical: 'https://universalphysio.fit/privacy-policy' },
    { path: '/terms-of-service', title: 'Terms of Service | Universal Physio Care', description: 'Terms of Service and treatment agreement guidelines for Universal Physio Care.', canonical: 'https://universalphysio.fit/terms-of-service' }
  ];

  try {
    const { data: blogs } = await supabase.from('blogs').select('slug, title').eq('published', true);
    if (blogs && blogs.length > 0) {
      blogs.forEach(b => {
        staticRoutes.push({
          path: `/blog/${b.slug}`,
          title: `${b.title} | Universal Physio Care Blog`,
          description: `Read ${b.title} on Universal Physio Care blog.`,
          canonical: `https://universalphysio.fit/blog/${b.slug}`
        });
      });
    }
  } catch (err) {
    console.warn('Note: Could not fetch dynamic blog posts for pre-rendering:', err.message);
  }

  return staticRoutes;
}

function runFallbackPrenderer(routes) {
  console.log('⚡ Executing Fast HTML Route Generator Fallback for Vercel CI...');
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  routes.forEach(r => {
    let html = template;
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${r.title}</title>`);

    const descTag = `<meta name="description" content="${r.description}">`;
    if (html.includes('<meta name="description"')) {
      html = html.replace(/<meta name="description"[^>]*>/gi, descTag);
    } else {
      html = html.replace('</head>', `  ${descTag}\n</head>`);
    }

    const canonicalTag = `<link rel="canonical" href="${r.canonical}">`;
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(/<link rel="canonical"[^>]*>/gi, canonicalTag);
    } else {
      html = html.replace('</head>', `  ${canonicalTag}\n</head>`);
    }

    const ogTags = `
  <meta property="og:title" content="${r.title}">
  <meta property="og:description" content="${r.description}">
  <meta property="og:url" content="${r.canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Universal Physio Care">
  <meta property="og:image" content="https://universalphysio.fit/og-image.jpg">
  <script type="application/ld+json">${schemaOrgJSON}</script>
`;
    html = html.replace('</head>', `${ogTags}\n</head>`);

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
  console.log('✅ Static pre-rendering completed via HTML route generator.');
}

async function runPrenderer() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist. Run vite build first.');
    process.exit(1);
  }

  const routes = await getRoutesToPrerender();

  // If running in Vercel CI container, use fast route generator to avoid Linux chrome lib dependencies
  if (process.env.VERCEL) {
    runFallbackPrenderer(routes);
    return;
  }

  let server;
  let browser;

  try {
    const puppeteerModule = await import('puppeteer');
    const puppeteer = puppeteerModule.default || puppeteerModule;

    server = await startServer();
    console.log(`Starting Puppeteer pre-rendering for ${routes.length} routes...`);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    for (const r of routes) {
      const targetUrl = `http://localhost:${PORT}${r.path}`;
      console.log(`Rendering route: ${r.path} ...`);

      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });

      try {
        await page.waitForSelector('#root > *', { timeout: 5000 });
      } catch (e) {
        console.warn(`Warning: Timeout waiting for #root child element on ${r.path}`);
      }

      let renderedHtml = await page.content();

      if (!renderedHtml.includes('application/ld+json')) {
        const schemaScript = `<script type="application/ld+json">${schemaOrgJSON}</script>`;
        renderedHtml = renderedHtml.replace('</head>', `${schemaScript}\n</head>`);
      }

      if (r.path === '/') {
        const destPath = path.join(distDir, 'index.html');
        fs.writeFileSync(destPath, renderedHtml, 'utf8');
        console.log(`✅ Saved pre-rendered HTML -> ${destPath}`);
      } else {
        const targetFolder = path.join(distDir, r.path.replace(/^\//, ''));
        if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder, { recursive: true });
        }
        const destPath = path.join(targetFolder, 'index.html');
        fs.writeFileSync(destPath, renderedHtml, 'utf8');
        console.log(`✅ Saved pre-rendered HTML -> ${destPath}`);
      }
    }

    await browser.close();
    server.close();
    console.log('🎉 Full Puppeteer DOM Pre-Rendering complete!');
  } catch (err) {
    console.warn('Puppeteer launch encountered environment restriction, switching to HTML route generator fallback:', err.message);
    if (browser) await browser.close().catch(() => {});
    if (server) server.close();
    runFallbackPrenderer(routes);
  }
}

runPrenderer().catch((err) => {
  console.error('Pre-rendering error:', err);
  process.exit(1);
});
