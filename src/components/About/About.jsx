import React from "react";
import "./About.css";

const About = () => {
  return (
    <section id="about" className="about-section container">
      <div className="section-title">
        <h2 className="main-heading">
          <span className="highlight">About</span> Me
        </h2>
        <p className="subtitle">
          Discover my journey, skills, and passion for technology
        </p>
        <div className="title-decoration"></div>
      </div>

      <div className="about-card">
        <div className="card-header">
          <div className="icon-box">
            <i className="fas fa-user"></i>
          </div>
          <h3>Who Am I?</h3>
        </div>
        <div className="card-body">
          <p>
            I'm a passionate <span className="highlight-text">Python Programmer</span> and{" "}
            <span className="highlight-text">Machine Learning enthusiast</span>, currently pursuing
            <strong> B.Tech CSE Honors</strong> at KL University. My journey is defined by persistence, continuous learning, and a strong desire to innovate.
          </p>
          <p>
            I specialize in building full-stack applications and AI-driven solutions. I strongly believe in technology's potential to solve real-world problems and make a positive impact.
          </p>
          <p>
            Outside coding, I keep up with emerging tech trends, contribute to open-source projects, and am always striving to grow as a developer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
