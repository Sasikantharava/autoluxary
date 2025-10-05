const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['exteriors', 'interiors', 'details', 'performance'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Gallery', gallerySchema);