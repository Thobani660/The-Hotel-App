import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase"; // Ensure correct import for Firebase
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice"; // Adjust path as necessary
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { setBookings, addBooking, updateBooking, deleteBooking } from "../../features/bookingsSlice"; // Redux slice actions
import BookingForm from "./bookingForm"; // Ensure correct import
import Accommodation from "../accomodation"; // Ensure correct import

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false); // Toggle for editing
  const [formData, setFormData] = useState({
    id: null, // Track ID of the booking being edited
    title: "",
    subheader: "",
    description: "",
    imageUrl: "",
  });
  const [avatarUrl, setAvatarUrl] = useState(""); // State for avatar URL
  const [showAvatarInput, setShowAvatarInput] = useState(false); // State to show avatar input

  const dispatch = useDispatch(); // Initialize dispatch
  const bookings = useSelector((state) => state.bookings.bookings); // Get bookings from Redux store
  console.log(bookings, "bookings");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAdmin({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || "", // Get user's photo URL
        });
        setAvatarUrl(user.photoURL || ""); // Set avatar URL
        // Fetch bookings from Firestore when the admin logs in
        await fetchBookings();
      } else {
        setError("No admin is logged in");
      }
    //   setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch bookings from Firestore and update Redux store
  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const bookingsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setBookings(bookingsData)); // Set bookings in Redux store
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Handler for log off button
  const handleLogOff = async () => {
     
    try {
      await signOut(auth);
      dispatch(logout());
      alert("Logged off successfully!"); 
      navigate("/signin"); 
      // Alert on log off
    } catch (err) {
      console.error("Error logging off:", err);
    }

  };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

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

  // Handle avatar input change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Set avatar URL to display
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (editMode && formData.id) {
            // Update booking
            await updateDoc(doc(db, "bookings", formData.id), { ...formData, imageUrl: avatarUrl });
            dispatch(updateBooking({ id: formData.id, updatedData: { ...formData, imageUrl: avatarUrl } }));
            alert("Booking updated successfully!");
        } else {
            // Add booking
            const docRef = await addDoc(collection(db, "bookings"), { ...formData, imageUrl: avatarUrl });
            const newBooking = { ...formData, id: docRef.id, imageUrl: avatarUrl };
            dispatch(addBooking(newBooking)); // Update Redux store with the new booking
            alert("Booking added successfully!");
        }
    } catch (error) {
        console.error("Error saving booking:", error);
    } finally {
        // Reset form
        setFormData({ id: null, title: "", subheader: "", description: "", imageUrl: "" });
        setIsFormVisible(false);
        setShowAvatarInput(false);
    }
};

  // Handle editing a booking
  const handleEdit = (id) => {
    const bookingToEdit = bookings.find((b) => b.id === id);
    setFormData(bookingToEdit);
    setAvatarUrl(bookingToEdit.imageUrl); // Set the avatar URL from the booking
    setIsFormVisible(true);
    setEditMode(true); // Toggle to edit mode
    setShowAvatarInput(true); // Show avatar input
    alert("Editing booking..."); // Alert when editing
  };

  // Handle deleting a booking
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      dispatch(deleteBooking(id));
      alert("Booking deleted successfully!"); // Alert on delete
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
    setEditMode(false); // Reset edit mode when creating a new booking
    setFormData({ id: null, title: "", subheader: "", description: "", imageUrl: "" });
    setAvatarUrl(""); // Reset avatar URL
    setShowAvatarInput(false); // Reset avatar input visibility
    alert(isFormVisible ? "Hiding form..." : "Showing form..."); // Alert on toggle
  };

  return (
    <div style={styles.container}>
      {/* Admin Profile Section */}
      <div style={styles.profileCard}>
        <div style={styles.avatarContainer}>
          <img src={avatarUrl || "https://via.placeholder.com/120"} alt="Avatar" style={styles.avatar} />
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
            {/* Show avatar input only in edit mode */}
            {showAvatarInput && (
              <div style={styles.infoItem}>
                <strong>Profile Picture:</strong>
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={styles.fileInput} />
              </div>
            )}
          </div>
        ) : (
          <p>No admin data available.</p>
        )}
        <div style={styles.buttonContainer}>
          <button style={styles.editButton} onClick={() => setShowAvatarInput((prev) => !prev)}>
            {editMode ? "Hide Avatar Input" : "Edit"}
          </button>
          <button style={styles.logOffButton} onClick={handleLogOff}>
            LogOff
          </button>
        </div>
      </div>

      {/* Booking Form Section */}
      <div style={styles.detailsSection}>
        <button style={styles.createButton} onClick={toggleFormVisibility}>
          {isFormVisible ? (editMode ? "Cancel Edit" : "Hide Create Hotel Form") : "Create a Hotel"}
        </button>

        {isFormVisible && (
          <BookingForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            style={{marginLeft:"-200px"}}
          />
        )}

        {/* Render the accommodation cards */}
        <Accommodation
          bookings={bookings}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

// Your styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f4f5f7",
    padding: "10px",
    borderRadius: "15px",
    border: "2px solid #eaeaea",
    width: "100vw",  // Make sure to take full width of the viewport
    height: "100vh", // Make sure to take full height of the viewport
    margin: "0",
    boxShadow: "0 4px 12px grey",
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "30%",
    height: "800px", // Allow it to grow as needed
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px grey",
    overflow: "auto",
    position:"fixed" // Handle overflow if content is large
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
    width: "65%",
    height: "auto", // Allow it to grow as needed
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px grey",
    overflow: "auto", 
    marginLeft:"650px"// Handle overflow if content is large
  },
};

export default AdminProfile;
