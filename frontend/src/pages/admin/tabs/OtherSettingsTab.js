import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_URL from '../../../apiConfig';
import ConfirmDialog from '../../../components/ConfirmDialog';
import c from '../adminClasses';

const MAX_CERTIFICATE_SIZE = 20 * 1024 * 1024;
const MAX_PDF_SIZE = 50 * 1024 * 1024;

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
  const [positionsCount, setPositionsCount] = useState('');
  const [loadingPositions, setLoadingPositions] = useState(false);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/other-settings`, getAuthHeaders());
      setCommissionRate(response.data.commission_rate || '');
      setCurrentCertificatePath(response.data.iso_certificate_path);
      setCurrentPDFPath(response.data.company_profile_pdf_path);
      setPositionsCount(response.data.positions_count != null ? String(response.data.positions_count) : '');
    } catch {
      toast.error('Failed to fetch settings');
    }
  };

  const formatCommissionRate = (value) => {
    const clean = value.replace(/%/g, '').trim();
    return clean && /^\d+(\.\d{1,2})?$/.test(clean) ? clean + '%' : value;
  };

  const handleUpdateCommission = async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!commissionRate.trim()) { toast.error('Please enter a commission rate'); return; }
    const formatted = formatCommissionRate(commissionRate);
    setLoadingCommission(true);
    try {
      await axios.put(`${API_URL}/api/admin/other-settings/commission`, { commission_rate: formatted }, getAuthHeaders());
      setCommissionRate(formatted);
      toast.success('Commission rate updated successfully');
    } catch { toast.error('Failed to update commission rate'); }
    finally { setLoadingCommission(false); }
  };

  const handleUpdatePositionsCount = async (e) => {
    e.preventDefault(); e.stopPropagation();
    const parsed = parseInt(positionsCount, 10);
    if (positionsCount.trim() === '' || isNaN(parsed) || parsed < 0) { toast.error('Please enter a valid non-negative number'); return; }
    setLoadingPositions(true);
    try {
      await axios.put(`${API_URL}/api/admin/other-settings/positions-count`, { positions_count: parsed }, getAuthHeaders());
      setPositionsCount(String(parsed));
      toast.success('Positions count updated successfully');
    } catch { toast.error('Failed to update positions count'); }
    finally { setLoadingPositions(false); }
  };

  const handleUploadCertificate = async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!isoCertificate) { toast.error('Please select a file'); return; }
    if (errors.certificate) { toast.error(errors.certificate); return; }
    setLoadingCertificate(true);
    const formData = new FormData();
    formData.append('certificate', isoCertificate);
    try {
      const response = await axios.post(`${API_URL}/api/admin/other-settings/iso-certificate`, formData, {
        ...getAuthHeaders(), headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' }
      });
      toast.success('ISO certificate uploaded successfully');
      setCurrentCertificatePath(response.data.iso_certificate_path);
      setIsoCertificate(null);
    } catch { toast.error('Failed to upload ISO certificate'); }
    finally { setLoadingCertificate(false); }
  };

  const handleUploadPDF = async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!companyProfilePDF) { toast.error('Please select a PDF file'); return; }
    if (errors.pdf) { toast.error(errors.pdf); return; }
    setLoadingPDF(true);
    const formData = new FormData();
    formData.append('pdf', companyProfilePDF);
    try {
      const response = await axios.post(`${API_URL}/api/admin/other-settings/company-profile-pdf`, formData, {
        ...getAuthHeaders(), headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Company profile PDF uploaded successfully');
      setCurrentPDFPath(response.data.company_profile_pdf_path);
      setCompanyProfilePDF(null);
    } catch { toast.error('Failed to upload company profile PDF'); }
    finally { setLoadingPDF(false); }
  };

  const handleRemoveCertificate = () => setConfirmDialog({ isOpen: true, type: 'certificate' });
  const handleRemovePDF = () => setConfirmDialog({ isOpen: true, type: 'pdf' });

  const confirmRemove = async () => {
    const type = confirmDialog.type;
    setConfirmDialog({ isOpen: false, type: null });
    if (type === 'certificate') {
      setLoadingCertificate(true);
      try {
        await axios.delete(`${API_URL}/api/admin/other-settings/iso-certificate`, getAuthHeaders());
        toast.success('ISO certificate removed successfully');
        setCurrentCertificatePath(null);
      } catch { toast.error('Failed to remove ISO certificate'); }
      finally { setLoadingCertificate(false); }
    } else if (type === 'pdf') {
      setLoadingPDF(true);
      try {
        await axios.delete(`${API_URL}/api/admin/other-settings/company-profile-pdf`, getAuthHeaders());
        toast.success('Company profile PDF removed successfully');
        setCurrentPDFPath(null);
      } catch { toast.error('Failed to remove company profile PDF'); }
      finally { setLoadingPDF(false); }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_CERTIFICATE_SIZE) {
      const msg = `ISO certificate must be less than 20MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
      setErrors({ ...errors, certificate: msg }); toast.error(msg); return;
    }
    const { certificate: _, ...rest } = errors;
    setErrors(rest);
    setIsoCertificate(file);
  };

  const handlePDFFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.includes('pdf')) { const msg = 'Please upload a PDF file'; setErrors({ ...errors, pdf: msg }); toast.error(msg); return; }
    if (file.size > MAX_PDF_SIZE) {
      const msg = `Company profile PDF must be less than 50MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
      setErrors({ ...errors, pdf: msg }); toast.error(msg); return;
    }
    const { pdf: _, ...rest } = errors;
    setErrors(rest);
    setCompanyProfilePDF(file);
  };

  return (
    <div className="py-[15px]">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.type === 'certificate' ? 'Remove ISO Certificate' : 'Remove Company Profile PDF'}
        message={confirmDialog.type === 'certificate' ? 'Are you sure you want to remove the ISO certificate? This action cannot be undone.' : 'Are you sure you want to remove the company profile PDF? This action cannot be undone.'}
        onConfirm={confirmRemove}
        onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
      />

      <h2 className={c.h2}>Other Settings</h2>

      <div className={c.section}>
        <h3 className={c.h3}>Commission Rate</h3>
        <div className={c.settingsRow}>
          <div className={c.formGroup}>
            <label className={c.label}>Commission Rate</label>
            <input
              type="text"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              onBlur={() => { if (commissionRate && !commissionRate.includes('%')) setCommissionRate(formatCommissionRate(commissionRate)); }}
              placeholder="e.g., 5 or 5%"
              className={c.input}
            />
            <small className={c.smallGray}>Enter a number. The % symbol will be added automatically if missing.</small>
          </div>
          <div className={`${c.formGroup} ${c.buttonGroup}`}>
            <label className={c.label}>&nbsp;</label>
            <button type="button" onClick={handleUpdateCommission} className={c.btnPrimary} disabled={loadingCommission}>
              {loadingCommission ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>

      <div className={c.section}>
        <h3 className={c.h3}>Positions Count</h3>
        <div className={c.settingsRow}>
          <div className={c.formGroup}>
            <label className={c.label}>Positions Count (shown on About page)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={positionsCount}
              onChange={(e) => setPositionsCount(e.target.value)}
              placeholder="e.g., 12"
              className={c.input}
            />
            <small className={c.smallGray}>This number appears as "X Positions and growing" on the About page.</small>
          </div>
          <div className={`${c.formGroup} ${c.buttonGroup}`}>
            <label className={c.label}>&nbsp;</label>
            <button type="button" onClick={handleUpdatePositionsCount} className={c.btnPrimary} disabled={loadingPositions}>
              {loadingPositions ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>

      <div className={c.section}>
        <h3 className={c.h3}>ISO Certificate</h3>
        {currentCertificatePath && (
          <div className={c.currentFile}>
            <div className="flex justify-between items-center">
              <a href={`${API_URL}${currentCertificatePath}`} target="_blank" rel="noopener noreferrer" className={c.fileLink}>
                View Current Certificate
              </a>
              <button type="button" onClick={handleRemoveCertificate} className={`${c.btnDanger} ${c.btnSmall}`} disabled={loadingCertificate}>
                Remove
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleUploadCertificate}>
          <div className={c.settingsRow}>
            <div className={c.formGroup}>
              <label className={c.label}>Upload New ISO Certificate</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className={c.input}
                style={{ borderColor: errors.certificate ? '#dc3545' : '' }}
              />
              {errors.certificate && <small className={c.smallError}>{errors.certificate}</small>}
              <small className={c.smallGray}>Maximum 20MB</small>
            </div>
            <div className={`${c.formGroup} ${c.buttonGroup}`}>
              <label className={c.label}>&nbsp;</label>
              <button type="submit" className={c.btnPrimary} disabled={loadingCertificate}>
                {loadingCertificate ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className={c.section}>
        <h3 className={c.h3}>Company Profile PDF</h3>
        {currentPDFPath && (
          <div className={c.currentFile}>
            <div className="flex justify-between items-center">
              <a href={`${API_URL}${currentPDFPath}`} target="_blank" rel="noopener noreferrer" className={c.fileLink}>
                Download Current Company Profile
              </a>
              <button type="button" onClick={handleRemovePDF} className={`${c.btnDanger} ${c.btnSmall}`} disabled={loadingPDF}>
                Remove
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleUploadPDF}>
          <div className={c.settingsRow}>
            <div className={c.formGroup}>
              <label className={c.label}>Upload Company Profile PDF</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFFileChange}
                className={c.input}
                style={{ borderColor: errors.pdf ? '#dc3545' : '' }}
              />
              {errors.pdf && <small className={c.smallError}>{errors.pdf}</small>}
              <small className={c.smallGray}>PDF only, maximum 50MB</small>
            </div>
            <div className={`${c.formGroup} ${c.buttonGroup}`}>
              <label className={c.label}>&nbsp;</label>
              <button type="submit" className={c.btnPrimary} disabled={loadingPDF}>
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
