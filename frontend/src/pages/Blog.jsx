import SEO from '../components/SEO';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag, User, Sparkles, BookOpen, Filter } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'General', 'Sports Rehab', 'Neurological', 'Senior Care', 'Post-Op'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.category && blog.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const gridBlogs = filteredBlogs;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FDFBF9]">
      <SEO title="Health & Wellness Blog" description="Expert physiotherapy articles, recovery guides, and wellness tips from certified specialists in Lahore." />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5C6F52]/10 text-xs font-bold uppercase tracking-wider text-[#5C6F52] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Knowledge & Recovery</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2C3E2D] mb-4 leading-tight">
            Health & Recovery <span className="italic font-light text-[#5C6F52]">Insights</span>
          </h1>
          <p className="text-[#5C6F52] text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Evidence-based guides, post-injury advice, and therapeutic mobility tips crafted by Lahore's leading Doctor of Physical Therapy specialists.
          </p>
          
          {/* Search Bar & Category Filters */}
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4B494] w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles e.g. foam rolling, knee pain, posture..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E5EADF] rounded-2xl focus:ring-2 focus:ring-[#5C6F52] focus:border-transparent outline-none transition-all shadow-sm text-sm text-[#2C3E2D] placeholder:text-[#8BA17E]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#5C6F52] text-white shadow-md'
                      : 'bg-white text-[#5C6F52] border border-[#E5EADF] hover:bg-[#F4F7F2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C6F52]"></div>
            <p className="text-[#5C6F52] text-sm">Fetching articles...</p>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Hero Banner (if showing All and no search filter active) */}
            {featuredBlog && selectedCategory === 'All' && !searchTerm && (
              <Link 
                to={`/blog/${featuredBlog.slug}`}
                className="group relative block bg-white rounded-[36px] overflow-hidden border border-[#F0F4EC] shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
                  <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                    <img 
                      src={featuredBlog.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'} 
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-[#5C6F52] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C18C5D]" /> Featured Article
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-[#8BA17E] mb-4">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#5C6F52]" />
                          {new Date(featuredBlog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#5C6F52]" />
                          {featuredBlog.read_time || 5} min read
                        </span>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#2C3E2D] mb-4 group-hover:text-[#5C6F52] transition-colors leading-tight">
                        {featuredBlog.title}
                      </h2>
                      
                      <p className="text-[#5C6F52] text-sm lg:text-base leading-relaxed mb-6 line-clamp-3">
                        {featuredBlog.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#F0F4EC] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F4F7F2] border border-[#E5EADF] flex items-center justify-center text-xs font-bold text-[#5C6F52]">
                          UP
                        </div>
                        <span className="text-xs font-medium text-[#2C3E2D]">{featuredBlog.author || 'Universal Physio Care'}</span>
                      </div>
                      <span className="text-[#5C6F52] font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read Full Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridBlogs.map((blog) => (
                <Link 
                  to={`/blog/${blog.slug}`} 
                  key={blog.id}
                  className="group bg-white rounded-[32px] overflow-hidden border border-[#F0F4EC] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden bg-[#F4F7F2]">
                    <img 
                      src={blog.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-md text-[#5C6F52] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {blog.category || 'Physiotherapy'}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-[#8BA17E] mb-3">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.read_time || 5} min read
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-serif font-bold text-[#2C3E2D] mb-3 group-hover:text-[#5C6F52] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    
                    <p className="text-[#5C6F52] text-xs md:text-sm mb-6 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-[#F0F4EC] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#E5EADF] flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-[#5C6F52]" />
                        </div>
                        <span className="text-xs font-medium text-[#5C6F52]">{blog.author || 'Universal Physio Care'}</span>
                      </div>
                      <span className="text-[#5C6F52] flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#A4B494] px-4 max-w-md mx-auto">
            <p className="text-[#5C6F52] text-lg font-serif mb-2 font-bold">No matching articles found</p>
            <p className="text-[#8BA17E] text-sm mb-6">Try searching for other topics or clearing your category filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="px-6 py-2.5 bg-[#5C6F52] text-white text-xs font-bold rounded-xl hover:bg-[#2C3E2D] transition-all"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter / Consultation CTA Section */}
      <div className="max-w-5xl mx-auto px-4 mt-24">
        <div className="bg-[#2C3E2D] rounded-[40px] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A4B494] block mb-3">Stay Informed & Healthy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Subscribe for Recovery Insights</h2>
            <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">
              Get monthly exercise guides, posture correction tips, and expert injury prevention advice delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-grow px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 outline-none focus:bg-white/20 transition-all text-white placeholder:text-white/50 text-sm"
              />
              <button className="px-7 py-3.5 bg-[#5C6F52] text-white font-bold text-sm rounded-2xl hover:bg-[#A4B494] hover:text-[#2C3E2D] transition-all shadow-md">
                Subscribe
              </button>
            </div>
          </div>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#5C6F52]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#A4B494]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
