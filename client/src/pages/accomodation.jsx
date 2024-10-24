import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path as needed
import BookingCard from "./admin/bookingcard";// Correct component import

const Accommodations = () => {
  const [adminBookings, setAdminBookings] = useState({});
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

        // Group bookings by adminId
        const bookingsByAdmin = bookingsData.reduce((acc, booking) => {
          const adminId = booking.adminId; // Assuming each booking has an adminId field
          if (!acc[adminId]) {
            acc[adminId] = []; // Initialize an array for this admin if not already present
          }
          acc[adminId].push(booking); // Add the booking to the appropriate admin's array
          return acc;
        }, {});

        setAdminBookings(bookingsByAdmin);
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
      <div style={styles.adminsGrid}>
        {Object.keys(adminBookings).length > 0 ? (
          Object.entries(adminBookings).map(([adminId, bookings]) => (
            <div key={adminId} style={styles.adminCard}>
              <h2 style={styles.adminHeading}>Admin ID: {adminId}</h2>
              <div style={styles.bookingsGrid}>
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    isAdmin={false} // Disable admin features like edit/delete for this view
                  />
                ))}
              </div>
            </div>
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
  adminsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  adminCard: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  adminHeading: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  bookingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Create a responsive grid layout
    gap: "20px",
  },
};

export default Accommodations;
