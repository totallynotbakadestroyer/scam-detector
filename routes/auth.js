const express = require('express');
const router = express.Router();

const userController = require('../controllers/authController.js')

router.post('/signup', userController.signUp);
router.post('/login', userController.signIn);

module.exports = router;
