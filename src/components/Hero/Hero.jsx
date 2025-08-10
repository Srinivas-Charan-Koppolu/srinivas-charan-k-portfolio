import React from "react";
import "./Hero.css";
import profileImg from "../../assets/profile.png"; // Import image properly

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>
          Hi, I'm <span>K Srinivas Charan</span>
        </h1>
        <h2>Web Developer & AI Enthusiast</h2>
        <p>
          I build modern, responsive, and high-performance web applications.
          Passionate about technology, AI, and clean design.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
        </div>
      </div>

      <div className="hero-image">
        <img src={profileImg} alt="K Srinivas Charan" loading="lazy" />
      </div>
    </section>
  );
};

export default Hero;
