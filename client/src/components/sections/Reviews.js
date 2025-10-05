import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fetchGoogleReviews, refreshGoogleReviews } from '../../services/googleReviewsService';
import LoadingSpinner from '../common/LoadingSpinner';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const reviewsRef = useRef(null);
  const autoRotateIntervalRef = useRef(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchGoogleReviews();
        setReviews(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
        setIsLoading(false);
      }
    };

    fetchReviewsData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (reviewsRef.current) {
      observer.observe(reviewsRef.current);
    }

    return () => {
      if (reviewsRef.current) {
        observer.unobserve(reviewsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Set up auto-rotation
      autoRotateIntervalRef.current = setInterval(() => {
        setCurrentReviewIndex((prevIndex) => 
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => {
        if (autoRotateIntervalRef.current) {
          clearInterval(autoRotateIntervalRef.current);
        }
      };
    }
  }, [reviews]);

  const handlePrevReview = () => {
    if (reviews && reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      // Reset auto-rotation timer
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = setInterval(() => {
          setCurrentReviewIndex((prevIndex) => 
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000);
      }
    }
  };

  const handleNextReview = () => {
    if (reviews && reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
      // Reset auto-rotation timer
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = setInterval(() => {
          setCurrentReviewIndex((prevIndex) => 
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000);
      }
    }
  };

  const handleRefreshReviews = async () => {
    setIsRefreshing(true);
    try {
      const data = await refreshGoogleReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error refreshing reviews:', error);
      setError('Failed to refresh reviews');
    } finally {
      setIsRefreshing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };

  const GoogleReviewsWidget = () => {
    return (
      <div className="google-reviews-widget">
        <div className="google-reviews-widget-header">
          <h3>Leave a Review</h3>
          <p>Your feedback helps us improve our services</p>
        </div>
        <div className="google-reviews-widget-content">
          <a 
            href="https://search.google.com/local/reviews?placeid=YOUR_GOOGLE_PLACE_ID" 
            target="_blank" 
            rel="noopener noreferrer"
            className="write-review-btn"
          >
            Write a Review
          </a>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section id="reviews" className="reviews" ref={reviewsRef}>
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="reviews" ref={reviewsRef}>
        <div className="container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="reviews" ref={reviewsRef}>
      <div className="container">
        <motion.div 
          className="reviews-header"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title center" variants={itemVariants}>
            What Our Customers Are Saying
          </motion.h2>
          <motion.div className="google-badge" variants={itemVariants}>
            <span>⭐ Google Reviews</span>
          </motion.div>
        </motion.div>
        
        {reviews && reviews.length > 0 ? (
          <>
            <motion.div 
              className="reviews-carousel"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className="reviews-track">
                {reviews.map((review, index) => (
                  <motion.div 
                    key={review._id || index}
                    className={`review-card ${index === currentReviewIndex ? 'active' : ''}`}
                    variants={itemVariants}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: index === currentReviewIndex ? 1 : 0,
                      x: index === currentReviewIndex ? 0 : 100,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div className="review-header">
                      <div className="reviewer-info">
                        {review.profilePhoto && (
                          <img 
                            src={review.profilePhoto} 
                            alt={review.name} 
                            className="reviewer-avatar"
                          />
                        )}
                        <div>
                          <h4 className="reviewer-name">{review.name}</h4>
                          <a 
                            href={review.authorUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="google-profile-link"
                            title="View Google Profile"
                          >
                            <svg className="google-icon" viewBox="0 0 24 24" width="16" height="16">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="review-text">"{review.text}"</p>
                    <div className="review-footer">
                      <span className="review-date">
                        {review.relativeTime}
                      </span>
                      {review.isTranslated && (
                        <span className="translated-badge">Translated</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="carousel-controls">
                <button className="carousel-btn" onClick={handlePrevReview}>‹</button>
                <button className="carousel-btn" onClick={handleNextReview}>›</button>
              </div>
            </motion.div>
            
            <motion.div 
              className="reviews-footer"
              variants={itemVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <button 
                onClick={handleRefreshReviews}
                className={`refresh-btn ${isRefreshing ? 'loading' : ''}`}
                disabled={isRefreshing}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh Reviews'}
              </button>
              <a 
                href="https://www.google.com/search?q=luxury+auto+detailing+reviews" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="view-all-reviews"
              >
                View All Google Reviews
              </a>
            </motion.div>

            <div className="google-reviews-widget-container">
              <GoogleReviewsWidget />
            </div>
          </>
        ) : (
          <motion.div 
            className="no-reviews"
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <p>No reviews available yet. Be the first to share your experience!</p>
            <div className="google-reviews-widget-container">
              <GoogleReviewsWidget />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Reviews;