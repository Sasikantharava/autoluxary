import React from 'react';
import './BookingList.css';

const BookingList = ({ bookings, onBookingSelect, selectedBookingId }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="booking-list">
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr 
                  key={booking._id} 
                  className={`booking-row ${selectedBookingId === booking._id ? 'selected' : ''}`}
                  onClick={() => onBookingSelect(booking)}
                >
                  <td>{booking.name}</td>
                  <td>{booking.service}</td>
                  <td>
                    <span className={`status status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>{formatDate(booking.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingList;