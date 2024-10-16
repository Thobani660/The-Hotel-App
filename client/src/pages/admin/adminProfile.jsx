// AdminProfile.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the path as necessary

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAdmin({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        // No user is signed in
        setError("No admin is logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Admin Profile</h1>
      {admin ? (
        <div>
          <p><strong>Admin UID:</strong> {admin.uid}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Name:</strong> {admin.displayName || "No display name available"}</p>
        </div>
      ) : (
        <p>No admin data available.</p>
      )}
    </div>
  );
}

export default AdminProfile;
