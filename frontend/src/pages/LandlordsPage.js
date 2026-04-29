import React from 'react';
import { Helmet } from 'react-helmet-async';

const LandlordsPage = () => {
  return (
    <>
      <Helmet>
        <title>Landlord Services | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Landlord Services</h1>
        <p>Professional property management and tenant finding.</p>
      </div>
    </>
  );
};

export default LandlordsPage;
