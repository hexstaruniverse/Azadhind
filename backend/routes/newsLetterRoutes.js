const express = require('express');
const router = express.Router();

// controller functions
const { subscribe } = require('../controllers/newsLetterController');

router.post('/subscribe', subscribe);

module.exports = router;