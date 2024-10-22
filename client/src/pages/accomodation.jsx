// src/pages/Accommodations.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path as needed
import BookingCard from "./admin/BookingCard"; // Import the BookingCard component

const Accommodations = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the bookings data from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const bookingsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBookings(bookingsData);
      } catch (err) {
        setError("Error fetching bookings. Please try again later.");
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Accommodations</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.bookingsGrid}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p>No accommodations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f4f5f7",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    color: "#333",
    marginBottom: "30px",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginBottom: "20px",
  },
  bookingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
};

export default Accommodations;
