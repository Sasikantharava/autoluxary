const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');

const router = express.Router();

router.get('/', getGallery);
router.get('/:id', getGalleryItem);
router.post('/', protect, authorize('admin'), createGalleryItem);
router.put('/:id', protect, authorize('admin'), updateGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

module.exports = router;