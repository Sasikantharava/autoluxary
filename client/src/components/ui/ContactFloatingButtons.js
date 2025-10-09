import React from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import './ContactFloatingButtons.css';

const ContactFloatingButtons = () => {
  const phoneNumber = '7721482404'; // Replace with your actual number
  const whatsappNumber = '7721482404'; // Replace with your actual WhatsApp number
  const whatsappMessage = 'Hello! I would like to get more information about your automotive services.';

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`);
  };

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button - Left Side */}
      <div className="floating-contact-left">
        <button 
          className="floating-btn whatsapp-btn"
          onClick={handleWhatsAppClick}
          aria-label="Contact via WhatsApp"
        >
          <FaWhatsapp className="floating-icon" />
          <span className="tooltip left-tooltip">Chat on WhatsApp</span>
        </button>
      </div>
      
      {/* Phone Button - Right Side */}
      <div className="floating-contact-right">
        <button 
          className="floating-btn phone-btn"
          onClick={handlePhoneClick}
          aria-label="Call us"
        >
          <FaPhone className="floating-icon" />
          <span className="tooltip right-tooltip">Call Us Now</span>
        </button>
      </div>
    </>
  );
};

export default ContactFloatingButtons;