import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Critical routes
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';

// Lazy-loaded routes for performance
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const AreasWeCover = lazy(() => import('./pages/AreasWeCover'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BookingStatus = lazy(() => import('./pages/BookingStatus'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Service Detail Routes
const BackAndNeckPain = lazy(() => import('./pages/services/BackAndNeckPain'));
const StrokeRehabilitation = lazy(() => import('./pages/services/StrokeRehabilitation'));
const SportsInjury = lazy(() => import('./pages/services/SportsInjury'));
const PostSurgeryRehab = lazy(() => import('./pages/services/PostSurgeryRehab'));
const ElderlyCare = lazy(() => import('./pages/services/ElderlyCare'));

// Location Detail Routes
const DHALahore = lazy(() => import('./pages/areas/DHALahore'));
const GulbergLahore = lazy(() => import('./pages/areas/GulbergLahore'));
const JoharTownLahore = lazy(() => import('./pages/areas/JoharTownLahore'));
const ModelTownLahore = lazy(() => import('./pages/areas/ModelTownLahore'));
const BahriaTownLahore = lazy(() => import('./pages/areas/BahriaTownLahore'));
const ValenciaLahore = lazy(() => import('./pages/areas/ValenciaLahore'));
const WapdaTownLahore = lazy(() => import('./pages/areas/WapdaTownLahore'));
const FaisalTownLahore = lazy(() => import('./pages/areas/FaisalTownLahore'));
const IqbalTownLahore = lazy(() => import('./pages/areas/IqbalTownLahore'));

// Fallback loader component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/back-and-neck-pain-physiotherapy" element={<BackAndNeckPain />} />
              <Route path="/services/stroke-rehabilitation-physiotherapy" element={<StrokeRehabilitation />} />
              <Route path="/services/sports-injury-physiotherapy" element={<SportsInjury />} />
              <Route path="/services/post-surgery-rehabilitation-physiotherapy" element={<PostSurgeryRehab />} />
              <Route path="/services/elderly-care-physiotherapy" element={<ElderlyCare />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking-status" element={<BookingStatus />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/areas-we-cover" element={<AreasWeCover />} />
              <Route path="/areas-we-cover/dha-lahore" element={<DHALahore />} />
              <Route path="/areas-we-cover/gulberg-lahore" element={<GulbergLahore />} />
              <Route path="/areas-we-cover/johar-town-lahore" element={<JoharTownLahore />} />
              <Route path="/areas-we-cover/model-town-lahore" element={<ModelTownLahore />} />
              <Route path="/areas-we-cover/bahria-town-lahore" element={<BahriaTownLahore />} />
              <Route path="/areas-we-cover/valencia-lahore" element={<ValenciaLahore />} />
              <Route path="/areas-we-cover/wapda-town-lahore" element={<WapdaTownLahore />} />
              <Route path="/areas-we-cover/faisal-town-lahore" element={<FaisalTownLahore />} />
              <Route path="/areas-we-cover/iqbal-town-lahore" element={<IqbalTownLahore />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
      </Router>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;
