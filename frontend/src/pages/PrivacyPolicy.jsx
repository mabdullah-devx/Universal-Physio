import SEO from '../components/SEO';
import React from 'react';
import { Shield, Lock, Eye, FileText, Globe, Bell, Mail, Phone, MapPin, UserCheck, Trash2, Edit } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="w-full pt-32 pb-20 px-6 bg-[#fdfdfb]">
      <SEO title="Privacy Policy" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8CC241]/10 text-sm font-semibold text-[#2D4A22] mb-6">
            <Shield size={18} /> Your Privacy Matters
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D4A22] mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: May 7, 2026</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-soft p-8 md:p-12 space-y-12 animate-slide-up">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8CC241]/10 flex items-center justify-center text-[#8CC241]">
                <FileText size={18} />
              </div>
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Universal Physio Care, your privacy and trust are our top priorities. We are committed to safeguarding your personal and medical information, ensuring confidentiality, and maintaining transparency in how we handle your data. This Privacy Policy outlines the type of information we collect, how we use it, and the steps we take to protect it.
            </p>
            <p className="text-gray-600 leading-relaxed font-medium">
              By using our website or services, you agree to the practices described below.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#088395]/10 flex items-center justify-center text-[#088395]">
                <Shield size={18} />
              </div>
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect personal information when you book an appointment, fill out forms on our website, or communicate with us directly. This may include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <UserCheck size={16} />, text: "Full name, phone, email, and home address" },
                { icon: <Shield size={16} />, text: "Medical history and treatment information" },
                { icon: <Lock size={16} />, text: "Payment details for billing purposes" },
                { icon: <Edit size={16} />, text: "Information voluntarily provided in consultations" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#fdfdfb] rounded-xl border border-gray-50">
                  <div className="text-[#8CC241]">{item.icon}</div>
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 italic">
              We may also collect non-personal data such as IP addresses, browser type, and usage statistics through cookies or third-party analytics.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8CC241]/10 flex items-center justify-center text-[#8CC241]">
                <Eye size={18} />
              </div>
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The information we collect is used to provide and improve our services. Specifically, we use your information to:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Schedule and manage home appointments",
                "Deliver customized treatment plans",
                "Communicate regarding health progress",
                "Maintain accurate medical documentation",
                "Process payments and manage billing",
                "Improve website and patient care experience"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8CC241] shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">Use of Cookies & Tracking</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may use cookies or similar technologies to enhance user experience and analyze traffic. These tools help us understand how visitors use our site, so we can improve its design and usability. You can manage or disable cookies in your browser settings, but some features of the website may not function properly without them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain patient information only for as long as necessary to provide treatment and comply with legal or medical record-keeping requirements. When no longer needed, records are securely deleted or destroyed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">Sharing of Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We respect your privacy and do not sell, rent, or trade your personal information to third parties. Information is only shared in the following situations:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#088395] shrink-0" />
                <span className="text-sm">With your explicit consent (e.g., referrals to specialists)</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#088395] shrink-0" />
                <span className="text-sm">With service providers (e.g., payment processors) strictly for business operations</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#088395] shrink-0" />
                <span className="text-sm">When required by law, regulation, or legal process</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are intended for adults and elderly patients. However, in cases where we provide physiotherapy to minors, all data is collected with the consent and supervision of a parent or guardian. We do not knowingly collect personal data from children without appropriate consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">Data Protection & Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We take strict security measures to protect your information against unauthorized access, loss, or misuse. These include:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Secure storage of medical and personal data",
                "Access limited to authorized staff",
                "Use of encryption and secure channels"
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[#088395]/5 rounded-xl text-center">
                  <p className="text-sm font-bold text-[#088395]">{item}</p>
                </div>
              ))}
            </ul>
            <p className="text-sm text-gray-500 italic">
              Despite our efforts, no online or offline system is completely secure. However, we continuously review and upgrade our practices to ensure maximum protection.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22]">International Visitors</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are provided in Pakistan, but your data may be stored or processed on servers located outside the country due to third-party tools (e.g., Google Analytics, WhatsApp). By using our website, you consent to such transfers, provided that adequate data protection measures are in place.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8CC241]/10 flex items-center justify-center text-[#8CC241]">
                <UserCheck size={18} />
              </div>
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Eye size={14} />, text: "Access your personal information" },
                { icon: <Edit size={14} />, text: "Request corrections to data" },
                { icon: <Trash2 size={14} />, text: "Request deletion of information" },
                { icon: <Lock size={14} />, text: "Withdraw consent at any time" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="text-[#8CC241]">{item.icon}</div>
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#2D4A22] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#088395]/10 flex items-center justify-center text-[#088395]">
                <Bell size={18} />
              </div>
              Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Universal Physio Care reserves the right to update this Privacy Policy from time to time. Any changes will be posted on this page with the "Last Updated" date. We encourage you to review it periodically to stay informed about how your information is protected.
            </p>
          </section>

          <section className="pt-10 border-t border-gray-100">
            <h2 className="text-3xl font-serif font-bold text-[#2D4A22] mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-8">
              If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your information, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-6 bg-[#fdfdfb] rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#8CC241]/20 flex items-center justify-center text-[#8CC241]">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                  <p className="text-lg font-bold text-[#2D4A22]">+92 3064954970</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-[#fdfdfb] rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#088395]/20 flex items-center justify-center text-[#088395]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold text-[#2D4A22]">universalphysio.com@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 p-6 bg-[#fdfdfb] rounded-2xl border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-[#B89B84]/20 flex items-center justify-center text-[#B89B84]">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                <p className="text-lg font-bold text-[#2D4A22]">Lahore, Pakistan</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
