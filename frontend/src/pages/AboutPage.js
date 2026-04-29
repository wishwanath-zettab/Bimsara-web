import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>About Bimsara Real Estate</h1>
        <p>Your trusted partner in real estate since 2010.</p>
      </div>
    </>
  );
};

export default AboutPage;
