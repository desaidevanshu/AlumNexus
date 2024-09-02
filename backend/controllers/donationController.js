// controllers/donationController.js
const Donation = require('../models/Donation');

exports.donate = async (req, res) => {
    const { amount, cause } = req.body;

    try {
        const newDonation = new Donation({ amount, cause, user: req.user.id });
        await newDonation.save();
        res.status(201).json({ message: 'Donation successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
