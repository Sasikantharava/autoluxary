const Review = require('../models/Review');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res, next) => {
  try {
    const { name, rating, text } = req.body;

    // Create review
    const review = await Review.create({
      name,
      rating,
      text,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all approved reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ date: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews (including unapproved)
// @route   GET /api/reviews/all
// @access  Private/Admin
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private/Admin
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    await review.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};