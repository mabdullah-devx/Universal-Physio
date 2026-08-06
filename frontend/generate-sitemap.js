import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fadmrbtnmfrvvmwnycth.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG1yYnRubWZydnZtd255Y3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTk1MDIsImV4cCI6MjA5MzYzNTUwMn0.Ck-UsOBpoeHCmDAMmq49L-4Yey4iBW-yG-bxjuc7poM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateSitemap() {
  console.log('Generating dynamic sitemap.xml...');

  const staticRoutes = [
    '',
    '/services',
    '/booking',
    '/about',
    '/contact',
    '/areas-we-cover',
    '/blog',
    '/privacy-policy',
    '/terms-of-service'
  ];

  let blogRoutes = [];
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, created_at')
      .eq('published', true);

    if (!error && blogs && blogs.length > 0) {
      blogRoutes = blogs.map(b => ({
        url: `/blog/${b.slug}`,
        lastmod: b.created_at ? new Date(b.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      }));
    }
  } catch (err) {
    console.warn('Note: Unable to fetch dynamic blog slugs for sitemap fallback to default static routes.', err.message);
  }

  const currentDate = new Date().toISOString().split('T')[0];

  const xmlUrls = [
    ...staticRoutes.map(route => `  <url>
    <loc>https://universalphysio.fit${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`),
    ...blogRoutes.map(item => `  <url>
    <loc>https://universalphysio.fit${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.join('\n')}
</urlset>`;

  const publicDir = './public';
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8');
  console.log('✅ sitemap.xml successfully generated in ./public/sitemap.xml');
}

generateSitemap().catch(console.error);
