import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Activity, CheckCircle2, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Stroke Rehabilitation Physiotherapy in Lahore",
  "serviceType": "Neuro-Physiotherapy",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Universal Physio Care",
    "url": "https://www.universalphysio.fit"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lahore"
  },
  "description": "Specialized in-home stroke rehabilitation and neuro-physiotherapy in Lahore to restore gait, motor function, balance, and independence."
};

const faqs = [
  {
    q: "Why is home-based stroke rehabilitation beneficial?",
    a: "Recovering stroke survivors often face mobility challenges and fatigue when traveling to a clinic. Home-based therapy enables the Doctor of Physical Therapy to re-train real-world functional tasks—like standing up from the patient's own armchair, walking down their hallway, and navigating home stairs—accelerating practical independence."
  },
  {
    q: "How soon after a stroke should physiotherapy begin?",
    a: "Once medically stabilized and cleared by the treating neurologist, stroke rehabilitation should begin as early as possible. Neuroplasticity (the brain's ability to rewire motor pathways) is highest in the initial months following a stroke."
  },
  {
    q: "What exercises are included in stroke recovery sessions?",
    a: "Sessions include gait re-training, weight-bearing exercises, neuro-muscular re-education, limb spasticity management, balance training, and fine motor movement practice."
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

const StrokeRehabilitation = () => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFBF9]">
      <SEO 
        title="Stroke Rehabilitation Physiotherapy in Lahore | Universal Physio" 
        description="In-home stroke rehabilitation services in Lahore. Neuro-physiotherapy to restore gait, balance, arm mobility & independence for stroke survivors."
        path="/services/stroke-rehabilitation-physiotherapy"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Stroke Rehabilitation", path: "/services/stroke-rehabilitation-physiotherapy" }
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Activity className="w-4 h-4" />
            <span>Neurological Rehabilitation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Stroke Rehabilitation Physiotherapy in Lahore
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dedicated 1-on-1 neuro-physiotherapy delivered in the comfort of your home to help stroke survivors regain movement, motor control, and daily independence.
          </p>
        </div>

        {/* Overview Box */}
        <div className="organic-card p-8 md:p-12 mb-16 bg-white border border-border/40 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Restoring Motor Function & Independence</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Stroke recovery requires consistent, evidence-based neuro-rehabilitation to stimulate neuroplasticity. Our Doctors of Physical Therapy bring specialized rehabilitation protocols directly to your residence across Lahore, working closely with patients and families.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/30">
            {[
              "Gait & Walking Re-Education",
              "Balance & Postural Stability Training",
              "Upper Limb & Hand Function Recovery",
              "Muscle Spasticity & Rigidity Management",
              "Transfer & Bed Mobility Exercises",
              "Fall Prevention & Home Ergonomics"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 font-medium text-foreground">
                <CheckCircle2 className="text-primary shrink-0" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Begin Dedicated Stroke Recovery at Home</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Book a Doctor of Physical Therapy specializing in neuro-physiotherapy anywhere in Lahore.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <RouterLink to="/booking?service=Stroke%20Rehabilitation" className="px-8 py-4 bg-white text-[#2C3E2D] font-bold rounded-2xl hover:bg-gray-100 transition-all">
              Book Home Session
            </RouterLink>
            <RouterLink to="/services" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              View All Services
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrokeRehabilitation;
