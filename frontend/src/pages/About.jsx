import SEO from '../components/SEO';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, Users, Award, ShieldCheck, HeartPulse, CheckCircle2, 
  MapPin, Clock, Stethoscope, ChevronDown, Activity, Sparkles, 
  Sparkle, Calendar, ArrowRight, ShieldAlert 
} from 'lucide-react';

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const metrics = [
    { value: "1,500+", label: "Patients Treated at Home" },
    { value: "98%", label: "Clinical Satisfaction Rate" },
    { value: "15+", label: "Certified DPT Doctors" },
    { value: "100%", label: "Lahore Area Coverage" },
  ];

  const coreValues = [
    {
      icon: HeartPulse,
      title: "Patient-Centered Care",
      desc: "Every recovery plan is uniquely tailored to your body type, pain history, home environment, and personal rehabilitation goals."
    },
    {
      icon: Stethoscope,
      title: "Evidence-Based Medicine",
      desc: "Our therapeutic techniques strictly adhere to global clinical guidelines and peer-reviewed physical therapy science."
    },
    {
      icon: ShieldCheck,
      title: "Hygiene & Safety Protocols",
      desc: "Our doctors bring sanitized portable equipment, medical-grade sanitizers, and follow strict infection prevention protocols on every visit."
    },
    {
      icon: Target,
      title: "Root-Cause Rehabilitation",
      desc: "We don't just temporarily relieve symptoms—we diagnose biomechanical root causes to restore full mobility and prevent reinjury."
    }
  ];

  const clinicalSteps = [
    {
      num: "01",
      title: "Comprehensive Home Assessment",
      desc: "Our Doctor of Physical Therapy visits your residence to perform joint mobility, muscle strength, posture, and nerve function testing."
    },
    {
      num: "02",
      title: "Personalized Recovery Roadmap",
      desc: "We create a clear, goal-oriented treatment protocol complete with estimated timeline, session frequency, and target milestones."
    },
    {
      num: "03",
      title: "Hands-On Specialized Therapy",
      desc: "Receive targeted manual therapy, electrotherapy, dry needling, or therapeutic exercises using modern portable clinical gear."
    },
    {
      num: "04",
      title: "Ergonomics & Long-Term Mobility",
      desc: "We guide you on home workstation setup, posture habits, and self-care exercises to ensure sustained, lifelong independence."
    }
  ];

  const doctors = [
    {
      name: "Dr. Sarah Jenkins, DPT",
      initials: "SJ",
      role: "Lead Neurological Specialist",
      credentials: "MS Neurological Physical Therapy (USA)",
      experience: "10+ Years Clinical Experience",
      spec: "Stroke Rehab & Nerve Mobility",
      bio: "Dr. Sarah specializes in complex neurological rehabilitation, helping patients regain movement and independence after stroke, spinal trauma, or nerve injury."
    },
    {
      name: "Dr. David Chen, DPT",
      initials: "DC",
      role: "Senior Sports & Musculoskeletal Specialist",
      credentials: "Certified Manual Therapist (OMPT)",
      experience: "8+ Years Clinical Experience",
      spec: "Joint Pain & ACL Rehab",
      bio: "Dr. David focuses on sports medicine, joint replacement recovery, and advanced manual therapy techniques for spinal and peripheral joint dysfunctions."
    },
    {
      name: "Dr. Emma Robertson, DPT",
      initials: "ER",
      role: "Geriatric & Post-Op Specialist",
      credentials: "Specialist in Mobility & Fall Prevention",
      experience: "9+ Years Clinical Experience",
      spec: "Post-Op Knee/Hip Rehab & Senior Care",
      bio: "Dr. Emma is passionate about senior wellness, post-surgical rehabilitation, and helping elderly patients maintain dignity, strength, and mobility at home."
    },
    {
      name: "Dr. Bilal Ahmed, DPT",
      initials: "BA",
      role: "Spine & Postural Care Specialist",
      credentials: "Certified Dry Needling Practitioner",
      experience: "7+ Years Clinical Experience",
      spec: "Sciatica & Postural Alignment",
      bio: "Dr. Bilal expertises in ergonomic spinal alignment, chronic lower back pain management, and specialized myofascial release protocols."
    }
  ];

  const faqs = [
    {
      q: "Why should I choose home physiotherapy instead of visiting a clinic?",
      a: "Home physiotherapy eliminates stressful transit for patients in pain, allows physical therapists to assess and correct your actual living and working environment, and provides 100% uninterrupted 1-on-1 focus without clinic distractions."
    },
    {
      q: "What equipment do your physiotherapists bring to my house?",
      a: "Our doctors bring all necessary medical equipment, including portable treatment tables, TENS/EMS electrotherapy machines, ultrasound devices, resistance bands, dry needling supplies, and sanitized diagnostic tools."
    },
    {
      q: "Are your physiotherapists fully certified and background checked?",
      a: "Yes. Every specialist at Universal Physio Care holds a Doctor of Physical Therapy (DPT) degree, is registered with physical therapy medical boards, and undergoes comprehensive background checks and clinical safety training."
    },
    {
      q: "Which areas in Lahore do you serve for home visits?",
      a: "We provide home physiotherapy visits across all major sectors of Lahore including Gulberg, DHA (Phases 1-9), Johar Town, Model Town, Cantt, Askari, Garden Town, Bahria Town, and surrounding residential communities."
    }
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-[#FDFBF9]">
      <SEO title="About Us - Certified Home Physiotherapy" description="Learn about Universal Physio Care, Lahore's premier Doctor of Physical Therapy home service. Meet our specialists and explore our evidence-based care philosophy." />
      
      {/* 1. Hero & Mission Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C6F52]/10 text-xs font-bold uppercase tracking-wider text-[#5C6F52] mb-6">
              <Target className="w-4 h-4" />
              <span>Redefining Physical Recovery at Home</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#2C3E2D] leading-tight">
              Hospital-Grade Physical Therapy, <span className="italic font-light text-[#5C6F52]">In Your Home</span>
            </h1>
            
            <p className="text-base md:text-lg text-[#5C6F52] mb-6 leading-relaxed">
              We believe that true healing begins where you feel most comfortable. Universal Physio Care was established with a singular mission: to eliminate the physical strain and stress of traveling to clinics by bringing Lahore's finest certified Doctors of Physical Therapy (DPT) straight to your doorstep.
            </p>

            <p className="text-base md:text-lg text-[#5C6F52] mb-8 leading-relaxed">
              Whether recovering from a stroke, post-surgical joint replacement, spinal condition, or sports injury, our 1-on-1 personalized sessions ensure uninterrupted clinical focus, faster functional progress, and long-term movement independence.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/booking" 
                className="px-8 py-4 bg-[#5C6F52] text-white font-bold text-sm rounded-2xl hover:bg-[#2C3E2D] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Home Consultation
              </Link>
              <Link 
                to="/services" 
                className="px-8 py-4 bg-white text-[#5C6F52] font-bold text-sm rounded-2xl border border-[#E5EADF] hover:bg-[#F4F7F2] transition-all flex items-center gap-2"
              >
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full">
            <div className="relative z-10 w-full h-[450px] md:h-[520px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000" 
                alt="Professional Home Physiotherapy Assessment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E2D]/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-white/50 text-[#2C3E2D] shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#5C6F52] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base">Certified DPT Specialists</h4>
                    <p className="text-xs text-[#5C6F52]">Fully vetted, licensed & equipped for home visits</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow Behind */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#A4B494]/30 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 2. Impact & Metrics Counter */}
      <div className="bg-[#2C3E2D] py-16 text-white my-16 shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-4">
                <div className="text-4xl md:text-5xl font-serif font-bold text-[#A4B494] mb-2">{m.value}</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Core Philosophy & Values Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5C6F52] block mb-2">Our Clinical Standard</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C3E2D]">Our Core Philosophy</h2>
          <p className="text-[#5C6F52] text-base mt-4">Built on medical integrity, patient empathy, and rigorous therapeutic standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-[32px] border border-[#F0F4EC] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-[#F4F7F2] text-[#5C6F52] flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C3E2D] mb-3">{val.title}</h3>
                <p className="text-sm text-[#5C6F52] leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 4-Step Clinical Process */}
      <div className="bg-[#F4F7F2] py-20 border-y border-[#E5EADF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C6F52] block mb-2">Transparent Healthcare</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C3E2D]">The In-Home Care Journey</h2>
            <p className="text-[#5C6F52] text-sm md:text-base mt-3">From your initial home consultation to long-term mobility independence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clinicalSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-[#E5EADF] relative flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-3xl font-serif font-bold text-[#A4B494] mb-4">{step.num}</div>
                  <h3 className="text-lg font-serif font-bold text-[#2C3E2D] mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-[#5C6F52] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Clinical Specialists / Team */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5C6F52]/10 text-xs font-bold uppercase tracking-wider text-[#5C6F52] mb-3">
            <Users className="w-4 h-4" />
            <span>Doctor of Physical Therapy Board</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C3E2D]">Meet Our Lead Specialists</h2>
          <p className="text-[#5C6F52] text-base mt-3">Experienced, board-certified physical therapists dedicated to your recovery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-[32px] border border-[#F0F4EC] p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                {/* Doctor Avatar Badge */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5C6F52] via-[#3E4F37] to-[#2C3E2D] text-white flex items-center justify-center text-2xl font-serif font-bold shadow-lg border-4 border-white mb-4 group-hover:scale-105 transition-transform duration-300">
                    {doc.initials}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4B494] block mb-1">
                    {doc.role}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3E2D] mb-2">{doc.name}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#F4F7F2] text-[#5C6F52] text-[11px] font-semibold border border-[#E5EADF] mb-3">
                    {doc.credentials}
                  </div>
                  <p className="text-xs text-[#5C6F52] font-semibold flex items-center justify-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#C18C5D]" /> {doc.experience}
                  </p>
                </div>

                <p className="text-xs text-[#5C6F52] leading-relaxed mb-6 text-center">{doc.bio}</p>
              </div>

              <div className="pt-4 border-t border-[#F0F4EC] text-center">
                <span className="inline-block w-full py-2 px-3 rounded-xl bg-[#F4F7F2] text-[11px] font-bold text-[#5C6F52]">
                  Specialty: {doc.spec}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Accreditation & Safety Guarantee */}
      <div className="max-w-5xl mx-auto px-6 my-10">
        <div className="bg-[#5C6F52] text-white rounded-[36px] p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#A4B494] text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Quality & Safety First
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold">Clinical Excellence Guaranteed</h3>
            <p className="text-white/80 text-sm max-w-lg leading-relaxed">
              Every practitioner at Universal Physio Care carries medical liability coverage, verified degrees, and strict sanitization standards for total peace of mind.
            </p>
          </div>
          <Link 
            to="/booking" 
            className="px-8 py-4 bg-white text-[#5C6F52] font-bold text-sm rounded-2xl hover:bg-[#FDFBF9] transition-all shrink-0 shadow-md"
          >
            Book Your First Home Session
          </Link>
        </div>
      </div>

      {/* 7. About FAQs Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#2C3E2D] mb-3">Frequently Asked Questions</h2>
          <p className="text-sm text-[#5C6F52]">Everything you need to know about our in-home physiotherapy service.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-[#F0F4EC] overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-serif font-bold text-[#2C3E2D] text-base md:text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#5C6F52] transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 pt-0 text-sm text-[#5C6F52] leading-relaxed border-t border-[#F0F4EC]/60 mt-2 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
