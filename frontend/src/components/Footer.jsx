import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Globe, MessageCircle, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-16 px-6 mt-20 border-t border-border/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center mb-6">
            <img src="/Physiotherapy Clinic Logo.svg" alt="Universal Physio Care Logo" className="h-14 w-auto object-contain" />
          </Link>
          <p className="text-muted-foreground mb-6">
            Bringing professional, certified Doctor of Physical Therapy (DPT) home visit services to your doorstep in Lahore.
          </p>
          <div className="flex gap-4">
            <a href="https://www.universalphysio.fit" aria-label="Visit our Website" className="h-10 w-10 rounded-full bg-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
              <Globe size={20} />
            </a>
            <a href="https://www.universalphysio.fit/contact" aria-label="Share Universal Physio Care" className="h-10 w-10 rounded-full bg-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
              <Share2 size={20} />
            </a>
            <a href="https://wa.me/923064954970" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="h-10 w-10 rounded-full bg-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
            <li><Link to="/areas-we-cover" className="text-muted-foreground hover:text-primary transition-colors">Areas We Cover</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Health Blog</Link></li>
            <li><Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors">Book an Appointment</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Services</h3>
          <ul className="flex flex-col gap-3">
            <li><Link to="/services/back-and-neck-pain-physiotherapy" className="text-muted-foreground hover:text-primary transition-colors">Back & Neck Pain</Link></li>
            <li><Link to="/services/stroke-rehabilitation-physiotherapy" className="text-muted-foreground hover:text-primary transition-colors">Stroke Rehabilitation</Link></li>
            <li><Link to="/services/sports-injury-physiotherapy" className="text-muted-foreground hover:text-primary transition-colors">Sports Injury Recovery</Link></li>
            <li><Link to="/services/post-surgery-rehabilitation-physiotherapy" className="text-muted-foreground hover:text-primary transition-colors">Post-Surgery Rehab</Link></li>
            <li><Link to="/services/elderly-care-physiotherapy" className="text-muted-foreground hover:text-primary transition-colors">Elderly Care</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Contact</h3>
          <ul className="flex flex-col gap-3">
            <li className="text-muted-foreground">Gulberg III, Lahore, Punjab 54000, Pakistan</li>
            <li>
              <a href="tel:+923064954970" className="text-muted-foreground hover:text-primary transition-colors">
                +92 306 4954970
              </a>
            </li>
            <li>
              <a href="mailto:info@universalphysio.fit" className="text-muted-foreground hover:text-primary transition-colors">
                info@universalphysio.fit
              </a>
            </li>
            <li className="text-xs text-muted-foreground/80 mt-2">
              Mon – Sun: 8:00 AM – 9:00 PM PKT
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/20 text-xs text-muted-foreground/80 leading-relaxed">
        <p>
          <strong>Medical Disclaimer:</strong> In-home physical therapy assessments and treatments are delivered exclusively by accredited Doctors of Physical Therapy (DPT). Clinical information on this website is for educational purposes and does not replace in-person medical evaluation.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Universal Physio Care. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
