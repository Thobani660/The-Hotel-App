// src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../firebase"; 
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { removeFavourite } from "../features/favouritesSlice";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: ""
  });
  
  const favourites = useSelector((state) => state.favourites); // Get favourites from Redux store
  const dispatch = useDispatch();
  const [successfulPayment, setSuccessfulPayment] = useState(null); // New state for payment success

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        setFormData({
          displayName: user.displayName || "",
          email: user.email || ""
        });
      } else {
        setError("No user is logged in");
      }
      setLoading(false);
  
      // Check for payment success URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const paymentSuccess = urlParams.get('paymentSuccess');
      const accommodation = urlParams.get('accommodation');
  
      if (paymentSuccess === 'true' && accommodation) {
        handlePaymentSuccess(JSON.parse(accommodation)); // Call the success function with accommodation info
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const handleLogOff = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (err) {
      console.error("Error logging off:", err);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        if (formData.displayName !== user.displayName) {
          await updateProfile(auth.currentUser, { displayName: formData.displayName });
        }
        if (formData.email !== user.email) {
          await updateEmail(auth.currentUser, formData.email);
        }
        setUser({
          ...user,
          displayName: formData.displayName,
          email: formData.email,
        });
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleRemoveFavourite = (favourite) => {
    dispatch(removeFavourite(favourite));
  };

  // Simulated function to mark payment as successful
  const handlePaymentSuccess = (accommodationInfo) => {
    setSuccessfulPayment(accommodationInfo);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h1>User Profile</h1>
        <div style={styles.infoContainer}>
          {isEditing ? (
            <form onSubmit={handleSaveClick}>
              <div style={styles.infoItem}>
                <strong>Display Name:</strong>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.infoItem}>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.saveButton}>Save</button>
                <button type="button" style={styles.cancelButton} onClick={handleCancelClick}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div style={styles.infoItem}>
                <strong>User UID:</strong> {user.uid}
              </div>
              <div style={styles.infoItem}>
                <strong>Email:</strong> {user.email}
              </div>
              <div style={styles.infoItem}>
                <strong>Name:</strong> {user.displayName || "No display name available"}
              </div>
              <div style={styles.buttonContainer}>
                <button style={styles.editButton} onClick={handleEditClick}>Edit</button>
                <button style={styles.logOffButton} onClick={handleLogOff}>Log Off</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={styles.detailsSection}>
        <h2>Your Favourites</h2>
        {favourites.length > 0 ? (
          <div style={styles.favouritesGrid}>
            {favourites.map((favourite) => (
              <div key={favourite.id} style={styles.favouriteCard}>
                <h4 style={styles.favouriteTitle}>{favourite.title}</h4>
                <p style={styles.favouriteDescription}>{favourite.description}</p>
                <img src={favourite.imageUrl} alt="Accommodation" style={styles.favouriteImage} />
                <button onClick={() => handleRemoveFavourite(favourite)} style={styles.removeButton}>Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No favourites added.</p>
        )}

        {/* Payment Success Notification */}
        {successfulPayment && (
          <div style={styles.successCard}>
            <h3>Payment Successful!</h3>
            <p>Your booking for <strong>{successfulPayment.title}</strong> has been completed successfully.</p>
            <p>Thank you for your purchase!</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f0f8ff",
    padding: "10px",
    width: "100%",
    height: "100vh",
    marginTop: "70px",
    marginBottom: "50px",
    boxSizing: "border-box",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    width: "30%",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    overflow: "auto",
  },
  infoContainer: {
    marginBottom: "30px",
  },
  infoItem: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  logOffButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  detailsSection: {
    backgroundColor: "#ffffff",
    width: "68%",
    padding: "10px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    overflowY: "auto",
  },
  favouritesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two cards per row
    gap: "10px",
  },
  favouriteCard: {
    backgroundColor: "#e6f7ff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    width:"40%"
  },
  favouriteTitle: {
    fontSize: "20px",
    color: "#333",
  },
  favouriteDescription: {
    fontSize: "16px",
    color: "#666",
  },
  favouriteImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  removeButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  successCard: {
    backgroundColor: "#dff0d8",
    border: "1px solid #d6e9c6",
    color: "#3c763d",
    padding: "15px",
    borderRadius: "5px",
    marginTop: "20px",
  },
};

export default UserProfile;
