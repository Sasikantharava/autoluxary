import React, { useState } from 'react';
import './BookingDetails.css';

const BookingDetails = ({ booking, onBookingUpdate }) => {
  const [status, setStatus] = useState(booking.status);
  const [appointmentDate, setAppointmentDate] = useState(
    booking.appointmentDate ? new Date(booking.appointmentDate).toISOString().split('T')[0] : ''
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    const updatedBooking = {
      ...booking,
      status,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : booking.appointmentDate
    };
    
    await onBookingUpdate(updatedBooking);
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

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      
      <div className="detail-section">
        <h3>Customer Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{booking.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{booking.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{booking.phone}</span>
          </div>
        </div>
      </div>
      
      <div className="detail-section">
        <h3>Service Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Service:</span>
            <span className="detail-value">{booking.service}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`status status-${booking.status}`}>
              {booking.status}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Booking Date:</span>
            <span className="detail-value">{formatDate(booking.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="detail-section">
        <h3>Message</h3>
        <p className="message-text">{booking.message}</p>
      </div>
      
      <div className="detail-section">
        <h3>Update Booking</h3>
        <div className="update-form">
          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select 
              id="status" 
              className="form-control" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
            <input 
              type="date" 
              id="appointmentDate" 
              className="form-control" 
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          
          <button 
            className="btn" 
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;