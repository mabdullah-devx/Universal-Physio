import SEO from '../components/SEO';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const location = useLocation();

  const servicesList = [
    {
      id: "back-neck-pain",
      title: "Back & Neck Pain",
      description: "Comprehensive assessment and treatment for acute or chronic spine-related issues. We use manual therapy and targeted exercises to relieve pain and restore function.",
      price: "$120 / session",
      features: ["Postural assessment", "Spinal mobilization", "Ergonomic advice", "Custom exercise plan"]
    },
    {
      id: "musculoskeletal",
      title: "Musculoskeletal Physiotherapy",
      description: "Expert treatment for conditions affecting muscles, bones, joints, and connective tissues. We focus on restoring optimal movement and reducing pain through manual therapy and exercise.",
      price: "$130 / session",
      features: ["Joint mobilization", "Muscle energy techniques", "Injury prevention", "Taping and bracing advice"]
    },
    {
      id: "stroke-rehabilitation",
      title: "Stroke Rehabilitation",
      description: "Specialized neuro-physiotherapy to help stroke survivors regain movement, coordination, and independence in their daily lives.",
      price: "$150 / session",
      features: ["Gait re-training", "Balance exercises", "Motor learning", "Functional tasks"]
    },
    {
      id: "sports-injury",
      title: "Sports Injury Recovery",
      description: "Accelerate your return to sport safely. We treat sprains, strains, tears, and tendinopathies with evidence-based protocols.",
      price: "$130 / session",
      features: ["Acute injury management", "Soft tissue release", "Biomechanics analysis", "Return-to-sport planning"]
    },
    {
      id: "elderly-care",
      title: "Elderly Care",
      description: "Gentle, effective therapy focused on maintaining mobility, preventing falls, and managing age-related conditions like osteoarthritis.",
      price: "$110 / session",
      features: ["Fall risk assessment", "Joint mobility work", "Strength maintenance", "Home safety review"]
    }
  ];

  // Scroll to the specific service when navigating from footer links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a brief highlight effect
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
      <SEO title="Services" />
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We offer specialized in-home physiotherapy tailored to your unique needs and recovery goals.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {servicesList.map((service, idx) => (
          <div key={idx} id={service.id} className="organic-card p-10 flex flex-col transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">{service.title}</h2>
              <span className="bg-[#E6DCCD]/50 text-accent-foreground px-4 py-2 rounded-full font-bold text-sm">
                {service.price}
              </span>
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
            
            <Link to={`/booking?service=${encodeURIComponent(service.title)}`} className="btn-outline flex items-center justify-center gap-2 mt-auto">
              Book this service
              <ArrowRight size={18} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
