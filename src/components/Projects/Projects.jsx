import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

// Import project data
import projects from "./projectsData.jsx";

const Projects = () => {
  const initialLimit = 2;  // Show only 2 projects initially
  const [visibleProjects, setVisibleProjects] = useState(initialLimit+1);

  const handleLoadMore = () => {
    window.location.href = "/projects"; // Navigate to /projects page
    // setVisibleProjects(prevVisible => prevVisible + 1); // Show 1 more project
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-title">
          <h2>
            My <span className="highlight">Projects</span>
          </h2>
          <p>Here are some of the projects I’ve been working on recently.</p>
        </div>

        {/* Projects Wrapper */}
        <div className="projects-wrapper">
          {projects
            .filter((project, index) => index < visibleProjects)
            .map((project, index) => (
              <div
                className={`project-card ${index === 2 ? "faded-card" : ""}`}
                key={project.id}
              >
                <div className="project-img">
                  <img src={project.img} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p className="date">{project.date}</p>
                  <p>{project.description.slice(0, 70)}...</p> {/* Shorten description */}
                  <div className="project-tech">
                    {project.tech.map((t, i) => (
                      <span key={i} className="tech-item">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          {/* Arrow button to load more, beside the last card */}
          {visibleProjects < projects.length && (
            <div className="load-more-wrapper">
              <button onClick={handleLoadMore} className="load-more">
                <span className="arrow">→</span> {/* Only the arrow */}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
