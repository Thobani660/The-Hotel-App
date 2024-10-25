// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Booking from "./pages/admin/bookings";
import NoPage from "./pages/noPage";
import NavBar from "./components/nav";
import History from "./pages/history";
import Profile from "./pages/profile";
import AdmitSignIn from "./pages/admin/signin";
import AdmitSignUp from "./pages/admin/SignUp"
import AdminProfile from "./pages/admin/adminProfile";
import Accommodation from "./pages/accomodation";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <NavBar />
        <div style={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/adminsignin" element={<AdmitSignIn />} />
            <Route path="/adminsignup" element={<AdmitSignUp />} />
            <Route path="/accomodation" element={<Accommodation />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminProfile" element={<AdminProfile />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
            <Route path="*" element={<NoPage />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Basic styles for layout
const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  contentContainer: {
    marginTop: "70px",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
};

export default App;
