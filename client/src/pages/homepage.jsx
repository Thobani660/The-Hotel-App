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
    marginTop: "-140px",
    transition: "background-color 0.3s", // Smooth background transition
  };

  const buttonHoverStyle = {
    backgroundColor: "black",
    color: "yellow", // Darker green on hover
  };

  const slides = [
    {
      src: require("../res/istockphoto-1192833363-612x612-removebg-preview.png"),
      alt: "The Woods",
    },
    {
      src: require("../res/istockphoto-1192833363-612x612-removebg-preview.png"),
      alt: "Cinque Terre",
    },
    {
      src: require("../res/R.png"),
      alt: "Mountains and fjords",
    },
    {
      src: require("../res/R.png"),
      alt: "Northern Lights",
    },
    {
      src: require("../res/R.png"),
      alt: "Nature and sunrise",
    },
    {
      src: require("../res/istockphoto-1192833363-612x612-removebg-preview.png"),
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
    <div
      style={{
        width: "100%",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        height: "90%",
        paddingTop: "80px", // Add padding to compensate for the fixed navbar height
        paddingBottom: "120px", // Add padding to compensate for the footer height
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "", // Set a maximum width for the content
          // Allow it to be responsive
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: "730px",
              backgroundImage: `url(${require("../res/istockphoto-1192833363-612x612-removebg-preview.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              textAlign: "center",
              marginTop: "-165px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for depth
            }}
          >
            <div
              style={{
                justifyContent: "flex-start",
                textAlign: "start",
                color: "gold",
                alignItems: "center",
                marginTop: "",
                height: "100%",
                width: "400px",
                backgroundColor: "transparent",
                marginLeft: "120px",
                paddingTop: "70px",
              }}
            >
              <h2>
                {" "}
                Welocme to philas Hotel App <br />
                where you can see can book for <br />
                weddings,parties meetings
              </h2>
            </div>
            {!showOptions ? (
              <button
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    buttonStyle.backgroundColor)
                }
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            ) : (
              <>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonStyle.backgroundColor)
                  }
                  onClick={handleUserLogin}
                >
                  Login as User
                </button>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonStyle.backgroundColor)
                  }
                  onClick={handleAdminLogin}
                >
                  Login as Admin
                </button>
              </>
            )}
          </div>

          <h1 style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
            Welcome to Our Gallery
          </h1>
          <p  style={{width:"900px",alignItems:"center",textAlign:"center",margin: "20px 0",justifyContent:"center",marginLeft:"450px"}}>Philasande Hotel is located in Pietermaritzburg, the heart of KwaZulu-Natal, and is renowned for its exceptional service and top-notch facilities. Security is of paramount importance, ensuring a safe and comfortable stay for all guests.

Since re-opening on December 1, 2021, Philasande Hotel has welcomed guests with rave reviews and memorable experiences.

The hotel features the renowned Mangwanani Signature Spa on-site, the Fire Room Restaurant, and the Copper Restaurant, which offers a hearty buffet breakfast (optional) every morning. This stunning hotel is the perfect short break for travelers looking for accommodation in Pietermaritzburg. Experience the best rate for hotel accommodation and discover the charm of Philasande Hotel for yourself.</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "#e63946",
              width: "45%",
              // marginLeft:"-70px",
              height: "350px",
              borderRadius: "20px",
              padding: "20px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
            }}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "1.5em" }}>
              About Our Hotels
            </h2>
            <p>
              Experience the finest hospitality at our hotels, where comfort
              meets luxury. Whether you're traveling for business or leisure,
              our rooms are designed to provide you with the perfect retreat.
              Enjoy top-notch amenities and personalized service that makes
              every stay memorable. Book your next getaway with us today!
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
              width: "45%",
              height: "350px",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for depth
              marginLeft: "100px",
            }}
          >
            <h2
              style={{ textAlign: "center", color: "#333", margin: "20px 0" }}
            >
              Gallery
            </h2>
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