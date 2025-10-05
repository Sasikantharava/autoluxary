import api from './api';
import { fallbackReviews } from '../data/fallbackData';

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews');
    // Handle different response formats
    if (response.data) {
      return Array.isArray(response.data) ? response.data : fallbackReviews;
    }
    return Array.isArray(response) ? response : fallbackReviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Return fallback data
    return fallbackReviews;
  }
};