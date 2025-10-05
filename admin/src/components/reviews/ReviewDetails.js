import React, { useState } from 'react';
import './ReviewDetails.css';

const ReviewDetails = ({ review, onReviewUpdate }) => {
  const [approved, setApproved] = useState(review.approved);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    const updatedReview = {
      ...review,
      approved
    };
    
    await onReviewUpdate(updatedReview);
    setIsUpdating(false);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="review-details">
      <h2>Review Details</h2>
      
      <div className="detail-section">
        <h3>Customer Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{review.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Rating:</span>
            <span className="detail-value rating">
              {renderStars(review.rating)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{formatDate(review.date)}</span>
          </div>
        </div>
      </div>
      
      <div className="detail-section">
        <h3>Review Text</h3>
        <p className="review-text">{review.text}</p>
      </div>
      
      <div className="detail-section">
        <h3>Review Status</h3>
        <div className="update-form">
          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="status-toggle">
              <label className="toggle-label">
                <input 
                  type="checkbox" 
                  checked={approved}
                  onChange={(e) => setApproved(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-text">
                  {approved ? 'Approved' : 'Pending'}
                </span>
              </label>
            </div>
          </div>
          
          <button 
            className="btn" 
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;