import React from 'react';
import './GalleryList.css';

const GalleryList = ({ items, onItemSelect, onItemDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="gallery-list">
      {!items || items.length === 0 ? (
        <p>No gallery items found</p>
      ) : (
        <div className="gallery-grid">
          {items.map((item, index) => (
            <div key={item._id || index} className="gallery-item">
              <div className="gallery-image-container">
                <img 
                  src={item.image || 'https://via.placeholder.com/250x200?text=No+Image'} 
                  alt={item.title || 'Gallery Item'} 
                  className="gallery-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/250x200?text=Image+Error';
                  }}
                />
                {item.featured && (
                  <div className="featured-badge">Featured</div>
                )}
              </div>
              <div className="gallery-info">
                <h4 className="gallery-title">{item.title || 'Untitled'}</h4>
                <p className="gallery-category">{item.category || 'Uncategorized'}</p>
                <p className="gallery-date">{formatDate(item.createdAt)}</p>
                <div className="gallery-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => onItemSelect(item)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => onItemDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryList;