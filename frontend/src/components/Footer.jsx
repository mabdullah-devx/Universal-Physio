import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Globe, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-16 px-6 mt-20 border-t border-border/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center mb-6">
            <img src="/Physiotherapy Clinic Logo.svg" alt="PhysioCare Logo" className="h-14 w-auto object-contain" />
          </Link>
          <p className="text-muted-foreground mb-6">
            Bringing professional, certified physiotherapy services to the comfort of your home.
          </p>
          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 rounded-full bg-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
              <Globe size={20} />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
              <Share2 size={20} />
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
            <li><Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors">Book an Appointment</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Services</h3>
          <ul className="flex flex-col gap-3">
            <li><Link to="/services#back-neck-pain" className="text-muted-foreground hover:text-primary transition-colors">Back & Neck Pain</Link></li>
            <li><Link to="/services#musculoskeletal" className="text-muted-foreground hover:text-primary transition-colors">Musculoskeletal</Link></li>
            <li><Link to="/services#stroke-rehabilitation" className="text-muted-foreground hover:text-primary transition-colors">Stroke Rehabilitation</Link></li>
            <li><Link to="/services#sports-injury" className="text-muted-foreground hover:text-primary transition-colors">Sports Injury Recovery</Link></li>
            <li><Link to="/services#elderly-care" className="text-muted-foreground hover:text-primary transition-colors">Elderly Care</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Contact</h3>
          <ul className="flex flex-col gap-3">
            <li className="text-muted-foreground">Lahore, Punjab, Pakistan</li>
            <li className="text-muted-foreground">+92 3064954970</li>
            <li className="text-muted-foreground">info@universalphysio.fit</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PhysioCare. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
