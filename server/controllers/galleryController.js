const Gallery = require('../models/Gallery');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const gallery = await Gallery.find(query).sort({ featured: -1, createdAt: -1 });

    res.status(200).json(gallery);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single gallery image
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItem = async (req, res, next) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json(galleryItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res, next) => {
  try {
    const { title, image, category, featured } = req.body;

    // Create gallery item
    const galleryItem = await Gallery.create({
      title,
      image,
      category,
      featured,
    });

    res.status(201).json(galleryItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res, next) => {
  try {
    let galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(galleryItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    await galleryItem.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};