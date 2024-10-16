const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const stripe = require("stripe")("YOUR_SECRET_KEY");

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
