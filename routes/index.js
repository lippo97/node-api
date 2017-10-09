var express        = require('express');
var router         = express.Router();

var authController = require('../controllers/authController.js');

// Authentication routes
router.post('/signin', authController.signin);
router.post('/login', authController.login);

module.exports = router
