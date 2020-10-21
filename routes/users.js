var express = require('express');
var router = express.Router();

const scammerController = require('../controllers/scammerController');
const userController = require('../controllers/userController')

router.get('/check/:id', scammerController.scammerStatus);
router.post('/signup', userController.signUp);

module.exports = router;
