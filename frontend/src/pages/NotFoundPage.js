import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
        <h2>Page Not Found</h2>
        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Go Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
