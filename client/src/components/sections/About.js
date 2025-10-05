import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  
  // Counter animations
  const yearsCount = useCountUp(15, isVisible);
  const customersCount = useCountUp(500, isVisible);
  const satisfactionCount = useCountUp(100, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('About section is visible');
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Debug: Log counter values
  useEffect(() => {
    console.log('Years count:', yearsCount);
    console.log('Customers count:', customersCount);
    console.log('Satisfaction count:', satisfactionCount);
  }, [yearsCount, customersCount, satisfactionCount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
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
    <section id="about" className="about gradient-bg" ref={aboutRef}>
      <div className="container">
        <motion.div 
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="about-content" variants={itemVariants}>
            <h2 className="section-title">Crafting Automotive Dreams into Reality</h2>
            <p className="about-description">
              At our premium automotive studio, we transform ordinary vehicles into extraordinary masterpieces. 
              With over 15 years of expertise in high-performance modifications, luxury detailing, and custom 
              automotive solutions, we deliver unparalleled craftsmanship that exceeds expectations.
            </p>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">{yearsCount}</span>
                <span className="stat-plus">+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{customersCount}</span>
                <span className="stat-plus">+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{satisfactionCount}</span>
                <span className="stat-plus">%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </motion.div>
          <motion.div className="about-image" variants={itemVariants}>
            <img 
              src="https://pplx-res.cloudinary.com/image/upload/v1756418015/pplx_project_search_images/6e978c2a56fe660d607267ef9d40e047b4b7d698.png" 
              alt="Luxury Car Interior" 
              className="about-img"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;