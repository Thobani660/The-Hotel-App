import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signupStart, signupSuccess, signupFailure } from "../../features/authSlice"; // Import actions
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // New field for admin name
  const [profilePic, setProfilePic] = useState(null); // New field for profile picture
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(true); // Visible by default for demo purposes
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use dispatch for Redux actions

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(signupStart()); // Start the signup process
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Here, you can save additional user information (like name and profile picture) to Firestore
      // await saveAdminInfo(user.uid, { name, profilePic });

      dispatch(signupSuccess({ uid: user.uid, email, name, profilePic })); // Dispatch success action
      alert("Welcome, you have successfully signed up. Please sign in.");
      navigate("/adminsignin"); // Redirect to the admin sign-in page
    } catch (err) {
      setError(err.message);
      dispatch(signupFailure(err.message)); // Dispatch failure action
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const modalStyles = {
    display: modalVisible ? "block" : "none",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark transparent background
    paddingTop: "50px",
    overflowY: "auto", // Allow scrolling
  };

  const modalContentStyles = {
    backgroundColor: "#fff",
    margin: "5% auto",
    borderRadius: "8px",
    border: "none",
    width: "90%",
    maxWidth: "500px",
    padding: "20px 40px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
    textAlign: "center", // Center text alignment for a cleaner look
  };

  const buttonStyles = {
    backgroundColor: "#04AA6D",
    color: "white",
    padding: "12px 18px",
    margin: "8px 0",
    border: "none",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
    borderRadius: "4px", // Rounded button corners
    transition: "background-color 0.3s", // Smooth transition on hover
  };

  const buttonHoverStyles = {
    backgroundColor: "#03A05E",
  };

  const cancelButtonStyles = {
    backgroundColor: "#f44336",
    padding: "12px 18px",
    width: "48%",
    fontSize: "16px",
    color: "white",
    borderRadius: "4px",
    marginRight: "4%", // Slight spacing between cancel and submit buttons
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s",
  };

  const inputStyles = {
    width: "100%",
    padding: "12px 18px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none", // Remove the outline on focus
    transition: "border-color 0.3s", // Smooth focus transition
  };

  const inputFocusStyles = {
    borderColor: "#04AA6D",
  };

  const termsLinkStyles = {
    color: "#1E90FF",
    textDecoration: "none",
  };

  return (
    <div>
      <div style={modalStyles}>
        <span
          onClick={() => setModalVisible(false)}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            fontSize: "30px",
            fontWeight: "bold",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          &times;
        </span>

        <form style={modalContentStyles} onSubmit={handleSignUp}>
          <h2 style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "600" }}>Sign Up</h2>
          <p style={{ marginBottom: "30px", color: "#666" }}>Create your account</p>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyles}
            onFocus={(e) => (e.target.style.borderColor = inputFocusStyles.borderColor)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyles}
            onFocus={(e) => (e.target.style.borderColor = inputFocusStyles.borderColor)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyles}
            onFocus={(e) => (e.target.style.borderColor = inputFocusStyles.borderColor)}
          />

          <input
            type="file"
            onChange={handleProfilePicChange}
            required
            style={inputStyles}
          />

          <label style={{ display: "block", margin: "15px 0" }}>
            <input type="checkbox" checked="checked" style={{ marginRight: "10px" }} />
            Remember me
          </label>

          <p style={{ marginBottom: "20px", color: "#666" }}>
            By creating an account, you agree to our{" "}
            <a href="#" style={termsLinkStyles}>
              Terms & Privacy
            </a>
            .
          </p>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={() => setModalVisible(false)}
              style={cancelButtonStyles}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e53935")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={buttonStyles}
              onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#04AA6D")}
            >
              Sign Up
            </button>
          </div>

          {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
