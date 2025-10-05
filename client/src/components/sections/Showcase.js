import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from '../ui/Tilt';
import './Showcase.css';

const Showcase = () => {
  const [activeHotspot, setActiveHotspot] = useState('engine');
  const [isVisible, setIsVisible] = useState(false);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
    };
  }, []);

  const handleHotspotClick = (hotspotId) => {
    setActiveHotspot(hotspotId);
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

  const hotspotDetails = {
    engine: {
      title: 'Performance Engine',
      features: [
        'Twin-Turbo V8 Engine',
        '720 Horsepower',
        'Carbon Fiber Components',
        'Advanced ECU Tuning'
      ]
    },
    interior: {
      title: 'Luxury Interior',
      features: [
        'Premium Leather Seats',
        'Carbon Fiber Dashboard',
        'Alcantara Accents',
        'Custom Stitching'
      ]
    },
    wheels: {
      title: 'Performance Wheels',
      features: [
        '20" Forged Alloy Wheels',
        'Performance Tires',
        'Carbon Ceramic Brakes',
        'Custom Paint Finish'
      ]
    },
    exterior: {
      title: 'Aerodynamic Design',
      features: [
        'Active Rear Wing',
        'Carbon Fiber Body Kit',
        'LED Matrix Headlights',
        'Paint Protection Film'
      ]
    }
  };

  return (
    <section id="showcase" className="showcase" ref={showcaseRef}>
      <div className="container">
        <motion.div 
          className="showcase-header"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title center" variants={itemVariants}>
            Interactive Vehicle Showcase
          </motion.h2>
          <motion.p className="section-subtitle center" variants={itemVariants}>
            Discover every detail of automotive excellence
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="showcase-container"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="car-display" variants={itemVariants}>
            <Tilt options={{ max: 15, speed: 400, scale: 1.05 }}>
              <div className="showcase-image-container">
                <img 
                  src="https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/eb2ee86ffe6a4fcfbec689ea1d4d66ecafc5df24.png" 
                  alt="Car Engine Bay Showcase" 
                  className="showcase-image"
                />
                
                {/* Hotspot 1: Engine */}
                <div 
                  className={`hotspot ${activeHotspot === 'engine' ? 'active' : ''}`}
                  style={{ left: '20%', top: '40%' }}
                  onClick={() => handleHotspotClick('engine')}
                >
                  <div className="hotspot-dot"></div>
                  <div className="hotspot-pulse"></div>
                </div>
                
                {/* Hotspot 2: Interior */}
                <div 
                  className={`hotspot ${activeHotspot === 'interior' ? 'active' : ''}`}
                  style={{ left: '50%', top: '60%' }}
                  onClick={() => handleHotspotClick('interior')}
                >
                  <div className="hotspot-dot"></div>
                  <div className="hotspot-pulse"></div>
                </div>
                
                {/* Hotspot 3: Wheels */}
                <div 
                  className={`hotspot ${activeHotspot === 'wheels' ? 'active' : ''}`}
                  style={{ left: '80%', top: '70%' }}
                  onClick={() => handleHotspotClick('wheels')}
                >
                  <div className="hotspot-dot"></div>
                  <div className="hotspot-pulse"></div>
                </div>
                
                {/* Hotspot 4: Exterior */}
                <div 
                  className={`hotspot ${activeHotspot === 'exterior' ? 'active' : ''}`}
                  style={{ left: '70%', top: '30%' }}
                  onClick={() => handleHotspotClick('exterior')}
                >
                  <div className="hotspot-dot"></div>
                  <div className="hotspot-pulse"></div>
                </div>
              </div>
            </Tilt>
          </motion.div>
          
          <motion.div className="hotspot-details" variants={itemVariants}>
            {Object.entries(hotspotDetails).map(([key, details]) => (
              <motion.div 
                key={key}
                className={`detail-card ${activeHotspot === key ? 'active' : ''}`}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ 
                  opacity: activeHotspot === key ? 1 : 0.5, 
                  scale: activeHotspot === key ? 1 : 0.95 
                }}
                transition={{ duration: 0.3 }}
              >
                <h3>{details.title}</h3>
                <ul>
                  {details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;