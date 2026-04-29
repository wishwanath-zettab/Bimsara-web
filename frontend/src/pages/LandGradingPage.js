import React from 'react';
import { Helmet } from 'react-helmet-async';

const LandGradingPage = () => {
  return (
    <>
      <Helmet>
        <title>Land Grading Tool | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Land Grading Tool</h1>
        <p>Evaluate your land property with our grading calculator.</p>
      </div>
    </>
  );
};

export default LandGradingPage;
