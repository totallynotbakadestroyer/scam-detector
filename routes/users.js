var express = require('express');
var router = express.Router();

const scammerController = require('../controllers/scammerController.js');

/* GET users listing. */
router.get('/check/:id', scammerController.scammerStatus);

module.exports = router;
