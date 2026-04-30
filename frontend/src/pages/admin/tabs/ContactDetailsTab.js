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
  const [errors, setErrors] = useState({});
  const [newCategoryErrors, setNewCategoryErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || email === '';
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+94 7\d \d{3} \d{3}|\+947\d{7}|0\d{8})$/;
    return phoneRegex.test(phone) || phone === '';
  };

  const capitalizeCategoryName = (value) => {
    if (!value) {
      return '';
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const validateCategoryFields = (categoryData) => {
    const categoryErrors = {};

    if (!validateEmail(categoryData.email)) {
      categoryErrors.email = 'Wrong email address';
    }

    if (categoryData.phone && !validatePhoneNumber(categoryData.phone)) {
      categoryErrors.phone = 'Enter the Valid phone number';
    }

    return categoryErrors;
  };

  const validateOfficeAddress = (address) => {
    return address.length <= 200;
  };

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
    if (!validateOfficeAddress(officeAddress)) {
      setErrors({ officeAddress: 'Office address must not exceed 200 characters' });
      toast.error('Office address must not exceed 200 characters');
      return;
    }
    setErrors({});
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
    const categoryErrors = validateCategoryFields(categoryData);

    if (Object.keys(categoryErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`category_${id}_email`]: categoryErrors.email,
        [`category_${id}_phone`]: categoryErrors.phone
      }));
      toast.error('Please fix the validation errors');
      return;
    }

    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors };
      delete nextErrors[`category_${id}_email`];
      delete nextErrors[`category_${id}_phone`];
      return nextErrors;
    });

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
    let updatedValue = value;
    if (field === 'category_name') {
      updatedValue = capitalizeCategoryName(value);
    }
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: updatedValue } : cat
    ));

    if (field === 'email' || field === 'phone') {
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        delete nextErrors[`category_${id}_${field}`];
        return nextErrors;
      });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!newCategory.category_name) {
      toast.error('Please enter category name');
      return;
    }

    if (!validateEmail(newCategory.email)) {
      newErrors.email = 'Wrong email address';
    }

    if (newCategory.phone && !validatePhoneNumber(newCategory.phone)) {
      newErrors.phone = 'Phone number must be "+94 7# ### ###", "+947#######" or "0########"';
    }

    if (Object.keys(newErrors).length > 0) {
      setNewCategoryErrors(newErrors);
      toast.error('Please fix the errors before adding');
      return;
    }

    setNewCategoryErrors({});

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
        <div style={{ marginBottom: '10px' }}>
          <small style={{ color: '#666' }}>Maximum 200 characters</small>
        </div>
        <div className="form-group">
          <label>Office Address</label>
          <textarea
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            placeholder="Enter office address"
            rows="3"
            maxLength="200"
            style={{ borderColor: errors.officeAddress ? '#dc3545' : '' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span style={{ color: errors.officeAddress ? '#dc3545' : '#666', fontSize: '12px' }}>
              {errors.officeAddress ? errors.officeAddress : `${officeAddress.length}/200 characters`}
            </span>
          </div>
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
                type="text"
                value={category.email}
                onChange={(e) => handleCategoryChange(category.id, 'email', e.target.value)}
                placeholder="Email address"
                style={{ borderColor: errors[`category_${category.id}_email`] ? '#dc3545' : '' }}
              />
              {errors[`category_${category.id}_email`] && (
                <small style={{ color: '#dc3545' }}>{errors[`category_${category.id}_email`]}</small>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={category.phone}
                onChange={(e) => handleCategoryChange(category.id, 'phone', e.target.value)}
                placeholder='+94 7# ### ###, +947####### or 0########'
                style={{ borderColor: errors[`category_${category.id}_phone`] ? '#dc3545' : '' }}
              />
              {errors[`category_${category.id}_phone`] && (
                <small style={{ color: '#dc3545' }}>{errors[`category_${category.id}_phone`]}</small>
              )}
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
                  onChange={(e) => setNewCategory({ ...newCategory, category_name: capitalizeCategoryName(e.target.value) })}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  value={newCategory.email}
                  onChange={(e) => setNewCategory({ ...newCategory, email: e.target.value })}
                  placeholder="Enter email"
                  style={{ borderColor: newCategoryErrors.email ? '#dc3545' : '' }}
                />
                {newCategoryErrors.email && (
                  <small style={{ color: '#dc3545' }}>{newCategoryErrors.email}</small>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={newCategory.phone}
                onChange={(e) => setNewCategory({ ...newCategory, phone: e.target.value })}
                placeholder='+94 7# ### ###, +947####### or 0########'
                style={{ borderColor: newCategoryErrors.phone ? '#dc3545' : '' }}
              />
              {newCategoryErrors.phone && (
                <small style={{ color: '#dc3545' }}>{newCategoryErrors.phone}</small>
              )}
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
