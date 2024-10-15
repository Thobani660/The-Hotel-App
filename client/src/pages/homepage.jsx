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
        <div style={{width:"2300px",height:"350px",backgroundImage:`url(${require("../res/H1.jpg")})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",alignItems:"center",justifyContent:"center",textAlign:"center",marginTop:"-50px"}}>
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

    {/* <div> */}
        <div style={{width:"300px",height:"300px",backgroundColor:"blue"}}>Map</div>
    {/* </div> */}
    </div>
  );
}

export default Home;
