// Accommodation.js
import React from "react";

function Accommodation({ bookings }) {
  return (
    <div style={styles.accommodationContainer}>
      {bookings.length === 0 ? (
        <p>No accommodations available.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} style={styles.bookingCard}>
            <img src={booking.imageUrl} alt={booking.title} style={styles.image} />
            <h2 style={styles.title}>{booking.title}</h2>
            <h3 style={styles.subheader}>{booking.subheader}</h3>
            <p style={styles.description}>{booking.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

// Your styles for Accommodation component
const styles = {
  accommodationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "left",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  subheader: {
    fontSize: "16px",
    color: "#666",
  },
  description: {
    fontSize: "14px",
    color: "#333",
  },
};

export default Accommodation;
