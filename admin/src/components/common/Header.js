import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

const Header = ({ onMenuToggle }) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        {/* ✅ Added Logo with Text */}
        <div className="admin-logo">
          <img src="/logo.png" alt="LuxeGoAutoSpa Logo" className="admin-logo-img" />
      
        </div>
        <h1 className="admin-title">Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">Welcome, {user?.name || 'Admin'}</span>
        </div>
        <button 
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <span className="logout-icon">🚪</span>
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;