const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};

// Send confirmation email to customer
const sendConfirmationEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: 'Booking Confirmation - LUXEGOAUTOSPA Detailing',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #FF6B35; margin: 0;">LUXEGOAUTOSPA Detailing</h1>
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

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', options.email);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
};

// Send notification email to admin
const sendAdminNotificationEmail = async (booking) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Booking Request - LUXEGOAUTOSPA Detailing',
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
            <a href="http://localhost:3001/bookings" style="background-color: #FF6B35; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View in Admin Panel</a>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">This is an automated message. Please do not reply.</p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent for booking:', booking._id);
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
};

// Initialize email service
const initEmailService = async () => {
  const isConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

  if (!isConfigured) {
    console.warn('Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file.');
    return false;
  }

  const isValid = await testEmailConfig();
  if (!isValid) {
    console.error('Email configuration is invalid. Please check your EMAIL_USER and EMAIL_PASSWORD.');
    return false;
  }

  console.log('Email service initialized successfully');
  return true;
};

module.exports = {
  sendConfirmationEmail,
  sendAdminNotificationEmail,
  initEmailService,
};
