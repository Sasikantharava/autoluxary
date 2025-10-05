import React, { useState, useRef, useEffect } from 'react';
import './Tilt.css';

const Tilt = ({ children, options = {} }) => {
  const [tiltStyle, setTiltStyle] = useState({});
  const elementRef = useRef(null);

  const defaultOptions = {
    max: 15,
    speed: 400,
    scale: 1.05,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -mergedOptions.max;
      const rotateY = ((x - centerX) / centerX) * mergedOptions.max;
      
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${mergedOptions.scale}, ${mergedOptions.scale}, ${mergedOptions.scale})`,
        transition: `transform ${mergedOptions.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      });
    };

    const handleMouseLeave = () => {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: `transform ${mergedOptions.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mergedOptions]);

  return (
    <div ref={elementRef} className="tilt" style={tiltStyle}>
      {children}
    </div>
  );
};

export default Tilt;