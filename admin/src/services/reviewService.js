import api from './api';

export const getReviews = async (all = false) => {
  try {
    const url = all ? '/reviews/all' : '/reviews';
    const response = await api.get(url);
    // Handle different response formats
    if (response && response.data) {
      return Array.isArray(response.data) ? response.data : [];
    }
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Return empty array as fallback
    return [];
  }
};

export const updateReview = async (id, reviewData) => {
  try {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data || response;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};