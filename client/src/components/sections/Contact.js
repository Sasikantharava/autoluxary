import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createBooking } from '../../services/bookingService';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createBooking(formData);
      setNotification({
        type: 'success',
        message: 'Thank you! Your consultation request has been sent successfully.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setNotification(null);
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
        ease: [0.6, 0.05, 0.01, 0.9], // Fixed easing value
      },
    },
  };

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="container">
        <motion.div 
          className="contact-header"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title center" variants={itemVariants}>
            Ready to Transform Your Vehicle?
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="contact-form-container" variants={itemVariants}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-control" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <select 
                  id="service" 
                  name="service" 
                  className="form-control" 
                  value={formData.service}
                  onChange={handleChange}
                  required 
                >
                  <option value="">Select Service</option>
                  <option value="performance">Performance Tuning</option>
                  <option value="detailing">Custom Detailing</option>
                  <option value="interior">Interior Luxury</option>
                  <option value="engine">Engine Optimization</option>
                </select>
              </div>
              <div className="form-group">
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-control" 
                  placeholder="Tell us about your vision" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-full-width" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Consultation Request'}
              </button>
            </form>
          </motion.div>
          
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="info-item">
              <h4>Address</h4>
              <p>123 Premium Auto Drive<br />Luxury District</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <p>info@luxuryautoshowcase.com</p>
            </div>
            <div className="info-item">
              <h4>Hours</h4>
              <p>Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Notification */}
      {notification && (
        <motion.div 
          className={`notification notification-${notification.type}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <span>{notification.message}</span>
          <button className="notification-close" onClick={closeNotification}>&times;</button>
        </motion.div>
      )}
    </section>
  );
};

export default Contact;