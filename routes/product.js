const router = require('express').Router();
const { productController } = require('../controllers');


// @route   GET api/products
// @desc    Get user data
// @access  Private
router.get('/', productController.getProducts);

module.exports = router;