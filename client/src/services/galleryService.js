import api from './api';

// Fallback gallery data
const fallbackGallery = [

];

export const getGallery = async (category = null) => {
  try {
    const params = category ? { category } : {};
    const response = await api.get('/gallery', { params });
    // Handle different response formats
    if (response && response.data) {
      return Array.isArray(response.data) && response.data.length > 0 
        ? response.data 
        : fallbackGallery;
    }
    return Array.isArray(response) && response.length > 0 
      ? response 
      : fallbackGallery;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    // Return fallback data
    return fallbackGallery;
  }
};