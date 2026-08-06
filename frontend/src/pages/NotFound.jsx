import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center pt-24 px-6 text-center">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />
      <h1 className="text-6xl font-serif font-bold text-[#5C6F52] mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
