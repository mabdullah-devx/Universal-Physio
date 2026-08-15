import SEO from '../components/SEO';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const servicesHubSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Physiotherapy Services in Lahore",
  "url": "https://www.universalphysio.fit/services",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Back & Neck Pain Physiotherapy",
      "url": "https://www.universalphysio.fit/services/back-and-neck-pain-physiotherapy"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Stroke Rehabilitation Physiotherapy",
      "url": "https://www.universalphysio.fit/services/stroke-rehabilitation-physiotherapy"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sports Injury Recovery Physiotherapy",
      "url": "https://www.universalphysio.fit/services/sports-injury-physiotherapy"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Post-Surgery Rehabilitation Physiotherapy",
      "url": "https://www.universalphysio.fit/services/post-surgery-rehabilitation-physiotherapy"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Elderly Care Physiotherapy",
      "url": "https://www.universalphysio.fit/services/elderly-care-physiotherapy"
    }
  ]
};

const Services = () => {
  const location = useLocation();

  const servicesList = [
    {
      id: "back-neck-pain",
      slug: "back-and-neck-pain-physiotherapy",
      title: "Back & Neck Pain",
      description: "Comprehensive assessment and treatment for acute or chronic spine-related issues. We use manual therapy and targeted exercises to relieve pain and restore function.",
      features: ["Postural assessment", "Spinal mobilization", "Ergonomic advice", "Custom exercise plan"]
    },
    {
      id: "stroke-rehabilitation",
      slug: "stroke-rehabilitation-physiotherapy",
      title: "Stroke Rehabilitation",
      description: "Specialized neuro-physiotherapy to help stroke survivors regain movement, coordination, and independence in their daily lives.",
      features: ["Gait re-training", "Balance exercises", "Motor learning", "Functional tasks"]
    },
    {
      id: "sports-injury",
      slug: "sports-injury-physiotherapy",
      title: "Sports Injury Recovery",
      description: "Accelerate your return to sport safely. We treat sprains, strains, tears, and tendinopathies with evidence-based protocols.",
      features: ["Acute injury management", "Soft tissue release", "Biomechanics analysis", "Return-to-sport planning"]
    },
    {
      id: "post-surgery-rehab",
      slug: "post-surgery-rehabilitation-physiotherapy",
      title: "Post-Surgery Rehabilitation",
      description: "Regain joint mobility, muscular strength, and functional independence after joint replacements, ligament repairs, or orthopedic procedures.",
      features: ["Post-op mobilization", "Scar tissue management", "Swelling control", "Strength rebuilding"]
    },
    {
      id: "elderly-care",
      slug: "elderly-care-physiotherapy",
      title: "Elderly Care",
      description: "Gentle, effective therapy focused on maintaining mobility, preventing falls, and managing age-related conditions like osteoarthritis.",
      features: ["Fall risk assessment", "Joint mobility work", "Strength maintenance", "Home safety review"]
    }
  ];

  // Scroll to the specific service when navigating from footer links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-primary/40', 'ring-offset-4');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-primary/40', 'ring-offset-4');
          }, 2000);
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="w-full pt-32 pb-20">
      <SEO 
        title="Physiotherapy Services in Lahore | Universal Physio" 
        description="Explore specialized in-home physiotherapy services in Lahore: back & neck pain relief, stroke rehabilitation, sports recovery & elderly care."
        path="/services"
        schema={servicesHubSchema}
      />
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Physiotherapy Services in Lahore</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We offer specialized in-home physiotherapy tailored to your unique needs and recovery goals across Lahore.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {servicesList.map((service, idx) => (
          <div key={idx} id={service.id} className="organic-card p-10 flex flex-col transition-all duration-500">
            <div className="mb-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                <Link to={`/services/${service.slug}`} className="hover:text-primary transition-colors">
                  {service.title}
                </Link>
              </h2>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed flex-grow">
              {service.description}
            </p>
            
            <ul className="space-y-3 mb-10">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="text-primary" size={20} />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full">
              <Link to={`/services/${service.slug}`} className="btn-outline flex items-center justify-center gap-2 px-4 py-3 text-sm whitespace-nowrap w-full sm:w-1/2">
                View Full Guide
                <ArrowRight size={16} />
              </Link>
              <Link to={`/booking?service=${encodeURIComponent(service.title)}`} className="btn-primary flex items-center justify-center gap-2 px-4 py-3 text-sm whitespace-nowrap w-full sm:w-1/2">
                Book Visit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
