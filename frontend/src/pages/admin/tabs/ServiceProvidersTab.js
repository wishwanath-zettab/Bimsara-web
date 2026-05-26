import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_URL from '../../../apiConfig';
import ConfirmDialog from '../../../components/ConfirmDialog';
import c from '../adminClasses';

const MAX_COMPANY_NAME_LENGTH = 100;
const MAX_LOGO_SIZE = 3 * 1024 * 1024;

const ServiceProvidersTab = ({ getAuthHeaders }) => {
  const [providers, setProviders] = useState([]);
  const [newProvider, setNewProvider] = useState({ company_name: '', logo: null });
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, providerId: null });
  const [errors, setErrors] = useState({});

  useEffect(() => { fetchProviders(); }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/service-providers`, getAuthHeaders());
      setProviders(response.data);
    } catch {
      toast.error('Failed to fetch service providers');
    }
  };

  const handleCreateProvider = async (e) => {
    e.preventDefault();
    if (!newProvider.company_name) { toast.error('Please enter company name'); return; }
    if (newProvider.company_name.length > MAX_COMPANY_NAME_LENGTH) {
      setErrors({ company_name: `Company name must not exceed ${MAX_COMPANY_NAME_LENGTH} characters` });
      toast.error(`Company name must not exceed ${MAX_COMPANY_NAME_LENGTH} characters`);
      return;
    }
    setErrors({});
    setLoading(true);
    const formData = new FormData();
    formData.append('company_name', newProvider.company_name);
    if (newProvider.logo) formData.append('logo', newProvider.logo);
    try {
      await axios.post(`${API_URL}/api/admin/service-providers`, formData, {
        ...getAuthHeaders(),
        headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Service provider created successfully');
      setNewProvider({ company_name: '', logo: null });
      fetchProviders();
    } catch {
      toast.error('Failed to create service provider');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProvider = (id) => setConfirmDialog({ isOpen: true, providerId: id });

  const confirmDelete = async () => {
    const id = confirmDialog.providerId;
    setConfirmDialog({ isOpen: false, providerId: null });
    try {
      await axios.delete(`${API_URL}/api/admin/service-providers/${id}`, getAuthHeaders());
      toast.success('Service provider deleted successfully');
      fetchProviders();
    } catch {
      toast.error('Failed to delete service provider');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_LOGO_SIZE) {
      setErrors({ ...errors, logo: `Company logo must be less than 3MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB` });
      toast.error(`Logo must be less than 3MB`);
      return;
    }
    const { logo: _, ...rest } = errors;
    setErrors(rest);
    setNewProvider({ ...newProvider, logo: file });
  };

  return (
    <div className="py-[15px]">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Service Provider"
        message="Are you sure you want to delete this service provider? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, providerId: null })}
      />

      <h2 className={c.h2}>Service Providers Management</h2>

      <div className={c.section}>
        <h3 className={c.h3}>Add New Service Provider</h3>
        <form onSubmit={handleCreateProvider} className={c.providerFormRow}>
          <div className={c.formGroup}>
            <label className={c.label}>Company Name</label>
            <input
              type="text"
              value={newProvider.company_name}
              onChange={(e) => {
                const val = e.target.value;
                const newErrors = { ...errors };
                if (val.length > MAX_COMPANY_NAME_LENGTH) newErrors.company_name = `Must not exceed ${MAX_COMPANY_NAME_LENGTH} characters`;
                else delete newErrors.company_name;
                setErrors(newErrors);
                setNewProvider({ ...newProvider, company_name: val });
              }}
              placeholder="Enter company name"
              maxLength={MAX_COMPANY_NAME_LENGTH}
              className={c.input}
              style={{ borderColor: errors.company_name ? '#dc3545' : '' }}
              required
            />
            {errors.company_name && <small className={c.smallError}>{errors.company_name}</small>}
            <small className={c.smallGray}>{newProvider.company_name.length}/{MAX_COMPANY_NAME_LENGTH} characters</small>
          </div>
          <div className={c.formGroup}>
            <label className={c.label}>Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={c.input}
              style={{ borderColor: errors.logo ? '#dc3545' : '' }}
            />
            {errors.logo && <small className={c.smallError}>{errors.logo}</small>}
            <small className={c.smallGray}>Maximum 3MB</small>
          </div>
          <div className={`${c.formGroup} ${c.buttonGroup}`}>
            <label className={c.label}>&nbsp;</label>
            <button type="submit" className={c.btnPrimary} disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      <div className={c.section}>
        <h3 className={c.h3}>Existing Service Providers</h3>
        {providers.length === 0 ? (
          <p className={c.noData}>No service providers found</p>
        ) : (
          <div className="grid gap-[10px]">
            {providers.map((provider) => (
              <div key={provider.id} className={c.providerCard}>
                <div className={c.providerInfo}>
                  {provider.logo_path && (
                    <img
                      src={`${API_URL}${provider.logo_path}`}
                      alt={provider.company_name}
                      className={c.providerLogo}
                    />
                  )}
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#1e3c72] mb-[5px] mt-0">{provider.company_name}</h4>
                    <p className="text-[#666] text-[12px] m-0">
                      Added: {new Date(provider.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button onClick={() => handleDeleteProvider(provider.id)} className={c.btnDanger}>
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
