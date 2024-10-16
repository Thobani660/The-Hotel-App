// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(userCredential.user));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error logging in user: ", error);
      dispatch(loginFailure(error.message));
      alert("Error logging in: " + error.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9", // Light background for contrast
    },
    form: {
      width: "90%",
      maxWidth: "400px",
      backgroundColor: "#fff",
      padding: "30px 40px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px 18px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.3s", // Smooth focus effect
    },
    inputFocus: {
      borderColor: "#04AA6D",
    },
    button: {
      backgroundColor: "#04AA6D",
      color: "white",
      padding: "12px 18px",
      margin: "20px 0",
      border: "none",
      cursor: "pointer",
      width: "100%",
      fontSize: "16px",
      borderRadius: "4px",
      transition: "background-color 0.3s", // Smooth hover effect
    },
    buttonHover: {
      backgroundColor: "#03A05E",
    },
    error: {
      color: "red",
      marginBottom: "20px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "500",
      display: "block",
      textAlign: "left",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "600" }}>Login</h2>

        {error && <p style={styles.error}>{error}</p>} {/* Display error message */}

        <div>
          <label htmlFor="email" style={styles.label}><b>Email</b></label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
          />
        </div>

        <div>
          <label htmlFor="password" style={styles.label}><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
          />
        </div>
        <h5> Don't have an account? <Link to="/signup">Sign Up</Link></h5>  
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#04AA6D")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
