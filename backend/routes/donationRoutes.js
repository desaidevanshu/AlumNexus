// routes/donation.js

const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); // Assuming the model is in the models folder

router.post('/verify-payment', async (req, res) => {
    const { amount, currency, razorpayPaymentId, razorpayOrderId, razorpaySignature, donorEmail, donorName } = req.body;

    try {
        // Verify the payment signature here if needed

        // Store the payment details in the database
        const newDonation = new Donation({
            amount,
            currency,
            paymentId: razorpayPaymentId,
            orderId: razorpayOrderId,
            signature: razorpaySignature,
            donorEmail,
            donorName
        });

        await newDonation.save();

        res.status(200).json({ msg: 'Donation stored successfully' });
    } catch (error) {
        console.error('Error storing donation:', error);
        res.status(500).json({ msg: 'Error storing donation' });
    }
});

module.exports = router;
