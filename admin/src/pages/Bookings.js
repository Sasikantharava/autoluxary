import React, { useState, useEffect } from 'react';
import BookingList from '../components/bookings/BookingList';
import BookingDetails from '../components/bookings/BookingDetails';
import { getBookings, updateBooking } from '../services/bookingService';
import './Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getBookings();
        setBookings(Array.isArray(data) ? data : []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again.');
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [refreshKey]);

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
  };

  const handleBookingUpdate = async (updatedBooking) => {
    try {
      await updateBooking(updatedBooking._id, updatedBooking);
      
      // Update the booking in the list
      setBookings(bookings.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      ));
      
      // Update the selected booking
      setSelectedBooking(updatedBooking);
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error; // Re-throw to handle in child component
    }
  };

  const refreshBookings = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getBookingCount = (status) => {
    return bookings.filter(booking => booking.status === status).length;
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  if (isLoading) {
    return (
      <div className="bookings-loading">
        <div className="loading-spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error && bookings.length === 0) {
    return (
      <div className="bookings-error">
        <div className="error-icon">⚠️</div>
        <h3>Unable to Load Bookings</h3>
        <p>{error}</p>
        <button onClick={refreshBookings} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  const filterTabs = [
    { key: 'all', label: 'All', count: bookings.length },
    { key: 'pending', label: 'Pending', count: getBookingCount('pending') },
    { key: 'confirmed', label: 'Confirmed', count: getBookingCount('confirmed') },
    { key: 'in-progress', label: 'In Progress', count: getBookingCount('in-progress') },
    { key: 'completed', label: 'Completed', count: getBookingCount('completed') }
  ];

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>Bookings Management</h1>
        <button onClick={refreshBookings} className="btn btn-outline refresh-btn">
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
      
      <div className="bookings-container">
        <div className="bookings-list-container">
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
          
          <BookingList 
            bookings={filteredBookings} 
            onBookingSelect={handleBookingSelect}
            selectedBookingId={selectedBooking?._id}
            isLoading={isLoading}
          />
        </div>
        
        <div className="booking-details-container">
          {selectedBooking ? (
            <BookingDetails 
              booking={selectedBooking} 
              onBookingUpdate={handleBookingUpdate}
              onRefresh={refreshBookings}
            />
          ) : (
            <div className="no-booking-selected">
              <div className="placeholder-icon">📋</div>
              <h3>No Booking Selected</h3>
              <p>Choose a booking from the list to view and edit details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;