<<<<<<< HEAD
<<<<<<< HEAD
=======
// src/components/BookingCard.js
>>>>>>> parent of 8adabe5 (updated UI for home Page)
=======
// src/components/BookingCard.js
>>>>>>> parent of 8adabe5 (updated UI for home Page)
import React from "react";
import { useDispatch } from "react-redux";
import { addFavourite } from "../../features/favouritesSlice"; // Import favouritesSlice action
import { initiateStripePayment } from "../../utils/stripePayment";

const BookingCard = ({ booking, onEdit, onDelete, isAdmin }) => {
  const dispatch = useDispatch();

  const handleBookNow = async () => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      await initiateStripePayment(booking.price); 
=======
      await initiateStripePayment(booking.price, booking); // Pass the booking object
>>>>>>> parent of 8adabe5 (updated UI for home Page)
=======
      await initiateStripePayment(booking.price, booking); // Pass the booking object
>>>>>>> parent of 8adabe5 (updated UI for home Page)
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleSaveAsFavourite = () => {
    dispatch(addFavourite(booking)); // Dispatch action to save booking as favourite
  };


  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{booking.title}</h2>
      <h4 style={styles.subheader}>{booking.subheader}</h4>
      <p style={styles.description}>{booking.description}</p>
      {booking.imageUrl && (
        <img src={booking.imageUrl} alt="Accommodation" style={styles.image} />
      )}
      <p style={styles.price}>Price: ${booking.price}</p>

      <div style={styles.buttonContainer}>
<<<<<<< HEAD
        <button style={styles.bookButton} onClick={handleBookNow}>
=======
        <button style={{ ...styles.button, ...styles.bookButton }} onClick={handleBookNow}>
<<<<<<< HEAD
>>>>>>> parent of 8adabe5 (updated UI for home Page)
=======
>>>>>>> parent of 8adabe5 (updated UI for home Page)
          Book Now
        </button>
        <button style={styles.saveButton} onClick={handleSaveAsFavourite}>
          Save as Favourite
        </button>
        {isAdmin && (
          <>
            <button style={styles.editButton} onClick={onEdit}>
              Edit
            </button>
            <button style={styles.deleteButton} onClick={onDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  card: {
    // existing styles
  },
  title: {
    // existing styles
  },
  subheader: {
    // existing styles
  },
  description: {
    // existing styles
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  bookButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
  },
  saveButton: {
    backgroundColor: "#FFA500",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
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
