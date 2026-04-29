import React from 'react';
import { Helmet } from 'react-helmet-async';

const BuyersPage = () => {
  return (
    <>
      <Helmet>
        <title>Buy Property | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Buy Property</h1>
        <p>Find your dream property with our expert assistance.</p>
      </div>
    </>
  );
};

export default BuyersPage;
