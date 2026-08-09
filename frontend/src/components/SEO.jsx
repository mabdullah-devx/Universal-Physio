import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description = "Universal Physio Care - Premium in-home physical therapy in Lahore. Certified Doctor of Physical Therapy (DPT) for back pain, stroke rehab, sports injuries, and elderly care.", 
  name = "Universal Physio Care", 
  type = "website",
  url,
  image = "https://www.universalphysio.fit/hero-bg.png",
  noindex = false
}) => {
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href.split('?')[0].replace('https://universalphysio.fit', 'https://www.universalphysio.fit') : 'https://www.universalphysio.fit');

  const medicalSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": name,
    "description": description,
    "url": canonicalUrl,
    "logo": "https://www.universalphysio.fit/Physiotherapy%20Clinic%20Logo.svg",
    "image": image,
    "telephone": "+923064954970",
    "email": "info@universalphysio.fit",
    "priceRange": "₨₨",
    "medicalSpecialty": "Physiotherapy",
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
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "areaServed": [
      { "@type": "City", "name": "Lahore" },
      { "@type": "Place", "name": "DHA Lahore" },
      { "@type": "Place", "name": "Gulberg Lahore" },
      { "@type": "Place", "name": "Model Town Lahore" },
      { "@type": "Place", "name": "Johar Town Lahore" },
      { "@type": "Place", "name": "Bahria Town Lahore" }
    ],
    "availableService": [
      { "@type": "MedicalProcedure", "name": "Back & Neck Pain Physiotherapy" },
      { "@type": "MedicalProcedure", "name": "Musculoskeletal Rehabilitation" },
      { "@type": "MedicalProcedure", "name": "Stroke Rehabilitation" },
      { "@type": "MedicalProcedure", "name": "Post-Surgery Rehabilitation" },
      { "@type": "MedicalProcedure", "name": "Elderly Care & Fall Prevention" }
    ]
  };

  const isHomePage = canonicalUrl === 'https://www.universalphysio.fit' || canonicalUrl === 'https://www.universalphysio.fit/';

  const breadcrumbSchema = !isHomePage ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.universalphysio.fit"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title.replace(/\|.*$/, '').trim(),
        "item": canonicalUrl
      }
    ]
  } : null;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title} | {name}</title>
      <meta name='description' content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | ${name}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Universal Physio Care" />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${name}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(medicalSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
