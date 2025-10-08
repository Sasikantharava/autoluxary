import React, { useState, useEffect } from 'react';
import ReviewList from '../components/reviews/ReviewList';
import ReviewDetails from '../components/reviews/ReviewDetails';
import { getReviews, updateReview } from '../services/reviewService';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getReviews(true); // Get all reviews including unapproved
        setReviews(Array.isArray(data) ? data : []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please try again.');
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [refreshKey]);

  const handleReviewSelect = (review) => {
    setSelectedReview(review);
  };

  const handleReviewUpdate = async (updatedReview) => {
    try {
      await updateReview(updatedReview._id, updatedReview);
      
      // Update the review in the list
      setReviews(reviews.map(review => 
        review._id === updatedReview._id ? updatedReview : review
      ));
      
      // Update the selected review
      setSelectedReview(updatedReview);
    } catch (error) {
      console.error('Error updating review:', error);
      throw error; // Re-throw to handle in child component
    }
  };

  const refreshReviews = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getReviewCount = (type) => {
    switch (type) {
      case 'all':
        return reviews.length;
      case 'approved':
        return reviews.filter(review => review.approved).length;
      case 'pending':
        return reviews.filter(review => !review.approved).length;
      default:
        return 0;
    }
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : filter === 'approved' 
      ? reviews.filter(review => review.approved)
      : reviews.filter(review => !review.approved);

  if (isLoading) {
    return (
      <div className="reviews-loading">
        <div className="loading-spinner"></div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="reviews-error">
        <div className="error-icon">⚠️</div>
        <h3>Unable to Load Reviews</h3>
        <p>{error}</p>
        <button onClick={refreshReviews} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const filterTabs = [
    { key: 'all', label: 'All', count: getReviewCount('all') },
    { key: 'approved', label: 'Approved', count: getReviewCount('approved') },
    { key: 'pending', label: 'Pending', count: getReviewCount('pending') }
  ];

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>Reviews Management</h1>
        <button onClick={refreshReviews} className="btn btn-outline refresh-btn">
          <span className="btn-icon">🔄</span>
          Refresh
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}
      
      <div className="reviews-container">
        <div className="reviews-list-container">
          <div className="filter-tabs">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          
          <ReviewList 
            reviews={filteredReviews} 
            onReviewSelect={handleReviewSelect}
            selectedReviewId={selectedReview?._id}
            isLoading={isLoading}
          />
        </div>
        
        <div className="review-details-container">
          {selectedReview ? (
            <ReviewDetails 
              review={selectedReview} 
              onReviewUpdate={handleReviewUpdate}
              onRefresh={refreshReviews}
            />
          ) : (
            <div className="no-review-selected">
              <div className="placeholder-icon">⭐</div>
              <h3>No Review Selected</h3>
              <p>Choose a review from the list to view and manage details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;