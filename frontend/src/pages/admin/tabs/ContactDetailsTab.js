import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_URL from '../../../apiConfig';
import ConfirmDialog from '../../../components/ConfirmDialog';
import c from '../adminClasses';

const ContactDetailsTab = ({ getAuthHeaders }) => {
  const [officeAddress, setOfficeAddress] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, categoryId: null });
  const [newCategory, setNewCategory] = useState({ category_name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [newCategoryErrors, setNewCategoryErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === '';
  const validatePhoneNumber = (phone) => /^(\+94 \d{2} \d{3} \d{4}|\+94\d{9}|0\d{9})$/.test(phone) || phone === '';
  const capitalizeCategoryName = (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  const validateCategoryFields = (data) => {
    const errs = {};
    if (!validateEmail(data.email)) errs.email = 'Wrong email address';
    if (data.phone && !validatePhoneNumber(data.phone)) errs.phone = 'Enter the Valid phone number';
    return errs;
  };
  const validateOfficeAddress = (address) => address.length <= 200;

  useEffect(() => {
    fetchContactDetails();
    fetchCategories();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/contact-details`, getAuthHeaders());
      setOfficeAddress(response.data.office_address || '');
    } catch {
      toast.error('Failed to fetch contact details');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/contact-categories`, getAuthHeaders());
      setCategories(response.data);
    } catch {
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
      await axios.put(`${API_URL}/api/admin/contact-details`, { office_address: officeAddress }, getAuthHeaders());
      toast.success('Office address updated successfully');
    } catch {
      toast.error('Failed to update office address');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (id, categoryData) => {
    const categoryErrors = validateCategoryFields(categoryData);
    if (Object.keys(categoryErrors).length > 0) {
      setErrors((prev) => ({ ...prev, [`category_${id}_email`]: categoryErrors.email, [`category_${id}_phone`]: categoryErrors.phone }));
      toast.error('Please fix the validation errors');
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`category_${id}_email`];
      delete next[`category_${id}_phone`];
      return next;
    });
    try {
      await axios.put(`${API_URL}/api/admin/contact-categories/${id}`, categoryData, getAuthHeaders());
      toast.success('Contact category updated successfully');
      fetchCategories();
    } catch {
      toast.error('Failed to update contact category');
    }
  };

  const handleCategoryChange = (id, field, value) => {
    const updated = field === 'category_name' ? capitalizeCategoryName(value) : value;
    setCategories(categories.map(cat => cat.id === id ? { ...cat, [field]: updated } : cat));
    if (field === 'email' || field === 'phone') {
      setErrors((prev) => { const next = { ...prev }; delete next[`category_${id}_${field}`]; return next; });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.category_name) { toast.error('Please enter category name'); return; }
    const newErrors = {};
    if (!validateEmail(newCategory.email)) newErrors.email = 'Wrong email address';
    if (newCategory.phone && !validatePhoneNumber(newCategory.phone)) newErrors.phone = 'Phone number must be "+94 XX XXX XXXX", "+94XXXXXXXXX" or "0XXXXXXXXX"';
    if (Object.keys(newErrors).length > 0) { setNewCategoryErrors(newErrors); toast.error('Please fix the errors before adding'); return; }
    setNewCategoryErrors({});
    try {
      const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.display_order || 0)) : 0;
      await axios.post(`${API_URL}/api/admin/contact-categories`, { ...newCategory, display_order: maxOrder + 1 }, getAuthHeaders());
      toast.success('Contact category added successfully');
      setNewCategory({ category_name: '', email: '', phone: '' });
      setShowAddForm(false);
      fetchCategories();
    } catch {
      toast.error('Failed to add contact category');
    }
  };

  const handleDeleteCategory = (id) => setConfirmDialog({ isOpen: true, categoryId: id });

  const confirmDelete = async () => {
    const id = confirmDialog.categoryId;
    setConfirmDialog({ isOpen: false, categoryId: null });
    try {
      await axios.delete(`${API_URL}/api/admin/contact-categories/${id}`, getAuthHeaders());
      toast.success('Contact category deleted successfully');
      fetchCategories();
    } catch {
      toast.error('Failed to delete contact category');
    }
  };

  return (
    <div className="py-[15px]">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, categoryId: null })}
      />

      <h2 className={c.h2}>Contact Details Management</h2>

      <div className={c.section}>
        <h3 className={c.h3}>Office Address</h3>
        <div className="mb-[10px]">
          <small className="text-[#666]">Maximum 200 characters</small>
        </div>
        <div className={c.formGroup}>
          <label className={c.label}>Office Address</label>
          <textarea
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            placeholder="Enter office address"
            rows="3"
            maxLength="200"
            className={c.textarea}
            style={{ borderColor: errors.officeAddress ? '#dc3545' : '' }}
          />
          <div className="flex justify-between mt-[5px]">
            <span className={`text-[12px] ${errors.officeAddress ? 'text-[#dc3545]' : 'text-[#666]'}`}>
              {errors.officeAddress ? errors.officeAddress : `${officeAddress.length}/200 characters`}
            </span>
          </div>
        </div>
        <button onClick={handleUpdateAddress} className={c.btnPrimary} disabled={loading}>
          {loading ? 'Updating...' : 'Update Address'}
        </button>
      </div>

      <div className={c.section}>
        <h3 className={c.h3}>Contact Categories</h3>
        {categories.map((category) => (
          <div key={category.id} className={c.categoryRow}>
            <div className={c.formGroup}>
              <label className={c.label}>Category Name</label>
              <input
                type="text"
                value={category.category_name}
                onChange={(e) => handleCategoryChange(category.id, 'category_name', e.target.value)}
                placeholder="Category name"
                className={c.input}
              />
            </div>
            <div className={c.formGroup}>
              <label className={c.label}>Email</label>
              <input
                type="text"
                value={category.email}
                onChange={(e) => handleCategoryChange(category.id, 'email', e.target.value)}
                placeholder="Email address"
                className={c.input}
                style={{ borderColor: errors[`category_${category.id}_email`] ? '#dc3545' : '' }}
              />
              {errors[`category_${category.id}_email`] && (
                <small className={c.smallError}>{errors[`category_${category.id}_email`]}</small>
              )}
            </div>
            <div className={c.formGroup}>
              <label className={c.label}>Phone Number</label>
              <input
                type="tel"
                value={category.phone}
                onChange={(e) => handleCategoryChange(category.id, 'phone', e.target.value)}
                placeholder="+94 XX XXX XXXX, +94XXXXXXXXX or 0XXXXXXXXX"
                className={c.input}
                style={{ borderColor: errors[`category_${category.id}_phone`] ? '#dc3545' : '' }}
              />
              {errors[`category_${category.id}_phone`] && (
                <small className={c.smallError}>{errors[`category_${category.id}_phone`]}</small>
              )}
            </div>
            <div className="mb-0 flex flex-col gap-[5px] justify-end">
              <button
                onClick={() => handleUpdateCategory(category.id, { category_name: category.category_name, email: category.email, phone: category.phone })}
                className={`${c.btnPrimary} ${c.btnSmall}`}
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className={`${c.btnDanger} ${c.btnSmall}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {showAddForm ? (
          <form onSubmit={handleAddCategory} className={c.addMemberForm}>
            <h3 className={c.addMemberH3}>Add New Category</h3>
            <div className={c.formRow}>
              <div className={c.formGroup}>
                <label className={c.label}>Category Name</label>
                <input
                  type="text"
                  value={newCategory.category_name}
                  onChange={(e) => setNewCategory({ ...newCategory, category_name: capitalizeCategoryName(e.target.value) })}
                  placeholder="Enter category name"
                  className={c.input}
                  required
                />
              </div>
              <div className={c.formGroup}>
                <label className={c.label}>Email</label>
                <input
                  type="text"
                  value={newCategory.email}
                  onChange={(e) => setNewCategory({ ...newCategory, email: e.target.value })}
                  placeholder="Enter email"
                  className={c.input}
                  style={{ borderColor: newCategoryErrors.email ? '#dc3545' : '' }}
                />
                {newCategoryErrors.email && <small className={c.smallError}>{newCategoryErrors.email}</small>}
              </div>
            </div>
            <div className={c.formGroup}>
              <label className={c.label}>Phone Number</label>
              <input
                type="tel"
                value={newCategory.phone}
                onChange={(e) => setNewCategory({ ...newCategory, phone: e.target.value })}
                placeholder="+94 XX XXX XXXX, +94XXXXXXXXX or 0XXXXXXXXX"
                className={c.input}
                style={{ borderColor: newCategoryErrors.phone ? '#dc3545' : '' }}
              />
              {newCategoryErrors.phone && <small className={c.smallError}>{newCategoryErrors.phone}</small>}
            </div>
            <div className="flex gap-2 mt-[10px]">
              <button type="submit" className={c.btnPrimary}>Add Category</button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setNewCategory({ category_name: '', email: '', phone: '' }); }}
                className={c.btnCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button onClick={() => setShowAddForm(true)} className={c.btnAddMember}>
            + Add New Category
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactDetailsTab;
