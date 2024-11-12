// src/components/PaymentSuccess.js
import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const accommodation = urlParams.get("accommodation");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payment Successful!</h1>
      <p style={styles.message}>
        Thank you for your booking! Your payment has been processed successfully.
      </p>
      {accommodation && (
        <div style={styles.accommodationDetails}>
          <h2 style={styles.subtitle}>Accommodation Details</h2>
          <pre style={styles.details}>{accommodation}</pre>
        </div>
      )}
      <button style={styles.button} onClick={() => window.location.href = '/user-profile'}>
        Go to Your Profile
      </button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#e0ffe0",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#4CAF50",
  },
  message: {
    fontSize: "1.2rem",
    margin: "20px 0",
  },
  accommodationDetails: {
    marginTop: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  details: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 4px 12px grey",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default PaymentSuccess;
