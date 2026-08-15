import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sports Injury Recovery Physiotherapy in Lahore",
  "serviceType": "Sports Rehabilitation",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Universal Physio Care",
    "url": "https://www.universalphysio.fit"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lahore"
  },
  "description": "Evidence-based home sports injury physiotherapy in Lahore for sprains, muscle strains, ligament tears, tendinitis, and athletic return-to-play rehabilitation."
};

const faqs = [
  {
    q: "What sports injuries do your physiotherapists treat at home?",
    a: "We treat ankle sprains, hamstring strains, ACL/MCL ligament rehab, rotator cuff shoulder pain, tennis elbow, runner's knee, and groin pulls using modern portable clinical modalities."
  },
  {
    q: "How does home physical therapy accelerate athletic recovery?",
    a: "Our DPT specialists combine acute pain relief (soft tissue release, kinesiology taping, electrotherapy) with functional biomechanical correction to rebuild muscle strength and prevent reinjury."
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

const SportsInjury = () => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFBF9]">
      <SEO 
        title="Sports Injury Physiotherapy in Lahore | Universal Physio" 
        description="Targeted home sports injury physiotherapy in Lahore for sprains, strains, ligament recovery & joint rehab. Book a DPT specialist."
        path="/services/sports-injury-physiotherapy"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Sports Injury Recovery", path: "/services/sports-injury-physiotherapy" }
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Activity className="w-4 h-4" />
            <span>Athletic Performance & Injury Rehab</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Sports Injury Physiotherapy in Lahore
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Accelerate your return to sport safely. Targeted muscle, joint, and ligament rehabilitation delivered to your home by Doctors of Physical Therapy.
          </p>
        </div>

        {/* Overview Box */}
        <div className="organic-card p-8 md:p-12 mb-16 bg-white border border-border/40 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Targeted Athletic Rehabilitation</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Whether you are a competitive athlete or recreational fitness enthusiast, joint sprains, tendon inflammation, or ligament injuries require structured recovery protocols. We bring evidence-based manual therapy, neuromuscular training, and exercise prescription directly to your living room.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/30">
            {[
              "Ligament Sprains (ACL, MCL, Ankle Sprains)",
              "Muscle Strains & Tendinopathies",
              "Rotator Cuff & Shoulder Impingement",
              "Runner's Knee & Patellar Tendinitis",
              "Joint Mobilization & Soft Tissue Release",
              "Return-to-Sport Movement Screening"
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Accelerate Your Sports Recovery</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Book a Doctor of Physical Therapy (DPT) for an in-home athletic rehab session in Lahore.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/booking?service=Sports%20Injury%20Recovery" className="px-8 py-4 bg-white text-[#2C3E2D] font-bold rounded-2xl hover:bg-gray-100 transition-all">
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

export default SportsInjury;
