import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* ✅ LOGO + TEXT SIDE BY SIDE */}
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="LuxeGoAutoSpa Logo" className="logo-img" />
            <span className="logo-text">LUXEGOAUTOSPA</span>
          </Link>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
          <li><a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
          <li><a href="#showcase" className="nav-link" onClick={(e) => handleNavClick(e, 'showcase')}>Showcase</a></li>
          <li><a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
          <li><a href="#reviews" className="nav-link" onClick={(e) => handleNavClick(e, 'reviews')}>Reviews</a></li>
          <li><a href="#gallery" className="nav-link" onClick={(e) => handleNavClick(e, 'gallery')}>Gallery</a></li>
          <li><a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
        </ul>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
