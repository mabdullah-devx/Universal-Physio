import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Calendar, Clock, CheckCircle2, Clock3, XCircle, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';

const BookingStatus = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!id || !token) {
      setError('Missing booking reference ID or security token. Please check the tracking link in your email.');
      setLoading(false);
      return;
    }

    fetch(`/api/booking-status?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to retrieve booking status');
        }
        return res.json();
      })
      .then((data) => {
        setBooking(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load appointment status.');
        setLoading(false);
      });
  }, [id, token]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-green-100 text-green-800">
            <CheckCircle2 size={16} /> Confirmed & Scheduled
          </span>
        );
      case 'rejected':
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-red-100 text-red-800">
            <XCircle size={16} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-800">
            <Clock3 size={16} /> Pending Admin Confirmation
          </span>
        );
    }
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 bg-[#FDFCFB] min-h-[75vh] flex items-center justify-center">
      <SEO title="Booking Status" noindex={true} />
      <div className="max-w-xl w-full">
        <div className="organic-card p-8 md:p-10 shadow-sm border border-[#F0F4EC]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5C6F52] uppercase tracking-wider mb-6">
            <ShieldCheck size={16} /> Encrypted Patient Verification
          </div>

          <h1 className="text-3xl font-serif font-bold text-[#2C3E2D] mb-2">Appointment Tracker</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Live status of your home physical therapy session request.
          </p>

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#5C6F52] animate-spin" />
              <p className="text-sm font-medium text-[#5C6F52]">Verifying security token...</p>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm mb-6">
              <p className="font-bold mb-1">Access Restricted</p>
              <p>{error}</p>
            </div>
          )}

          {booking && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#F4F7F2] rounded-2xl border border-[#E5EADF]">
                <span className="text-xs font-bold text-[#5C6F52] uppercase">Current Status</span>
                {getStatusBadge(booking.status)}
              </div>

              <div className="space-y-3 p-6 bg-white rounded-2xl border border-[#F0F4EC] shadow-xs">
                <div className="flex justify-between items-center text-sm py-2 border-b border-[#F0F4EC]">
                  <span className="text-muted-foreground font-medium">Service</span>
                  <span className="font-bold text-[#2C3E2D]">{booking.service}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-[#F0F4EC]">
                  <span className="text-muted-foreground font-medium flex items-center gap-1.5"><Calendar size={14} /> Scheduled Date</span>
                  <span className="font-bold text-[#2C3E2D]">{booking.booking_date}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2">
                  <span className="text-muted-foreground font-medium flex items-center gap-1.5"><Clock size={14} /> Scheduled Time</span>
                  <span className="font-bold text-[#2C3E2D]">{booking.booking_time}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Need to reschedule? Contact us directly at <strong className="text-[#2C3E2D]">+92 3064954970</strong> or reply to your confirmation email.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#F0F4EC] text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#5C6F52] hover:text-[#2C3E2D] transition-colors">
              <ArrowLeft size={14} /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;
