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
      url: 'https://www.instagram.com/luxuryautodetailing',
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
      name: 'Twitter',
      url: 'https://twitter.com/luxuryautodetail',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.954 4.569a10 10 0 01-2.825.775A4.932 4.932 0 0023.337 3a9.864 9.864 0 01-3.127 1.184A4.924 4.924 0 0016.616 3c-2.717 0-4.924 2.208-4.924 4.924 0 .386.045.762.127 1.124C7.728 8.84 4.1 6.84 1.671 3.149a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 01-2.229-.616v.06c0 2.386 1.697 4.374 3.946 4.828a4.936 4.936 0 01-2.224.084c.623 1.945 2.444 3.362 4.6 3.404A9.868 9.868 0 010 19.54a13.94 13.94 0 007.548 2.212c9.055 0 14.009-7.506 14.009-14.009 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/luxury-auto-detailing',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3A2.5 2.5 0 002.5 5.5 2.5 2.5 0 004.98 8 2.5 2.5 0 007.46 5.5 2.5 2.5 0 004.98 3zM2.5 21.5h5V9.5h-5v12zm7.982-12h4.732v1.563h.066c.66-1.253 2.273-2.563 4.682-2.563 5.008 0 5.938 3.293 5.938 7.563v6.937h-5V15.75c0-1.375-.027-3.144-1.914-3.144-1.915 0-2.209 1.496-2.209 3.04v5.854h-5v-12z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UCyourchannel',
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
              <span className="logo-text">LUXURY AUTO</span>
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
                123 Premium Auto Drive<br />
                Luxury District, CA 90210
              </p>
              <p>
                <i className="fas fa-phone"></i>
                +1 (555) 123-4567
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                info@luxuryautoshowcase.com
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