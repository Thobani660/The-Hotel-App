// src/pages/admin/adminProfile.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebase"; // Ensure to import storage
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../features/authSlice";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { positions, textAlign, width } from "@mui/system";

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
        displayName: "", // Added for admin display name
        email: "", // Added for admin email
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
            // Add the admin UID to the booking data
            const bookingData = {
                ...formData,
                adminId: admin.uid, // Add this line to associate the booking with the admin
            };
    
            if (editMode && formData.id) {
                await updateDoc(doc(db, "bookings", formData.id), bookingData);
                dispatch(updateBooking(bookingData));
                alert("Booking updated successfully!");
            } else {
                const docRef = await addDoc(collection(db, "bookings"), bookingData);
                const newBooking = { ...bookingData, id: docRef.id };
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
            setProfilePic(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = async () => {
        if (profilePic) {
            const storageRef = ref(storage, `profilePics/${admin.uid}`); // Create a reference to the file
            await uploadBytes(storageRef, profilePic); // Upload the file

            const url = await getDownloadURL(storageRef); // Get the download URL
            await updateDoc(doc(db, "admins", admin.uid), { photoURL: url }); // Update Firestore with the new photo URL

            setAdmin({ ...admin, photoURL: url }); // Update local admin state
            dispatch(updateUser({ photoURL: url })); // Update Redux state
            alert("Profile picture updated successfully!");
        }
    };

    const handleAdminInfoUpdate = async (e) => {
        e.preventDefault(); // Prevent page refresh
        const updatedInfo = {
            displayName: formData.displayName || admin.displayName,
            email: formData.email || admin.email,
        };

        try {
            await updateDoc(doc(db, "admins", admin.uid), updatedInfo); // Update Firestore with new admin info
            setAdmin({ ...admin, ...updatedInfo }); // Update local state
            dispatch(updateUser(updatedInfo)); // Update Redux state
            alert("Admin information updated successfully!");
            setEditMode(false); // Hide inputs after updating
        } catch (error) {
            console.error("Error updating admin info:", error);
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
                                src={admin.photoURL || "/./client/src/res/premium_photo-1675745329378-5573c360f69f.avif"}
                                
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
                        
                        {/* Show edit button */}
                        <button onClick={() => setEditMode(!editMode)} style={styles.editButton}>
                            {editMode ? "Cancel" : "Edit Profile"}
                        </button>

                        {/* Input fields for updating admin info */}
                        {editMode && (
                            <form onSubmit={handleAdminInfoUpdate}>
                                <input
                                    type="text"
                                    placeholder="Update Display Name"
                                    value={formData.displayName || ""}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    style={styles.inputField}
                                />
                                <input
                                    type="email"
                                    placeholder="Update Email"
                                    value={formData.email || ""}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={styles.inputField}
                                />
                                <button type="submit" style={styles.updateButton}>
                                    Update Admin Info
                                </button>
                            </form>
                        )}

                        {/* Show file input only when editing */}
                        {editMode && (
                            <>
                                <input
                                    type="file"
                                    onChange={handleProfilePicChange}
                                    style={styles.fileInput}
                                />
                                <button style={styles.uploadButton} onClick={handleProfileUpdate}>
                                    Update Profile Picture
                                </button>
                            </>
                        )}
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
                            isAdmin={true}
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
        backgroundColor: "#f0f8ff",
        padding: "10px",
        width: "100%",
        height: "100vh",
        marginTop: "100px",
        marginBottom: "50px",
        boxSizing: "border-box",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
        position:"fixed"
    },
    profileCard: {
        margin: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        alignItems: "center",
        justifyContent:"center",
        textAlign:"center",
        height:"90%",
        width:"30%"
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    infoContainer: {
        width: "100%",
        
        },
    avatarContainer: {
        marginBottom: "10px",
    },
    avatar: {
        width: "100px",
        height: "100px",
        borderRadius: "100%",
        objectFit: "cover",
        backgroundColor:"red"
    },
    infoItem: {
        marginBottom: "10px",
    },
    editButton: {
        marginBottom: "10px",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
    },
    inputField: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    updateButton: {
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#28a745",
        color: "white",
        cursor: "pointer",
    },
    fileInput: {
        marginBottom: "10px",
    },
    uploadButton: {
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#ffc107",
        color: "white",
        cursor: "pointer",
    },
    logOffButton: {
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#dc3545",
        color: "white",
        cursor: "pointer",
    },
    detailsSection: {
        flex: "2",
        margin: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxHeight: "90%", // Set a maximum height for the section
        overflowY: "auto",  // Enable vertical scrolling if content overflows
    },
    
    
    createButton: {
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
        marginBottom: "20px",
    },
};

export default AdminProfile;
