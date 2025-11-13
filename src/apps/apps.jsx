import React from "react";
import { useNavigate } from "react-router-dom";
import "./Apps.css";

const Apps = () => {
  const navigate = useNavigate();

  const appsList = [
      {
          name: "My Apps",
          desc: "Personal experimental applications and tools.",
          path: "/myapps",
          accent: "var(--apps-accent-green)",
      },
      {
          name: "Stories",
          desc: "Short stories, blogs, and creative writing pieces.",
          path: "/stories",
          accent: "var(--apps-accent-pink)",
        },
        {
          name: "KLU Tools",
          desc: "Attendance & Grade Calculators for KLU students.",
          path: "/klu",
          accent: "var(--apps-text-glow)",
        },
  ];

  return (
    <div className="play-apps-container">
      <h1 className="apps-title">Explore My Apps</h1>

      <div className="apps-grid">
        {appsList.map((app, i) => (
          <div
            key={i}
            className="app-card"
            style={{ "--accent": app.accent }}
            onClick={() => navigate(app.path)}
          >
            <div className="app-card-content">
              <h2>{app.name}</h2>
              <p>{app.desc}</p>
            </div>
            <div className="app-card-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
