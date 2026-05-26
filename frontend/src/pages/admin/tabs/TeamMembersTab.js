import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_URL from '../../../apiConfig';
import ConfirmDialog from '../../../components/ConfirmDialog';
import c from '../adminClasses';

const MAX_NAME_LENGTH = 125;
const MAX_POSITION_LENGTH = 125;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const validateName = (name) => {
  if (!name) return '';
  if (!/^[a-zA-Z\s]*$/.test(name)) return 'Name can only contain letters and spaces';
  if (name.length > MAX_NAME_LENGTH) return `Name must not exceed ${MAX_NAME_LENGTH} characters`;
  return '';
};
const validatePosition = (position) => (!position || position.length <= MAX_POSITION_LENGTH) ? '' : `Position must not exceed ${MAX_POSITION_LENGTH} characters`;
const validateDescription = (desc) => (!desc || desc.length <= MAX_DESCRIPTION_LENGTH) ? '' : `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters`;
const validateLinkedInURL = (url) => {
  if (!url) return '';
  if (!url.startsWith('https://') && !url.startsWith('www.')) return 'URL must start with "https://" or "www."';
  if (!url.includes('linkedin')) return 'Please enter a valid LinkedIn URL';
  return '';
};
const validatePhotoSize = (file) => (!file || file.size <= MAX_PHOTO_SIZE) ? '' : `Photo must be less than 5MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;

const TeamMembersTab = ({ getAuthHeaders }) => {
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [originalMemberData, setOriginalMemberData] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, memberId: null });
  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', position: '', description1: '', description2: '', linkedin_url: '', photo: null });

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/team-members`, getAuthHeaders());
      setMembers(response.data.map(m => ({ ...m, description1: m.description1 || '', description2: m.description2 || '', linkedin_url: m.linkedin_url || '' })));
    } catch { toast.error('Failed to fetch team members'); }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.position) { toast.error('Please enter name and position'); return; }
    const nameErr = validateName(formData.name);
    const posErr = validatePosition(formData.position);
    const d1Err = validateDescription(formData.description1);
    const d2Err = validateDescription(formData.description2);
    const liErr = validateLinkedInURL(formData.linkedin_url);
    const photoErr = formData.photo ? validatePhotoSize(formData.photo) : '';
    if (nameErr || posErr || d1Err || d2Err || liErr || photoErr) {
      setFormErrors({ name: nameErr, position: posErr, description1: d1Err, description2: d2Err, linkedin_url: liErr, photo: photoErr });
      if (photoErr) toast.error(photoErr);
      return;
    }
    setFormErrors({});
    const data = new FormData();
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('description1', formData.description1);
    data.append('description2', formData.description2);
    data.append('linkedin_url', formData.linkedin_url);
    if (formData.photo) data.append('photo', formData.photo);
    try {
      await axios.post(`${API_URL}/api/admin/team-members`, data, { ...getAuthHeaders(), headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' } });
      toast.success('Team member added successfully');
      setFormData({ name: '', position: '', description1: '', description2: '', linkedin_url: '', photo: null });
      setShowAddForm(false);
      fetchMembers();
    } catch { toast.error('Failed to add team member'); }
  };

  const handleUpdateMember = async (id) => {
    const member = members.find(m => m.id === id);
    const nameErr = validateName(member.name);
    const posErr = validatePosition(member.position);
    const d1Err = validateDescription(member.description1);
    const d2Err = validateDescription(member.description2);
    const liErr = validateLinkedInURL(member.linkedin_url);
    if (nameErr || posErr || d1Err || d2Err || liErr) {
      setErrors({ name: nameErr, position: posErr, description1: d1Err, description2: d2Err, linkedin_url: liErr });
      toast.error('Please fix validation errors');
      return;
    }
    setErrors({});
    const data = new FormData();
    data.append('name', member.name);
    data.append('position', member.position);
    data.append('description1', member.description1 || '');
    data.append('description2', member.description2 || '');
    data.append('linkedin_url', member.linkedin_url || '');
    if (member.newPhoto) data.append('photo', member.newPhoto);
    try {
      await axios.put(`${API_URL}/api/admin/team-members/${id}`, data, { ...getAuthHeaders(), headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' } });
      toast.success('Team member updated successfully');
      setEditingId(null);
      setOriginalMemberData(null);
      fetchMembers();
    } catch { toast.error('Failed to update team member'); }
  };

  const handleDeleteMember = (id) => setConfirmDialog({ isOpen: true, memberId: id });

  const confirmDelete = async () => {
    const id = confirmDialog.memberId;
    setConfirmDialog({ isOpen: false, memberId: null });
    try {
      await axios.delete(`${API_URL}/api/admin/team-members/${id}`, getAuthHeaders());
      toast.success('Team member removed successfully');
      fetchMembers();
    } catch { toast.error('Failed to remove team member'); }
  };

  const handleMoveUp = async (id, currentOrder) => {
    try { await axios.put(`${API_URL}/api/admin/team-members/${id}/order`, { display_order: currentOrder - 1 }, getAuthHeaders()); fetchMembers(); }
    catch { toast.error('Failed to reorder'); }
  };

  const handleMoveDown = async (id, currentOrder) => {
    try { await axios.put(`${API_URL}/api/admin/team-members/${id}/order`, { display_order: currentOrder + 1 }, getAuthHeaders()); fetchMembers(); }
    catch { toast.error('Failed to reorder'); }
  };

  const handleMemberChange = (id, field, value) => setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));

  const handleStartEdit = (id) => {
    const member = members.find(m => m.id === id);
    if (member) { setOriginalMemberData({ ...member }); setEditingId(id); }
  };

  const handleCancelEdit = () => {
    if (originalMemberData && editingId) setMembers(members.map(m => m.id === editingId ? originalMemberData : m));
    setEditingId(null);
    setOriginalMemberData(null);
  };

  const fieldWithValidation = (id, field, validate, label, placeholder, type = 'input') => {
    const member = members.find(m => m.id === id);
    const maxLen = field === 'name' ? MAX_NAME_LENGTH : field === 'position' ? MAX_POSITION_LENGTH : MAX_DESCRIPTION_LENGTH;
    const commonProps = {
      value: member[field] || '',
      onChange: (e) => {
        const err = validate(e.target.value);
        const newErrors = { ...errors };
        if (err) newErrors[field] = err; else delete newErrors[field];
        setErrors(newErrors);
        handleMemberChange(id, field, e.target.value);
      },
      placeholder,
      maxLength: maxLen,
      className: type === 'textarea' ? c.textarea : c.input,
      style: { borderColor: errors[field] ? '#dc3545' : '', ...(type === 'textarea' ? { minHeight: '80px', fontFamily: 'inherit' } : {}) },
    };
    return (
      <div className={c.formGroup}>
        <label className={`${c.label} !text-[11px] !text-[#1e3c72] !font-semibold !mb-[3px]`}>{label}</label>
        {type === 'textarea' ? <textarea {...commonProps} /> : <input type="text" {...commonProps} />}
        {errors[field] && <small className={c.smallError}>{errors[field]}</small>}
        <small className={c.smallGray}>{(member[field] || '').length}/{maxLen} characters</small>
      </div>
    );
  };

  return (
    <div className="py-[15px]">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Remove Team Member"
        message="Are you sure you want to remove this team member? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, memberId: null })}
      />

      <h2 className={c.h2}>Team Members</h2>
      <p className="text-[#666] text-[13px] mb-[15px]">Manage team members shown on the About page.</p>

      <div className="mb-5">
        {members.map((member, index) => (
          <div key={member.id} className={c.memberRow}>
            <div className={c.memberPhoto}>
              {member.photo_path ? (
                <img src={`${API_URL}${member.photo_path}`} alt={member.name} className={c.memberPhotoImg} />
              ) : (
                <div className={c.photoPlaceholder}>?</div>
              )}
            </div>

            <div className={c.memberInfo}>
              {editingId === member.id ? (
                <>
                  {fieldWithValidation(member.id, 'name', validateName, 'Name', 'Name')}
                  {fieldWithValidation(member.id, 'position', validatePosition, 'Position', 'Position')}
                  {fieldWithValidation(member.id, 'description1', validateDescription, 'Description 1', 'Description 1', 'textarea')}
                  {fieldWithValidation(member.id, 'description2', validateDescription, 'Description 2', 'Description 2', 'textarea')}
                  <div className={c.formGroup}>
                    <label className={`${c.label} !text-[11px] !text-[#1e3c72] !font-semibold !mb-[3px]`}>LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={member.linkedin_url || ''}
                      onChange={(e) => {
                        const err = validateLinkedInURL(e.target.value);
                        const newErrors = { ...errors };
                        if (err) newErrors.linkedin_url = err; else delete newErrors.linkedin_url;
                        setErrors(newErrors);
                        handleMemberChange(member.id, 'linkedin_url', e.target.value);
                      }}
                      placeholder="https://www.linkedin.com/in/..."
                      className={c.input}
                      style={{ borderColor: errors.linkedin_url ? '#dc3545' : '' }}
                    />
                    {errors.linkedin_url && <small className={c.smallError}>{errors.linkedin_url}</small>}
                    <small className={c.smallGray}>Must start with "https://" or "www."</small>
                  </div>
                  <div className={c.formGroup}>
                    <label className={`${c.label} !text-[11px] !text-[#1e3c72] !font-semibold !mb-[3px]`}>Profile Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const photoErr = validatePhotoSize(file);
                          const newErrors = { ...errors };
                          if (photoErr) { newErrors.photo = photoErr; setErrors(newErrors); toast.error(photoErr); }
                          else { delete newErrors.photo; setErrors(newErrors); handleMemberChange(member.id, 'newPhoto', file); }
                        }
                      }}
                      className={c.input}
                      style={{ borderColor: errors.photo ? '#dc3545' : '' }}
                    />
                    {errors.photo && <small className={c.smallError}>{errors.photo}</small>}
                    <small className={c.smallGray}>Maximum 5MB</small>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[15px] font-semibold text-[#1e3c72]">{member.name}</div>
                  <div className="text-[13px] text-[#666]">{member.position}</div>
                  {member.description1 && <div className="text-[#666] text-[13px] mt-1 leading-[1.4]">{member.description1}</div>}
                  {member.description2 && <div className="text-[#666] text-[13px] mt-1 leading-[1.4]">{member.description2}</div>}
                </>
              )}
            </div>

            <div className={c.memberActions}>
              <button onClick={() => handleMoveUp(member.id, member.display_order)} disabled={index === 0} className={c.btnIcon} title="Move up">▲</button>
              <button onClick={() => handleMoveDown(member.id, member.display_order)} disabled={index === members.length - 1} className={c.btnIcon} title="Move down">▼</button>
              {editingId === member.id ? (
                <>
                  <button onClick={() => handleUpdateMember(member.id)} className={c.btnEdit}>Save</button>
                  <button onClick={handleCancelEdit} className={c.btnEdit}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleStartEdit(member.id)} className={c.btnEdit}>Edit</button>
              )}
              <button onClick={() => handleDeleteMember(member.id)} className={c.btnRemove}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm ? (
        <form onSubmit={handleAddMember} className={c.addMemberForm}>
          <h3 className={c.addMemberH3}>Add New Team Member</h3>
          {[
            { field: 'name', label: 'Name', placeholder: 'Enter name', validate: validateName, maxLen: MAX_NAME_LENGTH, required: true },
            { field: 'position', label: 'Position', placeholder: 'Enter position', validate: validatePosition, maxLen: MAX_POSITION_LENGTH, required: true },
          ].map(({ field, label, placeholder, validate, maxLen, required }) => (
            <div key={field} className={c.formGroup}>
              <label className={c.label}>{label}</label>
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => {
                  const err = validate(e.target.value);
                  const newErrors = { ...formErrors };
                  if (err) newErrors[field] = err; else delete newErrors[field];
                  setFormErrors(newErrors);
                  setFormData({ ...formData, [field]: e.target.value });
                }}
                placeholder={placeholder}
                maxLength={maxLen}
                className={c.input}
                style={{ borderColor: formErrors[field] ? '#dc3545' : '' }}
                required={required}
              />
              {formErrors[field] && <small className={c.smallError}>{formErrors[field]}</small>}
              <small className={c.smallGray}>{formData[field].length}/{maxLen} characters</small>
            </div>
          ))}
          {[
            { field: 'description1', label: 'Description 1', placeholder: 'Enter first description (optional)' },
            { field: 'description2', label: 'Description 2', placeholder: 'Enter second description (optional)' },
          ].map(({ field, label, placeholder }) => (
            <div key={field} className={c.formGroup}>
              <label className={c.label}>{label}</label>
              <textarea
                value={formData[field]}
                onChange={(e) => {
                  const err = validateDescription(e.target.value);
                  const newErrors = { ...formErrors };
                  if (err) newErrors[field] = err; else delete newErrors[field];
                  setFormErrors(newErrors);
                  setFormData({ ...formData, [field]: e.target.value });
                }}
                placeholder={placeholder}
                maxLength={MAX_DESCRIPTION_LENGTH}
                className={c.textarea}
                style={{ borderColor: formErrors[field] ? '#dc3545' : '', fontFamily: 'inherit' }}
              />
              {formErrors[field] && <small className={c.smallError}>{formErrors[field]}</small>}
              <small className={c.smallGray}>{formData[field].length}/{MAX_DESCRIPTION_LENGTH} characters</small>
            </div>
          ))}
          <div className={c.formGroup}>
            <label className={c.label}>LinkedIn Profile URL</label>
            <input
              type="text"
              value={formData.linkedin_url}
              onChange={(e) => {
                const err = validateLinkedInURL(e.target.value);
                const newErrors = { ...formErrors };
                if (err) newErrors.linkedin_url = err; else delete newErrors.linkedin_url;
                setFormErrors(newErrors);
                setFormData({ ...formData, linkedin_url: e.target.value });
              }}
              placeholder="Enter LinkedIn URL (optional)"
              className={c.input}
              style={{ borderColor: formErrors.linkedin_url ? '#dc3545' : '' }}
            />
            {formErrors.linkedin_url && <small className={c.smallError}>{formErrors.linkedin_url}</small>}
            <small className={c.smallGray}>Must start with "https://" or "www."</small>
          </div>
          <div className={c.formGroup}>
            <label className={c.label}>Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const photoErr = validatePhotoSize(file);
                  const newErrors = { ...formErrors };
                  if (photoErr) { newErrors.photo = photoErr; setFormErrors(newErrors); toast.error(photoErr); }
                  else { delete newErrors.photo; setFormErrors(newErrors); setFormData({ ...formData, photo: file }); }
                }
              }}
              className={c.input}
              style={{ borderColor: formErrors.photo ? '#dc3545' : '' }}
            />
            {formErrors.photo && <small className={c.smallError}>{formErrors.photo}</small>}
            <small className={c.smallGray}>Maximum 5MB</small>
          </div>
          <div className="flex gap-2">
            <button type="submit" className={c.btnPrimary}>Add Member</button>
            <button
              type="button"
              onClick={() => { setShowAddForm(false); setFormData({ name: '', position: '', description1: '', description2: '', linkedin_url: '', photo: null }); }}
              className={c.btnSecondary}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowAddForm(true)} className={c.btnAddMember}>
          + Add New Team Member
        </button>
      )}
    </div>
  );
};

export default TeamMembersTab;
