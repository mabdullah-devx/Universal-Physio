import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Post-Surgery Rehabilitation Physiotherapy in Lahore",
  "serviceType": "Orthopedic & Post-Op Physical Therapy",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Universal Physio Care",
    "url": "https://www.universalphysio.fit"
  },
  "areaServed": {
    "@type": "City",
    "name": "Lahore"
  },
  "description": "Doctor of Physical Therapy (DPT) post-surgical rehabilitation at home in Lahore for joint replacements, ligament repairs, and orthopedic procedures."
};

const faqs = [
  {
    q: "Why is home physical therapy critical immediately following orthopedic surgery?",
    a: "After surgeries like knee or hip replacement, ACL reconstruction, or spinal surgery, traveling to an outpatient clinic poses infection risks and severe physical strain. In-home post-op physical therapy ensures safe early mobilization, scar management, and progressive weight-bearing under strict clinical supervision."
  },
  {
    q: "Will your therapist follow my surgeon's specific post-op protocol?",
    a: "Yes. Our Doctors of Physical Therapy strictly follow your surgeon's prescribed rehabilitation guidelines and weight-bearing precautions."
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

const PostSurgeryRehab = () => {
  return (
    <div className="w-full pt-32 pb-24 bg-[#FDFBF9]">
      <SEO 
        title="Post-Surgery Rehabilitation in Lahore | Universal Physio" 
        description="In-home post-surgery physiotherapy in Lahore for ACL repairs, joint replacements, and spinal surgery recovery. Safe, progressive mobility."
        path="/services/post-surgery-rehabilitation-physiotherapy"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Post-Surgery Rehabilitation", path: "/services/post-surgery-rehabilitation-physiotherapy" }
        ]}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Activity className="w-4 h-4" />
            <span>Post-Operative Recovery</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Post-Surgery Rehabilitation in Lahore
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Safe, evidence-based clinical post-surgical physical therapy delivered directly to your home following joint replacement, ligament repair, or spinal surgery.
          </p>
        </div>

        {/* Overview Box */}
        <div className="organic-card p-8 md:p-12 mb-16 bg-white border border-border/40 shadow-sm">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Safe & Structured Post-Op Healing</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Successful surgical outcomes depend heavily on proper post-operative physical therapy. Our DPT specialists manage swelling, prevent joint stiffness, guide gait re-training, and restore muscle activation according to surgeon-approved protocols.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/30">
            {[
              "Total Knee & Hip Replacement Rehab",
              "ACL & Meniscus Surgery Recovery",
              "Shoulder Arthroscopy & Rotator Cuff Repair",
              "Spinal Fusion & Discectomy Post-Op Care",
              "Scar Tissue Mobilization & Swelling Reduction",
              "Progressive Weight-Bearing & Gait Training"
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Safely Recover From Surgery at Home</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Schedule a Doctor of Physical Therapy (DPT) for home visit post-op rehabilitation in Lahore.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/booking?service=Post-Surgery%20Rehab" className="px-8 py-4 bg-white text-[#2C3E2D] font-bold rounded-2xl hover:bg-gray-100 transition-all">
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

export default PostSurgeryRehab;
