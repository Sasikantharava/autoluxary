import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getGallery } from '../../services/galleryService';
import LoadingSpinner from '../common/LoadingSpinner';
import './Gallery.css';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        const data = await getGallery();
        
        // Handle different response structures
        let items = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (data && Array.isArray(data.data)) {
          items = data.data;
        } else if (data && Array.isArray(data.gallery)) {
          items = data.gallery;
        } else if (data && Array.isArray(data.items)) {
          items = data.items;
        }

        // Validate items and ensure they have required properties
        const validItems = items.filter(item => 
          item && 
          item.image && 
          typeof item.image === 'string' && 
          item.image.trim() !== ''
        ).map(item => ({
          _id: item._id || Math.random().toString(36).substr(2, 9),
          title: item.title || 'Gallery Image',
          image: item.image,
          category: item.category || 'all',
          featured: item.featured || false
        }));

        if (validItems.length > 0) {
          setGalleryItems(validItems);
          setFilteredItems(validItems);
          setError(null);
        } else {
          setError('No gallery items available');
          setGalleryItems([]);
          setFilteredItems([]);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setError('Failed to load gallery. Please try again later.');
        setGalleryItems([]);
        setFilteredItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
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

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, [galleryItems]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter, galleryItems]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const retryFetch = () => {
    setError(null);
    setIsLoading(true);
    // Retry the fetch
    useEffect(() => {
      const fetchGallery = async () => {
        try {
          const data = await getGallery();
          // ... same fetch logic as above
          let items = [];
          if (Array.isArray(data)) {
            items = data;
          } else if (data && Array.isArray(data.data)) {
            items = data.data;
          }

          const validItems = items.filter(item => 
            item && item.image && typeof item.image === 'string'
          ).map(item => ({
            _id: item._id || Math.random().toString(36).substr(2, 9),
            title: item.title || 'Gallery Image',
            image: item.image,
            category: item.category || 'all',
            featured: item.featured || false
          }));

          if (validItems.length > 0) {
            setGalleryItems(validItems);
            setFilteredItems(validItems);
            setError(null);
          } else {
            setError('No gallery items available');
          }
        } catch (error) {
          console.error('Error fetching gallery:', error);
          setError('Failed to load gallery. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchGallery();
    }, []);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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

  // Get unique categories from gallery items
  const categories = ['all', ...new Set(galleryItems.map(item => item.category).filter(Boolean))];

  if (isLoading) {
    return (
      <section id="gallery" className="gallery" ref={galleryRef}>
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="gallery gradient-bg" ref={galleryRef}>
      <div className="container">
        <motion.div 
          className="gallery-header"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title center" variants={itemVariants}>
            Automotive Gallery
          </motion.h2>
          <motion.p className="section-subtitle center" variants={itemVariants}>
            Explore our premium automotive detailing and customization work
          </motion.p>
        </motion.div>
        
        {error ? (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{error}</p>
            <button onClick={retryFetch} className="btn btn-primary">
              Try Again
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="gallery-filters"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {categories.map(filter => (
                <motion.button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterClick(filter)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </motion.div>
            
            {filteredItems.length > 0 ? (
              <motion.div 
                className="gallery-grid"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    className="gallery-item"
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleImageClick(item)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="gallery-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/1a1a1a/666666?text=Image+Not+Available';
                      }}
                    />
                    <div className="gallery-overlay">
                      <span className="gallery-title">{item.title}</span>
                      {item.category && (
                        <span className="gallery-category">{item.category}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="no-gallery-items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>No gallery items found {activeFilter !== 'all' ? `for ${activeFilter} category` : ''}.</p>
                {activeFilter !== 'all' && (
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className="btn btn-secondary"
                  >
                    Show All Categories
                  </button>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <motion.div 
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <motion.div 
            className="lightbox-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
              &times;
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="lightbox-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600/1a1a1a/666666?text=Image+Not+Available';
              }}
            />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              {selectedImage.category && (
                <span className="lightbox-category">{selectedImage.category}</span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;