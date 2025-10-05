import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from '../ui/Tilt';
import './Services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  const services = [
    {
      icon: '⚡',
      title: 'Performance Tuning',
      description: 'Unlock your vehicle\'s true potential with our advanced ECU tuning and performance modifications.'
    },
    {
      icon: '✨',
      title: 'Custom Detailing',
      description: 'Premium paint protection, ceramic coatings, and luxury interior treatments for the ultimate finish.'
    },
    {
      icon: '🏆',
      title: 'Interior Luxury',
      description: 'Transform your cabin with bespoke leather work, carbon fiber accents, and custom upholstery.'
    },
    {
      icon: '🔧',
      title: 'Engine Optimization',
      description: 'Professional engine modifications, turbo upgrades, and performance exhaust systems.'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Consultation',
      description: 'Detailed discussion of your vision and requirements'
    },
    {
      number: 2,
      title: 'Custom Design',
      description: 'Tailored solution planning and 3D visualization'
    },
    {
      number: 3,
      title: 'Expert Installation',
      description: 'Professional implementation by certified technicians'
    },
    {
      number: 4,
      title: 'Quality Assurance',
      description: 'Comprehensive testing and final quality inspection'
    }
  ];

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

  return (
    <section id="services" className="services gradient-bg" ref={servicesRef}>
      <div className="container">
        <motion.div 
          className="services-header"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title center" variants={itemVariants}>
            Premium Automotive Services
          </motion.h2>
          <motion.p className="section-subtitle center" variants={itemVariants}>
            Excellence in every detail
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Tilt options={{ max: 15, speed: 400, scale: 1.05 }}>
                <div className="service-card-inner">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="process-section"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h3 className="process-title" variants={itemVariants}>
            Our Process
          </motion.h3>
          <motion.div className="process-steps" variants={containerVariants}>
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="process-step"
                variants={itemVariants}
                custom={index}
              >
                <div className="step-number">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;