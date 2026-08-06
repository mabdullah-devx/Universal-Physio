import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Areas we cover', path: '/areas-we-cover' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Determination: Should it show as a solid glass pill?
  const showSolid = !isHomePage || scrolled;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 flex items-center justify-between px-8 py-3 w-full max-w-6xl border transition-all ${showSolid
            ? 'bg-white/80 backdrop-blur-md shadow-soft border-border/40 rounded-full'
            : 'bg-transparent border-transparent rounded-full'
          }`}
      >
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src="/Physiotherapy Clinic Logo.svg"
            alt="PhysioCare Logo"
            className={`transition-all duration-500 ${showSolid ? 'h-12' : 'h-16'} w-auto object-contain`}
          />
          <span className={`font-serif font-extrabold tracking-wide uppercase transition-all duration-500 ${showSolid ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
            } text-[#5C6F52]`}>
            Universal Physio
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-bold text-sm transition-colors hover:text-primary ${isActive(link.path) ? 'text-primary' : 'text-foreground'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link to="/booking" className="btn-primary h-11 px-6 text-sm flex items-center justify-center">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-20 left-4 right-4 bg-[#FEFEFA]/95 backdrop-blur-lg rounded-[2.5rem] shadow-float border border-border/50 p-8 flex flex-col gap-5 z-40 transition-all duration-300 origin-top pointer-events-auto ${isOpen
            ? 'opacity-100 scale-100 translate-y-2'
            : 'opacity-0 scale-95 pointer-events-none -translate-y-4'
          }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`font-bold text-xl py-3 border-b border-border/20 transition-colors ${isActive(link.path) ? 'text-primary' : 'text-foreground'
              }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/booking"
          onClick={() => setIsOpen(false)}
          className="btn-primary mt-4 py-4 flex items-center justify-center text-lg"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
