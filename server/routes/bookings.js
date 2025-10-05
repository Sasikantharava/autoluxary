const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/', protect, authorize('admin'), getBookings);
router.get('/:id', protect, authorize('admin'), getBooking);
router.put('/:id', protect, authorize('admin'), updateBooking);
router.delete('/:id', protect, authorize('admin'), deleteBooking);

module.exports = router;