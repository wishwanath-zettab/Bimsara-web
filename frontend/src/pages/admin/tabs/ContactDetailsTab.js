import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ConfirmDialog from '../../../components/ConfirmDialog';
import './TabStyles.css';

const ContactDetailsTab = ({ getAuthHeaders }) => {
  const [officeAddress, setOfficeAddress] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, categoryId: null });
  const [newCategory, setNewCategory] = useState({
    category_name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchContactDetails();
    fetchCategories();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/admin/contact-details',
        getAuthHeaders()
      );
      setOfficeAddress(response.data.office_address || '');
    } catch (error) {
      toast.error('Failed to fetch contact details');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/admin/contact-categories',
        getAuthHeaders()
      );
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch contact categories');
    }
  };

  const handleUpdateAddress = async () => {
    setLoading(true);
    try {
      await axios.put(
        'http://localhost:5000/api/admin/contact-details',
        { office_address: officeAddress },
        getAuthHeaders()
      );
      toast.success('Office address updated successfully');
    } catch (error) {
      toast.error('Failed to update office address');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (id, categoryData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/contact-categories/${id}`,
        categoryData,
        getAuthHeaders()
      );
      toast.success('Contact category updated successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to update contact category');
    }
  };

  const handleCategoryChange = (id, field, value) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategory.category_name) {
      toast.error('Please enter category name');
      return;
    }

    try {
      const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.display_order || 0)) : 0;
      
      await axios.post(
        'http://localhost:5000/api/admin/contact-categories',
        {
          ...newCategory,
          display_order: maxOrder + 1
        },
        getAuthHeaders()
      );
      toast.success('Contact category added successfully');
      setNewCategory({ category_name: '', email: '', phone: '' });
      setShowAddForm(false);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to add contact category');
    }
  };

  const handleDeleteCategory = async (id) => {
    setConfirmDialog({ isOpen: true, categoryId: id });
  };

  const confirmDelete = async () => {
    const id = confirmDialog.categoryId;
    setConfirmDialog({ isOpen: false, categoryId: null });

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/contact-categories/${id}`,
        getAuthHeaders()
      );
      toast.success('Contact category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete contact category');
    }
  };

  return (
    <div className="tab-content">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, categoryId: null })}
      />

      <h2>Contact Details Management</h2>

      <div className="section">
        <h3>Office Address</h3>
        <div className="form-group">
          <label>Office Address</label>
          <textarea
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            placeholder="Enter office address"
            rows="3"
          />
        </div>
        <button 
          onClick={handleUpdateAddress} 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Address'}
        </button>
      </div>

      <div className="section">
        <h3>Contact Categories</h3>
        {categories.map((category) => (
          <div key={category.id} className="category-card-row">
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                value={category.category_name}
                onChange={(e) => handleCategoryChange(category.id, 'category_name', e.target.value)}
                placeholder="Category name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={category.email}
                onChange={(e) => handleCategoryChange(category.id, 'email', e.target.value)}
                placeholder="Email address"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={category.phone}
                onChange={(e) => handleCategoryChange(category.id, 'phone', e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <button 
                onClick={() => handleUpdateCategory(category.id, {
                  category_name: category.category_name,
                  email: category.email,
                  phone: category.phone
                })}
                className="btn-primary btn-small"
              >
                Update
              </button>
              <button 
                onClick={() => handleDeleteCategory(category.id)}
                className="btn-danger btn-small"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {showAddForm ? (
          <form onSubmit={handleAddCategory} className="add-member-form">
            <h3>Add New Category</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={newCategory.category_name}
                  onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newCategory.email}
                  onChange={(e) => setNewCategory({ ...newCategory, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={newCategory.phone}
                onChange={(e) => setNewCategory({ ...newCategory, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button type="submit" className="btn-primary">Add Category</button>
              <button 
                type="button" 
                onClick={() => {
                  setShowAddForm(false);
                  setNewCategory({ category_name: '', email: '', phone: '' });
                }}
                style={{ 
                  background: '#6c757d', 
                  color: 'white',
                  padding: '10px 18px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
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
            + Add New Category
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactDetailsTab;
