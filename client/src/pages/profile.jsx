// src/pages/profile.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore database
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser; // Get currently logged-in user
        if (user) {
          const userDoc = doc(db, "users", user.uid); // Assuming you have a "users" collection
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            setUserInfo(userSnapshot.data()); // Set user info from Firestore
          } else {
            console.log("No such document!");
          }
        } else {
          navigate("/signin"); // Redirect to sign-in if no user is logged in
        }
      } catch (error) {
        console.error("Error fetching user info: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleEditProfile = () => {
    // Navigate to edit profile page (You can create a separate edit profile page)
    navigate("/editprofile");
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message
  }

  return (
    <div>
      <h1>User Profile</h1>
        <div>
          {/* <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Name:</strong> {userInfo.name}</p> */}
          
           Adjust according to your data structure
          <button onClick={handleEditProfile}>Edit Profile</button>
          <h2>Your Bookings</h2>
          {/* Fetch and display user bookings from Firestore */}
          {/* You can implement a fetchBookings function to get this data */}
          <ul>
            {/* Assuming bookings is an array in userInfo */}
            {userInfo.bookings && userInfo.bookings.length > 0 ? (
              userInfo.bookings.map((booking, index) => (
                <li key={index}>{booking.details}</li> // Replace with actual booking details
              ))
            ) : (
              <li>No bookings found.</li>
            )}
          </ul>
        </div>
        <p>User information not found.</p>
    
    </div>
  );
}

export default Profile;
