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
    <div style={{display:"flex",backgroundColor:"yellow",width:"1400px",height:"450px",padding:"20px",marginTop:"-55px",borderRadius:"20px",border:"2px solid white"}}>
        <div style={{width:"400px",height:"440px",backgroundColor:"black",color:"white",padding:"10px",alignItems:"center",textAlign:"center",borderRadius:"20px",marginTop:"-15px",marginLeft:"-15px",border:"2px solid gold"}}>
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
      <div style={{justifyContent:"space-between",marginTop:"190px",width:"400px"}}>
      <button style={{width:"90px",backgroundColor:"lightgreen",borderRadius:"10px",border:"none",marginLeft:"-20px"}}>edit</button>
      <button style={{width:"90px",backgroundColor:"red",borderRadius:"10px",border:"none",marginLeft:"150px"}}>LogOff</button>
      </div>
    </div>
    <div style={{marginLeft:"300px"}}>
        <h1> displaying here </h1>
    </div>
    </div>
  );
}

export default AdminProfile;
