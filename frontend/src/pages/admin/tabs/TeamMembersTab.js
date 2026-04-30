import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmDialog from '../../../components/ConfirmDialog';
import './TabStyles.css';

const TeamMembersTab = ({ getAuthHeaders }) => {
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [originalMemberData, setOriginalMemberData] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, memberId: null });
  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description1: '',
    description2: '',
    linkedin_url: '',
    photo: null
  });

  const MAX_NAME_LENGTH = 125;
  const MAX_POSITION_LENGTH = 125;
  const MAX_DESCRIPTION_LENGTH = 400;
  const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

  // Validation functions
  const validateName = (name) => {
    if (!name) return '';
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return 'Name can only contain letters and spaces';
    }
    if (name.length > MAX_NAME_LENGTH) {
      return `Name must not exceed ${MAX_NAME_LENGTH} characters`;
    }
    return '';
  };

  const validatePosition = (position) => {
    if (!position) return '';
    if (position.length > MAX_POSITION_LENGTH) {
      return `Position must not exceed ${MAX_POSITION_LENGTH} characters`;
    }
    return '';
  };

  const validateDescription = (description) => {
    if (!description) return '';
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters`;
    }
    return '';
  };

  const validateLinkedInURL = (url) => {
    if (!url) return '';
    if (!url.startsWith('https://') && !url.startsWith('www.')) {
      return 'URL must start with "https://" or "www."';
    }
    if (!url.includes('linkedin')) {
      return 'Please enter a valid LinkedIn URL';
    }
    return '';
  };

  const validatePhotoSize = (file) => {
    if (!file) return '';
    if (file.size > MAX_PHOTO_SIZE) {
      return `Photo must be less than 5MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
    }
    return '';
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/admin/team-members',
        getAuthHeaders()
      );
      // Convert NULL values to empty strings for input fields
      const membersWithDefaults = response.data.map(member => ({
        ...member,
        description1: member.description1 || '',
        description2: member.description2 || '',
        linkedin_url: member.linkedin_url || ''
      }));
      setMembers(membersWithDefaults);
    } catch (error) {
      toast.error('Failed to fetch team members');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.name || !formData.position) {
      toast.error('Please enter name and position');
      return;
    }

    // Validate all fields
    const nameError = validateName(formData.name);
    const positionError = validatePosition(formData.position);
    const desc1Error = validateDescription(formData.description1);
    const desc2Error = validateDescription(formData.description2);
    const linkedInError = validateLinkedInURL(formData.linkedin_url);
    const photoError = formData.photo ? validatePhotoSize(formData.photo) : '';

    if (nameError || positionError || desc1Error || desc2Error || linkedInError || photoError) {
      newErrors.name = nameError;
      newErrors.position = positionError;
      newErrors.description1 = desc1Error;
      newErrors.description2 = desc2Error;
      newErrors.linkedin_url = linkedInError;
      newErrors.photo = photoError;
      setFormErrors(newErrors);
      if (photoError) toast.error(photoError);
      return;
    }

    setFormErrors({});

    const data = new FormData();
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('description1', formData.description1);
    data.append('description2', formData.description2);
    data.append('linkedin_url', formData.linkedin_url);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      await axios.post(
        'http://localhost:5000/api/admin/team-members',
        data,
        {
          ...getAuthHeaders(),
          headers: {
            ...getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Team member added successfully');
      setFormData({ name: '', position: '', description1: '', description2: '', linkedin_url: '', photo: null });
      setShowAddForm(false);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to add team member');
    }
  };

  const handleUpdateMember = async (id) => {
    const member = members.find(m => m.id === id);
    const newErrors = {};

    // Validate all fields
    const nameError = validateName(member.name);
    const positionError = validatePosition(member.position);
    const desc1Error = validateDescription(member.description1);
    const desc2Error = validateDescription(member.description2);
    const linkedInError = validateLinkedInURL(member.linkedin_url);
    
    if (nameError || positionError || desc1Error || desc2Error || linkedInError) {
      newErrors.name = nameError;
      newErrors.position = positionError;
      newErrors.description1 = desc1Error;
      newErrors.description2 = desc2Error;
      newErrors.linkedin_url = linkedInError;
      setErrors(newErrors);
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
    if (member.newPhoto) {
      data.append('photo', member.newPhoto);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/admin/team-members/${id}`,
        data,
        {
          ...getAuthHeaders(),
          headers: {
            ...getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Team member updated successfully');
      setEditingId(null);
      setOriginalMemberData(null);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to update team member');
    }
  };

  const handleDeleteMember = async (id) => {
    setConfirmDialog({ isOpen: true, memberId: id });
  };

  const confirmDelete = async () => {
    const id = confirmDialog.memberId;
    setConfirmDialog({ isOpen: false, memberId: null });

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/team-members/${id}`,
        getAuthHeaders()
      );
      toast.success('Team member removed successfully');
      fetchMembers();
    } catch (error) {
      toast.error('Failed to remove team member');
    }
  };

  const handleMoveUp = async (id, currentOrder) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/team-members/${id}/order`,
        { display_order: currentOrder - 1 },
        getAuthHeaders()
      );
      fetchMembers();
    } catch (error) {
      toast.error('Failed to reorder');
    }
  };

  const handleMoveDown = async (id, currentOrder) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/team-members/${id}/order`,
        { display_order: currentOrder + 1 },
        getAuthHeaders()
      );
      fetchMembers();
    } catch (error) {
      toast.error('Failed to reorder');
    }
  };

  const handleMemberChange = (id, field, value) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleStartEdit = (id) => {
    const member = members.find(m => m.id === id);
    if (member) {
      // Save original data for revert on cancel
      setOriginalMemberData({ ...member });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    if (originalMemberData && editingId) {
      // Revert changes to original values
      setMembers(members.map(m => 
        m.id === editingId ? originalMemberData : m
      ));
    }
    setEditingId(null);
    setOriginalMemberData(null);
  };

  return (
    <div className="tab-content">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Remove Team Member"
        message="Are you sure you want to remove this team member? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, memberId: null })}
      />

      <h2>Team Members</h2>
      <p style={{ color: '#666', fontSize: '13px', marginBottom: '15px' }}>
        Manage team members shown on the About page.
      </p>

      <div className="members-list">
        {members.map((member, index) => (
          <div key={member.id} className="member-row">
            <div className="member-photo">
              {member.photo_path ? (
                <img 
                  src={`http://localhost:5000${member.photo_path}`} 
                  alt={member.name}
                />
              ) : (
                <div className="photo-placeholder">?</div>
              )}
            </div>
            
            <div className="member-info">
              {editingId === member.id ? (
                <>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => {
                        const newErrors = { ...errors };
                        const error = validateName(e.target.value);
                        if (error) {
                          newErrors.name = error;
                        } else {
                          delete newErrors.name;
                        }
                        setErrors(newErrors);
                        handleMemberChange(member.id, 'name', e.target.value);
                      }}
                      placeholder="Name"
                      maxLength={MAX_NAME_LENGTH}
                      style={{ borderColor: errors.name ? '#dc3545' : '' }}
                    />
                    {errors.name && <small style={{ color: '#dc3545' }}>{errors.name}</small>}
                    <small style={{ color: '#666' }}>{member.name.length}/{MAX_NAME_LENGTH} characters</small>
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={member.position}
                      onChange={(e) => {
                        const newErrors = { ...errors };
                        const error = validatePosition(e.target.value);
                        if (error) {
                          newErrors.position = error;
                        } else {
                          delete newErrors.position;
                        }
                        setErrors(newErrors);
                        handleMemberChange(member.id, 'position', e.target.value);
                      }}
                      placeholder="Position"
                      maxLength={MAX_POSITION_LENGTH}
                      style={{ borderColor: errors.position ? '#dc3545' : '' }}
                    />
                    {errors.position && <small style={{ color: '#dc3545' }}>{errors.position}</small>}
                    <small style={{ color: '#666' }}>{member.position.length}/{MAX_POSITION_LENGTH} characters</small>
                  </div>
                  <div className="form-group">
                    <label>Description 1</label>
                    <textarea
                      value={member.description1 || ''}
                      onChange={(e) => {
                        const newErrors = { ...errors };
                        const error = validateDescription(e.target.value);
                        if (error) {
                          newErrors.description1 = error;
                        } else {
                          delete newErrors.description1;
                        }
                        setErrors(newErrors);
                        handleMemberChange(member.id, 'description1', e.target.value);
                      }}
                      placeholder="Description 1"
                      maxLength={MAX_DESCRIPTION_LENGTH}
                      style={{ borderColor: errors.description1 ? '#dc3545' : '', minHeight: '80px', fontFamily: 'inherit' }}
                    />
                    {errors.description1 && <small style={{ color: '#dc3545' }}>{errors.description1}</small>}
                    <small style={{ color: '#666' }}>{(member.description1 || '').length}/{MAX_DESCRIPTION_LENGTH} characters</small>
                  </div>
                  <div className="form-group">
                    <label>Description 2</label>
                    <textarea
                      value={member.description2 || ''}
                      onChange={(e) => {
                        const newErrors = { ...errors };
                        const error = validateDescription(e.target.value);
                        if (error) {
                          newErrors.description2 = error;
                        } else {
                          delete newErrors.description2;
                        }
                        setErrors(newErrors);
                        handleMemberChange(member.id, 'description2', e.target.value);
                      }}
                      placeholder="Description 2"
                      maxLength={MAX_DESCRIPTION_LENGTH}
                      style={{ borderColor: errors.description2 ? '#dc3545' : '', minHeight: '80px', fontFamily: 'inherit' }}
                    />
                    {errors.description2 && <small style={{ color: '#dc3545' }}>{errors.description2}</small>}
                    <small style={{ color: '#666' }}>{(member.description2 || '').length}/{MAX_DESCRIPTION_LENGTH} characters</small>
                  </div>
                  <div className="form-group">
                    <label>LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={member.linkedin_url || ''}
                      onChange={(e) => {
                        const newErrors = { ...errors };
                        const error = validateLinkedInURL(e.target.value);
                        if (error) {
                          newErrors.linkedin_url = error;
                        } else {
                          delete newErrors.linkedin_url;
                        }
                        setErrors(newErrors);
                        handleMemberChange(member.id, 'linkedin_url', e.target.value);
                      }}
                      placeholder="https://www.linkedin.com/in/..."
                      style={{ borderColor: errors.linkedin_url ? '#dc3545' : '' }}
                    />
                    {errors.linkedin_url && <small style={{ color: '#dc3545' }}>{errors.linkedin_url}</small>}
                    <small style={{ color: '#666' }}>Must start with "https://" or "www."</small>
                  </div>
                  <div className="form-group">
                    <label>Profile Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const photoError = validatePhotoSize(file);
                          const newErrors = { ...errors };
                          if (photoError) {
                            newErrors.photo = photoError;
                            setErrors(newErrors);
                            toast.error(photoError);
                          } else {
                            delete newErrors.photo;
                            setErrors(newErrors);
                            handleMemberChange(member.id, 'newPhoto', file);
                          }
                        }
                      }}
                      style={{ borderColor: errors.photo ? '#dc3545' : '' }}
                    />
                    {errors.photo && <small style={{ color: '#dc3545' }}>{errors.photo}</small>}
                    <small style={{ color: '#666' }}>Maximum 5MB</small>
                  </div>
                </>
              ) : (
                <>
                  <div className="member-name">{member.name}</div>
                  <div className="member-position">{member.position}</div>
                  {member.description1 && (
                    <div className="member-description">{member.description1}</div>
                  )}
                  {member.description2 && (
                    <div className="member-description">{member.description2}</div>
                  )}
                </>
              )}
            </div>

            <div className="member-actions">
              <button 
                onClick={() => handleMoveUp(member.id, member.display_order)}
                disabled={index === 0}
                className="btn-icon"
                title="Move up"
              >
                ▲
              </button>
              <button 
                onClick={() => handleMoveDown(member.id, member.display_order)}
                disabled={index === members.length - 1}
                className="btn-icon"
                title="Move down"
              >
                ▼
              </button>
              
              {editingId === member.id ? (
                <>
                  <button 
                    onClick={() => handleUpdateMember(member.id)}
                    className="btn-edit"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="btn-edit"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => handleStartEdit(member.id)}
                  className="btn-edit"
                >
                  Edit
                </button>
              )}
              
              <button 
                onClick={() => handleDeleteMember(member.id)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm ? (
        <form onSubmit={handleAddMember} className="add-member-form">
          <h3>Add New Team Member</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const newErrors = { ...formErrors };
                const error = validateName(e.target.value);
                if (error) {
                  newErrors.name = error;
                } else {
                  delete newErrors.name;
                }
                setFormErrors(newErrors);
                setFormData({ ...formData, name: e.target.value });
              }}
              placeholder="Enter name"
              maxLength={MAX_NAME_LENGTH}
              style={{ borderColor: formErrors.name ? '#dc3545' : '' }}
              required
            />
            {formErrors.name && <small style={{ color: '#dc3545' }}>{formErrors.name}</small>}
            <small style={{ color: '#666' }}>{formData.name.length}/{MAX_NAME_LENGTH} characters</small>
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => {
                const newErrors = { ...formErrors };
                const error = validatePosition(e.target.value);
                if (error) {
                  newErrors.position = error;
                } else {
                  delete newErrors.position;
                }
                setFormErrors(newErrors);
                setFormData({ ...formData, position: e.target.value });
              }}
              placeholder="Enter position"
              maxLength={MAX_POSITION_LENGTH}
              style={{ borderColor: formErrors.position ? '#dc3545' : '' }}
              required
            />
            {formErrors.position && <small style={{ color: '#dc3545' }}>{formErrors.position}</small>}
            <small style={{ color: '#666' }}>{formData.position.length}/{MAX_POSITION_LENGTH} characters</small>
          </div>
          <div className="form-group">
            <label>Description 1</label>
            <textarea
              value={formData.description1}
              onChange={(e) => {
                const newErrors = { ...formErrors };
                const error = validateDescription(e.target.value);
                if (error) {
                  newErrors.description1 = error;
                } else {
                  delete newErrors.description1;
                }
                setFormErrors(newErrors);
                setFormData({ ...formData, description1: e.target.value });
              }}
              placeholder="Enter first description (optional)"
              maxLength={MAX_DESCRIPTION_LENGTH}
              style={{ borderColor: formErrors.description1 ? '#dc3545' : '', minHeight: '80px', fontFamily: 'inherit' }}
            />
            {formErrors.description1 && <small style={{ color: '#dc3545' }}>{formErrors.description1}</small>}
            <small style={{ color: '#666' }}>{formData.description1.length}/{MAX_DESCRIPTION_LENGTH} characters</small>
          </div>
          <div className="form-group">
            <label>Description 2</label>
            <textarea
              value={formData.description2}
              onChange={(e) => {
                const newErrors = { ...formErrors };
                const error = validateDescription(e.target.value);
                if (error) {
                  newErrors.description2 = error;
                } else {
                  delete newErrors.description2;
                }
                setFormErrors(newErrors);
                setFormData({ ...formData, description2: e.target.value });
              }}
              placeholder="Enter second description (optional)"
              maxLength={MAX_DESCRIPTION_LENGTH}
              style={{ borderColor: formErrors.description2 ? '#dc3545' : '', minHeight: '80px', fontFamily: 'inherit' }}
            />
            {formErrors.description2 && <small style={{ color: '#dc3545' }}>{formErrors.description2}</small>}
            <small style={{ color: '#666' }}>{formData.description2.length}/{MAX_DESCRIPTION_LENGTH} characters</small>
          </div>
          <div className="form-group">
            <label>LinkedIn Profile URL</label>
            <input
              type="text"
              value={formData.linkedin_url}
              onChange={(e) => {
                const newErrors = { ...formErrors };
                const error = validateLinkedInURL(e.target.value);
                if (error) {
                  newErrors.linkedin_url = error;
                } else {
                  delete newErrors.linkedin_url;
                }
                setFormErrors(newErrors);
                setFormData({ ...formData, linkedin_url: e.target.value });
              }}
              placeholder="Enter LinkedIn URL (optional)"
              style={{ borderColor: formErrors.linkedin_url ? '#dc3545' : '' }}
            />
            {formErrors.linkedin_url && <small style={{ color: '#dc3545' }}>{formErrors.linkedin_url}</small>}
            <small style={{ color: '#666' }}>Must start with "https://" or "www."</small>
          </div>
          <div className="form-group">
            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const photoError = validatePhotoSize(file);
                  if (photoError) {
                    const newErrors = { ...formErrors };
                    newErrors.photo = photoError;
                    setFormErrors(newErrors);
                    toast.error(photoError);
                  } else {
                    const newErrors = { ...formErrors };
                    delete newErrors.photo;
                    setFormErrors(newErrors);
                    setFormData({ ...formData, photo: file });
                  }
                }
              }}
              style={{ borderColor: formErrors.photo ? '#dc3545' : '' }}
            />
            {formErrors.photo && <small style={{ color: '#dc3545' }}>{formErrors.photo}</small>}
            <small style={{ color: '#666' }}>Maximum 5MB</small>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn-primary">Add Member</button>
            <button 
              type="button" 
              onClick={() => {
                setShowAddForm(false);
                setFormData({ name: '', position: '', description1: '', description2: '', linkedin_url: '', photo: null });
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-add-member"
        >
          + Add New Team Member
        </button>
      )}
    </div>
  );
};

export default TeamMembersTab;
