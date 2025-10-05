import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/bookings" className="nav-link">
              Bookings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reviews" className="nav-link">
              Reviews
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/gallery" className="nav-link">
              Gallery
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;