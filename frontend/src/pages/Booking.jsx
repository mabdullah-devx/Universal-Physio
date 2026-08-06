import SEO from '../components/SEO';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Phone, CheckCircle2, Loader2, MapPin, Mail, HeartPulse } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    area: '',
    address: '',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-select area if coming from Areas We Cover page
  useEffect(() => {
    if (location.state?.selectedArea) {
      setFormData(prev => ({ ...prev, area: location.state.selectedArea }));
    }
  }, [location.state]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value.trim()) {
      error = 'Patient name is required';
    } else if (name === 'phone') {
      if (!value) error = 'Phone number is required';
      else if (!/^923\d{9}$/.test(value)) error = 'Must be 923XXXXXXXXX (12 digits)';
    } else if (name === 'email') {
      if (!value.trim()) error = 'Email address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
    } else if (name === 'service' && !value) {
      error = 'Please select a treatment';
    } else if (name === 'area' && !value) {
      error = 'Please select your service area';
    } else if (name === 'address' && !value.trim()) {
      error = 'Home address is required for visit';
    } else if (name === 'date' && !value) {
      error = 'Preferred date is required';
    } else if (name === 'time' && !value) {
      error = 'Preferred time is required';
    }
    return error;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') value = value.replace(/\D/g, '');
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Simple sanitization function to prevent XSS without corrupting normal text symbols
  const sanitizeInput = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/<[^>]*>?/gm, '').trim();
  };

  const isFormValid = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Honeypot check (Bot protection)
    const honeypot = e.target.elements?.website?.value;
    if (honeypot) {
      console.log('Bot detected');
      setStatus('success'); // Fake success for bots
      return;
    }

    // 2. Validation check
    if (!isFormValid()) {
      setErrorMessage('Please fix the errors in the form before submitting.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Normalize Pakistani Phone Number
      let rawPhone = formData.phone.replace(/\D/g, '');
      if (rawPhone.startsWith('03') && rawPhone.length === 11) {
        rawPhone = '92' + rawPhone.slice(1);
      }

      // 3. Data Sanitization
      const payload = {
        name: sanitizeInput(formData.name),
        phone: rawPhone,
        email: sanitizeInput(formData.email),
        service: sanitizeInput(formData.service),
        area: sanitizeInput(formData.area),
        address: sanitizeInput(formData.address),
        date: formData.date,
        time: formData.time,
        website: formData.website || ''
      };

      // 4. Create Booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!bookingResponse.ok) {
        const errData = await bookingResponse.json().catch(() => ({}));
        const detailMsg = errData.details && errData.details[0] ? errData.details[0].message : null;
        throw new Error(detailMsg || errData.error || 'Failed to create booking');
      }

      // Success
      setStatus('success');
    } catch (err) {
      console.error('Booking error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Submission failed. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center pt-24 px-6">
        <SEO title="Booking Submitted" />
        <div className="organic-card p-12 text-center max-w-lg w-full flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-[#5D7052]/10 flex items-center justify-center text-primary mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Request Submitted!</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Thank you for choosing PhysioCare. Our admin will review your appointment request and reach out to confirm via WhatsApp shortly.
          </p>
          <button onClick={() => setStatus('idle')} className="btn-primary w-full">Book Another Session</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-32 px-6 bg-[#FDFCFB]">
      <SEO title="Book Appointment" />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Info & Trust (5 columns) */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs font-black text-primary uppercase tracking-widest">
                <HeartPulse size={16} />
                <span>Home Visit Service</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#5C6F52] leading-tight">
                Begin your <span className="italic text-primary">recovery</span> from home
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Skip the clinic commute. Professional, certified physiotherapy tailored to your personal environment.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <CheckCircle2 className="text-primary" />, text: "Certified Male & Female Therapists" },
                { icon: <CheckCircle2 className="text-primary" />, text: "Equipment brought to your doorstep" },
                { icon: <CheckCircle2 className="text-primary" />, text: "Flexible morning & evening slots" },
                { icon: <CheckCircle2 className="text-primary" />, text: "No referral required" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-foreground font-medium">
                  <div className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-border/50">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-[#5C6F52] text-white space-y-4 shadow-xl">
              <p className="font-serif italic text-lg">"The best part was not having to sit in traffic with my back pain. The therapist came right to my room."</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 border border-white/30" />
                <div>
                  <p className="font-bold text-sm">Hassan Raza</p>
                  <p className="text-xs text-white/70">Patient since 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-border/30 relative">
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold mb-2">Book Your Appointment</h2>
                <p className="text-muted-foreground">Fill out the details below and we'll reach out via WhatsApp.</p>
              </div>

              {status === 'error' && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-center text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot field (hidden from users) */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website" tabIndex="-1" autoComplete="off" />
                </div>
                
                {/* Section 1: Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground/60">Contact Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-foreground/70 ml-2">PATIENT NAME</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                          id="name" type="text" name="name" required 
                          value={formData.name} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full pl-12 pr-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${touched.name && errors.name ? 'border-red-500' : 'border-border focus:border-primary'}`} 
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      {touched.name && errors.name && <p className="text-[10px] text-red-500 font-bold ml-4">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-bold text-foreground/70 ml-2">WHATSAPP NUMBER</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                          id="phone" type="tel" name="phone" required maxLength={12}
                          value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full pl-12 pr-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${touched.phone && errors.phone ? 'border-red-500' : 'border-border focus:border-primary'}`} 
                          placeholder="923XXXXXXXXX"
                        />
                      </div>
                      {touched.phone && errors.phone ? (
                        <p className="text-[10px] text-red-500 font-bold ml-4">{errors.phone}</p>
                      ) : (
                        <p className="text-[10px] text-muted-foreground ml-4 italic">12 digits format</p>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-foreground/70 ml-2">EMAIL ADDRESS (REQUIRED)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                          id="email" type="email" name="email" required 
                          value={formData.email} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full pl-12 pr-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${touched.email && errors.email ? 'border-red-500' : 'border-border focus:border-primary'}`} 
                          placeholder="you@example.com"
                        />
                      </div>
                      {touched.email && errors.email && <p className="text-[10px] text-red-500 font-bold ml-4">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Treatment & Location */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground/60">Appointment Details</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-xs font-bold text-foreground/70 ml-2">TREATMENT NEEDED</label>
                      <select 
                        id="service" name="service" required 
                        value={formData.service} onChange={handleChange} onBlur={handleBlur}
                        className={`w-full px-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none ${touched.service && errors.service ? 'border-red-500' : 'border-border focus:border-primary'}`}
                      >
                        <option value="" disabled>Select a service...</option>
                        <option value="Back & Neck Pain">Back & Neck Pain</option>
                        <option value="Musculoskeletal">Musculoskeletal</option>
                        <option value="Stroke Rehabilitation">Stroke Rehabilitation</option>
                        <option value="Sports Injury Recovery">Sports Injury Recovery</option>
                        <option value="Elderly Care">Elderly Care</option>
                      </select>
                      {touched.service && errors.service && <p className="text-[10px] text-red-500 font-bold ml-4">{errors.service}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="area" className="text-xs font-bold text-foreground/70 ml-2">SERVICE AREA</label>
                      <select 
                        id="area" name="area" required 
                        value={formData.area} onChange={handleChange} onBlur={handleBlur}
                        className={`w-full px-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none ${touched.area && errors.area ? 'border-red-500' : 'border-border focus:border-primary'}`}
                      >
                        <option value="" disabled>Select your area...</option>
                        <option value="DHA Lahore">DHA Lahore</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Johar Town">Johar Town</option>
                        <option value="Model Town">Model Town</option>
                        <option value="Wapda Town">Wapda Town</option>
                        <option value="LDA & EME">LDA & EME</option>
                        <option value="Faisal Town">Faisal Town</option>
                        <option value="Iqbal Town">Iqbal Town</option>
                        <option value="Bahria Town">Bahria Town</option>
                      </select>
                      {touched.area && errors.area && <p className="text-[10px] text-red-500 font-bold ml-4">{errors.area}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="address" className="text-xs font-bold text-foreground/70 ml-2">HOME ADDRESS</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-muted-foreground" size={18} />
                        <textarea 
                          id="address" name="address" required 
                          value={formData.address} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full pl-12 pr-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px] resize-none ${touched.address && errors.address ? 'border-red-500' : 'border-border focus:border-primary'}`} 
                          placeholder="Full street address and house number..."
                        ></textarea>
                      </div>
                      {touched.address && errors.address && <p className="text-[10px] text-red-500 font-bold ml-4">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-xs font-bold text-foreground/70 ml-2">PREFERRED DATE</label>
                        <input 
                          id="date" type="date" name="date" required 
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full px-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${touched.date && errors.date ? 'border-red-500' : 'border-border focus:border-primary'}`} 
                        />
                        {touched.date && errors.date && <p className="text-[10px] text-red-500 font-bold ml-4">{errors.date}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="time" className="text-xs font-bold text-foreground/70 ml-2">PREFERRED TIME</label>
                        <input 
                          id="time" type="time" name="time" required 
                          value={formData.time} onChange={handleChange} onBlur={handleBlur}
                          className={`w-full px-6 py-4 rounded-2xl border bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${touched.time && errors.time ? 'border-red-500' : 'border-border focus:border-primary'}`} 
                        />
                        {touched.time && errors.time && <p className="text-[10px] text-red-500 font-bold ml-4">{errors.time}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting' || !isFormValid()}
                  className={`w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-[0.98] ${status === 'submitting' || !isFormValid() ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none' : 'bg-primary hover:bg-[#4A5A41] hover:shadow-primary/20'}`}
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 size={18} className="animate-spin" /> Submitting Request...
                    </span>
                  ) : 'Confirm Appointment Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
