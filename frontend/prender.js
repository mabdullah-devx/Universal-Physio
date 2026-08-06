import fs from 'fs';
import path from 'path';
import http from 'http';
import puppeteer from 'puppeteer';
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

// Create simple static server for dist
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
    { path: '/', title: 'Universal Physio Care | DPT Home Visit Physiotherapy Lahore' },
    { path: '/about', title: 'About Us | Universal Physio Care Lahore' },
    { path: '/contact', title: 'Contact Us | Universal Physio Care Lahore' },
    { path: '/booking', title: 'Book Appointment | Universal Physio Care' },
    { path: '/areas-we-cover', title: 'Areas We Cover in Lahore | Universal Physio Care' },
    { path: '/blog', title: 'Health Blog & Recovery Tips | Universal Physio Care' },
    { path: '/privacy-policy', title: 'Privacy Policy | Universal Physio Care' },
    { path: '/terms-of-service', title: 'Terms of Service | Universal Physio Care' }
  ];

  try {
    const { data: blogs } = await supabase.from('blogs').select('slug, title').eq('published', true);
    if (blogs && blogs.length > 0) {
      blogs.forEach(b => {
        staticRoutes.push({
          path: `/blog/${b.slug}`,
          title: `${b.title} | Universal Physio Care Blog`
        });
      });
    }
  } catch (err) {
    console.warn('Note: Could not fetch dynamic blog posts for pre-rendering:', err.message);
  }

  return staticRoutes;
}

async function runPrenderer() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist. Run vite build first.');
    process.exit(1);
  }

  const server = await startServer();
  const routes = await getRoutesToPrerender();

  console.log(`Starting Puppeteer pre-rendering for ${routes.length} routes...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const r of routes) {
    const targetUrl = `http://localhost:${PORT}${r.path}`;
    console.log(`Rendering route: ${r.path} ...`);

    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Ensure React rendered content inside #root
    try {
      await page.waitForSelector('#root > *', { timeout: 5000 });
    } catch (e) {
      console.warn(`Warning: Timeout waiting for #root child element on ${r.path}`);
    }

    let renderedHtml = await page.content();

    // Ensure schema.org LD+JSON is present
    if (!renderedHtml.includes('application/ld+json')) {
      const schemaScript = `<script type="application/ld+json">${schemaOrgJSON}</script>`;
      renderedHtml = renderedHtml.replace('</head>', `${schemaScript}\n</head>`);
    }

    // Write pre-rendered file to disk
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
}

runPrenderer().catch((err) => {
  console.error('Pre-rendering error:', err);
  process.exit(1);
});
