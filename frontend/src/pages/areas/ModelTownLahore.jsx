import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const areaSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Home Physiotherapy in Model Town Lahore",
  "serviceType": "In-Home Physical Therapy",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Universal Physio Care",
    "url": "https://www.universalphysio.fit",
    "telephone": "+923064954970",
    "email": "info@universalphysio.fit"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Model Town Lahore",
    "containedInPlace": {
      "@type": "City",
      "name": "Lahore"
    }
  },
  "description": "Doctor of Physical Therapy (DPT) home visit services across Model Town Lahore (Blocks A-S) for back pain, stroke rehab & elderly mobility."
};

const faqs = [
  {
    q: "Do you provide home physical therapy in Model Town Lahore?",
    a: "Yes. Our Doctors of Physical Therapy deliver home visit sessions across Model Town blocks A, B, C, D, E, F, G, H, J, K, L, M, N, P, Q, R, S, and Model Town Extension."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }))
};

const ModelTownLahore = () => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFBF9]">
      <SEO 
        title="Home Physiotherapy in Model Town Lahore | Universal Physio" 
        description="In-home Doctor of Physical Therapy visits across Model Town Lahore (Blocks A-S). Specialized treatment for back pain, knee rehab & senior mobility."
        path="/areas-we-cover/model-town-lahore"
        schema={[areaSchema, faqSchema]}
        breadcrumbs={[
          { name: "Areas We Cover", path: "/areas-we-cover" },
          { name: "Model Town", path: "/areas-we-cover/model-town-lahore" }
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <MapPin className="w-4 h-4" />
            <span>Dedicated Service Zone • Model Town Lahore</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Home Physiotherapy in Model Town Lahore
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            In-home Doctor of Physical Therapy visits delivered to your residence in Model Town.
          </p>
        </div>

        <div className="organic-card p-8 md:p-12 mb-16 bg-white border border-border/40 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Model Town Blocks Covered</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border/30">
            {[
              "Model Town Blocks A, B, C & D",
              "Model Town Blocks E, F, G & H",
              "Model Town Blocks J, K, L & M",
              "Model Town Blocks N, P, Q, R & S",
              "Model Town Extension",
              "Link Road & Model Town Circular Road"
            ].map((area, idx) => (
              <div key={idx} className="flex items-center gap-3 font-medium text-foreground">
                <CheckCircle2 className="text-primary shrink-0" size={18} />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-border/40 mb-16 space-y-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="text-primary" size={28} />
            <h2 className="text-2xl font-serif font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-2 border-b border-border/30 pb-6 last:border-0 last:pb-0">
                <h3 className="font-bold text-foreground text-lg">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#2C3E2D] text-white p-10 md:p-14 rounded-[3rem] text-center space-y-6 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Book a Home Physiotherapist in Model Town</h2>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/booking" state={{ selectedArea: "Model Town" }} className="px-8 py-4 bg-white text-[#2C3E2D] font-bold rounded-2xl hover:bg-gray-100 transition-all">
              Book Visit in Model Town
            </Link>
            <Link to="/areas-we-cover" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              All Service Areas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTownLahore;
