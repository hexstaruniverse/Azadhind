const express = require('express');
const router = express.Router();

// controller functions
const { contactUs } = require('../controllers/contactUsController');

router.post('/contact', contactUs);

module.exports = router;