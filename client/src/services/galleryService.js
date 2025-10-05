import api from './api';

// Fallback gallery data
const fallbackGallery = [
  {
    _id: '1',
    title: 'Luxury Sports Car Exterior',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/926b71a4426a303f1fe650d039a11dbf7b8a01cd.png',
    category: 'exteriors',
    featured: true
  },
  {
    _id: '2',
    title: 'Premium Car Interior',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1756418015/pplx_project_search_images/6e978c2a56fe660d607267ef9d40e047b4b7d698.png',
    category: 'interiors',
    featured: false
  },
  {
    _id: '3',
    title: 'Carbon Fiber Details',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/78b24a4335e57673ab946fceacb979baa634a557.png',
    category: 'details',
    featured: false
  },
  {
    _id: '4',
    title: 'Engine Bay Showcase',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/eb2ee86ffe6a4fcfbec689ea1d4d66ecafc5df24.png',
    category: 'performance',
    featured: true
  },
  {
    _id: '5',
    title: 'Custom Paint Job',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/926b71a4426a303f1fe650d039a11dbf7b8a01cd.png',
    category: 'exteriors',
    featured: false
  },
  {
    _id: '6',
    title: 'Leather Interior',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1756418015/pplx_project_search_images/6e978c2a56fe660d607267ef9d40e047b4b7d698.png',
    category: 'interiors',
    featured: false
  },
  {
    _id: '7',
    title: 'Performance Exhaust',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/eb2ee86ffe6a4fcfbec689ea1d4d66ecafc5df24.png',
    category: 'performance',
    featured: false
  },
  {
    _id: '8',
    title: 'Custom Wheels',
    image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/78b24a4335e57673ab946fceacb979baa634a557.png',
    category: 'details',
    featured: false
  }
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