import SEO from '../components/SEO';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Trees, Home, Building, Zap,
  LayoutGrid, Star, Map, Plus, ArrowRight,
  CheckCircle2, Navigation, HeartPulse, ShieldCheck
} from 'lucide-react';

const AreasWeCover = () => {
  const areas = [
    { title: 'DHA Lahore', desc: 'All phases (1-13) covered with immediate availability.', icon: <Building2 size={24} />, color: 'bg-blue-50', img: '/area-premium-1.png' },
    { title: 'Valencia', desc: 'Comprehensive home care for all blocks and sectors.', icon: <Trees size={24} />, color: 'bg-emerald-50', img: '/area-premium-2.png' },
    { title: 'Johar Town', desc: 'Fast response for Phase 1, Phase 2, and nearby areas.', icon: <Home size={24} />, color: 'bg-orange-50', img: '/area-modern.png' },
    { title: 'Model Town', desc: 'Full coverage for blocks A through S with local experts.', icon: <Building size={24} />, color: 'bg-purple-50', img: '/area-premium-2.png' },
    { title: 'Wapda Town', desc: 'Dedicated therapists available for all extensions.', icon: <Zap size={24} />, color: 'bg-yellow-50', img: '/area-modern.png' },
    { title: 'LDA & EME', desc: 'Professional clinical support at your doorstep.', icon: <Building2 size={24} />, color: 'bg-indigo-50', img: '/area-premium-1.png' },
    { title: 'Faisal Town', desc: 'Quick-response rehabilitation for the entire community.', icon: <LayoutGrid size={24} />, color: 'bg-pink-50', img: '/area-premium-2.png' },
    { title: 'Iqbal Town', desc: 'All residential blocks covered by our mobile team.', icon: <Star size={24} />, color: 'bg-cyan-50', img: '/area-modern.png' },
    { title: 'Bahria Town', desc: 'Premium home-visit services for all sectors.', icon: <Map size={24} />, color: 'bg-rose-50', img: '/area-bahria.png' },
  ];

  return (
    <div className="w-full bg-[#FEFEFA] overflow-hidden">
      <SEO title="Areas We Cover" />
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#C18C5D]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Premium Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <Navigation size={14} fill="currentColor" />
              <span>Nationwide Excellence • Local Care</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-serif font-bold text-foreground leading-[1.1]">
              Wherever You Are<br />
              <span className="italic text-primary">We Come to You.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Skip the traffic and clinic queues. Our registered physiotherapists bring clinical-grade equipment directly to your living room.
            </p>

            <div className="flex flex-wrap gap-10 pt-4 border-t border-border/50">
              {[
                { label: 'Coverage', val: 'Lahore-Wide' },
                { label: 'Response', val: 'Same Day' },
                { label: 'Available', val: '24/7 Support' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-serif font-bold text-foreground">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group hidden lg:block">
            <div className="organic-card p-12 bg-white relative z-10 animate-float">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Verified Safety</p>
                    <p className="text-xs text-emerald-700">Sterilized equipment for every visit.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="h-10 w-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                    <HeartPulse size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-900">Registered Pros</p>
                    <p className="text-xs text-blue-700">MDC & PMC certified therapists.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#C18C5D]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Service Zones</h2>
            <p className="text-muted-foreground">Click your area to begin your recovery journey</p>
          </div>
          <div className="h-px flex-1 bg-border/50 mx-8 hidden md:block"></div>
          <div className="text-[10px] font-black uppercase tracking-widest text-primary px-4 py-2 bg-primary/5 rounded-full">
            9 active locations
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <Link 
              key={index}
              to="/booking"
              state={{ selectedArea: area.title }}
              className="group organic-card bg-white border border-border/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={`${area.img}?v=1`} 
                  alt={area.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`absolute bottom-4 left-4 h-12 w-12 rounded-2xl ${area.color} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {React.cloneElement(area.icon, { className: 'text-foreground/70 group-hover:text-primary transition-colors', size: 20 })}
                </div>
              </div>

              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {area.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border/30">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    Book Home Visit <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                  </span>
                  <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Custom Location Card */}
          <div className="group organic-card p-8 bg-foreground text-white border-none relative overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="relative z-10">
              <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center mb-8">
                <Plus size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">Other Area?</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-10">
                Don't see your neighborhood? We are constantly expanding. Contact us to check availability.
              </p>
            </div>

            <Link to="/contact" className="relative z-10 w-full py-4 rounded-xl bg-white text-foreground text-center text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all">
              Request Coverage
            </Link>

            {/* Decorative background for the dark card */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="px-6 py-32">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-white animate-pulse">
              <HeartPulse size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-2xl leading-tight">
              Need immediate rehabilitation at home?
            </h2>
            <p className="text-white/80 text-lg max-w-xl">
              Our support team is active 24/7. Message us on WhatsApp for instant coordination with an expert therapist.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link to="/booking" className="px-10 py-5 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl transition-all">
                Book Session Now
              </Link>
              <a href="https://wa.me/923064954970" className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Abstract background for CTA */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)" />
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreasWeCover;

