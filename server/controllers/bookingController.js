const Booking = require('../models/Booking');
const { sendConfirmationEmail, sendAdminNotificationEmail } = require('../utils/emailService');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Create booking
    const booking = await Booking.create({
      name,
      email,
      phone,
      service,
      message,
    });

    // Send confirmation email to customer
    try {
      await sendConfirmationEmail({
        email,
        name,
        service,
        bookingId: booking._id,
        message,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Continue with the response even if email fails
    }

    // Send notification email to admin
    try {
      await sendAdminNotificationEmail(booking);
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
      // Continue with the response even if email fails
    }

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private/Admin
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBooking = async (req, res, next) => {
  try {
    const { status, appointmentDate } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, appointmentDate },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    await booking.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};