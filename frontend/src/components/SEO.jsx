import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://www.universalphysio.fit';

const SEO = ({ 
  title, 
  description = "Universal Physio Care - Premium Doctor of Physical Therapy (DPT) home visit services in Lahore for spine care, stroke rehab, sports recovery & elderly mobility.", 
  name = "Universal Physio", 
  type = "website",
  url,
  path,
  image = "https://www.universalphysio.fit/hero-bg.png",
  noindex = false,
  schema = null,
  breadcrumbs = null
}) => {
  const location = useLocation();

  // Resolve current pathname deterministically
  const currentPath = path || (url ? (url.startsWith('http') ? new URL(url).pathname : url) : (location ? location.pathname : '/'));
  
  // Format canonical URL strictly
  let canonicalUrl = SITE_ORIGIN;
  if (url && url.startsWith('http')) {
    canonicalUrl = url;
  } else {
    const cleanPath = (currentPath || '/').split('?')[0];
    if (cleanPath === '/' || cleanPath === '') {
      canonicalUrl = `${SITE_ORIGIN}/`;
    } else {
      canonicalUrl = `${SITE_ORIGIN}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
    }
  }

  // Format page title cleanly without repeating brand name if already included
  const pageTitle = !title 
    ? "Universal Physio Care | Home Physiotherapy in Lahore"
    : title.toLowerCase().includes("universal physio")
      ? title
      : `${title} | ${name}`;

  const isHomePage = canonicalUrl === `${SITE_ORIGIN}/` || canonicalUrl === SITE_ORIGIN;

  // Generate breadcrumb list schema if breadcrumbs array is provided or for non-homepage pages
  let breadcrumbSchema = null;
  if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_ORIGIN}/`
        },
        ...breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 2,
          "name": crumb.name,
          "item": crumb.path.startsWith('http') ? crumb.path : `${SITE_ORIGIN}${crumb.path.startsWith('/') ? '' : '/'}${crumb.path}`
        }))
      ]
    };
  } else if (!isHomePage && title) {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_ORIGIN}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title.replace(/\|.*$/, '').trim(),
          "item": canonicalUrl
        }
      ]
    };
  }

  // Normalize schemas to array for rendering
  const schemaList = [];
  if (schema) {
    if (Array.isArray(schema)) {
      schemaList.push(...schema);
    } else {
      schemaList.push(schema);
    }
  }
  if (breadcrumbSchema) {
    schemaList.push(breadcrumbSchema);
  }

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Universal Physio Care" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD Structured Data */}
      {schemaList.map((sch, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(sch)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

