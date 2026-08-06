import SEO from '../components/SEO';
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sanitizeInput = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/<[^>]*>?/gm, '').trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    const honeypot = e.target.elements?.website?.value;
    if (honeypot) {
      setSuccess(true);
      return;
    }

    setLoading(true);

    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message)
      };

      const { error } = await supabase
        .from('contacts')
        .insert([sanitizedData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <SEO title="Contact" />
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground">We're here to answer any questions about our services.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info & Map (Order 2 on mobile, Order 1 on desktop) */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="organic-card p-8 space-y-6">
            <h2 className="text-2xl font-serif font-bold">Contact Information</h2>
            <div className="flex items-start gap-4">
              <div className="mt-1 text-primary"><MapPin size={24} /></div>
              <div>
                <p className="text-muted-foreground">Lahore<br />Punjab, Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-primary"><Phone size={24} /></div>
              <div>
                <p className="text-muted-foreground">+92 3064954970</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-primary"><Mail size={24} /></div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-muted-foreground">info@universalphysio.fit</p>
              </div>
            </div>
          </div>

          <div className="organic-card p-2 overflow-hidden h-72">
            <iframe
              title="Google Maps location of Universal Physio Care in Lahore, Pakistan"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435515.6734181216!2d74.05419842426364!3d31.482935242557997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23addd56487739b!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form (Order 1 on mobile, Order 2 on desktop) */}
        <div className="organic-card p-8 md:p-12 order-1 lg:order-2">
          <h2 className="text-2xl font-serif font-bold mb-8">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field */}
            <div className="hidden" aria-hidden="true">
              <input type="text" name="website" tabIndex="-1" autoComplete="off" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-pill w-full"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-pill w-full"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-[2rem] border border-border bg-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 min-h-[150px] resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-bold text-center">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
