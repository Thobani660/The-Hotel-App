import React from "react";

function Accommodation({ bookings = [] }) {  // Default to an empty array if bookings is undefined
  return (
    <div style={styles.accommodationContainer}>
      {bookings.length === 0 ? (
        <p>No accommodations available.</p>
      ) : (
        <div style={styles.gridContainer}>
          {bookings.map((booking, index) => (
            <div key={index} style={styles.bookingCard}>
              <img src={booking.imageUrl} alt={booking.title} style={styles.image} />
              <h2 style={styles.title}>{booking.title}</h2>
              <h3 style={styles.subheader}>{booking.subheader}</h3>
              <p style={styles.description}>{booking.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Your existing styles remain unchanged
const styles = {
  accommodationContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Creates a responsive grid with a minimum width of 250px
    gap: "20px",
    padding: "20px",
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
    height: "150px", // Set a fixed height for the image
    objectFit: "cover", // Ensures the image covers the box without distortion
    borderRadius: "10px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subheader: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#333",
  },
};

export default Accommodation;
