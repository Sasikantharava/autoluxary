// server.js
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

// Initialize Express
const app = express();

// Trust proxy (important for Render behind a proxy)
app.set('trust proxy', 1);

// Security middleware with custom configuration
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false // Disable if it conflicts with your frontend
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// CORS configuration - More permissive for development
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173', // Vite default
  'https://autoluxary.vercel.app',
  'https://autoluxary-x753.vercel.app',
  'https://autoluxary.onrender.com' // Your own backend
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, server-to-server)
    if (!origin) return callback(null, true);
    
    // Allow all origins in development
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Initialize email service safely with better error handling
try {
  const emailInitResult = initEmailService();
  if (emailInitResult && emailInitResult.success === false) {
    console.warn('Email service initialized with warnings:', emailInitResult.message);
  } else {
    console.log('✅ Email service initialized successfully');
  }
} catch (err) {
  console.warn('⚠️ Email service initialization failed. Email features will be disabled:', err.message);
}

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Luxury Auto Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API status route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/users', userRoutes);

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Available at your primary URL ${process.env.BACKEND_URL || 'http://localhost:' + PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close();
    console.log('Process terminated');
  });
});