import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/luxuryautodetailing',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12v-9.294H9.294v-3.622H12V8.413c0-2.67 1.631-4.124 4.012-4.124 1.14 0 2.122.085 2.408.123v2.792h-1.653c-1.296 0-1.548.616-1.548 1.52v1.996h3.095l-.404 3.622h-2.691V24h5.279C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/luxego_autospa?igsh=MXhqbzIyejllMnYxMA==',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.415a4.92 4.92 0 011.675 1.093 4.92 4.92 0 011.093 1.675c.175.457.36 1.257.415 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.415 2.427a4.92 4.92 0 01-1.093 1.675 4.92 4.92 0 01-1.675 1.093c-.457.175-1.257.36-2.427.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.415a4.92 4.92 0 01-1.675-1.093 4.92 4.92 0 01-1.093-1.675c-.175-.457-.36-1.257-.415-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.415-2.427A4.92 4.92 0 013.741 3.05a4.92 4.92 0 011.675-1.093c.457-.175 1.257-.36 2.427-.415C8.416 2.175 8.796 2.163 12 2.163zm0 1.687c-3.154 0-3.522.012-4.762.07-.998.045-1.54.21-1.9.349-.478.185-.82.406-1.178.763a2.736 2.736 0 00-.763 1.178c-.139.36-.304.902-.349 1.9-.058 1.24-.07 1.608-.07 4.762s.012 3.522.07 4.762c.045.998.21 1.54.349 1.9.185.478.406.82.763 1.178.358.357.7.578 1.178.763.36.139.902.304 1.9.349 1.24.058 1.608.07 4.762.07s3.522-.012 4.762-.07c.998-.045 1.54-.21 1.9-.349.478-.185.82-.406 1.178-.763.357-.358.578-.7.763-1.178.139-.36.304-.902.349-1.9.058-1.24.07-1.608.07-4.762s-.012-3.522-.07-4.762c-.045-.998-.21-1.54-.349-1.9a2.736 2.736 0 00-.763-1.178 2.736 2.736 0 00-1.178-.763c-.36-.139-.902-.304-1.9-.349-1.24-.058-1.608-.07-4.762-.07zm0 3.89a5.953 5.953 0 110 11.906 5.953 5.953 0 010-11.906zm0 9.826a3.873 3.873 0 100-7.746 3.873 3.873 0 000 7.746zm6.406-10.582a1.386 1.386 0 11-2.772 0 1.386 1.386 0 012.772 0z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@luxego.auto.spa',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@luxegoautospa',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.615 3.184A3.006 3.006 0 0122 6v12a3.006 3.006 0 01-2.385 2.816C17.632 21.25 12 21.25 12 21.25s-5.632 0-7.615-.434A3.006 3.006 0 012 18V6a3.006 3.006 0 012.385-2.816C6.368 2.75 12 2.75 12 2.75s5.632 0 7.615.434zM10 8v8l6-4-6-4z" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Sitemap', url: '/sitemap' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">LUXEGOAUTOSPA</span>
              <p className="footer-tagline">Where Performance Meets Perfection</p>
            </div>
            <p className="footer-description">
              Transforming ordinary vehicles into extraordinary masterpieces with premium automotive detailing,
              performance tuning, and custom modifications since 2009.
            </p>
            <div className="social-links">
              <h4>Follow Us</h4>
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
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#showcase">Showcase</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Performance Tuning</a></li>
              <li><a href="#services">Custom Detailing</a></li>
              <li><a href="#services">Interior Luxury</a></li>
              <li><a href="#services">Engine Optimization</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                LuxeGoAutoSpa<br />
                Essex
              </p>
              <p>
                <i className="fas fa-phone"></i>
                7721482404
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                info@luxegoautospa.com
              </p>
              <p>
                <i className="fas fa-clock"></i>
                Mon-Fri: 9AM-6PM<br />
                Sat: 10AM-4PM
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Luxury Automotive Excellence. All rights reserved.</p>
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