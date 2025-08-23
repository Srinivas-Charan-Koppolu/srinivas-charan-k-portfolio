import React from "react";
import "./About.css";

const About = () => {
  return (
<section id="about" className="about-section container">
  <div className="section-title">
    <h2 className="main-heading">
      <span className="highlight">Origin</span> Story
    </h2>
    <p className="subtitle">
      EMPATHY OVER CONFLICT LEADS PEACE
    </p>
    <div className="title-decoration"></div>
  </div>

  <div className="about-content">
    <p>
      I’m <strong>K Srinivas Charan</strong>, a student at <span className="highlight-text">KL University</span> pursuing B.Tech. My passion lies deeply in <span className="highlight-text">Python</span> and <span className="highlight-text">Machine Learning</span>, where I continuously explore new ways to build software that fits real-life needs and respects solid engineering principles.
    </p>
    <p>
      I approach development thoughtfully — not just writing code, but crafting solutions that are precise, efficient, and meaningful. I believe in creating software that solves problems with care, delivering results that truly matter.
    </p>
    <p>
      Outside of technology, I find joy in cycling, drawing, and storytelling — a hobby that lets me weave creativity and imagination into my life. I’m an amateur writer, casually exploring narratives whenever inspiration strikes.
    </p>
    <p>
      For me, coding is more than a skill — it’s a way to connect ideas, people, and purpose, striving always for empathy over conflict, and peace through understanding.
    </p>
  </div>
</section>
  );
};

export default About;
