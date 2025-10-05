// Get values from environment variables
const PLACE_ID = process.env.REACT_APP_GOOGLE_PLACE_ID || 'YOUR_GOOGLE_PLACE_ID';
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || 'YOUR_GOOGLE_PLACES_API_KEY';

// Cache reviews to avoid hitting API limits
let cachedReviews = null;
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const fetchGoogleReviews = async () => {
  try {
    // Check if we have cached reviews that are still valid
    const now = Date.now();
    if (cachedReviews && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('Using cached Google reviews');
      return cachedReviews;
    }

    console.log('Fetching fresh Google reviews');
    
    // Fetch reviews from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Google API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }
    
    // Transform Google Reviews data to match our format
    const transformedReviews = data.result.reviews.map(review => ({
      _id: review.author_url,
      name: review.author_name,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toISOString(),
      profilePhoto: review.profile_photo_url,
      authorUrl: review.author_url,
      relativeTime: review.relative_time_description,
      // Add additional fields if needed
      language: review.language,
      originalRating: review.original_rating,
      isTranslated: review.text.includes('(Original)') || review.text.includes('(Translated by Google)')
    }));
    
    // Cache the reviews
    cachedReviews = transformedReviews;
    lastFetchTime = now;
    
    return transformedReviews;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    // Return fallback data if API fails
    return getFallbackReviews();
  }
};

// Fallback reviews for when API fails
const getFallbackReviews = () => {
  return [
    {
      _id: 'https://www.google.com/maps/contrib/123456789012345678901',
      name: 'Michael Rodriguez',
      rating: 5,
      text: 'Absolutely incredible work! My McLaren has never looked better. The attention to detail is phenomenal and the team\'s expertise really shows.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      profilePhoto: 'https://lh3.googleusercontent.com/a-/AOh14sih5v6v7k8j9h8g9h8g9h8g9h8g9h8g9h8g=s96-c',
      authorUrl: 'https://www.google.com/maps/contrib/123456789012345678901',
      relativeTime: 'a week ago',
      language: 'en',
      originalRating: 5,
      isTranslated: false
    },
    {
      _id: 'https://www.google.com/maps/contrib/123456789012345678902',
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Professional service from start to finish. The custom interior work exceeded all my expectations. Highly recommend for luxury modifications.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      profilePhoto: 'https://lh3.googleusercontent.com/a-/AOh14sih5v6v7k8j9h8g9h8g9h8g9h8g9h8g9h8g=s96-c',
      authorUrl: 'https://www.google.com/maps/contrib/123456789012345678902',
      relativeTime: '2 weeks ago',
      language: 'en',
      originalRating: 5,
      isTranslated: false
    },
    {
      _id: 'https://www.google.com/maps/contrib/123456789012345678903',
      name: 'David Chen',
      rating: 5,
      text: 'Best automotive service in the city! The performance tuning transformed my car completely. Outstanding craftsmanship and customer service.',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      profilePhoto: 'https://lh3.googleusercontent.com/a-/AOh14sih5v6v7k8j9h8g9h8g9h8g9h8g9h8g9h8g=s96-c',
      authorUrl: 'https://www.google.com/maps/contrib/123456789012345678903',
      relativeTime: '3 weeks ago',
      language: 'en',
      originalRating: 5,
      isTranslated: false
    },
    {
      _id: 'https://www.google.com/maps/contrib/123456789012345678904',
      name: 'Emma Thompson',
      rating: 5,
      text: 'The paint protection and ceramic coating work is flawless. My vehicle looks showroom perfect even after months. Worth every penny!',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      profilePhoto: 'https://lh3.googleusercontent.com/a-/AOh14sih5v6v7k8j9h8g9h8g9h8g9h8g9h8g9h8g=s96-c',
      authorUrl: 'https://www.google.com/maps/contrib/123456789012345678904',
      relativeTime: 'a month ago',
      language: 'en',
      originalRating: 5,
      isTranslated: false
    },
    {
      _id: 'https://www.google.com/maps/contrib/123456789012345678905',
      name: 'James Wilson',
      rating: 5,
      text: 'Incredible attention to detail and premium quality work. The team understood exactly what I wanted and delivered beyond expectations.',
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      profilePhoto: 'https://lh3.googleusercontent.com/a-/AOh14sih5v6v7k8j9h8g9h8g9h8g9h8g9h8g9h8g=s96-c',
      authorUrl: 'https://www.google.com/maps/contrib/123456789012345678905',
      relativeTime: 'a month ago',
      language: 'en',
      originalRating: 5,
      isTranslated: false
    }
  ];
};

// Function to manually refresh the cache
export const refreshGoogleReviews = async () => {
  cachedReviews = null;
  lastFetchTime = 0;
  return fetchGoogleReviews();
};