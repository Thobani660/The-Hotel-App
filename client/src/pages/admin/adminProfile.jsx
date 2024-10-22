// src/pages/admin/adminProfile.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { setBookings, addBooking, updateBooking, deleteBooking } from "../../features/bookingsSlice";
import BookingForm from "./bookingForm";  // Ensure this import matches your file structure
import BookingCard from "./BookingCard";  // Import the BookingCard component

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
        price: "",
        imageUrl: "",
    });
    const [avatarUrl, setAvatarUrl] = useState("");
    const [showAvatarInput, setShowAvatarInput] = useState(false);
    const [submittedBooking, setSubmittedBooking] = useState(null);  // Store the submitted booking

    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings.bookings); // Access bookings from Redux

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
        console.log(bookings , "bookimgsssss")
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

    const handleSubmit = async () => {
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
                dispatch(addBooking(newBooking)); 
                alert("Booking added successfully!");
            }

            // Set submitted booking to show the card
            setSubmittedBooking(newBooking);

            // Reset form and hide it after submission
            setFormData({ id: null, title: "", subheader: "", description: "", price: "", imageUrl: "" });
            setIsFormVisible(false);
            setShowAvatarInput(false);
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
        setFormData({ id: null, title: "", subheader: "", description: "", price: "", imageUrl: "" });
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
                            <strong>Name:</strong> {admin.displayName || "No display name available"}
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

                {/* Check if bookings exist before rendering them */}
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onEdit={() => handleEdit(booking.id)}
                            onDelete={() => handleDelete(booking.id)}
                        />
                    ))
                ) : (
                    <p>No bookings available.</p>
                )}
            </div>
        </div>
    );
}

// Styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f4f5f7",
        padding: "10px",
        width: "100%",
        height: "100vh",
        marginTop: "70px", 
        marginBottom: "50px", 
        boxSizing: "border-box", 
        boxShadow: "0 4px 12px grey",
    },
    profileCard: {
        backgroundColor: "#fff",
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
    createButton: {
        backgroundColor: "#000080",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        display: "block",
        marginBottom: "20px",
    },
};

export default AdminProfile;
