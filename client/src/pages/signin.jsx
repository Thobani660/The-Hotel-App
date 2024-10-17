import React, { useState } from "react";
import { auth } from "../firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { loginSuccess, loginFailure } from "../features/authSlice"; // Import actions from the auth slice

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get user data from Firebase
      dispatch(loginSuccess(user)); // Dispatch loginSuccess with user data
      alert("Login successful!"); // Alert on successful login
      navigate("/user-dashboard"); // Redirect to user dashboard or homepage
    } catch (error) {
      console.error("Error logging in user: ", error);
      alert("Error logging in: " + error.message); // Alert on error
      dispatch(loginFailure(error.message)); // Dispatch loginFailure with error message
      setError(error.message); // Set error state for any additional UI display
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <label htmlFor="email"><b>Email</b></label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          required
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a> {/* Updated link for user sign-up */}
      </p>
    </div>
  );
}

const styles = {
  form: {
    border: "3px solid #f1f1f1",
    padding: "20px",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#04AA6D",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
};

export default UserLogin;
