import api from './api';

export const getGallery = async () => {
  try {
    const response = await api.get('/gallery');
    console.log('Raw gallery response:', response);
    
    // Handle different response formats
    if (response && response.data) {
      return Array.isArray(response.data) ? response.data : [];
    }
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    // Return empty array as fallback
    return [];
  }
};

export const createGalleryItem = async (itemData) => {
  try {
    const response = await api.post('/gallery', itemData);
    console.log('Create gallery response:', response);
    return response.data || response;
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
};

export const updateGalleryItem = async (id, itemData) => {
  try {
    const response = await api.put(`/gallery/${id}`, itemData);
    console.log('Update gallery response:', response);
    return response.data || response;
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw error;
  }
};

export const deleteGalleryItem = async (id) => {
  try {
    const response = await api.delete(`/gallery/${id}`);
    console.log('Delete gallery response:', response);
    return response.data || response;
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};