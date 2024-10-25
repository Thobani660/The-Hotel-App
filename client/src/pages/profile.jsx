// src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../firebase"; 
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { removeFavourite, addFavourite } from "../features/favouritesSlice";
import { setBookings } from "../features/bookingsSlice";

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
  const bookings = useSelector((state) => state.bookings.bookings); // Get bookings from Redux store
  const dispatch = useDispatch();

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
    });

    // Fetch and set bookings (mock data here, replace with actual booking fetch logic)
    const mockBookings = [
      { id: 1, title: "Deluxe Room", status: "Success", description: "Luxury suite in downtown", imageUrl: "example1.jpg" },
      { id: 2, title: "Standard Room", status: "Canceled", description: "Cozy standard room", imageUrl: "example2.jpg" },
    ];
    dispatch(setBookings(mockBookings));

    return () => unsubscribe();
  }, [dispatch]);

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

        <h2>Booking History</h2>
        {bookings.length > 0 ? (
          <div style={styles.historyGrid}>
            {bookings.map((booking) => (
              <div key={booking.id} style={styles.historyCard}>
                <h4 style={styles.historyTitle}>{booking.title}</h4>
                <p>{booking.description}</p>
                <img src={booking.imageUrl} alt="Booking" style={styles.historyImage} />
                <p><strong>Status:</strong> {booking.status === "Success" ? "Payment Successful" : "Payment Canceled"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
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
  historyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "10px",
  },
  historyCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  historyImage: {
    width: "100%",
    borderRadius: "5px",
    marginBottom: "10px",
  },
};

export default UserProfile;
