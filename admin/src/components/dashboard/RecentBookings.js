import React from 'react';
import { Link } from 'react-router-dom';
import './RecentBookings.css';

const RecentBookings = ({ bookings, onRefresh }) => {
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
    <div className="recent-bookings">
      <div className="card-header">
        <h2>Recent Bookings</h2>
        <div className="header-actions">
          <button onClick={onRefresh} className="btn btn-secondary refresh-btn">
            Refresh
          </button>
          <Link to="/bookings" className="btn btn-secondary">
            View All
          </Link>
        </div>
      </div>
      
      {!bookings || bookings.length === 0 ? (
        <p>No recent bookings</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <div key={booking._id || index} className="booking-item">
              <div className="booking-info">
                <h4>{booking.name || 'Unknown'}</h4>
                <p>{booking.service || 'Unknown service'}</p>
              </div>
              <div className="booking-meta">
                <span className={`status status-${booking.status || 'pending'}`}>
                  {booking.status || 'Pending'}
                </span>
                <span className="booking-date">
                  {formatDate(booking.createdAt || booking.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentBookings;