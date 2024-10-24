// src/components/PaymentCancel.js
import React from "react";

const PaymentCancel = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payment Canceled</h1>
      <p style={styles.message}>
        We're sorry to hear that your payment was canceled. If you have any questions or need assistance, please contact our support team.
      </p>
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
    backgroundColor: "#f8d7da",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#721c24",
  },
  message: {
    fontSize: "1.2rem",
    margin: "20px 0",
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

export default PaymentCancel;
