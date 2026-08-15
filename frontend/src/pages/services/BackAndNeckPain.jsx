import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Activity, ShieldCheck, HeartPulse, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Back & Neck Pain Physiotherapy in Lahore",
  "serviceType": "Physical Therapy",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Universal Physio Care",
    "url": "https://www.universalphysio.fit"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lahore"
  },
  "description": "Comprehensive home assessment and treatment for acute or chronic back, neck, sciatica, and spinal conditions in Lahore by Doctors of Physical Therapy (DPT)."
};

const faqs = [
  {
    q: "How does home physiotherapy help with severe back pain when moving is difficult?",
    a: "When acute back or neck pain strikes, traveling in a vehicle can aggravate muscle spasms and spinal nerve compression. Our Doctor of Physical Therapy arrives directly at your home with portable treatment tables and clinical equipment, allowing you to begin pain-relief therapy without physical travel stress."
  },
  {
    q: "What techniques are used for sciatica and neck stiffness?",
    a: "We combine gentle spinal mobilization, manual traction, soft tissue release, neural nerve flossing, and customized core stability exercises to alleviate pressure on spinal nerves and restore joint mechanics."
  },
  {
    q: "Do I need an MRI or X-ray before starting home sessions?",
    a: "While previous medical reports and imaging are helpful, they are not mandatory for your initial consultation. Our DPT specialist conducts a detailed physical examination including nerve stretch tests, range-of-motion assessment, and postural analysis."
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

const BackAndNeckPain = () => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFBF9]">
      <SEO 
        title="Back Pain Physiotherapy in Lahore | Universal Physio" 
        description="Specialized home physiotherapy in Lahore for back & neck pain, sciatica, disc bulge & cervical stiffness. Book a Doctor of Physical Therapy visit."
        path="/services/back-and-neck-pain-physiotherapy"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Back & Neck Pain", path: "/services/back-and-neck-pain-physiotherapy" }
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Activity className="w-4 h-4" />
            <span>Spine & Joint Rehabilitation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Back & Neck Pain Physiotherapy in Lahore
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Evidence-based spinal mobilization, manual therapy, and core stabilization delivered to your home by Doctors of Physical Therapy (DPT).
          </p>
        </div>

        {/* Overview Box */}
        <div className="organic-card p-8 md:p-12 mb-16 bg-white border border-border/40 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Who This Service Is For</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Spinal pain—whether acute lower back tightness, chronic lumbar disc bulges, sciatica radiating down the leg, or neck stiffness from prolonged desk work—significantly impairs your quality of life. Our targeted in-home therapy treats the root biomechanical causes rather than just masking symptoms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/30">
            {[
              "Lower Back Pain & Muscle Spasms",
              "Sciatica & Nerve Compression Pain",
              "Cervical Neck Stiffness & Postural Strain",
              "Lumbar Disc Bulges & Herniations",
              "Degenerative Disc & Spondylosis Care",
              "Postural Correction & Ergonomic Guidance"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 font-medium text-foreground">
                <CheckCircle2 className="text-primary shrink-0" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment Approach */}
        <div className="space-y-12 mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-3">Our Clinical Approach</h2>
            <p className="text-muted-foreground">How our Doctors of Physical Therapy restore your movement and relieve spinal pain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-border/40 space-y-4">
              <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-lg">01</span>
              <h3 className="font-serif font-bold text-xl text-foreground">Biomechanical Assessment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We evaluate spinal mobility, pelvic alignment, nerve tension, and postural compensations to pinpoint exact pain triggers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-border/40 space-y-4">
              <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-lg">02</span>
              <h3 className="font-serif font-bold text-xl text-foreground">Hands-On Manual Therapy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Gentle joint mobilization, soft tissue release, and spinal decompression techniques ease muscle guarding and nerve inflammation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-border/40 space-y-4">
              <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-lg">03</span>
              <h3 className="font-serif font-bold text-xl text-foreground">Active Core Rehabilitation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Progressive stabilization exercises strengthen deep abdominal and back muscles to support your spine long-term.
              </p>
            </div>
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Ready for Relief From Back & Neck Pain?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Book a Doctor of Physical Therapy (DPT) for a home visit anywhere in Lahore.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/booking?service=Back%20%26%20Neck%20Pain" className="px-8 py-4 bg-white text-[#2C3E2D] font-bold rounded-2xl hover:bg-gray-100 transition-all">
              Book Home Session
            </Link>
            <Link to="/services" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackAndNeckPain;
