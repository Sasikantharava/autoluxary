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
        const data = await getGallery();

        if (Array.isArray(data) && data.length > 0) {
          setGalleryItems(data);
          setFilteredItems(data);
        } else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
          setGalleryItems(data.data);
          setFilteredItems(data.data);
        } else {
          console.warn('No gallery items from API');
          setGalleryItems([]);
          setFilteredItems([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setError('Failed to load gallery');
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => {
      if (galleryRef.current) observer.unobserve(galleryRef.current);
    };
  }, [galleryItems]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter, galleryItems]);

  const handleFilterClick = (filter) => setActiveFilter(filter);
  const handleImageClick = (item) => setSelectedImage(item);
  const closeLightbox = () => setSelectedImage(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] } },
  };

  if (isLoading) {
    return (
      <section id="gallery" className="gallery" ref={galleryRef}>
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="gallery" ref={galleryRef}>
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
        </motion.div>

        <motion.div 
          className="gallery-filters"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {['all', 'exteriors', 'interiors', 'details', 'performance'].map(filter => (
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

        {filteredItems && filteredItems.length > 0 ? (
          <motion.div 
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id || index}
                className="gallery-item"
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={item.image || 'https://via.placeholder.com/300x200?text=Gallery+Image'}
                  alt={item.title || 'Gallery Image'}
                  className="gallery-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-title">{item.title || 'Gallery Image'}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="no-gallery-items"
            variants={itemVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <p>No gallery items found for this category.</p>
          </motion.div>
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
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <img
              src={selectedImage.image || 'https://via.placeholder.com/800x600?text=Gallery+Image'}
              alt={selectedImage.title || 'Gallery Image'}
              className="lightbox-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
