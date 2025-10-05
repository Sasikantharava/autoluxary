import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews, onReviewSelect, selectedReviewId }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr 
                  key={review._id} 
                  className={`review-row ${selectedReviewId === review._id ? 'selected' : ''}`}
                  onClick={() => onReviewSelect(review)}
                >
                  <td>{review.name}</td>
                  <td>
                    <div className="rating">
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td>
                    <span className={`status ${review.approved ? 'status-approved' : 'status-pending'}`}>
                      {review.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>{formatDate(review.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewList;