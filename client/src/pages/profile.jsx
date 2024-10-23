import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path as necessary
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { logout } from "../features/authSlice"; // Adjust path as necessary

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: ""
  });
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Cancel editing
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
      // Update Firebase user profile
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
        setIsEditing(false); // Stop editing after save
      }
    } catch (err) {
      console.error("Error updating profile:", err);
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
                  <button style={styles.logOffButton} onClick={handleLogOff}>LogOff</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>No user data available.</p>
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
avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
},
avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
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
fileInput: {
    marginTop: "10px",
    padding: "5px",
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
detailsSection: {
    backgroundColor: "#fff",
    width: "50%",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px grey",
    overflowY: "auto",
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
