// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('your-stripe-secret-key'); // Use your Stripe Secret Key

admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
    const amount = data.amount; // The total amount for the booking
    const currency = 'usd'; // Currency for the payment

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert dollars to cents
            currency: currency,
        });
        return {
            clientSecret: paymentIntent.client_secret,
        };
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Unable to create payment intent');
    }
});
