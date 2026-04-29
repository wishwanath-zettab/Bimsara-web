import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Bimsara Real Estate - Property Sales & Rentals in Sri Lanka</title>
        <meta name="description" content="Professional real estate services in Sri Lanka. Buy, sell, rent properties with Bimsara Real Estate." />
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Welcome to Bimsara Real Estate</h1>
        <p>Your trusted partner in property sales, rentals, and management.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>For Sellers</h3>
            <p>Get the best value for your property with our expert guidance.</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>For Buyers</h3>
            <p>Find your dream property from our extensive listings.</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>For Landlords</h3>
            <p>Professional property management and tenant finding services.</p>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>For Tenants</h3>
            <p>Discover quality rental properties that suit your needs.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
