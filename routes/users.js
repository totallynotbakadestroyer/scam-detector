const express = require('express');
const router = express.Router();

const scammerController = require('../controllers/scammerController');
const userController = require('../controllers/userController')

router.get('/check/:id', scammerController.scammerStatus);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;
