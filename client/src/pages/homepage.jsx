import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
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
    marginTop: "30px",
    transition: "background-color 0.3s", // Smooth background transition
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049", // Darker green on hover
  };

  const slides = [
    {
      src: require("../res/premium_photo-1676321688607-2d18ba129dbd.avif"),
      alt: "The Woods",
    },
    {
      src: require("../res/photo-1657349226767-66c983d7df39.avif"),
      alt: "Cinque Terre",
    },
    {
      src: require("../res/photo-1663659512973-8df941db5e1a.avif"),
      alt: "Mountains and fjords",
    },
    {
      src: require("../res/premium_photo-1675745329378-5573c360f69f.avif"),
      alt: "Northern Lights",
    },
    {
      src: require("../res/photo-1594027554094-99c00129af63.avif"),
      alt: "Nature and sunrise",
    },
    {
      src: require("../res/premium_photo-1676321688607-2d18ba129dbd.avif"),
      alt: "Snowy Mountains",
    },
  ];

  // Function to change slides automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ 
      fontFamily: "Arial, sans-serif", 
      backgroundColor: "#f5f5f5", 
      padding: "20px",
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh', // Ensure the container takes full viewport height
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        maxWidth: '1200px', // Set a maximum width for the content
        width: '100%', // Allow it to be responsive
      }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: "350px",
              backgroundImage: `url(${require("../res/H1.jpg")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              textAlign: "center",
              marginTop: "-25px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for depth
            }}
          >
            {!showOptions ? (
              <button
                style={buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            ) : (
              <>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onClick={handleUserLogin}
                >
                  Login as User
                </button>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                  onClick={handleAdminLogin}
                >
                  Login as Admin
                </button>
              </>
            )}
          </div>

          <h1 style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>Welcome to Our Gallery</h1>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", flexGrow: 1 }}>
          <div
            style={{
              backgroundColor: "#e63946",
              width: "550px",
              height: "350px",
              borderRadius: "20px",
              marginLeft: "70px",
              padding: "20px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
            }}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "1.5em" }}>About Our Hotels</h2>
            <p>
              Experience the finest hospitality at our hotels, where comfort meets luxury. Whether you're traveling for
              business or leisure, our rooms are designed to provide you with the perfect retreat. Enjoy top-notch amenities and personalized service that makes every stay memorable. Book your next getaway with us today!
            </p>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.1741882060755!2d-122.39994908469258!3d37.78668677975779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8bc1745b%3A0xe030e627e4a3b5c7!2sHotel%20Name!5e0!3m2!1sen!2sus!4v1663651841236!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: "0", borderRadius: "10px", marginTop: "-10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div
            style={{
              backgroundColor: "#f1faee",
              width: "600px",
              height: "350px",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
            }}
          >
            <h2 style={{ textAlign: "center", color: "#333", margin: "20px 0" }}>Gallery</h2>
            <img
              src={slides[slideIndex].src}
              alt={slides[slideIndex].alt}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                objectFit: "cover",
                transition: "opacity 0.5s ease", // Smooth transition for slideshow
              }}
            />
          </div>
        </div>

        {/* Footer Section */}
        <div
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "#457b9d",
            textAlign: "center",
            color: "white",
            marginTop: "20px",
            paddingTop: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
          }}
        >
          <h2>Explore the Best of Hospitality</h2>
          <p>Book your stay today!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
