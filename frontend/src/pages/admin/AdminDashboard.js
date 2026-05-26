import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ContactDetailsTab from './tabs/ContactDetailsTab';
import ServiceProvidersTab from './tabs/ServiceProvidersTab';
import OtherSettingsTab from './tabs/OtherSettingsTab';
import TeamMembersTab from './tabs/TeamMembersTab';

const TABS = [
  { key: 'contact', label: 'Contact Details' },
  { key: 'providers', label: 'Service Providers' },
  { key: 'team', label: 'Team Members' },
  { key: 'other', label: 'Other Settings' },
];

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
    <div className="min-h-screen bg-[linear-gradient(135deg,#f5f7fa_0%,#c3cfe2_100%)]">
      <div className="bg-[linear-gradient(135deg,#1e3c72_0%,#2a5298_100%)] py-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center max-md:flex-col max-md:gap-[15px] max-md:text-center">
          <h1 className="text-white text-[22px] font-semibold tracking-[0.5px] m-0">Admin Dashboard</h1>
          <div className="flex gap-[10px]">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white text-[#1e3c72] border-none text-[13px] cursor-pointer rounded-[5px] font-medium transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#f0f0f0] hover:-translate-y-px hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#e74c3c] text-white border-none text-[13px] cursor-pointer rounded-[5px] font-medium transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#c0392b] hover:-translate-y-px hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-[25px] px-5">
        <div className="flex bg-white rounded-t-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden max-md:flex-col">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={[
                'py-[14px] px-6 bg-white border-none border-b-[3px] text-sm cursor-pointer transition-all',
                'max-md:border-b-0 max-md:border-l-[3px] max-md:text-left',
                activeTab === tab.key
                  ? 'text-[#1e3c72] border-b-[#1e3c72] bg-[#f8f9fa] font-semibold max-md:border-l-[#667eea]'
                  : 'text-[#666] border-b-transparent font-medium hover:text-[#1e3c72] hover:bg-[#f8f9fa]',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white p-[25px] rounded-b-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] max-md:p-5">
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
