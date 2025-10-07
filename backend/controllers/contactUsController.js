const Contacts = require('../models/contactUsSchema');
const validator = require('validator');

const contactUs = async (req, res) => {

    const {name, email, contact_number, organization} = req.body;

    try {

        if(!validator.isEmail(email)){
            throw Error("Invalid email format");
        }

        await Contacts.create({
            name,
            email,
            contact_number,
            organization
        })

        // mail to admin


        res.status(200).json({message: "Contact details submitted successfully"})
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = { contactUs };