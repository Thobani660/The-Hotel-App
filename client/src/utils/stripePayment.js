// src/utils/stripePayment.js
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QB9mNFVlr9lrfFny3IGaUqxWFZalmgeV9GNYq4WNuMlugGENoOBp06IMRsHwnIaAr9BxBxHai40mM4Kuie0p96i00EcHan4cV"); // Replace with your public Stripe key

export const initiateStripePayment = async (amount) => {
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: "price_1QCM2KFVlr9lrfFn5li0OOIy", quantity: 1 }], // Set the price ID
    mode: "payment",
    successUrl: window.location.origin + "/success",
    cancelUrl: window.location.origin + "/cancel",
  });
  if (error) {
    console.error("Error redirecting to Stripe checkout:", error);
    throw error;
  }
};
