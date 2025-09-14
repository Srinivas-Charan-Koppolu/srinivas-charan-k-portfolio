import React, { useState, useEffect } from "react";
import "./Gallery.css";

// Import images dynamically
import mentorImage from "../../assets/gallery/PL_Mentor.jpg";
import kondapalliImage from "../../assets/gallery/Kondapalli.jpg";
import innovationImage from "../../assets/gallery/DTI.jpg";
import sih2025Image from "./../../assets/gallery/sih2025Image.jpg"

const galleryItems = [
  {
    src: mentorImage,
    alt: "Python Mentoring",
    title: "Python Mentoring",
    desc: "Mentored juniors about skill development and lectured on Python for 18 days",
  },
  {
    src: kondapalliImage,
    alt: "Kondapalli",
    title: "Trekking",
    desc: "Trekking to Kondapalli with our college group was an amazing experience.",
  },
  {
    src: innovationImage,
    alt: "DTI Team",
    title: "Innovation Ten - App Monsters",
    desc: "We are a team of 10, creating a strong skill sector by designing real-life scenarios.",
  },
  {
    src: sih2025Image,
    alt: "Team SIH 2025",
    title: "Luminous",
    desc: "Glow beyond the time - sleep. Tidea of shining even in moments of rest.",
  },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="gallery-component">
      <div className="gallery-container">
        <h2 className="gallery-title">
          My <span className="highlight">Gallery</span>
        </h2>

        <div className="carousel">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
            >
              <img src={item.src} alt={item.alt} className="gallery-img" />
              <div className="gallery-caption">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button className="carousel-btn prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            &#10095;
          </button>

          {/* Dots */}
          <div className="carousel-dots">
            {galleryItems.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
