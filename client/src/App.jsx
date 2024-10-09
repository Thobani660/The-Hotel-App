import Home from "./pages/homepage";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Booking from "./pages/bookings";
import NoPage from "./pages/noPage";
import NavBar from "./components/nav";
import Payment from "./pages/payment";
import History from "./pages/history";
import Profile from "./pages/profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



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
                      <Route path="/bookings" element={<Booking />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/history" element={<History />} />
                      <Route path="*" element={<NoPage />} /> {/* Fallback for unmatched routes */}
                      <Route path="/profile" element={<Profile />} />

                  </Routes>
              </div>
          </div>
      </Router>
  );
}

const styles = {
  appContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
  },
  contentContainer: {
      marginTop: '70px', // Adjust according to your NavBar height
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
  },
};

export default App