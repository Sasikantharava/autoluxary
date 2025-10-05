import api from './api';

export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    // Handle different response formats
    if (response && response.data) {
      return Array.isArray(response.data) ? response.data : [];
    }
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    // Return empty array as fallback
    return [];
  }
};

export const updateBooking = async (id, bookingData) => {
  try {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data || response;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};