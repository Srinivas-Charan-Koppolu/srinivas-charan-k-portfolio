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
        <h2>Machine Learning Engineer & Web Enthusiast</h2>
        <p>
          I specialize in building intelligent systems with Machine Learning and AI. 
          Passionate about turning data into insights, solving real-world problems, 
          and crafting clean, responsive web experiences when needed.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">Explore My Work</a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </div>
      </div>

      <div className="hero-image">
        {/* <img src={profileImg} alt="K Srinivas Charan" loading="lazy" /> */}
      </div>
    </section>
  );
};

export default Hero;
