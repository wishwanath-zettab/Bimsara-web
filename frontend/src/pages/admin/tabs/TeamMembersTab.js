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
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description1: '',
    description2: '',
    photo: null
  });

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
        description2: member.description2 || ''
      }));
      setMembers(membersWithDefaults);
    } catch (error) {
      toast.error('Failed to fetch team members');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.position) {
      toast.error('Please enter name and position');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('description1', formData.description1);
    data.append('description2', formData.description2);
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
      setFormData({ name: '', position: '', description1: '', description2: '', photo: null });
      setShowAddForm(false);
      fetchMembers();
    } catch (error) {
      toast.error('Failed to add team member');
    }
  };

  const handleUpdateMember = async (id) => {
    const member = members.find(m => m.id === id);
    
    const data = new FormData();
    data.append('name', member.name);
    data.append('position', member.position);
    data.append('description1', member.description1 || '');
    data.append('description2', member.description2 || '');

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
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={member.position}
                      onChange={(e) => handleMemberChange(member.id, 'position', e.target.value)}
                      placeholder="Position"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description 1</label>
                    <input
                      type="text"
                      value={member.description1 || ''}
                      onChange={(e) => handleMemberChange(member.id, 'description1', e.target.value)}
                      placeholder="Description 1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description 2</label>
                    <input
                      type="text"
                      value={member.description2 || ''}
                      onChange={(e) => handleMemberChange(member.id, 'description2', e.target.value)}
                      placeholder="Description 2"
                    />
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Enter position"
              required
            />
          </div>
          <div className="form-group">
            <label>Description 1</label>
            <input
              type="text"
              value={formData.description1}
              onChange={(e) => setFormData({ ...formData, description1: e.target.value })}
              placeholder="Enter first description (optional)"
            />
          </div>
          <div className="form-group">
            <label>Description 2</label>
            <input
              type="text"
              value={formData.description2}
              onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
              placeholder="Enter second description (optional)"
            />
          </div>
          <div className="form-group">
            <label>Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn-primary">Add Member</button>
            <button 
              type="button" 
              onClick={() => {
                setShowAddForm(false);
                setFormData({ name: '', position: '', description1: '', description2: '', photo: null });
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
