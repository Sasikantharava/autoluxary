import React, { useState, useEffect } from 'react';
import BookingList from '../components/bookings/BookingList';
import BookingDetails from '../components/bookings/BookingDetails';
import { getBookings, updateBooking } from '../services/bookingService';
import './Bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

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
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <h1>Bookings</h1>
      
      <div className="bookings-container">
        <div className="bookings-list-container">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({bookings.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({bookings.filter(b => b.status === 'pending').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress ({bookings.filter(b => b.status === 'in-progress').length})
            </button>
            <button 
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({bookings.filter(b => b.status === 'completed').length})
            </button>
          </div>
          
          <BookingList 
            bookings={filteredBookings} 
            onBookingSelect={handleBookingSelect}
            selectedBookingId={selectedBooking?._id}
          />
        </div>
        
        <div className="booking-details-container">
          {selectedBooking ? (
            <BookingDetails 
              booking={selectedBooking} 
              onBookingUpdate={handleBookingUpdate}
            />
          ) : (
            <div className="no-booking-selected">
              <p>Select a booking to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;