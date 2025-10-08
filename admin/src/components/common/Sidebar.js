import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, isMobileOpen, onMobileClose, onToggle }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/bookings', label: 'Bookings', icon: '📅' },
    { path: '/reviews', label: 'Reviews', icon: '⭐' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/users', label: 'Users', icon: '👥' }
  ];

  const handleNavClick = () => {
    // Close mobile sidebar when a link is clicked
    if (window.innerWidth < 768 && onMobileClose) {
      onMobileClose();
    }
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onMobileClose}
        />
      )}
      
      <aside className={`admin-sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🚗</span>
            {isOpen && <span className="logo-text">Luxury Auto</span>}
          </div>
          <div className="sidebar-controls">
            <button 
              className="sidebar-toggle"
              onClick={handleToggle}
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <span className="toggle-icon">
                {isOpen ? '◀' : '▶'}
              </span>
            </button>
            <button 
              className="sidebar-close mobile-only"
              onClick={onMobileClose}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleNavClick}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {isOpen && <span className="nav-text">{item.label}</span>}
                  {!isOpen && (
                    <span className="nav-tooltip">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {isOpen && (
          <div className="sidebar-footer">
            <div className="sidebar-version">
              <span>v1.0.0</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;