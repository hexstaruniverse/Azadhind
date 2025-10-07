const NewsLetter = require('../models/newsLetterSchema');
const validator = require('validator');

const subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email || !validator.isEmail(email)) {
            throw Error('Invalid email address');
        }

        const mail = await NewsLetter.findOne({ email});
        if(mail) {
            throw Error('Email already subscribed');
        }

        await NewsLetter.create({ email });
        return res.status(200).json({ message: 'Subscribed successfully' });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { subscribe };