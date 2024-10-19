import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the path as necessary
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { logout } from "../../features/authSlice"; // Adjust path as necessary
import BookingForm from "./bookingForm"; // Ensure correct import
import Accommodation from "../accomodation"; // Import the Accommodation component

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  const dispatch = useDispatch(); // Initialize dispatch

  const [formData, setFormData] = useState({
    title: "",
    subheader: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAdmin({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        // No user is signed in
        setError("No admin is logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handler for log off button
  const handleLogOff = async () => {
    try {
      await signOut(auth); // Sign out user from Firebase
      dispatch(logout()); // Dispatch Redux logout action
    } catch (err) {
      console.error("Error logging off:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings((prevBookings) => [...prevBookings, formData]); // Add new booking to bookings state
    setFormData({ title: "", subheader: "", description: "", imageUrl: "" }); // Clear form input after submission
    setIsFormVisible(false); // Hide form after submission
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      {/* Admin Profile Section */}
      <div style={styles.profileCard}>
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}></div>
        </div>
        <h1 style={styles.heading}>Admin Profile</h1>
        {admin ? (
          <div style={styles.infoContainer}>
            <div style={styles.infoItem}>
              <strong>Admin UID:</strong> {admin.uid}
            </div>
            <div style={styles.infoItem}>
              <strong>Email:</strong> {admin.email}
            </div>
            <div style={styles.infoItem}>
              <strong>Name:</strong>{" "}
              {admin.displayName || "No display name available"}
            </div>
          </div>
        ) : (
          <p>No admin data available.</p>
        )}
        <div style={styles.buttonContainer}>
          <button style={styles.editButton}>Edit</button>
          <button style={styles.logOffButton} onClick={handleLogOff}>
            LogOff
          </button>
        </div>
      </div>

      {/* Booking Form Section */}
      <div style={styles.detailsSection}>
        <button style={styles.createButton} onClick={toggleFormVisibility}>
          {isFormVisible ? "Hide Create Hotel Form" : "Create a Hotel"}
        </button>

        {isFormVisible && (
          <BookingForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}

        {/* Render the accommodation cards */}
        <Accommodation bookings={bookings} />
      </div>
    </div>
  );
}

// Your styles remain unchanged
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f4f5f7",
    padding: "10px",
    borderRadius: "15px",
    border: "2px solid #eaeaea",
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    marginTop: "-13px",
    boxShadow: "0 4px 12px grey",
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "40%",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px grey",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    backgroundColor: "#3b5998",
    borderRadius: "50%",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  infoContainer: {
    marginBottom: "30px",
  },
  infoItem: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  logOffButton: {
    backgroundColor: "#F44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  createButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },
  detailsSection: {
    width: "55%",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px grey",
    textAlign: "left",
    marginLeft: "20px",
  },
};

export default AdminProfile;
