import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optional: Handle video loading and playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down video slightly for dramatic effect
    }
  }, []);

  const handleButtonClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
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

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-background">
        {/* Replace the background image with video */}
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          style={{
            transform: `scale(1.1) translateY(${scrollY * 0.5}px)`
          }}
        >
          <source 
            src="https://cdn.pixabay.com/video/2023/09/21/181533-866999835_large.mp4"
            type="video/mp4" 
          />
          {/* Fallback image in case video doesn't load */}
          <img 
            src="https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/926b71a4426a303f1fe650d039a11dbf7b8a01cd.png" 
            alt="Hero background" 
          />
        </video>
        
        <div className="hero-overlay"></div>
        
        {/* Morphing shapes for visual effect */}
        <div className="morphing-shape" style={{ top: '10%', left: '10%', width: '300px', height: '300px' }}></div>
        <div className="morphing-shape" style={{ bottom: '10%', right: '10%', width: '250px', height: '250px', animationDelay: '5s' }}></div>
      </div>
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="text-reveal">
              <span>EXPERIENCE</span>
              <span>AUTOMOTIVE</span>
              <span>EXCELLENCE</span>
            </span>
          </motion.h1>
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Where Performance Meets Perfection
          </motion.p>
          <motion.div className="hero-buttons" variants={itemVariants}>
            <button 
              className="btn btn-primary hero-btn"
              onClick={(e) => handleButtonClick(e, 'showcase')}
            >
              EXPLORE COLLECTION
            </button>
            <button 
              className="btn btn-secondary hero-btn"
              onClick={(e) => handleButtonClick(e, 'contact')}
            >
              BOOK CONSULTATION
            </button>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="scroll-indicator floating">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;