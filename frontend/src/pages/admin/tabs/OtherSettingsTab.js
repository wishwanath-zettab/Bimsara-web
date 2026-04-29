import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmDialog from '../../../components/ConfirmDialog';
import './TabStyles.css';

const OtherSettingsTab = ({ getAuthHeaders }) => {
  const [commissionRate, setCommissionRate] = useState('');
  const [isoCertificate, setIsoCertificate] = useState(null);
  const [currentCertificatePath, setCurrentCertificatePath] = useState(null);
  const [loadingCommission, setLoadingCommission] = useState(false);
  const [loadingCertificate, setLoadingCertificate] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/admin/other-settings',
        getAuthHeaders()
      );
      setCommissionRate(response.data.commission_rate || '');
      setCurrentCertificatePath(response.data.iso_certificate_path);
    } catch (error) {
      toast.error('Failed to fetch settings');
    }
  };

  const handleUpdateCommission = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingCommission(true);
    try {
      await axios.put(
        'http://localhost:5000/api/admin/other-settings/commission',
        { commission_rate: commissionRate },
        getAuthHeaders()
      );
      toast.success('Commission rate updated successfully');
    } catch (error) {
      toast.error('Failed to update commission rate');
    } finally {
      setLoadingCommission(false);
    }
  };

  const handleUploadCertificate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isoCertificate) {
      toast.error('Please select a file');
      return;
    }

    setLoadingCertificate(true);
    const formData = new FormData();
    formData.append('certificate', isoCertificate);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/other-settings/iso-certificate',
        formData,
        {
          ...getAuthHeaders(),
          headers: {
            ...getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('ISO certificate uploaded successfully');
      setCurrentCertificatePath(response.data.iso_certificate_path);
      setIsoCertificate(null);
    } catch (error) {
      toast.error('Failed to upload ISO certificate');
    } finally {
      setLoadingCertificate(false);
    }
  };

  const handleRemoveCertificate = async () => {
    setConfirmDialog({ isOpen: true });
  };

  const confirmRemove = async () => {
    setConfirmDialog({ isOpen: false });
    setLoadingCertificate(true);
    
    try {
      await axios.delete(
        'http://localhost:5000/api/admin/other-settings/iso-certificate',
        getAuthHeaders()
      );
      toast.success('ISO certificate removed successfully');
      setCurrentCertificatePath(null);
    } catch (error) {
      toast.error('Failed to remove ISO certificate');
    } finally {
      setLoadingCertificate(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setIsoCertificate(file);
    }
  };

  return (
    <div className="tab-content">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Remove ISO Certificate"
        message="Are you sure you want to remove the ISO certificate? This action cannot be undone."
        onConfirm={confirmRemove}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />

      <h2>Other Settings</h2>

      <div className="section">
        <h3>Commission Rate</h3>
        <div className="settings-row">
          <div className="form-group">
            <label>Commission Rate</label>
            <input
              type="text"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              placeholder="e.g., 5% or 5"
            />
          </div>
          <div className="form-group button-group">
            <label>&nbsp;</label>
            <button 
              type="button"
              onClick={handleUpdateCommission} 
              className="btn-primary"
              disabled={loadingCommission}
            >
              {loadingCommission ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>ISO Certificate</h3>
        {currentCertificatePath && (
          <div className="current-file">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a 
                href={`http://localhost:5000${currentCertificatePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
              >
                View Current Certificate
              </a>
              <button 
                type="button"
                onClick={handleRemoveCertificate}
                className="btn-danger btn-small"
                disabled={loadingCertificate}
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleUploadCertificate}>
          <div className="settings-row">
            <div className="form-group">
              <label>Upload New ISO Certificate</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group button-group">
              <label>&nbsp;</label>
              <button type="submit" className="btn-primary" disabled={loadingCertificate}>
                {loadingCertificate ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherSettingsTab;
