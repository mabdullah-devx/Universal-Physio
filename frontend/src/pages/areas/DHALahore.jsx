import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, Clock, ShieldCheck, HeartPulse, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const areaSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Home Physiotherapy in DHA Lahore",
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
    "name": "DHA Lahore",
    "containedInPlace": {
      "@type": "City",
      "name": "Lahore"
    }
  },
  "description": "Doctor of Physical Therapy (DPT) home visit services across DHA Lahore (Phases 1-9) for back pain, stroke rehab, sports recovery & elderly care."
};

const faqs = [
  {
    q: "Do you cover all phases of DHA Lahore for home physical therapy?",
    a: "Yes. Our Doctors of Physical Therapy cover all sectors and phases of Defence Housing Authority (DHA) Lahore including Phase 1, Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Phase 7, Phase 8, Phase 9 Prism, and surrounding blocks."
  },
  {
    q: "How quickly can a physiotherapist visit my residence in DHA Lahore?",
    a: "We offer flexible same-day and pre-scheduled appointment slots from 8:00 AM to 8:00 PM, 7 days a week."
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

const DHALahore = () => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFBF9]">
      <SEO 
        title="Home Physiotherapy in DHA Lahore | Universal Physio" 
        description="Book Doctor of Physical Therapy (DPT) home visits in DHA Lahore (Phases 1-9). Specialized spine, neuro, post-surgery & geriatric care at your doorstep."
        path="/areas-we-cover/dha-lahore"
        schema={[areaSchema, faqSchema]}
        breadcrumbs={[
          { name: "Areas We Cover", path: "/areas-we-cover" },
          { name: "DHA Lahore", path: "/areas-we-cover/dha-lahore" }
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <MapPin className="w-4 h-4" />
            <span>Dedicated Service Zone • DHA Lahore</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Home Physiotherapy in DHA Lahore
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional physical therapy sessions brought directly to your home across all phases of Defence Housing Authority, Lahore.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-border/40 text-center space-y-2">
            <Clock className="mx-auto text-primary" size={28} />
            <h3 className="font-bold text-foreground">Flexible Scheduling</h3>
            <p className="text-xs text-muted-foreground">Morning & evening slots 7 days a week.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border/40 text-center space-y-2">
            <ShieldCheck className="mx-auto text-primary" size={28} />
            <h3 className="font-bold text-foreground">Sanitized Equipment</h3>
            <p className="text-xs text-muted-foreground">Portable tables & clinical gear brought to you.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-border/40 text-center space-y-2">
            <HeartPulse className="mx-auto text-primary" size={28} />
            <h3 className="font-bold text-foreground">Certified DPT Doctors</h3>
            <p className="text-xs text-muted-foreground">Licensed physical therapy specialists.</p>
          </div>
        </div>

        {/* Coverage Details */}
        <div className="organic-card p-8 md:p-12 mb-16 bg-white border border-border/40 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">DHA Lahore Phases Served</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Our mobile Doctor of Physical Therapy team provides comprehensive home visit services throughout DHA Lahore. Skip the traffic on Main Boulevard and Bedian Road—receive 1-on-1 personalized rehabilitation in your living room.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border/30">
            {[
              "DHA Phase 1 & Phase 2",
              "DHA Phase 3 & Phase 4",
              "DHA Phase 5 & Phase 6",
              "DHA Phase 7 & Phase 8",
              "DHA Phase 9 Prism & Town",
              "DHA Rahbar & Raya Sector"
            ].map((phase, idx) => (
              <div key={idx} className="flex items-center gap-3 font-medium text-foreground">
                <CheckCircle2 className="text-primary shrink-0" size={18} />
                <span>{phase}</span>
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Book a Home Physiotherapist in DHA Lahore</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Select your preferred date, time, and service to schedule your appointment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/booking" state={{ selectedArea: "DHA Lahore" }} className="px-8 py-4 bg-white text-[#2C3E2D] font-bold rounded-2xl hover:bg-gray-100 transition-all">
              Book Visit in DHA Lahore
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

export default DHALahore;
