import fs from 'fs';
import path from 'path';
import http from 'http';
import { createClient } from '@supabase/supabase-js';

const distDir = './dist';
const PORT = 4567;

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fadmrbtnmfrvvmwnycth.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG1yYnRubWZydnZtd255Y3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTk1MDIsImV4cCI6MjA5MzYzNTUwMn0.Ck-UsOBpoeHCmDAMmq49L-4Yey4iBW-yG-bxjuc7poM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);



function cleanHeadTags(html, r) {
  // 1. Clean Title: Keep only the single exact title tag
  html = html.replace(/<title>.*?<\/title>/gi, '');
  html = html.replace('</head>', `  <title>${r.title}</title>\n</head>`);

  // 2. Clean Description: Keep only the single exact description meta tag
  html = html.replace(/<meta name="description"[^>]*>/gi, '');
  html = html.replace('</head>', `  <meta name="description" content="${r.description}">\n</head>`);

  // 3. Clean Canonical: Keep only the single exact self-referencing canonical link tag
  html = html.replace(/<link rel="canonical"[^>]*>/gi, '');
  html = html.replace('</head>', `  <link rel="canonical" href="${r.canonical}">\n</head>`);

  return html;
}

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
    { path: '/', title: 'Home Physiotherapy in Lahore | Universal Physio', description: 'Book certified Doctor of Physical Therapy (DPT) home visit sessions in Lahore for back pain, stroke rehabilitation, sports injuries & elderly care.', canonical: 'https://www.universalphysio.fit/' },
    { path: '/services', title: 'Physiotherapy Services in Lahore | Universal Physio', description: 'Explore specialized in-home physiotherapy services in Lahore: back & neck pain relief, stroke rehabilitation, sports recovery & elderly care.', canonical: 'https://www.universalphysio.fit/services' },
    { path: '/services/back-and-neck-pain-physiotherapy', title: 'Back Pain Physiotherapy in Lahore | Universal Physio', description: 'Specialized home physiotherapy in Lahore for back & neck pain, sciatica, disc bulge & cervical stiffness. Book a Doctor of Physical Therapy visit.', canonical: 'https://www.universalphysio.fit/services/back-and-neck-pain-physiotherapy' },
    { path: '/services/stroke-rehabilitation-physiotherapy', title: 'Stroke Rehabilitation Physiotherapy in Lahore | Universal Physio', description: 'Expert in-home stroke rehabilitation in Lahore. Neuro-physiotherapy to restore gait, balance, arm mobility & independence for stroke survivors.', canonical: 'https://www.universalphysio.fit/services/stroke-rehabilitation-physiotherapy' },
    { path: '/services/sports-injury-physiotherapy', title: 'Sports Injury Physiotherapy in Lahore | Universal Physio', description: 'Targeted home sports injury physiotherapy in Lahore for sprains, strains, ligament recovery & joint rehab. Book a certified DPT specialist.', canonical: 'https://www.universalphysio.fit/services/sports-injury-physiotherapy' },
    { path: '/services/post-surgery-rehabilitation-physiotherapy', title: 'Post-Surgery Rehabilitation in Lahore | Universal Physio', description: 'In-home post-surgery physiotherapy in Lahore for ACL repairs, joint replacements, and spinal surgery recovery. Safe, progressive mobility.', canonical: 'https://www.universalphysio.fit/services/post-surgery-rehabilitation-physiotherapy' },
    { path: '/services/elderly-care-physiotherapy', title: 'Elderly Care Physiotherapy in Lahore | Universal Physio', description: 'Gentle home physical therapy in Lahore for seniors. Fall prevention, arthritis management, and joint mobility enhancement by certified DPT doctors.', canonical: 'https://www.universalphysio.fit/services/elderly-care-physiotherapy' },
    { path: '/about', title: 'About Universal Physio | Physiotherapy Care in Lahore', description: 'Learn about Universal Physio Care, Lahore\'s premier Doctor of Physical Therapy home service. Certified DPT specialists providing evidence-based in-home rehabilitation.', canonical: 'https://www.universalphysio.fit/about' },
    { path: '/contact', title: 'Contact Universal Physio | Book Physiotherapy in Lahore', description: 'Contact Universal Physio Care in Lahore. Schedule your Doctor of Physical Therapy (DPT) home visit, call +92 3064954970 or message our support team.', canonical: 'https://www.universalphysio.fit/contact' },
    { path: '/booking', title: 'Book Home Physiotherapy Session in Lahore | Universal Physio', description: 'Schedule your home physical therapy appointment in Lahore. Select your preferred date, time, service area (DHA, Gulberg, Johar Town, etc.) and DPT treatment.', canonical: 'https://www.universalphysio.fit/booking' },
    { path: '/areas-we-cover', title: 'Home Physiotherapy Service Areas in Lahore | Universal Physio', description: 'Discover Universal Physio Care home visit coverage across Lahore: DHA, Gulberg, Johar Town, Model Town, Bahria Town, Valencia & surrounding sectors.', canonical: 'https://www.universalphysio.fit/areas-we-cover' },
    { path: '/areas-we-cover/dha-lahore', title: 'Home Physiotherapy in DHA Lahore | Universal Physio', description: 'Book Doctor of Physical Therapy (DPT) home visits in DHA Lahore (Phases 1-13). Expert spine, neuro, post-surgery & geriatric care at your doorstep.', canonical: 'https://www.universalphysio.fit/areas-we-cover/dha-lahore' },
    { path: '/areas-we-cover/gulberg-lahore', title: 'Home Physiotherapy in Gulberg Lahore | Universal Physio', description: 'Professional home visit physical therapy in Gulberg Lahore (Blocks 1-3 & Main Boulevard). Certified DPT specialists for back pain & stroke rehab.', canonical: 'https://www.universalphysio.fit/areas-we-cover/gulberg-lahore' },
    { path: '/areas-we-cover/johar-town-lahore', title: 'Home Physiotherapy in Johar Town Lahore | Universal Physio', description: 'Certified Doctor of Physical Therapy home visit sessions in Johar Town Lahore (Phase 1 & Phase 2). Professional spine, joint & neuro rehab.', canonical: 'https://www.universalphysio.fit/areas-we-cover/johar-town-lahore' },
    { path: '/areas-we-cover/model-town-lahore', title: 'Home Physiotherapy in Model Town Lahore | Universal Physio', description: 'In-home Doctor of Physical Therapy visits across Model Town Lahore (Blocks A-S). Specialized treatment for back pain, knee rehab & senior mobility.', canonical: 'https://www.universalphysio.fit/areas-we-cover/model-town-lahore' },
    { path: '/areas-we-cover/bahria-town-lahore', title: 'Home Physiotherapy in Bahria Town Lahore | Universal Physio', description: 'Certified home visit physical therapy in Bahria Town Lahore (Sectors A-F). Hospital-grade rehabilitation delivered to your residence.', canonical: 'https://www.universalphysio.fit/areas-we-cover/bahria-town-lahore' },
    { path: '/areas-we-cover/valencia-lahore', title: 'Home Physiotherapy in Valencia Lahore | Universal Physio', description: 'Home physical therapy visits in Valencia Town Lahore. Specialized DPT care for joint pain, stroke recovery & post-operative rehabilitation.', canonical: 'https://www.universalphysio.fit/areas-we-cover/valencia-lahore' },
    { path: '/areas-we-cover/wapda-town-lahore', title: 'Home Physiotherapy in Wapda Town Lahore | Universal Physio', description: 'Doctor of Physical Therapy (DPT) home visit services in Wapda Town Lahore across Phase 1, Phase 2, and all residential blocks.', canonical: 'https://www.universalphysio.fit/areas-we-cover/wapda-town-lahore' },
    { path: '/areas-we-cover/faisal-town-lahore', title: 'Home Physiotherapy in Faisal Town Lahore | Universal Physio', description: 'In-home Doctor of Physical Therapy visits delivered to your residence in Faisal Town Lahore across Blocks A, B, C & FAST University vicinity.', canonical: 'https://www.universalphysio.fit/areas-we-cover/faisal-town-lahore' },
    { path: '/areas-we-cover/iqbal-town-lahore', title: 'Home Physiotherapy in Iqbal Town Lahore | Universal Physio', description: 'Professional home visit physical therapy in Allama Iqbal Town Lahore across Khyaban-e-Iqbal, Chenab, Moon Market & surrounding blocks.', canonical: 'https://www.universalphysio.fit/areas-we-cover/iqbal-town-lahore' },
    { path: '/blog', title: 'Physiotherapy & Health Recovery Blog | Universal Physio', description: 'Evidence-based physical therapy insights, spine health advice, stroke recovery exercises, and wellness guides from certified DPT specialists in Lahore.', canonical: 'https://www.universalphysio.fit/blog' },
    { path: '/privacy-policy', title: 'Privacy Policy | Universal Physio', description: 'Privacy Policy and patient data protection guidelines for Universal Physio Care in Lahore.', canonical: 'https://www.universalphysio.fit/privacy-policy' },
    { path: '/terms-of-service', title: 'Terms of Service | Universal Physio', description: 'Terms of Service and treatment agreement guidelines for Universal Physio Care home visits in Lahore.', canonical: 'https://www.universalphysio.fit/terms-of-service' }
  ];

  try {
    const { data: blogs } = await supabase.from('blogs').select('slug, title, excerpt').order('created_at', { ascending: false });
    if (blogs && blogs.length > 0) {
      blogs.forEach(b => {
        staticRoutes.push({
          path: `/blog/${b.slug}`,
          title: `${b.title} | Universal Physio Blog`,
          description: b.excerpt || `Read ${b.title} on Universal Physio blog.`,
          canonical: `https://www.universalphysio.fit/blog/${b.slug}`
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
  <meta property="og:image" content="https://www.universalphysio.fit/hero-bg.png">
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
      renderedHtml = cleanHeadTags(renderedHtml, r);

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
