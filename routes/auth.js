const router = require('express').Router();
const { authController } = require('../controllers')

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', authController.login);

module.exports = router;
