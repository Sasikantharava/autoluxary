import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/luxuryautodetailing',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12-5.373-12-12 5.373-12 12 5.373 12 12 5.373 12 12zm0-1.8c-5.39 0-9.727-4.363-9.727-9.727s4.363-9.727 9.727-9.727 9.727 4.363 9.727 9.727-4.363 9.727-9.727-9.727z"/>
          <path d="M15.825 11.5h-3.65v-2.727c0-1.455 1.018-2.727 2.727-2.727h1.636c1.455 0 2.727 1.272 2.727 2.727v2.727h-3.636c-2.909 0-5.455-2.363-5.455-5.455s2.545-5.455 5.455-5.455h3.636v2.727z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/luxuryautodetailing',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.235 4.833.688.688-1.629.688-3.629.235-4.833.688-1.629.235-4.833-.688-3.629-3.629-4.833-3.629-4.833 0-3.204 2.363-5.455 5.455-5.455 3.204 0 5.455 2.363 5.455 5.455zm0 7.734c-2.545 0-4.636-2.091-4.636-4.636 0-2.545 2.091-4.636 4.636-2.545 0-4.636 2.091-4.636 4.636z"/>
          <path d="M16.318 16.318h-1.636v-2.727c0-1.455 1.018-2.727 2.727-2.727h1.636c1.455 0 2.727 1.272 2.727 2.727v2.727h-1.636c-2.909 0-5.455-2.363-5.455-5.455s2.545-5.455 5.455-5.455h1.636v2.727z"/>
          <path d="M20.318 16.318h-1.636v-2.727c0-1.455 1.018-2.727 2.727-2.727h1.636c1.455 0 2.727 1.272 2.727 2.727v2.727h-1.636c-2.909 0-5.455-2.363-5.455-5.455s2.545-5.455 5.455-5.455h1.636v2.727z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/luxuryautodetail',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775l.145.125a.75.75 0 01-1.085 1.04l-.145.125a10 10 0 01-2.825-.775l-.145-.125a.75.75 0 01-1.04 1.085l.145.125zm-1.085 1.085a10 10 0 01-2.825-.775l-.145-.125a.75.75 0 01-1.04 1.085l.145.125zm-1.085 1.085a10 10 0 01-2.825-.775l-.145-.125a.75.75 0 01-1.04 1.085l.145.125z"/>
          <path d="M8.25 10.75a.75.75 0 01-.75.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM12 16.5a.75.75 0 01-.75.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/luxury-auto-detailing',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.523-3.037-1.523 0-1.823.645-3.037 1.523-3.037v-5.569h-3.554v-8.938h3.554v1.628c0 .894-.018 2.018-.018 2.018v-1.628h-3.554zm-9.894 0v-8.938h3.554v5.569c0 1.328.027 3.037 1.523 3.037 1.523 0 1.823-.645 3.037-1.523 3.037v-5.569h-3.554v-8.938h-3.554z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8z"/>
        </svg>
      )
    }
  ];

  const quickLinks = [
    { name: 'Admin Guide', url: '/admin-guide' },
    { name: 'API Documentation', url: '/api-docs' },
    { name: 'Support', url: '/support' }
  ];

  return (
    <footer className="admin-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">LUXURY AUTO</span>
              <p className="footer-tagline">Admin Panel</p>
            </div>
            <p className="footer-description">
              Comprehensive management system for luxury automotive detailing services, bookings, reviews, and gallery management.
            </p>
            <div className="social-links">
              <h4>Connect</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/bookings">Bookings</a></li>
              <li><a href="/reviews">Reviews</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/users">Users</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="/admin-guide">Admin Guide</a></li>
              <li><a href="/api-docs">API Docs</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>System Info</h4>
            <div className="system-info">
              <p>
                <i className="fas fa-server"></i>
                Version: 1.0.0<br />
                Last Updated: {new Date().toLocaleDateString()}
              </p>
              <p>
                <i className="fas fa-database"></i>
                MongoDB Connected
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Luxury Auto Admin Panel. All rights reserved.</p>
            </div>
            <div className="footer-legal">
              {quickLinks.map((link, index) => (
                <a key={index} href={link.url} className="legal-link">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;