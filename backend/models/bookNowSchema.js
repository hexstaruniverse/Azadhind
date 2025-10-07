const mongoose = require('mongoose');

const bookNowSchema = new mongoose.Schema({
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
    country: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: false
    },
    payload_mass: {
        type: String
    },
    target_quater: {
        type: String
    },
    target_altitude: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookNowSchema);