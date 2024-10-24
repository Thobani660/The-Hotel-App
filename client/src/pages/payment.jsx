// // src/Payment.js
// import React, { useState } from "react";
// // import { loadStripe } from "@stripe/stripe-js";

// // const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

// const Payment = () => {
// //   const [amount, setAmount] = useState(0);

// //   const handlePayment = async () => {
// //     const stripe = await stripePromise;
// //     const response = await fetch("/create-payment-intent", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ amount }),
// //     });

// //     const { clientSecret } = await response.json();

// //     const result = await stripe.confirmCardPayment(clientSecret);
// //     if (result.error) {
// //       // Show error to your customer (e.g., insufficient funds)
// //       console.error(result.error.message);
// //     } else {
// //       // Payment succeeded!
// //       console.log("Payment successful:", result);
// //     }
// //   };

//   return (
//     <div>
//       {/* <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Enter amount"
//       /> */}
//       <button onClick={handlePayment}>Pay</button>
//     </div>
//   );
// };

// export default Payment;
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

// const Payment = ({ booking }) => {
//     const [loading, setLoading] = useState(false);
    
//     const handlePayment = async () => {
//         setLoading(true);
        
//         // Create payment intent
//         const response = await fetch('YOUR_FIREBASE_FUNCTION_URL/createPaymentIntent', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 amount: booking.price * 100, // Price in cents
//                 currency: 'usd',
//             }),
//         });

//         const { clientSecret } = await response.json();
        
//         const stripe = await stripePromise;

//         // Confirm the payment
//         const { error } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//         });

//         if (error) {
//             console.error(error);
//             alert(error.message);
//         } else {
//             alert('Payment successful!');
//             // Handle successful payment (e.g., update booking status in Firestore)
//         }
        
//         setLoading(false);
//     };

//     return (
//         <div>
//             <h2>Proceed to Payment</h2>
//             <button onClick={handlePayment} disabled={loading}>
//                 {loading ? 'Loading...' : 'Pay Now'}
//             </button>
//         </div>
//     );
// };

// export default Payment;
