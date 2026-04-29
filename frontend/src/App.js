import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import SellersPage from './pages/SellersPage';
import BuyersPage from './pages/BuyersPage';
import LandlordsPage from './pages/LandlordsPage';
import TenantsPage from './pages/TenantsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import DownloadsPage from './pages/DownloadsPage';
import LandGradingPage from './pages/LandGradingPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sellers" element={<SellersPage />} />
              <Route path="/buyers" element={<BuyersPage />} />
              <Route path="/landlords" element={<LandlordsPage />} />
              <Route path="/tenants" element={<TenantsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/tools/land-grading" element={<LandGradingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
