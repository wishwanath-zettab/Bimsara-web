import React from 'react';
import { Helmet } from 'react-helmet-async';

const TenantsPage = () => {
  return (
    <>
      <Helmet>
        <title>Find Rental Properties | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Find Rental Properties</h1>
        <p>Discover quality rental properties that suit your needs.</p>
      </div>
    </>
  );
};

export default TenantsPage;
