import React, { useState } from "react";
import { auth } from "../../firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!"); // Alert on successful login
      navigate("/adminProfile"); 
      // Redirect to admin dashboard or homepage
    } catch (error) {
      console.error("Error logging in admin: ", error);
      alert("Error logging in: " + error.message); // Alert on error
      setError(error.message); // Set error state for any additional UI display
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Login</h2>
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

        <p style={styles.signupText}>
          Don't have an account? <a href="/adminsignup">Sign Up</a>
        </p>
        
        <button type="submit" style={styles.button}>
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  form: {
    border: "3px solid #f1f1f1",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: '300px',
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    borderRadius: "4px",
    fontSize: '16px',
  },
  button: {
    backgroundColor: "#04AA6D",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    cursor: "pointer",
    width: "100%",
    borderRadius: "4px",
    fontSize: '16px',
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  signupText: {
    margin: "8px 0",
    textAlign: "center",
  },
};

export default Login;
