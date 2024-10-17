// src/App.js
import Home from "./pages/homepage";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Booking from "./pages/admin/bookings";
import NoPage from "./pages/noPage";
import NavBar from "./components/nav";
import Payment from "./pages/payment";
import History from "./pages/history";
import Profile from "./pages/profile";
import AdmitSignIn from "./pages/admin/signin";
import AdmitSignUp from "./pages/admin/signup";
import AdminProfile from "./pages/admin/adminProfile";
// import Profile from "./pages/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <NavBar /> {/* Navbar at the top */}
        <div style={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} /> {/*user*/}
            <Route path="/signup" element={<SignUp />} /> {/*user*/}
            <Route path="/adminsignin" element={<AdmitSignIn />} />{" "}
            {/* Admin SignIn */}
            <Route path="/adminsignup" element={<AdmitSignUp />} />{" "}
            {/* Admin SignUp */}
            <Route path="/bookings" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminProfile" element={<AdminProfile />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="*" element={<NoPage />} />{" "}
            {/* Catch-all route for unmatched paths */}
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
    marginTop: "70px", // Adjust based on NavBar height
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
};

export default App;
