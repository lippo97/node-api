var express        = require('express');
var router         = express.Router();

var authController = require('../controllers/authController.js');

// Authentication routes
router.post('/signin', authController.signin);
router.post('/login', authController.login);

// Temp routes
router.get('/users', authController.getAll);

module.exports = router
