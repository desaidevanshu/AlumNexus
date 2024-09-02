import React, { useState } from 'react';
import axios from 'axios';

const Donate = () => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handlePayment = async () => {
        const orderUrl = '/api/create-order'; // Adjust the endpoint if necessary
        const paymentDetails = { amount: amount, currency: 'INR' };

        try {
            // Create order on the server
            const { data } = await axios.post(orderUrl, paymentDetails);

            // Initialize Razorpay payment
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
                amount: data.amount,
                currency: data.currency,
                name: 'Alumni Association',
                description: 'Donation',
                order_id: data.id,
                handler: async function (response) {
                    // Send payment details to the server for storage
                    const paymentData = {
                        amount: data.amount,
                        currency: data.currency,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        donorEmail: email,
                        donorName: name
                    };

                    try {
                        await axios.post('/api/verify-payment', paymentData);
                        alert('Payment successful and stored in the database');
                    } catch (error) {
                        console.error('Error storing donation:', error);
                        alert('Payment successful but storing in database failed');
                    }
                },
                prefill: {
                    name: name,
                    email: email
                },
                notes: {
                    address: 'Razorpay Corporate Office'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error in processing payment:', error);
            alert('Payment failed');
        }
    };

    return (
        <div className="donation-container">
            <h2>Donate to Alumni Association</h2>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handlePayment}>Donate</button>
        </div>
    );
};

export default Donate;
