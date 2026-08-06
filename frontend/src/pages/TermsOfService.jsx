import SEO from '../components/SEO';
import React from 'react';
import { ScrollText, CheckCircle2, AlertCircle, Calendar, User, CreditCard, ShieldCheck, HelpCircle, Scale, Globe, Bell, Phone, Mail } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="w-full pt-32 pb-20 px-6 bg-[#fdfdfb]">
      <SEO title="Terms Of Service" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#088395]/10 text-sm font-semibold text-[#088395] mb-6">
            <ScrollText size={18} /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D4A22] mb-4">Terms & Conditions</h1>
          <p className="text-gray-500">Last updated: May 7, 2026</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-soft p-8 md:p-12 space-y-12 animate-slide-up">
          
          <section className="space-y-4">
            <p className="text-lg text-[#2D4A22] font-serif font-medium leading-relaxed">
              Welcome to Universal Physio Care. These Terms & Conditions govern your use of our website and services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By accessing our website or booking a physiotherapy session with us, you agree to follow the terms outlined here. Please read them carefully to understand your rights and responsibilities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8CC241]/10 flex items-center justify-center text-[#8CC241]">
                <CheckCircle2 size={18} />
              </div>
              1. Services Provided
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Universal Physio Care offers home physiotherapy and rehabilitation services. Our licensed physiotherapists provide treatment plans based on your medical history, assessment, and physical condition.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <p className="text-sm text-amber-800">
                <strong>Emergency Notice:</strong> Our services are intended for rehabilitation and pain management. We do not provide emergency medical care. In case of a medical emergency, contact a hospital immediately.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#088395]/10 flex items-center justify-center text-[#088395]">
                <Calendar size={18} />
              </div>
              2. Booking & Appointments
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Book via phone, WhatsApp, or website",
                "Provide accurate location and health details",
                "Confirmed booking ensures therapist visit",
                "Pre-session confirmation calls/messages"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#fdfdfb] rounded-xl border border-gray-50">
                  <div className="w-2 h-2 rounded-full bg-[#088395]" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                <AlertCircle size={18} />
              </div>
              3. Cancellations & Rescheduling
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you need to cancel or reschedule an appointment, please inform us at least <strong>6 hours in advance</strong>. Late cancellations may result in a cancellation fee. In rare cases of therapist unavailability, we will notify you promptly and reschedule at your convenience.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4 p-6 bg-[#8CC241]/5 rounded-3xl border border-[#8CC241]/10">
              <h2 className="text-xl font-serif font-bold text-[#2D4A22] flex items-center gap-2">
                <User size={20} className="text-[#8CC241]" />
                4. Patient Responsibilities
              </h2>
              <ul className="space-y-3">
                {[
                  "Provide accurate medical history",
                  "Follow recommended exercises",
                  "Inform therapist of any pain/discomfort",
                  "Ensure a safe, clean home environment"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="mt-1 text-[#8CC241]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4 p-6 bg-[#088395]/5 rounded-3xl border border-[#088395]/10">
              <h2 className="text-xl font-serif font-bold text-[#2D4A22] flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#088395]" />
                5. Therapist Responsibilities
              </h2>
              <ul className="space-y-3">
                {[
                  "Arriving on time with equipment",
                  "Conducting thorough assessments",
                  "Providing professional, safe care",
                  "Maintaining full confidentiality"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="mt-1 text-[#088395]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8CC241]/10 flex items-center justify-center text-[#8CC241]">
                <CreditCard size={18} />
              </div>
              6. Payments & Fees
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Charges communicated at booking",
                "Cash or bank transfer accepted",
                "Invoices available upon request",
                "Extra charges discussed in advance"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <CheckCircle2 size={14} className="text-[#8CC241]" />
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">7. Confidentiality & Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              We respect your privacy. All personal and medical information you share with us will be kept strictly confidential and used only for treatment purposes. Please refer to our Privacy Policy for detailed information on how we collect, use, and safeguard your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                <Scale size={18} />
              </div>
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">Universal Physio Care will not be held liable for:</p>
            <ul className="space-y-3">
              {[
                "Injury due to failure to follow instructions",
                "Pre-existing conditions outside physio scope",
                "Delays caused by traffic or emergencies"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">9. Use of Website</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree not to misuse the site, attempt unauthorized access, or copy content for commercial purposes. We reserve the right to restrict access if these terms are violated.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#088395]/10 flex items-center justify-center text-[#088395]">
                <Globe size={18} />
              </div>
              10. Third-Party Services
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may use platforms like Google Analytics, WhatsApp, or payment processors. While we choose trusted providers, we are not responsible for their independent policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8CC241]/10 flex items-center justify-center text-[#8CC241]">
                <Bell size={18} />
              </div>
              11. Changes to Services & Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Universal Physio Care may update or modify services, pricing, or these terms at any time without prior notice. Continued use indicates acceptance of updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2D4A22]/10 flex items-center justify-center text-[#2D4A22]">
                <Scale size={18} />
              </div>
              12. Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms & Conditions are governed by the laws of Pakistan. Any disputes will be subject to the jurisdiction of the relevant courts in Lahore.
            </p>
          </section>

          <section className="pt-10 border-t border-gray-100">
            <h2 className="text-3xl font-serif font-bold text-[#2D4A22] mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-8 text-lg">
              If you have questions or concerns about these Terms & Conditions, please reach out to us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-6 bg-[#fdfdfb] rounded-2xl border border-gray-100 hover:border-[#8CC241] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#8CC241]/20 flex items-center justify-center text-[#8CC241] group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                  <p className="text-lg font-bold text-[#2D4A22]">+92 3064954970</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-[#fdfdfb] rounded-2xl border border-gray-100 hover:border-[#088395] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#088395]/20 flex items-center justify-center text-[#088395] group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold text-[#2D4A22]">universalphysio.com@gmail.com</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
