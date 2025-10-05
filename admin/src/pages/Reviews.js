import React, { useState, useEffect } from 'react';
import ReviewList from '../components/reviews/ReviewList';
import ReviewDetails from '../components/reviews/ReviewDetails';
import { getReviews, updateReview } from '../services/reviewService';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(true); // Get all reviews including unapproved
        setReviews(data);
        setIsLoading(false);
              } catch (error) {
        console.error('Error fetching reviews:', error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

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
    }
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : filter === 'approved' 
      ? reviews.filter(review => review.approved)
      : reviews.filter(review => !review.approved);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <h1>Reviews</h1>
      
      <div className="reviews-container">
        <div className="reviews-list-container">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({reviews.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              Approved ({reviews.filter(r => r.approved).length})
            </button>
            <button 
              className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({reviews.filter(r => !r.approved).length})
            </button>
          </div>
          
          <ReviewList 
            reviews={filteredReviews} 
            onReviewSelect={handleReviewSelect}
            selectedReviewId={selectedReview?._id}
          />
        </div>
        
        <div className="review-details-container">
          {selectedReview ? (
            <ReviewDetails 
              review={selectedReview} 
              onReviewUpdate={handleReviewUpdate}
            />
          ) : (
            <div className="no-review-selected">
              <p>Select a review to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;