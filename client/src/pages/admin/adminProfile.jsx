// src/pages/admin/adminProfile.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
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
    const [profilePic, setProfilePic] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

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

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(file);
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = async () => {
        if (profilePic) {
            // Handle uploading the image to Firebase Storage and update the user profile
            // This code should be implemented based on your Firebase Storage setup
            const storageRef = firebase.storage().ref();
            const profilePicRef = storageRef.child(`profilePics/${admin.uid}`);
            await profilePicRef.put(profilePic);
            const url = await profilePicRef.getDownloadURL();

            // Update user profile
            await updateDoc(doc(db, "admins", admin.uid), { photoURL: url });
            setAdmin({ ...admin, photoURL: url });
            alert("Profile picture updated successfully!");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.profileCard}>
                <h1 style={styles.heading}>Admin Profile</h1>
                {admin ? (
                    <div style={styles.infoContainer}>
                        <div style={styles.avatarContainer}>
                            <img
                                src={admin.photoURL || "/default-avatar.png"}
                                alt="Admin Avatar"
                                style={styles.avatar}
                            />
                        </div>
                        <div style={styles.infoItem}>
                            <strong>Admin UID:</strong> {admin.uid}
                        </div>
                        <div style={styles.infoItem}>
                            <strong>Email:</strong> {admin.email}
                        </div>
                        <div style={styles.infoItem}>
                            <strong>Name:</strong> {admin.displayName || "No display name available"}
                        </div>
                        <input
                            type="file"
                            onChange={handleProfilePicChange}
                            style={styles.fileInput}
                        />
                        <button style={styles.uploadButton} onClick={handleProfileUpdate}>
                            Update Profile Picture
                        </button>
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
        backgroundColor: "#f0f8ff", // Light background for better contrast
        padding: "10px",
        width: "100%",
        height: "100vh",
        marginTop: "70px",
        marginBottom: "50px",
        boxSizing: "border-box",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Softer shadow
    },
    profileCard: {
        backgroundColor: "#ffffff", // White background for profile card
        width: "30%",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Softer shadow
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
        border: "3px solid #000080", // Border around the avatar
    },
    heading: {
        fontSize: "28px", // Increased font size for the heading
        color: "#000080", // Dark blue for heading
        marginBottom: "20px",
        fontWeight: "bold",
    },
    infoContainer: {
        marginBottom: "30px",
    },
    infoItem: {
        fontSize: "18px", // Slightly larger font for info items
        color: "#555",
        marginBottom: "10px",
    },
    fileInput: {
        marginTop: "10px",
        padding: "5px",
    },
    uploadButton: {
        backgroundColor: "#4CAF50", // Green for upload button
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
    },
    logOffButton: {
        backgroundColor: "#f44336",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginTop: "20px", // Added margin for separation
    },
    detailsSection: {
        backgroundColor: "#ffffff", // White background for details section
        width: "68%",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Softer shadow
        overflowY: "auto",
    },
    createButton: {
        backgroundColor: "#000080", // Dark blue for create button
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        display: "block",
        marginBottom: "20px",
        transition: "background-color 0.3s", // Smooth transition for hover
    },
    createButtonHover: {
        backgroundColor: "#003366", // Darker shade on hover
    },
};

export default AdminProfile;
