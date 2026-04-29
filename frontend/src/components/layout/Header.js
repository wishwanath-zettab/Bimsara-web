import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
      <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/">Home</Link>
        <Link to="/sellers">Sellers</Link>
        <Link to="/buyers">Buyers</Link>
        <Link to="/landlords">Landlords</Link>
        <Link to="/tenants">Tenants</Link>
        <Link to="/about">About</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Link to="/downloads">Downloads</Link>
        <Link to="/tools/land-grading">Land Grading</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
