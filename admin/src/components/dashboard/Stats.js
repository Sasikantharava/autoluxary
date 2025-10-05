import React from 'react';
import './Stats.css';

const Stats = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📅</div>
        <div className="stat-content">
          <h3 className="stat-number">{stats.totalBookings}</h3>
          <p className="stat-label">Total Bookings</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <h3 className="stat-number">{stats.pendingBookings}</h3>
          <p className="stat-label">Pending Bookings</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-content">
          <h3 className="stat-number">{stats.totalReviews}</h3>
          <p className="stat-label">Total Reviews</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">📝</div>
        <div className="stat-content">
          <h3 className="stat-number">{stats.pendingReviews}</h3>
          <p className="stat-label">Pending Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;