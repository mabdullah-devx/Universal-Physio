import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, CheckCircle2, Star, ArrowRight, UserCheck, CalendarCheck, Home as HomeIcon, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const faqs = [
  { q: 'What is physiotherapy and how can it help me?', a: 'Physiotherapy is a healthcare profession that uses evidence-based physical techniques—such as exercise, manual therapy, and electrotherapy—to treat injuries, manage pain, and restore movement. It helps with conditions ranging from back pain to post-surgical recovery.' },
  { q: 'Is home-visit physiotherapy as effective as clinic visits?', a: 'Yes! Home-visit physiotherapy provides the same quality of treatment. In fact, many patients recover faster at home because they are more relaxed, and the therapist can tailor exercises to your actual living environment.' },
  { q: 'Do I need a doctor\'s referral to book a session?', a: 'No referral is needed. You can book directly through our website. However, if you have a doctor\'s prescription or medical reports, please share them so we can create the best treatment plan for you.' },
  { q: 'How long does a typical physiotherapy session last?', a: 'A standard session lasts 45–60 minutes. The first visit may take slightly longer as the therapist conducts a thorough assessment and discusses your treatment goals.' },
  { q: 'What should I wear during a physiotherapy session?', a: 'Wear loose, comfortable clothing that allows easy movement and access to the area being treated. For example, shorts for knee treatment or a tank top for shoulder therapy.' },
  { q: 'How many sessions will I need?', a: 'The number of sessions varies based on your condition. Acute injuries may need 4–6 sessions, while chronic conditions could require 8–12 or more. Your therapist will provide a tailored plan after the initial assessment.' },
  { q: 'Is physiotherapy painful?', a: 'Treatment should not be painful, though some techniques may cause mild discomfort that quickly subsides. Your therapist will always communicate with you and adjust the intensity to your comfort level.' },
  { q: 'What conditions can physiotherapy treat?', a: 'Physiotherapy treats a wide range of conditions including back & neck pain, sports injuries, arthritis, post-surgical rehabilitation, stroke recovery, balance disorders, and musculoskeletal issues.' },
  { q: 'Are your physiotherapists certified and licensed?', a: 'Absolutely. All our physiotherapists hold recognized degrees, are registered with relevant medical boards, and undergo continuous professional development to stay current with the latest techniques.' },
  { q: 'What is your cancellation policy?', a: 'We request at least 6-8 hours notice for cancellations or rescheduling. This allows us to offer the slot to another patient in need.' },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [serviceIndex, setServiceIndex] = useState(0);

  const servicesList = [
    { title: 'Back & Neck Pain', desc: 'Relief from chronic pain and stiffness through targeted therapy.', img: '/back-neck-pain.jpg' },
    { title: 'Musculoskeletal', desc: 'Expert care for muscle, bone, and joint conditions to restore function.', img: '/musculoskeletal.png' },
    { title: 'Stroke Rehabilitation', desc: 'Specialized neuro-physiotherapy to regain mobility & independence.', img: '/stroke-rehab.jpg' },
    { title: 'Post-Surgery Rehab', desc: 'Regain mobility and strength faster with guided rehabilitation.', img: '/post-surgery-rehab.webp' },
    { title: 'Elderly Care', desc: 'Improve balance, prevent falls, and maintain independence.', img: '/elderly-care.jpeg' }
  ];

  const nextService = () => {
    setServiceIndex((prev) => (prev + 1) % servicesList.length);
  };

  const prevService = () => {
    setServiceIndex((prev) => (prev - 1 + servicesList.length) % servicesList.length);
  };

  const visibleServices = [
    servicesList[serviceIndex % servicesList.length],
    servicesList[(serviceIndex + 1) % servicesList.length],
    servicesList[(serviceIndex + 2) % servicesList.length]
  ];

  return (
    <div className="w-full">
      <SEO title="Home" />
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#5D7052]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#C18C5D]/10 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full bg-white pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D4A22] leading-tight animate-slide-up opacity-0 [animation-fill-mode:forwards]">
                Expert Recovery <br />
                <span className="text-[#8CC241]">In Your Own Space.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-500 max-w-lg leading-relaxed animate-slide-up opacity-0 [animation-fill-mode:forwards] animation-delay-100">
                Recover faster and more comfortably with personalized physiotherapy sessions delivered directly to your home by certified professionals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 animate-slide-up opacity-0 [animation-fill-mode:forwards] animation-delay-200">
              <Link to="/booking" className="px-8 py-3.5 bg-[#088395] text-white rounded-xl font-bold hover:bg-[#067182] transition-all shadow-lg shadow-[#088395]/20 flex items-center gap-2 group">
                Book Session
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="px-8 py-3.5 border-2 border-gray-100 text-[#2D4A22] rounded-xl font-bold hover:bg-gray-50 transition-all">
                Our Services
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-50 animate-slide-up opacity-0 [animation-fill-mode:forwards] animation-delay-300">
              <div>
                <p className="text-2xl font-bold text-[#2D4A22]">500+</p>
                <p className="text-xs text-gray-400 font-medium">Patients Treated</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D4A22]">15+</p>
                <p className="text-xs text-gray-400 font-medium">Expert Doctors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D4A22]">4.9</p>
                <p className="text-xs text-gray-400 font-medium">Google Rating</p>
              </div>
            </div>
          </div>

          {/* Right: Modern Visual Composition */}
          <div className="relative group">
            <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl animate-scale-in opacity-0 [animation-fill-mode:forwards] animation-delay-400">
              <img
                src="/hero-bg.png"
                alt="Physiotherapy"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2D4A22]/20 to-transparent"></div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3 animate-float animation-delay-500 z-20">
              <div className="w-10 h-10 rounded-full bg-[#8CC241]/20 flex items-center justify-center text-[#8CC241]">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#2D4A22]">Verified Care</p>
                <p className="text-[10px] text-gray-400">MDC Registered</p>
              </div>
            </div>

            {/* Decorative Geometric Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#088395]/5 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
          </div>
        </div>
      </section>

      {/* Services Overview Carousel */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3">Specialized treatments</h2>
            <p className="text-muted-foreground text-lg">Tailored care for your specific recovery needs</p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevService}
              aria-label="Previous Services"
              className="w-12 h-12 rounded-full border border-[#E5EADF] bg-white text-[#2C3E2D] flex items-center justify-center hover:bg-[#5C6F52] hover:text-white transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextService}
              aria-label="Next Services"
              className="w-12 h-12 rounded-full border border-[#E5EADF] bg-white text-[#2C3E2D] flex items-center justify-center hover:bg-[#5C6F52] hover:text-white transition-all shadow-sm active:scale-95"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* 3-Card Responsive Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleServices.map((service, index) => (
            <div
              key={`${service.title}-${index}`}
              className="group organic-card overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FEFEFA] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-8 pt-6">
                <h3 className="font-serif font-bold text-2xl mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-base">{service.desc}</p>
                <Link to="/services" className="font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Learn more <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2.5 mt-10">
          {servicesList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setServiceIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                serviceIndex === idx ? 'w-8 bg-[#5C6F52]' : 'w-2.5 bg-[#E5EADF] hover:bg-[#8BA17E]'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Preview - Redesigned */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#FEFEFA]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">

          {/* Image Side - Overlapping Layout */}
          <div className="flex-1 w-full relative">
            <div className="relative z-10 w-full md:w-[85%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/physiotherapy-about.png"
                alt="Professional care"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlapping small image/card */}
            <div className="absolute -bottom-10 -right-4 z-20 bg-white p-8 rounded-3xl shadow-float max-w-[280px] hidden md:block border border-border/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <div className="font-black text-2xl">4.9/5</div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Patient Rating</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "The most professional home-care physiotherapy service in the region."
              </p>
            </div>
            {/* Experience Badge */}
            <div className="absolute top-10 -left-10 z-20 bg-[#C18C5D] text-white p-6 rounded-3xl shadow-xl rotate-[-5deg] hidden lg:block">
              <div className="text-4xl font-black">10+</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-90">Years of Experience</div>
            </div>
            {/* Decorative background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Content Side */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-black text-primary mb-8 uppercase tracking-widest">
              <HeartPulse size={16} />
              <span>About Universal Physio</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-8">
              Clinical excellence brought to your <span className="italic text-primary underline decoration-primary/20 underline-offset-8">doorstep</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              At **Universal Physio**, we believe that premium healthcare should adapt to your life, not the other way around. We provide hospital-grade physiotherapy in the comfort of your home.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
              {[
                { title: "Expert Doctors", desc: "Certified and licensed professionals." },
                { title: "Personalized", desc: "1-on-1 dedicated attention." },
                { title: "Modern Tech", desc: "Portable advanced equipment." },
                { title: "Home Comfort", desc: "No travel stress or waiting." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <Link to="/booking" className="btn-primary px-10 h-16 text-lg">
                Book a Session
              </Link>
              <Link to="/about" className="text-foreground font-black uppercase tracking-widest text-sm hover:text-primary transition-colors flex items-center gap-2">
                Our Full Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-[#F0EBE5]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground">Your journey to recovery in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Steps */}
            {[
              { icon: <CalendarCheck size={28} />, title: "Book a slot", desc: "Choose a time that works for you through our simple online system." },
              { icon: <UserCheck size={28} />, title: "Therapist visits", desc: "A certified professional arrives at your home with necessary equipment." },
              { icon: <HomeIcon size={28} />, title: "Get treated", desc: "Receive one-on-one care and a personalized recovery plan." }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative z-10">
                <div className="h-20 w-20 rounded-full bg-[#FEFEFA] shadow-float flex items-center justify-center text-primary mb-6 border border-border/50">
                  {step.icon}
                </div>
                <h3 className="font-serif font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Testimonials Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-xl md:text-2xl font-black text-black tracking-tight uppercase">Excellent</h2>
            <div className="flex justify-center gap-1 text-[#FFB400]">
              {[...Array(5)].map((_, i) => <Star key={i} size={28} fill="currentColor" />)}
            </div>
            <p className="text-sm font-medium text-black/60">Based on <span className="font-bold text-black">43 reviews</span></p>
            <div className="flex justify-center pt-2">
              {/* Official Google Wordmark Image for perfect rendering */}
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="h-8 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative group">
            {/* Navigation Arrows */}
            <button
              onClick={() => document.getElementById('review-scroll').scrollBy({ left: -350, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 h-10 w-10 bg-white rounded-full shadow-lg border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={() => document.getElementById('review-scroll').scrollBy({ left: 350, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 h-10 w-10 bg-white rounded-full shadow-lg border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowRight size={20} />
            </button>

            {/* Scroll Area */}
            <div
              id="review-scroll"
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar"
            >
              {[
                {
                  name: "Syed shahzaib Abbas",
                  date: "2 months ago",
                  text: "I live in Model Town Lahore, and was suffering from the frozen shoulder. I booked Home Physio services on my friend's recommendation and had a great experience.",
                  img: "/james.png",
                  initial: "S"
                },
                {
                  name: "Ahmad Tabassum",
                  date: "2 months ago",
                  text: "One of the best Physiotherapists in Lahore. More Satisfying Results & Highly Recommend. The sessions were very effective and the therapist was very professional.",
                  img: "/elena.png",
                  initial: "A"
                },
                {
                  name: "Raveha Atiq",
                  date: "2 months ago",
                  text: "After a recent accident, I needed regular physiotherapy but couldn't make frequent trips to a clinic. I found home rehab services extremely convenient and helpful.",
                  color: "bg-[#E67E22]",
                  initial: "R"
                },
                {
                  name: "SyedAli Raza",
                  date: "3 months ago",
                  text: "The therapist not only treated my back pain effectively but also educated me on posture and daily exercises. The sessions were professional and worth it.",
                  img: "/james.png",
                  initial: "S"
                },
                {
                  name: "Bilal Khan",
                  date: "1 month ago",
                  text: "Excellent home service in Lahore. Very professional and the equipment they bring is top-notch. Highly recommended for post-surgery recovery.",
                  initial: "B",
                  color: "bg-[#3498DB]"
                }
              ].map((rev, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[340px] snap-start bg-[#F8F9FA] rounded-2xl p-6 flex flex-col justify-between border border-border/20 shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {rev.img ? (
                          <img src={rev.img} alt={rev.name} className="h-12 w-12 rounded-full object-cover" />
                        ) : (
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${rev.color || 'bg-primary'}`}>
                            {rev.initial}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-black text-sm">{rev.name}</h4>
                          <p className="text-xs text-black/50">{rev.date}</p>
                        </div>
                      </div>
                      <div className="text-blue-500">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.545 9.633a1.745 1.745 0 100-3.49 1.745 1.745 0 000 3.49zM23.011 12c0 6.081-4.93 11.011-11.011 11.011S0.989 18.081 0.989 12 5.919 0.989 12 0.989 23.011 5.919 23.011 12zm-4.301-3.666a.872.872 0 10-1.234-1.234l-6.166 6.166-2.511-2.511a.872.872 0 00-1.234 1.234l3.128 3.128a.872.872 0 001.234 0l6.783-6.783z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex gap-0.5 text-[#FFB400] mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      <div className="ml-1 text-blue-500">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-sm text-black/80 leading-relaxed line-clamp-4">
                      {rev.text}
                    </p>
                  </div>

                  <button className="text-xs font-bold text-black/40 mt-4 hover:text-black text-left">Read more</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Now Dedicated) */}
      <section className="py-24 px-6 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground font-medium">Everything you need to know about your home recovery journey</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className={`font-bold transition-colors duration-300 text-lg ${openFaq === index ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {faq.q}
                  </span>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-primary text-white rotate-180' : 'bg-primary/5 text-primary'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-[500px] opacity-100 p-6 pt-0 border-t border-border/30' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-muted-foreground leading-relaxed text-base pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
