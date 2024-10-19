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
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        subheader: "",
        description: "",
        imageUrl: "",
    });
    const [avatarUrl, setAvatarUrl] = useState("");
    const [showAvatarInput, setShowAvatarInput] = useState(false);

    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings.bookings);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAdmin({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL || "",
                });
                setAvatarUrl(user.photoURL || "");
                await fetchBookings();
            } else {
                setError("No admin is logged in");
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchBookings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "bookings"));
            const bookingsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setBookings(bookingsData));
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleLogOff = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            alert("Logged off successfully!");
        } catch (err) {
            console.error("Error logging off:", err);
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (formDataWithImage) => {
        try {
            let newBooking;
    
            if (editMode && formData.id) {
                // Update booking
                await updateDoc(doc(db, "bookings", formData.id), { ...formData, imageUrl: avatarUrl });
                newBooking = { ...formData, id: formData.id, imageUrl: avatarUrl };
                dispatch(updateBooking(newBooking));
                alert("Booking updated successfully!");
            } else {
                // Add booking
                const docRef = await addDoc(collection(db, "bookings"), { ...formData, imageUrl: avatarUrl });
                newBooking = { ...formData, id: docRef.id, imageUrl: avatarUrl };
                dispatch(addBooking(newBooking)); // Update Redux store with the new booking
                alert("Booking added successfully!");
            }
    
            // Reset form and hide it after submission
            setFormData({ id: null, title: "", subheader: "", description: "", imageUrl: "" });
            setIsFormVisible(false);
            setShowAvatarInput(false);
            
            // Return the newBooking to be used for immediate display
            return newBooking;
    
        } catch (error) {
            console.error("Error saving booking:", error);
        }
    };
    
    

    const handleEdit = (id) => {
        const bookingToEdit = bookings.find((b) => b.id === id);
        setFormData(bookingToEdit);
        setAvatarUrl(bookingToEdit.imageUrl);
        setIsFormVisible(true);
        setEditMode(true);
        setShowAvatarInput(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "bookings", id));
            dispatch(deleteBooking(id));
            alert("Booking deleted successfully!");
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible((prev) => !prev);
        setEditMode(false);
        setFormData({ id: null, title: "", subheader: "", description: "", imageUrl: "" });
        setAvatarUrl("");
        setShowAvatarInput(false);
    };

    return (
        <div style={styles.container}>
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

            <div style={styles.detailsSection}>
                <button style={styles.createButton} onClick={toggleFormVisibility}>
                    {isFormVisible ? (editMode ? "Cancel Edit" : "Hide Create Hotel Form") : "Create a Hotel"}
                </button>

                {isFormVisible && (
                    <BookingForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
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
<<<<<<< HEAD
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    marginTop: "-13px",
=======
    width: "100vw",  // Make sure to take full width of the viewport
    height: "100vh", // Make sure to take full height of the viewport
    margin: "0",
>>>>>>> 3b494c0e467aa2c8445a5ccbba80babfb5cf1b93
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
