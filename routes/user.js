const router = require('express').Router();
const { checkLoggedIn } = require('../middlewares/userJWTAuth');
const { userController } = require('../controllers');


// @route   GET api/user
// @desc    Get user data
// @access  Private
router.get('/', checkLoggedIn, userController.getUser);

// @route POST api/user/addToCart
// @desc Add product to cart
// @access Private
router.post('/addToCart', userController.addToCart);

// @route POST api/user/removeFromCart
// @desc Remove product from cart
// @access Private
router.post('/removeFromCart', userController.removeFromCart);

// @route GET api/user/cartCount
// @desc Get cart count
// @access Private
router.get('/cartCount/:id', userController.cartCount);

// @route GET api/user/cartProducts
// @desc Get cart products
// @access Private
router.get('/cart/:id',checkLoggedIn, userController.cartProducts);

// @route POST api/user/cartincrement
// @desc Increment product quantity
// @access Private
router.post('/cartincrement', userController.cartincrement);

// @route POST api/user/cartdecrement
// @desc Decrement product quantity
// @access Private
router.post('/cartdecrement', userController.cartdecrement);

// @route POST api/user/cartdelete
// @desc Delete product from cart
// @access Private
router.post('/cartdelete', userController.cartdelete);


module.exports = router;