const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const galleryRoutes = require('./routes/gallery');
const userRoutes = require('./routes/users');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import email service
const { initEmailService } = require('./utils/emailService');

// Connect to MongoDB
const connectDB = require('./config/database');
connectDB();

// Initialize Express app
const app = express();

// ⚡ Trust proxy for Render (needed for rate limiting behind proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://autoluxary.vercel.app',
  'https://autoluxary-x753.vercel.app', // Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Preflight for all routes
app.options('*', cors());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/users', userRoutes);

// Initialize email service with safe error handling
try {
  initEmailService();
  console.log('✅ Email service initialized');
} catch (err) {
  console.error('⚠️ Email configuration is invalid:', err.message);
}

// Global error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
