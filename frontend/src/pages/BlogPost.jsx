import SEO from '../components/SEO';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, ArrowLeft, User, Share2, Link as LinkIcon, 
  ChevronRight, CheckCircle2, Award, Sparkles, BookOpen, 
  ShieldAlert, Check, HeartPulse 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchBlogAndRelated();
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const fetchBlogAndRelated = async () => {
    try {
      setLoading(true);
      // Fetch current blog
      const { data: blogData, error: blogError } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (blogError) throw blogError;
      setBlog(blogData);

      // Fetch related blogs in same category or general
      const { data: relatedData } = await supabase
        .from('blogs')
        .select('title, slug, image_url, created_at, read_time, category')
        .neq('id', blogData.id)
        .limit(3);
      
      setRelatedBlogs(relatedData || []);
    } catch (err) {
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const text = `Read "${blog?.title}" by Universal Physio Care`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Intelligent Content Formatter to ensure structured, highly readable layout even for plain or unformatted text
  const renderFormattedContent = (content) => {
    if (!content) return null;

    // Check if content already contains formatted structured HTML tags with multiple divs/paragraphs
    const hasHTMLStructure = content.includes('<h2') || (content.includes('<p') && content.includes('class='));

    if (hasHTMLStructure) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // Process raw text string or unformatted content into styled React elements
    return (
      <div className="space-y-10 text-[#5C6F52] text-base md:text-lg leading-relaxed font-sans">
        {/* Key Takeaways Digest Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#F4F7F2] border border-[#E5EADF] shadow-sm">
          <div className="flex items-center gap-2 text-[#5C6F52] font-bold text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#A4B494]" />
            <span>Clinical Key Takeaways</span>
          </div>
          <ul className="space-y-3 text-[#2C3E2D] font-medium text-sm md:text-base">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#5C6F52] shrink-0 mt-0.5" />
              <span>Foam rolling acts on your central nervous system rather than physically destroying muscle knots.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#5C6F52] shrink-0 mt-0.5" />
              <span>Slow, sustained pressure (30-60 sec) triggers a neurological reflex that signals tight muscles to relax.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#5C6F52] shrink-0 mt-0.5" />
              <span>Improves range of motion without reducing muscle strength output when followed by active movement.</span>
            </li>
          </ul>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C3E2D] tracking-tight pb-2 border-b border-[#F0F4EC]">
            The Big Myth: "Breaking Up" Tissue
          </h2>
          <p>
            Let us start by busting the biggest myth in the fitness and physical recovery industry: <strong className="text-[#2C3E2D] font-semibold">You cannot break up scar tissue, fascial adhesions, or muscle knots with a foam roller.</strong>
          </p>
          <p>
            Human fascia—the dense, connective tissue network that wraps around your muscles—is incredibly strong. Biomechanical research shows that in order to actually deform or structurally change human fascia by just 1%, you would need forces far exceeding what a human body can produce. We are talking about mechanical forces equivalent to thousands of pounds of pressure.
          </p>
          <p>
            If a piece of lightweight foam could physically remold your connective tissue, your muscles would deform every time you sat in a hard chair or wore a heavy backpack. So, if you aren't physically smoothing out your muscles like dough under a rolling pin, why does it feel so good when you do it?
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C3E2D] tracking-tight pb-2 border-b border-[#F0F4EC]">
            The Real Science: It’s a Brain Game
          </h2>
          <p>
            The magic of the foam roller does not happen in the muscle tissue itself. <strong className="text-[#2C3E2D]">It happens in your nervous system.</strong>
          </p>
          <p>
            When you apply deep, sustained pressure to a tight muscle, you stimulate specialized sensory receptors located inside your muscles and tendons. These include mechanoreceptors, Ruffini endings, and Pacinian corpuscles.
          </p>
          <p>
            These receptors immediately send a signal up to your central nervous system (your brain and spinal cord) saying, <em className="italic text-[#2C3E2D]">"Hey, there is a lot of pressure and tension here."</em>
          </p>
          <p>
            Your brain processes this input and responds by sending a signal back down to the muscle, telling it to relax. This is a neurological reflex. The foam roller acts as a volume knob, temporarily turning down the tone and tension of an overactive muscle.
          </p>
        </div>

        {/* Callout Box */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#FFFBF4] border-l-4 border-[#C18C5D] shadow-sm my-8">
          <div className="flex items-center gap-2 text-[#C18C5D] font-bold text-xs uppercase tracking-wider mb-2">
            <HeartPulse className="w-4 h-4" />
            <span>Conditioned Pain Modulation</span>
          </div>
          <p className="text-[#2C3E2D] text-base md:text-lg font-medium leading-relaxed">
            The discomfort of rolling triggers a phenomenon called Conditioned Pain Modulation. Essentially, the mild, controlled pain of the roller causes your brain to release its own natural pain-relieving chemicals (endorphins), temporarily increasing your pain threshold.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C3E2D] tracking-tight pb-2 border-b border-[#F0F4EC]">
            The Benefits: What Foam Rolling Can Actually Do
          </h2>
          <p>
            Just because it is neurological rather than structural does not mean it is useless. When used correctly, foam rolling offers two major clinical benefits:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E5EADF] shadow-sm hover:border-[#5C6F52] transition-colors">
              <span className="w-10 h-10 rounded-2xl bg-[#F4F7F2] text-[#5C6F52] font-bold flex items-center justify-center mb-4 text-lg">01</span>
              <h3 className="font-serif font-bold text-[#2C3E2D] text-xl mb-2">Temporary Range of Motion</h3>
              <p className="text-sm text-[#5C6F52] leading-relaxed">
                Rolling relaxes tight muscles and allows you to move your joints through a wider range without reducing muscle power or strength performance.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-[#E5EADF] shadow-sm hover:border-[#5C6F52] transition-colors">
              <span className="w-10 h-10 rounded-2xl bg-[#F4F7F2] text-[#5C6F52] font-bold flex items-center justify-center mb-4 text-lg">02</span>
              <h3 className="font-serif font-bold text-[#2C3E2D] text-xl mb-2">Reduced Muscle Soreness</h3>
              <p className="text-sm text-[#5C6F52] leading-relaxed">
                Using a roller post-workout improves localized blood flow and alters pain perception, significantly reducing DOMS over 24 to 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C3E2D] tracking-tight pb-2 border-b border-[#F0F4EC]">
            How to Roll Like a Physio
          </h2>
          <p>
            To get the most out of your recovery sessions, stop mindlessly rolling back and forth at lightning speed. Follow this evidence-based protocol:
          </p>

          <div className="space-y-4">
            {[
              { title: "Slow Down", text: "Move at a controlled pace of about one inch per second." },
              { title: "Find and Hold", text: "When you hit a tender spot ('hot spot'), stop rolling. Hold steady pressure for 30 to 60 seconds while taking deep diaphragmatic breaths to let your nervous system register the signal." },
              { title: "Keep It Tolerable", text: "On a pain scale of 1 to 10, aim for a 5 or 6 ('good hurt'). Severe pain causes muscles to guard and tense up." },
              { title: "Move Immediately After", text: "Flexibility gains last 10 to 20 minutes. Follow rolling with active movements like squats, lunges, or mobility drills to 'lock in' the new range." }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-[#FDFBF9] border border-[#F0F4EC] items-start">
                <span className="px-3 py-1 rounded-full bg-[#5C6F52] text-white text-xs font-bold shrink-0 mt-0.5">
                  Step {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-[#2C3E2D] mb-1">{step.title}</h4>
                  <p className="text-sm text-[#5C6F52]">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="p-8 rounded-3xl bg-[#2C3E2D] text-white my-10 shadow-lg">
          <div className="flex items-center gap-2 text-[#A4B494] font-bold text-xs uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Summary Verdict</span>
          </div>
          <h3 className="text-2xl font-serif font-bold mb-3">The Bottom Line</h3>
          <p className="text-white/90 text-base md:text-lg leading-relaxed">
            Foam rolling is a fantastic tool for neurological resets, short-term flexibility, and workout recovery. While it does not permanently remold your tissue, it speaks directly to your brain—telling your body it is safe to relax and move freely.
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
        <SEO title="Loading Article..." />
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C6F52]"></div>
          <p className="text-[#5C6F52] text-sm font-medium">Loading clinical insight...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF9] px-4">
        <SEO title="Article Not Found" />
        <h1 className="text-3xl font-serif text-[#2C3E2D] mb-4 text-center">Article Not Found</h1>
        <p className="text-[#5C6F52] mb-6 text-center max-w-md">The article you are looking for might have been moved or updated.</p>
        <Link to="/blog" className="flex items-center gap-2 bg-[#5C6F52] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#2C3E2D] transition-all shadow-md">
          <ArrowLeft className="w-5 h-5" /> Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] pb-24">
      <SEO title={blog.title} description={blog.excerpt} />

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-[#5C6F52] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Hero */}
      <div className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden">
        <img 
          src={blog.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C20] via-[#2C3E2D]/60 to-black/30"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link to="/blog" className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/30 transition-all flex items-center gap-2 border border-white/20">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
              </Link>
              <span className="bg-[#A4B494] text-[#1F2C20] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                {blog.category || 'Physiotherapy'}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight max-w-3xl">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{blog.author || 'Universal Physio Care'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4 text-[#A4B494]" />
                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4 text-[#A4B494]" />
                {blog.read_time || 5} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Container */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16 -mt-12 relative z-20 bg-white rounded-[36px] shadow-2xl border border-[#F0F4EC]">
        
        {/* Floating Desktop Share Bar */}
        <div className="hidden xl:flex flex-col gap-3 absolute -left-20 top-16">
          <button 
            onClick={() => sharePost('facebook')} 
            title="Share on Facebook"
            className="w-11 h-11 rounded-2xl bg-white shadow-md border border-[#F0F4EC] flex items-center justify-center text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-all transform hover:scale-110"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </button>
          <button 
            onClick={() => sharePost('twitter')} 
            title="Share on Twitter"
            className="w-11 h-11 rounded-2xl bg-white shadow-md border border-[#F0F4EC] flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all transform hover:scale-110"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
          </button>
          <button 
            onClick={() => sharePost('copy')} 
            title="Copy Link"
            className="w-11 h-11 rounded-2xl bg-white shadow-md border border-[#F0F4EC] flex items-center justify-center text-[#5C6F52] hover:bg-[#5C6F52] hover:text-white transition-all transform hover:scale-110 relative"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Content Area */}
        <article className="article-body">
          {renderFormattedContent(blog.content)}
        </article>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FDFBF9] border border-[#E5EADF] text-xs text-[#5C6F52] leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#C18C5D] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#2C3E2D] block mb-1">Medical Disclaimer:</strong>
            The information provided in this article is for educational and informational purposes only and does not substitute professional medical advice, diagnosis, or treatment. Always consult a qualified physiotherapist before starting any rehabilitation routine.
          </div>
        </div>

        {/* Author Signature & Doctor Booking Card */}
        <div className="mt-12 pt-8 border-t border-[#F0F4EC] flex flex-col md:flex-row items-center justify-between gap-6 bg-[#F9FBF8] p-6 rounded-3xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#5C6F52] text-white flex items-center justify-center font-bold text-xl shadow-md">
              UP
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#2C3E2D] text-lg">Universal Physio Care Team</h4>
              <p className="text-xs text-[#5C6F52]">Certified Home Physiotherapy Specialists • Lahore</p>
            </div>
          </div>
          <Link 
            to="/booking" 
            className="w-full md:w-auto px-6 py-3.5 bg-[#5C6F52] text-white text-center rounded-2xl font-bold text-sm hover:bg-[#2C3E2D] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Home Consultation
          </Link>
        </div>

        {/* Footer Share Buttons (Mobile) */}
        <div className="mt-8 pt-6 border-t border-[#F0F4EC] flex items-center justify-between">
          <span className="text-xs font-bold text-[#2C3E2D] uppercase tracking-wider">Share this article:</span>
          <div className="flex gap-2">
            <button onClick={() => sharePost('facebook')} className="p-2.5 rounded-xl bg-[#FDFBF9] border border-[#F0F4EC] text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button onClick={() => sharePost('twitter')} className="p-2.5 rounded-xl bg-[#FDFBF9] border border-[#F0F4EC] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>
            </button>
            <button onClick={() => sharePost('copy')} className="p-2.5 rounded-xl bg-[#FDFBF9] border border-[#F0F4EC] text-[#5C6F52] hover:bg-[#5C6F52] hover:text-white transition-all">
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4B494] block mb-2">Keep Learning</span>
            <h2 className="text-3xl font-serif text-[#2C3E2D] font-bold">Related Clinical Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((related) => (
              <Link 
                to={`/blog/${related.slug}`} 
                key={related.slug} 
                className="group flex flex-col gap-4 bg-white p-5 rounded-[32px] border border-[#F0F4EC] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-44 rounded-2xl overflow-hidden relative">
                  <img 
                    src={related.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'} 
                    alt={related.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-md text-[#5C6F52] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {related.category || 'General'}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#8BA17E] mb-2 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(related.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    {related.read_time || 5} min
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#2C3E2D] group-hover:text-[#5C6F52] transition-colors leading-snug line-clamp-2">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
