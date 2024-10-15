import React from "react";

function Login() {
  const styles = {
    form: {
      border: "3px solid #f1f1f1",
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
    buttonHover: {
      opacity: 0.8,
    },
    cancelButton: {
      width: "auto",
      padding: "10px 18px",
      backgroundColor: "#f44336",
    },
    imgContainer: {
      textAlign: "center",
      margin: "24px 0 12px 0",
    },
    avatar: {
      width: "40%",
      borderRadius: "50%",
    },
    container: {
      padding: "16px",
    },
    psw: {
      float: "right",
      paddingTop: "16px",
    },
    cancelButtonContainer: {
      backgroundColor: "#f1f1f1",
    },
    responsive: {
      display: "block",
      float: "none",
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form style={styles.form}>
        <div style={styles.imgContainer}>
          <img src="img_avatar2.png" alt="Avatar" style={styles.avatar} />
        </div>

        <div style={styles.container}>
          <label htmlFor="uname"><b>Username</b></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            style={styles.input}
          />

          <label htmlFor="psw"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            style={styles.input}
          />
          
          <button type="submit" style={styles.button}>
            Login
          </button>
          <label>
            <input type="checkbox" defaultChecked name="remember" /> Remember me
          </label>
        </div>

        <div style={{ ...styles.container, ...styles.cancelButtonContainer }}>
          <button type="button" style={styles.cancelButton}>
            Cancel
          </button>
          <span style={styles.psw}>
            Forgot <a href="#">password?</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
