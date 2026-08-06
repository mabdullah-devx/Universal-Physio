import SEO from '../components/SEO';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, RefreshCw, CheckCircle, XCircle, MessageCircle, ExternalLink, 
  Loader2, Phone, Trash2, Mail, MapPin, FileText, Plus, Edit, Eye, 
  CalendarCheck, Bold, Italic, Heading2, Heading3, List, Quote, Link2, 
  Image, Code, Printer, Filter 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Admin = () => {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'messages', or 'blogs'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');

  // Print & Invoice Filtering State
  const [printFilterPeriod, setPrintFilterPeriod] = useState('all'); // 'all', 'today', 'week', 'month'
  const [printFilterStatus, setPrintFilterStatus] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [singleInvoiceBooking, setSingleInvoiceBooking] = useState(null);

  // Blog Editor State
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'General', image_url: '', read_time: 5 });

  const decodeHtml = (html) => {
    if (!html) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = String(html);
    return txt.value;
  };

  const formatDate = (val) => {
    if (!val) return 'N/A';
    const strVal = String(val).trim();
    const parts = strVal.split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
      }
    }
    const d = new Date(strVal);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return strVal;
  };

  const getBookingDate = (b) => {
    if (!b) return 'N/A';
    const rawDate = b.booking_date || b.date || b.created_at;
    return formatDate(rawDate);
  };

  const getBookingTime = (b) => {
    if (!b) return 'TBD';
    if (b.booking_time) {
      const match = String(b.booking_time).match(/^(\d{1,2}):(\d{2})/);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
      }
      return String(b.booking_time);
    }
    if (b.date || b.created_at) {
      const d = new Date(b.date || b.created_at);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    return 'TBD';
  };

  const getFilteredBookings = () => {
    const now = new Date();
    return bookings.filter(b => {
      // Filter status
      if (printFilterStatus !== 'all' && b.status?.toLowerCase() !== printFilterStatus.toLowerCase()) {
        return false;
      }
      // Filter period
      const bDateStr = b.booking_date || b.date || b.created_at;
      if (!bDateStr) return true;
      const bDate = new Date(bDateStr);
      if (isNaN(bDate.getTime())) return true;

      if (printFilterPeriod === 'today') {
        return bDate.toDateString() === now.toDateString();
      } else if (printFilterPeriod === 'week') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return bDate >= sevenDaysAgo;
      } else if (printFilterPeriod === 'month') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return bDate >= thirtyDaysAgo;
      }
      return true;
    });
  };

  const handlePrintInvoices = (singleBooking = null) => {
    setSingleInvoiceBooking(singleBooking);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const insertHtml = (prefix, suffix = '') => {
    const textarea = document.getElementById('blog-content-editor');
    if (!textarea) {
      setCurrentBlog(prev => ({ ...prev, content: (prev.content || '') + prefix + suffix }));
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || 'Sample text';
    const replacement = prefix + selected + suffix;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setCurrentBlog(prev => ({ ...prev, content: newText }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchAllData(session);
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAllData(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAllData = (activeSession) => {
    fetchBookings(activeSession);
    fetchMessages();
    fetchBlogs();
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (err) { console.error('Error fetching messages:', err); }
  };

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setBlogs(data || []);
    } catch (err) { console.error('Error fetching blogs:', err); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    window.location.reload(); 
  };

  const fetchBookings = async (activeSession = session) => {
    const token = activeSession?.access_token || session?.access_token;
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete booking');
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking.');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (!error) setMessages(messages.filter(m => m.id !== id));
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update status');
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  // Blog Management Functions
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (currentBlog.id) {
        res = await supabase.from('blogs').update(currentBlog).eq('id', currentBlog.id);
      } else {
        res = await supabase.from('blogs').insert([currentBlog]);
      }
      if (res.error) throw res.error;
      alert('Blog saved successfully!');
      setIsEditingBlog(false);
      fetchBlogs();
    } catch (err) {
      alert('Error saving blog: ' + err.message);
    } finally { setLoading(false); }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (!error) setBlogs(blogs.filter(b => b.id !== id));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
        <SEO title="Admin" noindex={true} />
        <Loader2 className="w-10 h-10 animate-spin text-[#5C6F52]" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9] px-4">
        <SEO title="Admin Login" noindex={true} />
        <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-xl border border-[#F0F4EC]">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#F0F4EC] rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-[#5C6F52]" />
            </div>
          </div>
          <h1 className="text-2xl font-serif text-center text-[#2C3E2D] mb-8">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#5C6F52] mb-1">Email</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#5C6F52] mb-1">Password</label>
              <input type="password" required className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-4 bg-[#5C6F52] text-white rounded-xl font-bold hover:bg-[#2C3E2D] transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-28 pb-12 px-4">
      <SEO title="Admin Dashboard" noindex={true} />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-[#2C3E2D]">Welcome Back, Admin</h1>
            <p className="text-[#5C6F52]">Manage your practice, print invoices, and publish health insights.</p>
          </div>
          <button onClick={handleLogout} className="px-6 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all font-semibold">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#F0F4EC] p-1.5 rounded-2xl w-fit">
          {[
            { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
            { id: 'messages', label: 'Messages', icon: MessageCircle },
            { id: 'blogs', label: 'Health Blog', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsEditingBlog(false); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-white text-[#5C6F52] shadow-sm' : 'text-[#8BA17E] hover:text-[#5C6F52]'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[32px] border border-[#F0F4EC] shadow-sm overflow-hidden">
          {activeTab === 'bookings' && (
            <div>
              {/* Print & Filter Toolbar */}
              <div className="p-6 border-b border-[#F0F4EC] bg-[#FDFBF9] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#5C6F52]">
                    <Filter className="w-4 h-4" /> Period:
                  </div>
                  <select
                    value={printFilterPeriod}
                    onChange={(e) => setPrintFilterPeriod(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-[#E5EADF] text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-[#5C6F52]"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today Only</option>
                    <option value="week">This Week (Last 7 Days)</option>
                    <option value="month">This Month (Last 30 Days)</option>
                  </select>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#5C6F52] ml-2">
                    Status:
                  </div>
                  <select
                    value={printFilterStatus}
                    onChange={(e) => setPrintFilterStatus(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-[#E5EADF] text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-[#5C6F52]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePrintInvoices(null)}
                    className="px-5 py-2.5 bg-[#5C6F52] text-white rounded-xl text-xs font-bold hover:bg-[#2C3E2D] transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Printer className="w-4 h-4" /> Print Filtered Invoices / Report ({filteredBookings.length})
                  </button>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FDFBF9] border-b border-[#F0F4EC]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#8BA17E] uppercase">Patient</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#8BA17E] uppercase">Service/Area</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#8BA17E] uppercase">Date & Time</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#8BA17E] uppercase">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-[#8BA17E] uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F4EC]">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FDFBF9] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#2C3E2D]">{decodeHtml(b.name)}</div>
                          <div className="text-sm text-[#8BA17E] flex items-center gap-1">
                            <Phone className="w-3 h-3" /> 
                            {b.phone}
                            <button 
                              onClick={() => window.open(`https://wa.me/${b.phone.replace(/\D/g, '')}`, '_blank')}
                              className="ml-1 text-green-500 hover:text-green-600"
                              title="Open WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-sm text-[#8BA17E] flex items-center gap-1"><Mail className="w-3 h-3" /> {b.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-[#5C6F52] font-semibold">{decodeHtml(b.service)}</div>
                          <div className="text-xs text-[#8BA17E] flex items-center gap-1"><MapPin className="w-3 h-3" /> {decodeHtml(b.area)}</div>
                          <div className="text-[11px] text-[#8BA17E] mt-1 leading-tight max-w-[200px] italic">{decodeHtml(b.address)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-[#2C3E2D] font-medium">{getBookingDate(b)}</div>
                          <div className="text-sm text-[#8BA17E]">{getBookingTime(b)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={b.status} 
                            onChange={(e) => updateStatus(b.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1 rounded-full outline-none border transition-all ${
                              b.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                              b.status === 'approved' ? 'bg-green-50 text-green-600 border-green-100' :
                              'bg-red-50 text-red-600 border-red-100'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handlePrintInvoices(b)}
                            title="Print Patient Invoice Slip"
                            className="p-2 text-[#5C6F52] hover:text-[#2C3E2D] hover:bg-[#F0F4EC] rounded-lg transition-all"
                          >
                            <Printer className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              const cleanName = decodeHtml(b.name);
                              const cleanService = decodeHtml(b.service);
                              const cleanAddress = decodeHtml(b.address);
                              const cleanArea = decodeHtml(b.area);
                              const bookingDate = getBookingDate(b);
                              const bookingTime = getBookingTime(b);

                              const message = `Hello ${cleanName}! 👋\n\nYour home physical therapy appointment with Universal Physio Care has been confirmed! 🩺✨\n\n📋 Appointment Details:\n• Service: ${cleanService}\n• Date: ${bookingDate}\n• Time: ${bookingTime}\n• Location: ${cleanAddress}, ${cleanArea}\n\n👨‍⚕️ Our certified Doctor of Physical Therapy (DPT) will bring all required sanitized diagnostic equipment and treatment supplies to your residence.\n\n💡 Please wear comfortable clothing suitable for physical assessment.\n\nIf you need to modify your booking, please let us know at least 2 hours in advance. We look forward to assisting your recovery!\n\nWarm regards,\nUniversal Physio Care Team\n📞 +92 3064954970 | 🌐 universalphysio.fit`;

                              window.open(`https://wa.me/${b.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            title="Confirm via WhatsApp"
                            className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all"
                          >
                            <MessageCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => deleteBooking(b.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="p-8 grid gap-6">
              {messages.map((m) => (
                <div key={m.id} className="bg-[#FDFBF9] p-6 rounded-2xl border border-[#F0F4EC] relative group">
                  <button onClick={() => deleteMessage(m.id)} className="absolute top-4 right-4 p-2 text-[#8BA17E] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#5C6F52] font-bold shadow-sm">{m.name[0]}</div>
                    <div>
                      <h3 className="font-bold text-[#2C3E2D]">{m.name}</h3>
                      <p className="text-sm text-[#8BA17E]">{m.email}</p>
                    </div>
                  </div>
                  <p className="text-[#5C6F52] leading-relaxed italic">"{m.message}"</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="p-8">
              {!isEditingBlog ? (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-serif text-[#2C3E2D]">Blog Articles</h2>
                    <button onClick={() => { setIsEditingBlog(true); setCurrentBlog({ title: '', slug: '', excerpt: '', content: '', category: 'General', image_url: '', author: 'Universal Physio Care', read_time: 5 }); }} className="flex items-center gap-2 bg-[#5C6F52] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2C3E2D] transition-all">
                      <Plus className="w-5 h-5" /> New Article
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {blogs.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 bg-[#FDFBF9] rounded-2xl border border-[#F0F4EC] hover:border-[#5C6F52] transition-all">
                        <div className="flex items-center gap-4">
                          <img src={post.image_url} alt="" className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <h3 className="font-bold text-[#2C3E2D]">{post.title}</h3>
                            <div className="flex gap-4 text-xs text-[#8BA17E] mt-1">
                              <span>{post.category}</span>
                              <span>{formatDate(post.created_at)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/blog/${post.slug}`} target="_blank" className="p-2 text-[#8BA17E] hover:text-[#5C6F52] transition-colors"><Eye className="w-5 h-5" /></Link>
                          <button onClick={() => { setIsEditingBlog(true); setCurrentBlog(post); }} className="p-2 text-[#8BA17E] hover:text-[#5C6F52] transition-colors"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => deleteBlog(post.id)} className="p-2 text-[#8BA17E] hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveBlog} className="space-y-6 max-w-4xl">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-serif text-[#2C3E2D]">{currentBlog.id ? 'Edit Article' : 'New Article'}</h2>
                    <button type="button" onClick={() => setIsEditingBlog(false)} className="text-[#8BA17E] hover:text-[#5C6F52] font-bold">Cancel</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#5C6F52] mb-1">Title</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={currentBlog.title} onChange={(e) => setCurrentBlog({...currentBlog, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#5C6F52] mb-1">Slug (URL)</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={currentBlog.slug} onChange={(e) => setCurrentBlog({...currentBlog, slug: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#5C6F52] mb-1">Category</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={currentBlog.category} onChange={(e) => setCurrentBlog({...currentBlog, category: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#5C6F52] mb-1">Read Time (min)</label>
                      <input type="number" className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={currentBlog.read_time} onChange={(e) => setCurrentBlog({...currentBlog, read_time: parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#5C6F52] mb-1">Image URL</label>
                      <input type="text" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={currentBlog.image_url} onChange={(e) => setCurrentBlog({...currentBlog, image_url: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#5C6F52] mb-1">Excerpt (Short Summary)</label>
                    <textarea rows="2" required className="w-full px-4 py-3 rounded-xl border border-[#E5EADF] outline-none focus:ring-2 focus:ring-[#5C6F52]" value={currentBlog.excerpt} onChange={(e) => setCurrentBlog({...currentBlog, excerpt: e.target.value})} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <label className="block text-sm font-bold text-[#5C6F52]">Article Content</label>
                      <div className="flex items-center gap-1 bg-[#F0F4EC] p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setShowPreview(false)}
                          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${!showPreview ? 'bg-white text-[#5C6F52] shadow-sm' : 'text-[#8BA17E]'}`}
                        >
                          <Code className="w-3.5 h-3.5" /> HTML Editor
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowPreview(true)}
                          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${showPreview ? 'bg-white text-[#5C6F52] shadow-sm' : 'text-[#8BA17E]'}`}
                        >
                          <Eye className="w-3.5 h-3.5" /> Live Preview
                        </button>
                      </div>
                    </div>

                    {!showPreview ? (
                      <div className="border border-[#E5EADF] rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5C6F52]">
                        {/* Formatting Toolbar */}
                        <div className="flex flex-wrap items-center gap-1 p-2 bg-[#FDFBF9] border-b border-[#E5EADF] text-[#5C6F52]">
                          <button type="button" onClick={() => insertHtml('<strong>', '</strong>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Bold">
                            <Bold className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => insertHtml('<em>', '</em>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Italic">
                            <Italic className="w-4 h-4" />
                          </button>
                          <div className="w-[1px] h-5 bg-[#E5EADF] mx-1"></div>
                          <button type="button" onClick={() => insertHtml('<h2>', '</h2>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Heading 2">
                            <Heading2 className="w-4 h-4" /> H2
                          </button>
                          <button type="button" onClick={() => insertHtml('<h3>', '</h3>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Heading 3">
                            <Heading3 className="w-4 h-4" /> H3
                          </button>
                          <button type="button" onClick={() => insertHtml('<p>', '</p>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold" title="Paragraph">
                            P
                          </button>
                          <div className="w-[1px] h-5 bg-[#E5EADF] mx-1"></div>
                          <button type="button" onClick={() => insertHtml('<ul>\n  <li>', '</li>\n  <li>Second point</li>\n</ul>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Bullet List">
                            <List className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => insertHtml('<blockquote className="border-l-4 border-[#5C6F52] pl-4 italic my-4 text-[#5C6F52]">', '</blockquote>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Quote">
                            <Quote className="w-4 h-4" />
                          </button>
                          <div className="w-[1px] h-5 bg-[#E5EADF] mx-1"></div>
                          <button type="button" onClick={() => insertHtml('<a href="https://example.com" className="text-[#5C6F52] font-bold underline">', '</a>')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Link">
                            <Link2 className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => insertHtml('<img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" alt="Article image" className="w-full rounded-2xl my-6" />', '')} className="p-2 hover:bg-[#F0F4EC] rounded-lg transition-all text-xs font-bold flex items-center gap-1" title="Image">
                            <Image className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          id="blog-content-editor"
                          rows="12"
                          required
                          className="w-full p-4 outline-none font-mono text-sm bg-white"
                          value={currentBlog.content}
                          onChange={(e) => setCurrentBlog({...currentBlog, content: e.target.value})}
                          placeholder="Write your article content or click formatting toolbar buttons above..."
                        />
                      </div>
                    ) : (
                      <div className="border border-[#E5EADF] rounded-2xl p-6 bg-white min-h-[300px] prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2C3E2D] prose-p:text-[#5C6F52] prose-img:rounded-2xl">
                        {currentBlog.content ? (
                          <div dangerouslySetInnerHTML={{ __html: currentBlog.content }} />
                        ) : (
                          <p className="text-[#8BA17E] italic text-center py-12">Nothing to preview yet. Switch to HTML Editor and add some content.</p>
                        )}
                      </div>
                    )}
                  </div>
                  <button type="submit" disabled={loading} className="px-12 py-4 bg-[#5C6F52] text-white rounded-xl font-bold hover:bg-[#2C3E2D] transition-all flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Article'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hidden Printable Invoice & Schedule Report Container (Triggered by window.print()) */}
      <div id="printable-invoice-container" className="hidden print:block font-sans text-black p-8">
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-invoice-container, #printable-invoice-container * {
              visibility: visible;
            }
            #printable-invoice-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              display: block !important;
              background: white !important;
              color: black !important;
            }
          }
        `}</style>

        {singleInvoiceBooking ? (
          /* Single Patient Invoice & Appointment Slip */
          <div className="max-w-3xl mx-auto border-2 border-black p-8 rounded-xl space-y-6">
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-wider">Universal Physio Care</h1>
                <p className="text-sm font-semibold">Doctor of Physical Therapy Home Care • Lahore</p>
                <p className="text-xs">UAN / Contact: +92 3064954970 | Email: universalphysio.com@gmail.com</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold uppercase border-2 border-black px-3 py-1 inline-block mb-1">
                  PATIENT SLIP / INVOICE
                </div>
                <p className="text-xs"><strong>Ref #:</strong> UPC-{singleInvoiceBooking.id?.slice(0, 8).toUpperCase()}</p>
                <p className="text-xs"><strong>Issue Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 border border-gray-300 rounded-lg text-sm">
              <div>
                <h3 className="font-bold uppercase text-xs text-gray-700 mb-1">Patient Details</h3>
                <p><strong>Name:</strong> {decodeHtml(singleInvoiceBooking.name)}</p>
                <p><strong>Phone:</strong> {singleInvoiceBooking.phone}</p>
                <p><strong>Email:</strong> {singleInvoiceBooking.email || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-bold uppercase text-xs text-gray-700 mb-1">Home Visit Location</h3>
                <p><strong>Area:</strong> {decodeHtml(singleInvoiceBooking.area)}</p>
                <p><strong>Address:</strong> {decodeHtml(singleInvoiceBooking.address)}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold uppercase text-xs tracking-wider mb-2">Appointment Details</h3>
              <table className="w-full border-collapse border border-black text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-black">
                    <th className="border border-black p-2 text-left">Treatment / Service</th>
                    <th className="border border-black p-2 text-center">Scheduled Date</th>
                    <th className="border border-black p-2 text-center">Scheduled Time</th>
                    <th className="border border-black p-2 text-center">Booking Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 font-bold">{decodeHtml(singleInvoiceBooking.service)}</td>
                    <td className="border border-black p-2 text-center">{getBookingDate(singleInvoiceBooking)}</td>
                    <td className="border border-black p-2 text-center">{getBookingTime(singleInvoiceBooking)}</td>
                    <td className="border border-black p-2 text-center font-bold uppercase">{singleInvoiceBooking.status || 'Pending'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-dashed border-black pt-4 text-xs text-gray-600 space-y-1">
              <p>• Emergency Contact: +92 3064954970 | Certified Home Physiotherapist visit.</p>
              <p>• All medical equipment and sanitized diagnostic gear brought to residence.</p>
            </div>

            <div className="pt-12 flex justify-between items-center text-xs">
              <div className="border-t border-black w-48 text-center pt-1 font-bold">
                Doctor / Clinic Signature
              </div>
              <div className="border-t border-black w-48 text-center pt-1 font-bold">
                Patient / Representative Signature
              </div>
            </div>
          </div>
        ) : (
          /* Multi-Booking Weekly / Monthly Schedule Invoice Summary Report */
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-wider">Universal Physio Care</h1>
                <p className="text-sm font-semibold">Home Visit Bookings & Schedule Invoice Summary</p>
                <p className="text-xs">Period Filter: <span className="font-bold uppercase">{printFilterPeriod}</span> | Status Filter: <span className="font-bold uppercase">{printFilterStatus}</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs"><strong>Generated Date:</strong> {new Date().toLocaleDateString()}</p>
                <p className="text-xs"><strong>Total Records:</strong> {filteredBookings.length}</p>
              </div>
            </div>

            <table className="w-full border-collapse border border-black text-xs">
              <thead>
                <tr className="bg-gray-200 border-b border-black font-bold">
                  <th className="border border-black p-2 text-left">#</th>
                  <th className="border border-black p-2 text-left">Patient Name</th>
                  <th className="border border-black p-2 text-left">Contact / Phone</th>
                  <th className="border border-black p-2 text-left">Service</th>
                  <th className="border border-black p-2 text-left">Area & Address</th>
                  <th className="border border-black p-2 text-center">Date & Time</th>
                  <th className="border border-black p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, i) => (
                  <tr key={b.id || i} className="border-b border-gray-300">
                    <td className="border border-black p-2">{i + 1}</td>
                    <td className="border border-black p-2 font-bold">{decodeHtml(b.name)}</td>
                    <td className="border border-black p-2">{b.phone}</td>
                    <td className="border border-black p-2">{decodeHtml(b.service)}</td>
                    <td className="border border-black p-2">{decodeHtml(b.area)} - {decodeHtml(b.address)}</td>
                    <td className="border border-black p-2 text-center">{getBookingDate(b)} {getBookingTime(b)}</td>
                    <td className="border border-black p-2 text-center font-bold uppercase">{b.status || 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-8 flex justify-between items-center text-xs">
              <div>
                Report compiled by Universal Physio Care Admin Portal.
              </div>
              <div className="border-t border-black w-48 text-center pt-1 font-bold">
                Authorized Signature
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
