import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <Header />
      <main className="terms-content">
        <div className="container">
          <h1>Terms of Service</h1>
          <div className="terms-section">
            <h2>Services</h2>
            <p>By using our services, you agree to:</p>
            <ul>
              <li>Provide accurate information about your vehicle</li>
              <li>Follow our care instructions</li>
              <li>Pay for services rendered</li>
              <li>Respect our equipment and facilities</li>
            </ul>
          </div>
          
          <div className="terms-section">
            <h2>Payment Terms</h2>
            <p>Payment is due upon completion of services unless otherwise agreed.</p>
            <p>We accept cash, credit cards, and other payment methods as specified.</p>
          </div>
          
          <div className="terms-section">
            <h2>Cancellation Policy</h2>
            <p>Cancellations must be made at least 24 hours in advance.</p>
            <p>Late cancellations may be subject to a cancellation fee.</p>
          </div>
          
          <div className="terms-section">
            <h2>Limitation of Liability</h2>
            <p>We are not liable for any damage to vehicles left in our care beyond what is covered by our insurance.</p>
            <p>We are not responsible for personal items left in vehicles.</p>
          </div>
          
          <div className="terms-section">
            <h2>Contact Us</h2>
            <p>For questions about our Terms of Service, please contact us at:</p>
            <p>Email: info@luxuryautoshowcase.com</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;