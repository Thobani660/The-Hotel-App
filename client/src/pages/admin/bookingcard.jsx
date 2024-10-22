// src/components/BookingCard.jsx
import React from "react";
import { useSelector } from "react-redux";

const BookingCard = ({ booking, onEdit, onDelete }) => {
  const bookingData = booking || useSelector((state) => state.bookings); // Fallback if no booking is passed

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{bookingData.title}</h2>
      <h4 style={styles.subheader}>{bookingData.subheader}</h4>
      <p style={styles.description}>{bookingData.description}</p>
      {bookingData.imageUrl && (
        <img src={bookingData.imageUrl} alt="Accommodation" style={styles.image} />
      )}
      {bookingData.error && <p style={styles.error}>{bookingData.error}</p>}
      
      {/* Edit and Delete Buttons */}
      <div style={styles.buttonContainer}>
        <button style={styles.editButton} onClick={onEdit}>
          Edit
        </button>
        <button style={styles.deleteButton} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "20px auto",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    color: "#555",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginTop: "15px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default BookingCard;
