// Slideshow.js
import React, { useState } from "react";
import "../styles/Slideshow.css"; // Assuming you will keep the CSS in a separate file

const Slideshow = () => {
  const slides = [
    {
      src: "img_woods_wide.jpg",
      alt: "The Woods",
    },
    {
      src: "img_5terre_wide.jpg",
      alt: "Cinque Terre",
    },
    {
      src: "img_mountains_wide.jpg",
      alt: "Mountains and fjords",
    },
    {
      src: "img_lights_wide.jpg",
      alt: "Northern Lights",
    },
    {
      src: "img_nature_wide.jpg",
      alt: "Nature and sunrise",
    },
    {
      src: "img_snow_wide.jpg",
      alt: "Snowy Mountains",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => (prevIndex + n + slides.length) % slides.length);
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Slideshow Gallery</h2>

      {slides.map((slide, index) => (
        <div key={index} className={`mySlides ${slideIndex === index ? 'active' : ''}`}>
          <div className="numbertext">{index + 1} / {slides.length}</div>
          <img src={slide.src} alt={slide.alt} style={{ width: "100%" }} />
        </div>
      ))}

      <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
      <a className="next" onClick={() => plusSlides(1)}>❯</a>

      <div className="caption-container">
        <p id="caption">{slides[slideIndex].alt}</p>
      </div>

      <div className="row">
        {slides.map((slide, index) => (
          <div className="column" key={index}>
            <img
              className={`demo cursor ${slideIndex === index ? 'active' : ''}`}
              src={slide.src.replace('_wide', '')} // Assuming the thumbnail is the same as the wide but without '_wide'
              style={{ width: "100%" }}
              onClick={() => currentSlide(index)}
              alt={slide.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
