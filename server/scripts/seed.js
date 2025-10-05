const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Review = require('../models/Review');
const Gallery = require('../models/Gallery');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Review.deleteMany({});
    await Gallery.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@luxuryauto.com',
      password: 'admin123',
      phone: '+1234567890',
      role: 'admin',
    });

    console.log('Admin user created:', adminUser.email);

    // Create sample reviews
    const reviews = [
      {
        name: 'Michael Rodriguez',
        rating: 5,
        text: 'Absolutely incredible work! My McLaren has never looked better. The attention to detail is phenomenal and the team\'s expertise really shows.',
        approved: true,
      },
      {
        name: 'Sarah Johnson',
        rating: 5,
        text: 'Professional service from start to finish. The custom interior work exceeded all my expectations. Highly recommend for luxury modifications.',
        approved: true,
      },
      {
        name: 'David Chen',
        rating: 5,
        text: 'Best automotive service in the city! The performance tuning transformed my car completely. Outstanding craftsmanship and customer service.',
        approved: true,
      },
      {
        name: 'Emma Thompson',
        rating: 5,
        text: 'The paint protection and ceramic coating work is flawless. My vehicle looks showroom perfect even after months. Worth every penny!',
        approved: true,
      },
      {
        name: 'James Wilson',
        rating: 5,
        text: 'Incredible attention to detail and premium quality work. The team understood exactly what I wanted and delivered beyond expectations.',
        approved: true,
      },
    ];

    await Review.insertMany(reviews);
    console.log('Sample reviews created');

    // Create sample gallery items
    const galleryItems = [
      {
        title: 'Luxury Sports Car Exterior',
        image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/926b71a4426a303f1fe650d039a11dbf7b8a01cd.png',
        category: 'exteriors',
        featured: true,
      },
      {
        title: 'Premium Car Interior',
        image: 'https://pplx-res.cloudinary.com/image/upload/v1756418015/pplx_project_search_images/6e978c2a56fe660d607267ef9d40e047b4b7d698.png',
        category: 'interiors',
        featured: false,
      },
      {
        title: 'Carbon Fiber Details',
        image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/78b24a4335e57673ab946fceacb979baa634a557.png',
        category: 'details',
        featured: false,
      },
      {
        title: 'Engine Bay Showcase',
        image: 'https://pplx-res.cloudinary.com/image/upload/v1758736290/pplx_project_search_images/eb2ee86ffe6a4fcfbec689ea1d4d66ecafc5df24.png',
        category: 'performance',
        featured: true,
      },
    ];

    await Gallery.insertMany(galleryItems);
    console.log('Sample gallery items created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();