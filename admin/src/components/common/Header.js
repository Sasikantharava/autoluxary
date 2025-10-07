import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="admin-header">
      <div className="header-container">
  <h1 className="header-title">LUXEGOAUTOSPA Admin</h1>
        <div className="header-user">
          <span className="user-name">{user?.name}</span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;