import React from 'react';
import { Helmet } from 'react-helmet-async';

const SellersPage = () => {
  return (
    <>
      <Helmet>
        <title>Sell Your Property | Bimsara Real Estate</title>
        <meta name="description" content="Sell your property with Bimsara Real Estate. Expert guidance and maximum value." />
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Sell Your Property</h1>
        <p>Get expert guidance and achieve the best value for your property.</p>
      </div>
    </>
  );
};

export default SellersPage;
