import React, { useRef } from "react";
import "./Projects.css";

import gamezImg from "./../../assets/projects/GameZ.jpg";
import moodImg from "./../../assets/projects/play-your-mood.jpg";
import erpImg from "./../../assets/projects/erp-classroom-finder.png";
import vibeImg from "./../../assets/projects/vibe-stream.png";
import audioImg from "./../../assets/projects/audio-feel.jpg";
import flapImg from "./../../assets/projects/flap-the-box.jpg";

const projects = [
  {
    title: "GameZ - Online Multiplayer Gaming Platform",
    img: gamezImg,
    description:
      "An online multiplayer gaming platform where users can track and spend game coins acquired through physical transactions. Includes admin panel, messaging system using pywhatkit, and multiplayer integration plans.",
    tech: ["Python (Flask)", "SQLite", "JavaScript", "HTML", "CSS", "Jinja"],
    github: "",
    demo: "",
  },
  {
    title: "Play Your Mood - Personalized Music Streaming Web App",
    img: moodImg,
    description:
      "A personalized music streaming app recommending songs based on user mood. Features playlists, smooth animations, and glassmorphism UI. Built with React frontend & Spring backend.",
    tech: ["HTML", "CSS", "JavaScript", "Java", "Spring", "React", "Postman"],
    github: "",
    demo: "",
  },
  {
    title: "ERP - Classroom Finder",
    img: erpImg,
    description:
      "A time slot calculator for classrooms that finds free rooms by subtracting scheduled classes. Optimized for large datasets and resource allocation.",
    tech: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    github: "",
    demo: "",
  },
  {
    title: "VibeStream - Social Media Platform",
    img: vibeImg,
    description:
      "A social media platform for sharing and discovering media. Includes authentication, profile management, and engagement optimization.",
    tech: ["Python", "Flask", "SQLite3", "HTML", "CSS", "JavaScript"],
    github: "",
    demo: "",
  },
  {
    title: "Audio Feel - Web-based Music Player",
    img: audioImg,
    description:
      "A music player for local songs with playlist creation. Improved user retention by 40% through interface optimization.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: "",
    demo: "",
  },
  {
    title: "Flap The Box - 2D HTML5 Canvas Game",
    img: flapImg,
    description:
      "A smooth HTML5 Canvas game with refined difficulty progression and event handling for better response time.",
    tech: ["HTML", "CSS", "JavaScript", "Canvas"],
    github: "",
    demo: "",
  },
];

const Projects = () => {
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (direction === "left") {
      scrollContainer.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollContainer.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-title">
          <h2>
            My <span className="highlight">Projects</span>
          </h2>
          <p>Some of my recent work and contributions</p>
        </div>

        <div className="projects-wrapper" ref={scrollContainer}>
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-img">
                <img src={project.img} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-item">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <i className="fab fa-github"></i> View Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Arrows */}
        <div className="scroll-arrows">
          <button className="scroll-left" onClick={() => scroll("left")}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="scroll-right" onClick={() => scroll("right")}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
