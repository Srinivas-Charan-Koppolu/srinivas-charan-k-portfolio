import React from "react";
import "./ProjectsPage.css"; // Separate styles for ProjectsPage
import projects from "../../components/Projects/projectsData";

function ProjectsPage() {
  return (
    <div className="projects-page-container">
      <header className="projects-page-header">
        <h1>All My Projects</h1>
        <p>Here are all of my projects. Explore the work I've done!</p>
      </header>

      <section className="projects-grid">
        {projects
          .filter((project) => project.visible) // Show only visible projects
          .map((project, index) => (
            <div className="project-card-container" key={index}>
              {/* Top Section */}
              <div className="project-card-top">
                <div className="project-card-image">
                  <img src={project.img} alt={project.title} />
                  <div className="image-overlay"></div>
                </div>
                <div className="project-card-top-right">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>

              {/* Bottom Section (Tech Stack) */}
              <div className="project-card-bottom">
                <div className="project-tech-stack">
                  {project.tech.map((t, i) => (
                    <span key={i} className="tech-item">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Project Links Section */}
                <div className="project-links">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <i className="fas fa-link"></i> {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default ProjectsPage;
