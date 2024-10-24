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
        {/* Existing profile card content */}
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
          favourites.map((favourite) => (
            <div key={favourite.id} style={styles.favouriteItem}>
              <h4>{favourite.title}</h4>
              <p>{favourite.description}</p>
              <img src={favourite.imageUrl} alt="Accommodation" style={styles.image} />
              <button onClick={() => handleRemoveFavourite(favourite)}>Remove</button>
            </div>
          ))
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
    backgroundColor: "rgba(0, 0, 128, 0.43)",
    padding: "10px",
    width: "100%",
    height: "100vh",
    marginTop: "70px", 
    marginBottom: "50px", 
    boxSizing: "border-box", 
    boxShadow: "0 4px 12px grey",
  },
  profileCard: {
    backgroundColor: "rgba(0, 0, 128, 0.43)",
    width: "40%",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px grey",
    overflow: "auto",
  },
  detailsSection: {
    backgroundColor: "#fff",
    width: "50%",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px grey",
    overflowY: "auto",
  },
  favouriteItem: {
    marginBottom: "20px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  successCard: {
    backgroundColor: "#e0ffe0",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
    textAlign: "center",
    boxShadow: "0 4px 12px grey",
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
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px",
    width: "100%",
  },
};

export default UserProfile;
