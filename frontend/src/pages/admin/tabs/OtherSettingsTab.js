import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmDialog from '../../../components/ConfirmDialog';
import './TabStyles.css';

const OtherSettingsTab = ({ getAuthHeaders }) => {
  const [commissionRate, setCommissionRate] = useState('');
  const [isoCertificate, setIsoCertificate] = useState(null);
  const [currentCertificatePath, setCurrentCertificatePath] = useState(null);
  const [companyProfilePDF, setCompanyProfilePDF] = useState(null);
  const [currentPDFPath, setCurrentPDFPath] = useState(null);
  const [loadingCommission, setLoadingCommission] = useState(false);
  const [loadingCertificate, setLoadingCertificate] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: null });

  const MAX_CERTIFICATE_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB

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
      setCurrentPDFPath(response.data.company_profile_pdf_path);
    } catch (error) {
      toast.error('Failed to fetch settings');
    }
  };

  const formatCommissionRate = (value) => {
    // Remove any existing % character
    let cleanValue = value.replace(/%/g, '').trim();
    
    // Check if it's a valid number
    if (cleanValue && /^\d+(\.\d{1,2})?$/.test(cleanValue)) {
      return cleanValue + '%';
    }
    
    return value;
  };

  const handleUpdateCommission = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!commissionRate.trim()) {
      toast.error('Please enter a commission rate');
      return;
    }

    // Format and validate commission rate
    const formatted = formatCommissionRate(commissionRate);
    
    setLoadingCommission(true);
    try {
      await axios.put(
        'http://localhost:5000/api/admin/other-settings/commission',
        { commission_rate: formatted },
        getAuthHeaders()
      );
      setCommissionRate(formatted);
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

    if (errors.certificate) {
      toast.error(errors.certificate);
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

  const handleUploadPDF = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!companyProfilePDF) {
      toast.error('Please select a PDF file');
      return;
    }

    if (errors.pdf) {
      toast.error(errors.pdf);
      return;
    }

    setLoadingPDF(true);
    const formData = new FormData();
    formData.append('pdf', companyProfilePDF);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/other-settings/company-profile-pdf',
        formData,
        {
          ...getAuthHeaders(),
          headers: {
            ...getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Company profile PDF uploaded successfully');
      setCurrentPDFPath(response.data.company_profile_pdf_path);
      setCompanyProfilePDF(null);
    } catch (error) {
      toast.error('Failed to upload company profile PDF');
    } finally {
      setLoadingPDF(false);
    }
  };

  const handleRemoveCertificate = async () => {
    setConfirmDialog({ isOpen: true, type: 'certificate' });
  };

  const handleRemovePDF = async () => {
    setConfirmDialog({ isOpen: true, type: 'pdf' });
  };

  const confirmRemove = async () => {
    const type = confirmDialog.type;
    setConfirmDialog({ isOpen: false, type: null });

    if (type === 'certificate') {
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
    } else if (type === 'pdf') {
      setLoadingPDF(true);
      try {
        await axios.delete(
          'http://localhost:5000/api/admin/other-settings/company-profile-pdf',
          getAuthHeaders()
        );
        toast.success('Company profile PDF removed successfully');
        setCurrentPDFPath(null);
      } catch (error) {
        toast.error('Failed to remove company profile PDF');
      } finally {
        setLoadingPDF(false);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const newErrors = { ...errors };
    
    if (file) {
      if (file.size > MAX_CERTIFICATE_SIZE) {
        newErrors.certificate = `ISO certificate must be less than 20MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
        setErrors(newErrors);
        toast.error(newErrors.certificate);
        return;
      }
      delete newErrors.certificate;
      setErrors(newErrors);
      setIsoCertificate(file);
    }
  };

  const handlePDFFileChange = (e) => {
    const file = e.target.files[0];
    const newErrors = { ...errors };
    
    if (file) {
      if (!file.type.includes('pdf')) {
        newErrors.pdf = 'Please upload a PDF file';
        setErrors(newErrors);
        toast.error(newErrors.pdf);
        return;
      }
      if (file.size > MAX_PDF_SIZE) {
        newErrors.pdf = `Company profile PDF must be less than 50MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
        setErrors(newErrors);
        toast.error(newErrors.pdf);
        return;
      }
      delete newErrors.pdf;
      setErrors(newErrors);
      setCompanyProfilePDF(file);
    }
  };

  return (
    <div className="tab-content">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.type === 'certificate' ? 'Remove ISO Certificate' : 'Remove Company Profile PDF'}
        message={confirmDialog.type === 'certificate' ? 'Are you sure you want to remove the ISO certificate? This action cannot be undone.' : 'Are you sure you want to remove the company profile PDF? This action cannot be undone.'}
        onConfirm={confirmRemove}
        onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
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
              onBlur={() => {
                if (commissionRate && !commissionRate.includes('%')) {
                  setCommissionRate(formatCommissionRate(commissionRate));
                }
              }}
              placeholder="e.g., 5 or 5%"
            />
            <small style={{ color: '#666' }}>Enter a number. The % symbol will be added automatically if missing.</small>
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
                style={{ borderColor: errors.certificate ? '#dc3545' : '' }}
              />
              {errors.certificate && <small style={{ color: '#dc3545' }}>{errors.certificate}</small>}
              <small style={{ color: '#666' }}>Maximum 20MB</small>
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

      <div className="section">
        <h3>Company Profile PDF</h3>
        {currentPDFPath && (
          <div className="current-file">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a 
                href={`http://localhost:5000${currentPDFPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
              >
                Download Current Company Profile
              </a>
              <button 
                type="button"
                onClick={handleRemovePDF}
                className="btn-danger btn-small"
                disabled={loadingPDF}
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleUploadPDF}>
          <div className="settings-row">
            <div className="form-group">
              <label>Upload Company Profile PDF</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFFileChange}
                style={{ borderColor: errors.pdf ? '#dc3545' : '' }}
              />
              {errors.pdf && <small style={{ color: '#dc3545' }}>{errors.pdf}</small>}
              <small style={{ color: '#666' }}>PDF only, maximum 50MB</small>
            </div>
            <div className="form-group button-group">
              <label>&nbsp;</label>
              <button type="submit" className="btn-primary" disabled={loadingPDF}>
                {loadingPDF ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherSettingsTab;
