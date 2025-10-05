const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createReview,
  getReviews,
  getAllReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);
router.get('/all', protect, authorize('admin'), getAllReviews);
router.put('/:id', protect, authorize('admin'), updateReview);
router.delete('/:id', protect, authorize('admin'), deleteReview);

module.exports = router;