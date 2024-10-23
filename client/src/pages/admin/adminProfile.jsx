// src/pages/admin/adminProfile.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { setBookings, addBooking, updateBooking, deleteBooking } from "../../features/bookingsSlice";
import BookingCard from "./bookingcard";  
import BookingForm from "./bookingsForm";

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

    const handleSubmit = async (formData) => {
        try {
            if (editMode && formData.id) {
                await updateDoc(doc(db, "bookings", formData.id), formData);
                dispatch(updateBooking(formData));
                alert("Booking updated successfully!");
            } else {
                const docRef = await addDoc(collection(db, "bookings"), formData);
                const newBooking = { ...formData, id: docRef.id };
                dispatch(addBooking(newBooking));
                alert("Booking added successfully!");
            }

            setIsFormVisible(false);
            setEditMode(false);
        } catch (error) {
            console.error("Error saving booking:", error);
        }
    };

    const handleEdit = (id) => {
        const bookingToEdit = bookings.find((b) => b.id === id);
        setFormData(bookingToEdit);
        setIsFormVisible(true);
        setEditMode(true);
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

    return (
        <div style={styles.container}>
            <div style={styles.profileCard}>
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
                    </div>
                ) : (
                    <p>No admin data available.</p>
                )}
                <button style={styles.logOffButton} onClick={handleLogOff}>
                    Log Off
                </button>
            </div>

            <div style={styles.detailsSection}>
                <button style={styles.createButton} onClick={() => setIsFormVisible((prev) => !prev)}>
                    {isFormVisible ? "Cancel" : "Create a Hotel"}
                </button>

                {isFormVisible && (
                    <BookingForm onSubmit={handleSubmit} />
                )}

                {bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <BookingCard
                      key={booking.id}
                      booking={booking}
                      onEdit={() => handleEdit(booking.id)}
                      onDelete={() => handleDelete(booking.id)}
                      isAdmin={true} // or false, depending on the user’s role
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
        backgroundColor: "rgba(0, 0, 128, 0.43)",
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
