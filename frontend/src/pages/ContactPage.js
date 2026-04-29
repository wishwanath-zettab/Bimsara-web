import React from 'react';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Contact Us</h1>
        <p>Get in touch with our team.</p>
      </div>
    </>
  );
};

export default ContactPage;
