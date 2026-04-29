import React from 'react';
import { Helmet } from 'react-helmet-async';

const DownloadsPage = () => {
  return (
    <>
      <Helmet>
        <title>Downloads & Resources | Bimsara Real Estate</title>
      </Helmet>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Downloads & Resources</h1>
        <p>Access helpful documents and resources.</p>
      </div>
    </>
  );
};

export default DownloadsPage;
