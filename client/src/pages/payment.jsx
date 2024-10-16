// src/Payment.js
import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

const Payment = () => {
//   const [amount, setAmount] = useState(0);

//   const handlePayment = async () => {
//     const stripe = await stripePromise;
//     const response = await fetch("/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount }),
//     });

//     const { clientSecret } = await response.json();

//     const result = await stripe.confirmCardPayment(clientSecret);
//     if (result.error) {
//       // Show error to your customer (e.g., insufficient funds)
//       console.error(result.error.message);
//     } else {
//       // Payment succeeded!
//       console.log("Payment successful:", result);
//     }
//   };

  return (
    <div>
      {/* <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      /> */}
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;
