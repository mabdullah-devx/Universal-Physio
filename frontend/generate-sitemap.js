import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fadmrbtnmfrvvmwnycth.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG1yYnRubWZydnZtd255Y3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTk1MDIsImV4cCI6MjA5MzYzNTUwMn0.Ck-UsOBpoeHCmDAMmq49L-4Yey4iBW-yG-bxjuc7poM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SITE_ORIGIN = 'https://www.universalphysio.fit';

// Escape values before interpolating them into XML. A blog title containing
// `&` or `<` otherwise produces malformed XML, which Search Console reports
// as "Couldn't fetch".
function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Real last-modified date per static page, seeded from the last git commit
// that touched each page component. Bump the entry for a page when you
// actually change it - do not regenerate these from the build date, or every
// page claims to change on every deploy and Google learns to ignore lastmod.
const PAGE_LASTMOD = {
  '/': '2026-08-15',
  '/services': '2026-08-15',
  '/services/back-and-neck-pain-physiotherapy': '2026-08-15',
  '/services/stroke-rehabilitation-physiotherapy': '2026-08-15',
  '/services/sports-injury-physiotherapy': '2026-08-15',
  '/services/post-surgery-rehabilitation-physiotherapy': '2026-08-15',
  '/services/elderly-care-physiotherapy': '2026-08-15',
  '/booking': '2026-08-15',
  '/about': '2026-08-15',
  '/contact': '2026-08-15',
  '/areas-we-cover': '2026-08-15',
  '/areas-we-cover/dha-lahore': '2026-08-15',
  '/areas-we-cover/gulberg-lahore': '2026-08-15',
  '/areas-we-cover/johar-town-lahore': '2026-08-15',
  '/areas-we-cover/model-town-lahore': '2026-08-15',
  '/areas-we-cover/bahria-town-lahore': '2026-08-15',
  '/areas-we-cover/valencia-lahore': '2026-08-15',
  '/areas-we-cover/wapda-town-lahore': '2026-08-15',
  '/areas-we-cover/faisal-town-lahore': '2026-08-15',
  '/areas-we-cover/iqbal-town-lahore': '2026-08-15',
  '/blog': '2026-08-15',
  '/privacy-policy': '2026-08-15',
  '/terms-of-service': '2026-08-15'
};

// Resolve a blog image to an absolute URL on our own origin, or return null.
// Google's image sitemap only meaningfully indexes images you host: several
// posts hotlink third-party thumbnails (e.g. encrypted-tbn0.gstatic.com),
// which are Google's own cache and add nothing here. Listing only self-hosted
// images means entries appear automatically once real assets are uploaded.
function resolveOwnImageUrl(imageUrl) {
  if (!imageUrl) return null;
  const raw = String(imageUrl).trim();
  if (!raw) return null;

  if (raw.startsWith('/')) return `${SITE_ORIGIN}${raw}`;

  try {
    const parsed = new URL(raw);
    return parsed.origin === SITE_ORIGIN ? parsed.href : null;
  } catch {
    return null;
  }
}

async function generateSitemap() {
  console.log('Generating dynamic sitemap.xml...');

  const staticRoutes = Object.keys(PAGE_LASTMOD);

  const missingLastmod = staticRoutes.filter(route => !PAGE_LASTMOD[route]);
  if (missingLastmod.length > 0) {
    throw new Error(`Missing PAGE_LASTMOD entry for: ${missingLastmod.join(', ')}`);
  }

  let blogRoutes = [];
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, title, image_url, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (blogs && blogs.length > 0) {
      blogRoutes = blogs.map(b => ({
        url: `/blog/${b.slug}`,
        title: b.title,
        imageUrl: resolveOwnImageUrl(b.image_url),
        lastmod: b.created_at
          ? new Date(b.created_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      }));

      const skippedImages = blogs.filter(b => b.image_url && !resolveOwnImageUrl(b.image_url)).length;
      if (skippedImages > 0) {
        console.warn(`ℹ️  Skipped ${skippedImages} blog image(s) not hosted on ${SITE_ORIGIN} (external hotlinks are not listed in the image sitemap).`);
      }
    } else {
      console.warn('⚠️  WARNING: Supabase returned 0 blog posts - sitemap will contain static routes only.');
    }
  } catch (err) {
    console.warn('⚠️  WARNING: Unable to fetch blog slugs from Supabase. Sitemap will contain static routes only.');
    console.warn(`   Reason: ${err.message}`);
  }

  // Only blog posts carry an <image:image> entry, because they are the only
  // URLs with a real, unique image. Repeating one site-wide hero image on
  // every <url> adds no information.
  let imageBlockCount = 0;

  const staticXmlUrls = staticRoutes.map(route => {
    const loc = route === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route}`;
    const isHome = route === '/';
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${PAGE_LASTMOD[route]}</lastmod>
    <changefreq>${isHome ? 'daily' : 'weekly'}</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  const blogXmlUrls = blogRoutes.map(item => {
    let imageBlock = '';
    if (item.imageUrl) {
      imageBlockCount += 1;
      imageBlock = `
    <image:image>
      <image:loc>${escapeXml(item.imageUrl)}</image:loc>
      <image:title>${escapeXml(item.title)}</image:title>
    </image:image>`;
    }
    return `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}${item.url}`)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${imageBlock}
  </url>`;
  });

  const xmlUrls = [...staticXmlUrls, ...blogXmlUrls];

  // Declare the image namespace only when it is actually used.
  const urlsetAttrs = [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    ...(imageBlockCount > 0 ? ['xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'] : [])
  ].join(' ');

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${urlsetAttrs}>
${xmlUrls.join('\n')}
</urlset>`;

  const publicDir = './public';
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8');

  // The index's lastmod is the newest page date, not the build date, so the
  // index does not re-date itself on every deploy either.
  const allLastmods = [
    ...staticRoutes.map(route => PAGE_LASTMOD[route]),
    ...blogRoutes.map(item => item.lastmod)
  ];
  const latestLastmod = allLastmods.sort().at(-1);

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_ORIGIN}/sitemap.xml</loc>
    <lastmod>${latestLastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexContent, 'utf8');
  console.log(
    `✅ sitemap.xml & sitemap_index.xml generated in ./public ` +
    `(${staticXmlUrls.length} static + ${blogXmlUrls.length} blog URLs, ${imageBlockCount} image entries)`
  );
}

generateSitemap().catch(err => {
  console.error(err);
  process.exit(1);
});
