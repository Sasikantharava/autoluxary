import React from 'react';
import './Hotspot.css';

const Hotspot = ({ position, isActive, onClick }) => {
  return (
    <div 
      className={`hotspot ${isActive ? 'active' : ''}`}
      style={position}
      onClick={onClick}
    >
      <div className="hotspot-dot"></div>
      <div className="hotspot-pulse"></div>
    </div>
  );
};

export default Hotspot;