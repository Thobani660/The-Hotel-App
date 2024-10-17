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

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "10px",
    ":hover": {
      backgroundColor: "#3e8e41",
    },
  };

  const buttonHoverStyle = {
    backgroundColor: "#3e8e41",
  };

  return (
    <div style={{}}>
      <div >
        <div
          style={{
            width: "2300px",
            height: "350px",
            backgroundImage: `url(${require("../res/H1.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          {!showOptions ? (
            <button style={buttonStyle} onClick={handleGetStarted}>
              Get Started
            </button>
          ) : (
            <>
              <button style={buttonStyle} onClick={handleUserLogin}>
                Login as User
              </button>
              <button style={buttonStyle} onClick={handleAdminLogin}>
                Login as Admin
              </button>
            </>
          )}
        </div>
        <div>
          <h1>displaying here</h1>
        </div>
      </div>

      {/* <div> */}
      <div style={{ width: "300px", height: "300px", backgroundColor: "blue" }}>
        Map
      </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
