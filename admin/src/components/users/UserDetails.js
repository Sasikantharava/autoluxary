import React from 'react';
import './UserDetails.css';

const UserDetails = ({ user }) => {
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

  return (
    <div className="user-details">
      <h2>User Details</h2>
      
      <div className="detail-section">
        <h3>Personal Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{user.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Role:</span>
            <span className={`role role-${user.role}`}>
              {user.role}
            </span>
          </div>
        </div>
      </div>
      
      <div className="detail-section">
        <h3>Account Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">User ID:</span>
            <span className="detail-value">{user._id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Joined:</span>
            <span className="detail-value">{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>
      
      {user.avatar && (
        <div className="detail-section">
          <h3>Avatar</h3>
          <div className="avatar-container">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="user-avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;