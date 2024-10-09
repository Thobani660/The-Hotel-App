import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowOptions(true); // Show the User/Admin options
  };

  const handleUserLogin = () => {
    navigate("/signin"); // Redirect to user login page
  };

  const handleAdminLogin = () => {
    navigate("/adminsignin"); // Redirect to admin login page
  };

  return (
    <div>
      <h1>Home</h1>
      {!showOptions ? (
        <button onClick={handleGetStarted}>Get Started</button>
      ) : (
        <>
          <button onClick={handleUserLogin}>Login as User</button>
          <button onClick={handleAdminLogin}>Login as Admin</button>
        </>
      )}
    </div>
  );
}

export default Home;
