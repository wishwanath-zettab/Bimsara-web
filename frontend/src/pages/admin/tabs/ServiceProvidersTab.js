import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmDialog from '../../../components/ConfirmDialog';
import './TabStyles.css';

const ServiceProvidersTab = ({ getAuthHeaders }) => {
  const [providers, setProviders] = useState([]);
  const [newProvider, setNewProvider] = useState({ company_name: '', logo: null });
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, providerId: null });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/admin/service-providers',
        getAuthHeaders()
      );
      setProviders(response.data);
    } catch (error) {
      toast.error('Failed to fetch service providers');
    }
  };

  const handleCreateProvider = async (e) => {
    e.preventDefault();
    
    if (!newProvider.company_name) {
      toast.error('Please enter company name');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('company_name', newProvider.company_name);
    if (newProvider.logo) {
      formData.append('logo', newProvider.logo);
    }

    try {
      await axios.post(
        'http://localhost:5000/api/admin/service-providers',
        formData,
        {
          ...getAuthHeaders(),
          headers: {
            ...getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Service provider created successfully');
      setNewProvider({ company_name: '', logo: null });
      fetchProviders();
    } catch (error) {
      toast.error('Failed to create service provider');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProvider = async (id) => {
    setConfirmDialog({ isOpen: true, providerId: id });
  };

  const confirmDelete = async () => {
    const id = confirmDialog.providerId;
    setConfirmDialog({ isOpen: false, providerId: null });

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/service-providers/${id}`,
        getAuthHeaders()
      );
      toast.success('Service provider deleted successfully');
      fetchProviders();
    } catch (error) {
      toast.error('Failed to delete service provider');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setNewProvider({ ...newProvider, logo: file });
    }
  };

  return (
    <div className="tab-content">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Service Provider"
        message="Are you sure you want to delete this service provider? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, providerId: null })}
      />

      <h2>Service Providers Management</h2>

      <div className="section">
        <h3>Add New Service Provider</h3>
        <form onSubmit={handleCreateProvider} className="provider-form-row">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={newProvider.company_name}
              onChange={(e) => setNewProvider({ ...newProvider, company_name: e.target.value })}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="form-group">
            <label>Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group button-group">
            <label>&nbsp;</label>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      <div className="section">
        <h3>Existing Service Providers</h3>
        {providers.length === 0 ? (
          <p className="no-data">No service providers found</p>
        ) : (
          <div className="providers-list">
            {providers.map((provider) => (
              <div key={provider.id} className="provider-card">
                <div className="provider-info">
                  {provider.logo_path && (
                    <img 
                      src={`http://localhost:5000${provider.logo_path}`} 
                      alt={provider.company_name}
                      className="provider-logo"
                    />
                  )}
                  <div className="provider-details">
                    <h4>{provider.company_name}</h4>
                    <p className="provider-date">
                      Added: {new Date(provider.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteProvider(provider.id)}
                  className="btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProvidersTab;
