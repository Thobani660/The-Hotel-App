import React, { useState } from "react";
import { auth, db } from "../../firebase"; // Import Firebase auth and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store admin data in Firestore
      await setDoc(doc(db, "admins", user.uid), {
        email: user.email,
        idNumber: idNumber,
        cellphone: cellphone,
        location: location,
        createdAt: new Date(),
      });
      alert("Sign up successful!"); // Alert on successful sign-up
      navigate("/");
    } catch (error) {
      console.error("Error creating admin: ", error);
      alert("Error signing up: " + error.message); // Alert on error
      setError(error.message); // Set error state for any additional UI display
    }
  };

  const modalStyles = {
    display: modalVisible ? "block" : "none",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: "50px",
    overflowY: "auto",
  };

  const modalContentStyles = {
    backgroundColor: "#fff",
    margin: "5% auto",
    borderRadius: "8px",
    border: "none",
    width: "90%",
    maxWidth: "500px",
    padding: "20px 40px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
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
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  const cancelButtonStyles = {
    backgroundColor: "#f44336",
    padding: "12px 18px",
    width: "48%",
    fontSize: "16px",
    color: "white",
    borderRadius: "4px",
    marginRight: "4%",
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
    outline: "none",
    transition: "border-color 0.3s",
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
          <h2 style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "600" }}>Admin Sign Up</h2>
          <p style={{ marginBottom: "30px", color: "#666" }}>Create your account</p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyles}
          />
           <input
          type="text"
          placeholder="Enter ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Enter Cellphone Number"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyles}
          />

          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
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
            >
              Cancel
            </button>
            <button
              type="submit"
              style={buttonStyles}
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
