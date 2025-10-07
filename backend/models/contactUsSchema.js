const e = require('express');
const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('ContactDetail', contactUsSchema);