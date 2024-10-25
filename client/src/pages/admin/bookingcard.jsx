import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavourite } from "../../features/favouritesSlice";
import { initiateStripePayment } from "../../utils/stripePayment";

const BookingCard = ({ booking, onEdit, onDelete, isAdmin }) => {
  const dispatch = useDispatch();
  const [paymentError, setPaymentError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBookNow = async () => {
    setLoading(true);
    try {
      await initiateStripePayment(booking.price, booking);
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsFavourite = () => {
    dispatch(addFavourite(booking));
  };

  return (
    <div style={styles.card}>
      {booking.imageUrl && (
        <img src={booking.imageUrl} alt="Accommodation" style={styles.image} />
      )}
      <h2 style={styles.title}>{booking.title}</h2>
      <h4 style={styles.subheader}>{booking.subheader}</h4>
      <p style={styles.description}>{booking.description}</p>
      
      <p style={styles.price}>Price: ${booking.price}</p>

      <div style={styles.buttonContainer}>
        <button style={{ ...styles.button, ...styles.bookButton }} onClick={handleBookNow}>
          {loading ? "Processing..." : "Book Now"}
        </button>
        <button style={{ ...styles.button, ...styles.saveButton }} onClick={handleSaveAsFavourite}>
          Save as Favourite
        </button>
        {isAdmin && (
          <>
            <button style={{ ...styles.button, ...styles.editButton }} onClick={onEdit}>
              Edit
            </button>
            <button style={{ ...styles.button, ...styles.deleteButton }} onClick={onDelete}>
              Delete
            </button>
          </>
        )}
        {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      </div>
    </div>
  );
};

// Styles
const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "15px",
    maxWidth: "500px",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    '&:hover': {
      transform: "scale(1.02)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  subheader: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#777",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "15px",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
  },
  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "15px",
  },
  button: {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s, transform 0.2s",
    minWidth: "100px",
  },
  bookButton: {
    backgroundColor: "#007BFF",
    color: "white",
  },
  saveButton: {
    backgroundColor: "#FFA500",
    color: "white",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
};

export default BookingCard;
