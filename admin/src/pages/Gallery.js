import React, { useState, useEffect } from 'react';
import GalleryList from '../components/gallery/GalleryList';
import GalleryForm from '../components/gallery/GalleryForm';
import { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../services/galleryService';
import './Gallery.css';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getGallery();
        console.log('Gallery data:', data);
        
        // Ensure data is an array
        let items = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          items = data.data;
        } else {
          console.warn('Unexpected data format:', data);
          items = [];
        }
        
        setGalleryItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setError('Failed to load gallery items. Please try again.');
        setIsLoading(false);
        setGalleryItems([]);
      }
    };

    fetchGallery();
  }, [refreshKey]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const handleItemSave = async (itemData) => {
    try {
      setError(null);
      let savedItem;
      
      if (selectedItem) {
        // Update existing item
        savedItem = await updateGalleryItem(selectedItem._id, itemData);
        setGalleryItems(galleryItems.map(item => 
          item._id === savedItem._id ? savedItem : item
        ));
      } else {
        // Create new item
        savedItem = await createGalleryItem(itemData);
        setGalleryItems([...galleryItems, savedItem]);
      }
      
      handleFormClose();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setError('Failed to save gallery item. Please try again.');
      throw error; // Re-throw to handle in form component
    }
  };

  const handleItemDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this gallery item? This action cannot be undone.')) {
      try {
        setError(null);
        await deleteGalleryItem(itemId);
        setGalleryItems(galleryItems.filter(item => item._id !== itemId));
        if (selectedItem && selectedItem._id === itemId) {
          handleFormClose();
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        setError('Failed to delete gallery item. Please try again.');
      }
    }
  };

  const refreshGallery = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getItemCount = (category) => {
    if (category === 'all') return galleryItems.length;
    return galleryItems.filter(item => item.category === category).length;
  };

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'exteriors', label: 'Exteriors' },
    { key: 'interiors', label: 'Interiors' },
    { key: 'details', label: 'Details' },
    { key: 'performance', label: 'Performance' }
  ];

  if (isLoading) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error && galleryItems.length === 0) {
    return (
      <div className="gallery-error">
        <div className="error-icon">🖼️</div>
        <h3>Unable to Load Gallery</h3>
        <p>{error}</p>
        <button onClick={refreshGallery} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <div className="header-content">
          <h1>Gallery Management</h1>
          <p className="header-subtitle">Manage your vehicle gallery images and content</p>
        </div>
        <div className="header-actions">
          <button onClick={refreshGallery} className="btn btn-outline">
            <span className="btn-icon">🔄</span>
            Refresh
          </button>
          <button className="btn btn-primary" onClick={handleAddNew}>
            <span className="btn-icon">➕</span>
            Add New Item
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}
      
      <div className="gallery-container">
        <div className="gallery-list-container">
          <div className="filter-section">
            <h3>Filter by Category</h3>
            <div className="filter-tabs">
              {categories.map(category => (
                <button
                  key={category.key}
                  className={`filter-tab ${filter === category.key ? 'active' : ''}`}
                  onClick={() => setFilter(category.key)}
                  data-category={category.key}
                >
                  {category.label} ({getItemCount(category.key)})
                </button>
              ))}
            </div>
          </div>
          
          <div className="gallery-content">
            <GalleryList 
              items={filteredItems} 
              onItemSelect={handleItemSelect}
              onItemDelete={handleItemDelete}
              isLoading={isLoading}
            />
          </div>
        </div>
        
        {isFormOpen && (
          <div className="gallery-form-container">
            <GalleryForm 
              item={selectedItem}
              onSave={handleItemSave}
              onCancel={handleFormClose}
              onDelete={selectedItem ? () => handleItemDelete(selectedItem._id) : null}
            />
          </div>
        )}

        {!isFormOpen && (
          <div className="gallery-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">📷</div>
              <h3>Gallery Management</h3>
              <p>Select an item to edit or add a new gallery item to get started.</p>
              <button onClick={handleAddNew} className="btn btn-primary">
                <span className="btn-icon">➕</span>
                Add Your First Item
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;