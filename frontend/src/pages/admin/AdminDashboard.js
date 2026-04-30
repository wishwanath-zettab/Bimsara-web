import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ContactDetailsTab from './tabs/ContactDetailsTab';
import ServiceProvidersTab from './tabs/ServiceProvidersTab';
import OtherSettingsTab from './tabs/OtherSettingsTab';
import TeamMembersTab from './tabs/TeamMembersTab';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Please login first');
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-header-actions">
            <button onClick={() => navigate('/')} className="btn-secondary">
              View Site
            </button>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Details
          </button>
          <button
            className={`tab-btn ${activeTab === 'providers' ? 'active' : ''}`}
            onClick={() => setActiveTab('providers')}
          >
            Service Providers
          </button>
          <button
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team Members
          </button>
          <button
            className={`tab-btn ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => setActiveTab('other')}
          >
            Other Settings
          </button>
        </div>

        <div className="admin-tab-content">
          {activeTab === 'contact' && <ContactDetailsTab getAuthHeaders={getAuthHeaders} />}
          {activeTab === 'providers' && <ServiceProvidersTab getAuthHeaders={getAuthHeaders} />}
          {activeTab === 'team' && <TeamMembersTab getAuthHeaders={getAuthHeaders} />}
          {activeTab === 'other' && <OtherSettingsTab getAuthHeaders={getAuthHeaders} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
