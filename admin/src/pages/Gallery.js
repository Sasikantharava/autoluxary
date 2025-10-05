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

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getGallery();
        console.log('Gallery data:', data);
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setGalleryItems(data);
        } else if (data && data.data && Array.isArray(data.data)) {
          setGalleryItems(data.data);
        } else {
          console.warn('Unexpected data format:', data);
          setGalleryItems([]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setError('Failed to load gallery items');
        setIsLoading(false);
        // Set empty array as fallback
        setGalleryItems([]);
      }
    };

    fetchGallery();
  }, []);

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
      if (selectedItem) {
        // Update existing item
        const updatedItem = await updateGalleryItem(selectedItem._id, itemData);
        setGalleryItems(galleryItems.map(item => 
          item._id === updatedItem._id ? updatedItem : item
        ));
      } else {
        // Create new item
        const newItem = await createGalleryItem(itemData);
        setGalleryItems([...galleryItems, newItem]);
      }
      handleFormClose();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setError('Failed to save gallery item');
    }
  };

  const handleItemDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await deleteGalleryItem(itemId);
        setGalleryItems(galleryItems.filter(item => item._id !== itemId));
        if (selectedItem && selectedItem._id === itemId) {
          handleFormClose();
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        setError('Failed to delete gallery item');
      }
    }
  };

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <button className="btn" onClick={handleAddNew}>
          Add New Item
        </button>
      </div>
      
      <div className="gallery-container">
        <div className="gallery-list-container">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({galleryItems.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'exteriors' ? 'active' : ''}`}
              onClick={() => setFilter('exteriors')}
            >
              Exteriors ({galleryItems.filter(item => item.category === 'exteriors').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'interiors' ? 'active' : ''}`}
              onClick={() => setFilter('interiors')}
            >
              Interiors ({galleryItems.filter(item => item.category === 'interiors').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'details' ? 'active' : ''}`}
              onClick={() => setFilter('details')}
            >
              Details ({galleryItems.filter(item => item.category === 'details').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'performance' ? 'active' : ''}`}
              onClick={() => setFilter('performance')}
            >
              Performance ({galleryItems.filter(item => item.category === 'performance').length})
            </button>
          </div>
          
          <GalleryList 
            items={filteredItems} 
            onItemSelect={handleItemSelect}
            onItemDelete={handleItemDelete}
          />
        </div>
        
        {isFormOpen && (
          <div className="gallery-form-container">
            <GalleryForm 
              item={selectedItem}
              onSave={handleItemSave}
              onCancel={handleFormClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;