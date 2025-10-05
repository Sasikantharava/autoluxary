import React, { useState, useEffect } from 'react';
import './GalleryForm.css';

const GalleryForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: 'exteriors',
    featured: false
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        image: item.image,
        category: item.category,
        featured: item.featured
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="gallery-form">
      <h2>{item ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {formData.image && (
            <div className="image-preview">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="preview-image"
              />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="exteriors">Exteriors</option>
            <option value="interiors">Interiors</option>
            <option value="details">Details</option>
            <option value="performance">Performance</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            Featured
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn">
            {item ? 'Update' : 'Create'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;