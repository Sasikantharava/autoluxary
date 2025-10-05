const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);

module.exports = router;