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

// Initialize email service
initEmailService();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiter (avoid spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Parse JSON and form data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:3000',        // Local frontend
  'http://localhost:3001',        // Local admin
  'http://localhost:3002',        // Alternative local port
  'https://autoluxary.vercel.app' // ✅ Your live frontend (Vercel)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Postman or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Enable preflight requests
app.options('*', cors());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/users', userRoutes);

// Error handler
app.use(errorHandler);

// Server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
