import React from 'react';
import { Helmet } from 'react-helmet-async';

const TestimonialsPage = () => {
  return (
    <>
      <Helmet>
        <title>Client Testimonials | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Client Testimonials</h1>
        <p>See what our clients say about us.</p>
      </div>
    </>
  );
};

export default TestimonialsPage;
