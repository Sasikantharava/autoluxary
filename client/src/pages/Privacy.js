import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <Header />
      <main className="privacy-content">
        <div className="container">
          <h1>Privacy Policy</h1>
          <div className="privacy-section">
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out a form on our website or contact us for services.</p>
            <p>This may include:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Vehicle information</li>
              <li>Service preferences</li>
            </ul>
          </div>
          
          <div className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul>
              <li>Provide our services</li>
              <li>Communicate with you about your bookings</li>
              <li>Improve our services</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </div>
          
          <div className="privacy-section">
            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>
          </div>
          
          <div className="privacy-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Update your personal information</li>
              <li>Delete your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
          
          <div className="privacy-section">
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Email: privacy@luxuryautoshowcase.com</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;