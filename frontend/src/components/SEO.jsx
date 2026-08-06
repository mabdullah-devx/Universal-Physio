import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description = "Universal Physio Care - Premium in-home physiotherapy sessions in Lahore. Professional, certified Doctor of Physical Therapy (DPT) at your doorstep.", 
  name = "Universal Physio Care", 
  type = "website",
  url = "https://universalphysio.fit",
  image = "https://universalphysio.fit/hero-bg.png",
  noindex = false
}) => {
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
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${name}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": name,
          "description": description,
          "url": url,
          "logo": "https://universalphysio.fit/Physiotherapy%20Clinic%20Logo.svg",
          "image": image,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lahore",
            "addressRegion": "Punjab",
            "addressCountry": "PK"
          },
          "priceRange": "₨₨",
          "telephone": "+923064954970"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
