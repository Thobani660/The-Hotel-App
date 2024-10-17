import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path as necessary
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { logout  } from "../features/authSlice"; // Adjust the path as necessary


function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setError("No user is logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}></div>
        </div>
        <h1 style={styles.heading}>User Profile</h1>
        {user ? (
          <div style={styles.infoContainer}>
            <div style={styles.infoItem}>
              <strong>User UID:</strong> {user.uid}
            </div>
            <div style={styles.infoItem}>
              <strong>Email:</strong> {user.email}
            </div>
            <div style={styles.infoItem}>
              <strong>Name:</strong>{" "}
              {user.displayName || "No display name available"}
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
        <div style={styles.buttonContainer}>
          <button style={styles.editButton}>Edit</button>
          <button style={styles.logOffButton} onClick={handleLogOff}>
            LogOff
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f4f5f7",
    padding: "10px",
    borderRadius: "15px",
    border: "2px solid #eaeaea",
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
};

export default UserProfile;
