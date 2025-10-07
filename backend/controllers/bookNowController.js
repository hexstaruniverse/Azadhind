const BookNow = require('../models/bookNowSchema');
const validator = require('validator');
const mongoose = require('mongoose');

const addLead = async (req, res) => {
    const { name, email, contact_number, country, organization } = req.body;

    try {
        if(!validator.isEmail(email)) {
            throw Error('Invalid email format');
        }

        const newLead = await BookNow.create({
            name,
            email,
            contact_number,
            country,
            organization
        })

        res.status(200).json({ message: 'Lead registered successfully', lead: newLead });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateLead = async (req, res) => {
    const { id } = req.params;
    const {payload_mass, target_quater, target_altitude} = req.body;

    try {

        if(!id) {
            throw Error('ID is required');
        }

        if(!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Invalid ID format');
        }

        const updatedLead = await BookNow.findByIdAndUpdate(id,{
            payload_mass,
            target_quater,
            target_altitude
        })  

        res.status(200).json({ message: 'Lead updated successfully', lead: updatedLead });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addLead, updateLead };