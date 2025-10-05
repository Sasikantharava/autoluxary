import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/auth/me');
    console.log('Profile response:', response);
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};