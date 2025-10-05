const nodemailer = require('nodemailer');
require('dotenv').config();

let emailEnabled = false;
let transporter = null;

// Create a transporter with environment-specific settings
const createTransporter = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  const config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  // Add Render-specific optimizations
  if (isProduction) {
    config.host = 'smtp.gmail.com';
    config.port = 587;
    config.secure = false;
    config.connectionTimeout = 15000; // 15 seconds
    config.socketTimeout = 15000;
    config.greetingTimeout = 15000;
    config.requireTLS = true;
    config.tls = {
      rejectUnauthorized: false
    };
  }

  return nodemailer.createTransport(config);
};

// Test email configuration with timeout
const testEmailConfig = async () => {
  try {
    transporter = createTransporter();
    
    // Add timeout for verification
    const verificationPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email verification timeout')), 10000);
    });

    await Promise.race([verificationPromise, timeoutPromise]);
    console.log('✅ Email server is ready to send messages');
    return true;
  } catch (error) {
    console.warn('⚠️ Email configuration issue:', error.message);
    
    // Still create transporter for fallback attempts
    if (!transporter) {
      transporter = createTransporter();
    }
    
    return false;
  }
};

// Send confirmation email to customer with fallback
const sendConfirmationEmail = async (options) => {
  // If email is not enabled, simulate success
  if (!emailEnabled || !transporter) {
    console.log('📧 Email service unavailable - simulating confirmation email');
    return { 
      success: true, 
      simulated: true,
      message: 'Booking confirmed (email service unavailable)' 
    };
  }

  try {
    const mailOptions = {
      from: `${process.env.FROM_NAME || 'Luxury Auto Detailing'} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: 'Booking Confirmation - Luxury Auto Detailing',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #FF6B35; margin: 0;">Luxury Auto Detailing</h1>
          <p style="margin: 5px 0 0 0; color: #555;">Your booking is confirmed!</p>
        </div>

        <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Hello ${options.name},</h2>
          <p>Thank you for booking with us! Here are your booking details:</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${options.bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${options.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${options.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${options.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; vertical-align: top;"><strong>Message:</strong></td>
              <td style="padding: 10px;">${options.message}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; color: #555;">We will review your request and contact you shortly to confirm the appointment details.</p>
        </div>

        <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">This is an automated message. Please do not reply.</p>
      </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to:', options.email);
    return { 
      success: true, 
      messageId: result.messageId 
    };
  } catch (error) {
    console.warn('📧 Failed to send confirmation email:', error.message);
    // Return success anyway so the booking isn't blocked
    return { 
      success: true, 
      simulated: true,
      error: error.message 
    };
  }
};

// Send notification email to admin with fallback
const sendAdminNotificationEmail = async (booking) => {
  // If email is not enabled, simulate success
  if (!emailEnabled || !transporter) {
    console.log('📧 Email service unavailable - simulating admin notification');
    return { 
      success: true, 
      simulated: true,
      message: 'Admin notified (email service unavailable)' 
    };
  }

  try {
    const mailOptions = {
      from: `${process.env.FROM_NAME || 'Luxury Auto Detailing'} <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Booking Request - Luxury Auto Detailing',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #FF6B35; margin: 0;">Luxury Auto Detailing</h1>
          <p style="margin: 5px 0 0 0; color: #555;">New booking received!</p>
        </div>

        <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Booking Details</h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking._id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; vertical-align: top;"><strong>Message:</strong></td>
              <td style="padding: 10px;">${booking.message}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-top: 1px solid #eee;"><strong>Date:</strong></td>
              <td style="padding: 10px; border-top: 1px solid #eee;">${new Date(booking.createdAt).toLocaleString()}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.ADMIN_URL || 'http://localhost:3001'}/bookings" style="background-color: #FF6B35; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View in Admin Panel</a>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">This is an automated message. Please do not reply.</p>
      </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent for booking:', booking._id);
    return { 
      success: true, 
      messageId: result.messageId 
    };
  } catch (error) {
    console.warn('📧 Failed to send admin notification:', error.message);
    // Return success anyway so the booking isn't blocked
    return { 
      success: true, 
      simulated: true,
      error: error.message 
    };
  }
};

// Initialize email service
const initEmailService = async () => {
  const isConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

  if (!isConfigured) {
    console.warn('📧 Email service not configured. Forms will work without email notifications.');
    emailEnabled = false;
    return { success: false, message: 'Email credentials missing' };
  }

  try {
    emailEnabled = await testEmailConfig();
    
    if (emailEnabled) {
      console.log('✅ Email service initialized successfully');
    } else {
      console.warn('⚠️ Email service initialized with limitations. Forms will work, but emails may fail.');
    }
    
    return { success: true, emailEnabled };
  } catch (error) {
    console.warn('⚠️ Email service initialization completed with warnings:', error.message);
    console.log('💡 Forms will continue to work without email notifications');
    emailEnabled = false;
    return { success: true, emailEnabled: false }; // Still return success
  }
};

// Check if email is enabled
const isEmailEnabled = () => emailEnabled;

module.exports = {
  sendConfirmationEmail,
  sendAdminNotificationEmail,
  initEmailService,
  isEmailEnabled
};