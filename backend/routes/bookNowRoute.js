const express = require('express');
const router = express.Router();

// Controller functions
const { addLead, updateLead } = require('../controllers/bookNowController');

router.post('/add', addLead);
router.put('/update/:id', updateLead);

module.exports = router;