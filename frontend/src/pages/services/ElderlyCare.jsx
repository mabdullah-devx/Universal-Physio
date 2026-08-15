import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Elderly Care Physiotherapy in Lahore",
  "serviceType": "Geriatric Physical Therapy",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Universal Physio Care",
    "url": "https://www.universalphysio.fit"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lahore"
  },
  "description": "Gentle, compassionate in-home geriatric physical therapy in Lahore. Fall risk assessment, arthritis management, joint mobility, and senior balance training."
};

const faqs = [
  {
    q: "How does home physiotherapy benefit elderly patients in Lahore?",
    a: "Senior patients often struggle with joint stiffness, osteoporosis, or balance vulnerability that makes traveling to medical centers hazardous. Home physical therapy provides personalized 1-on-1 care in their safe, familiar living environment, focusing on fall prevention, mobility preservation, and daily independence."
  },
  {
    q: "Are the exercises safe for elderly patients with severe arthritis?",
    a: "Yes. Our Doctors of Physical Therapy design low-impact, joint-friendly therapeutic exercises tailored to the patient's individual tolerance, pain threshold, and joint condition."
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

const ElderlyCare = () => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFBF9]">
      <SEO 
        title="Elderly Care Physiotherapy in Lahore | Universal Physio" 
        description="Gentle home physical therapy in Lahore for seniors. Fall prevention, arthritis management, and joint mobility enhancement by Doctors of Physical Therapy (DPT)."
        path="/services/elderly-care-physiotherapy"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Elderly Care", path: "/services/elderly-care-physiotherapy" }
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Activity className="w-4 h-4" />
            <span>Geriatric Mobility & Fall Prevention</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Elderly Care Physiotherapy in Lahore
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Gentle, compassionate in-home physical therapy designed to improve balance, relieve arthritic joint stiffness, and protect senior independence.
          </p>
        </div>

        {/* Overview Box */}
        <div className="organic-card p-8 md:p-12 mb-16 bg-white border border-border/40 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Dedicated Senior Mobility Care</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            As we age, maintaining physical independence and joint health is vital for quality of life. Our Doctors of Physical Therapy deliver personalized geriatric care at home across Lahore, helping seniors move safely and comfortably.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/30">
            {[
              "Comprehensive Fall Risk Assessment",
              "Osteoarthritis & Joint Stiffness Relief",
              "Balance, Gait & Coordination Enhancement",
              "Gentle Muscle Strength Maintenance",
              "Post-Fall Rehabilitation & Confidence Rebuilding",
              "Home Environment Safety Review"
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Support Senior Mobility & Safety at Home</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Schedule a gentle home physical therapy consultation for your loved ones in Lahore.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/booking?service=Elderly%20Care" className="px-8 py-4 bg-white text-[#2C3E2D] font-bold rounded-2xl hover:bg-gray-100 transition-all">
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

export default ElderlyCare;
