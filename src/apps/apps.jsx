import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appsList from "./appsData";
import "./Apps.css"; // Import the external CSS

function AppList() {
  const navigate = useNavigate();

  return (
    <div className="app-list-container">
      <h1>All Apps</h1>
      <div className="app-grid">
        {appsList.map((app) => (
          <div key={app.id} className="app-card">
            <h2>{app.title}</h2>
            <p>{app.description}</p>
            <button onClick={() => navigate(`/apps/${app.url}`)}>
              {app.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Apps() {
  const { appName } = useParams();
  const [LoadedComponent, setLoadedComponent] = useState(null);
  const [error, setError] = useState(null);

  const blockedApps = ["personal"];
  const selectedApp =
    appName &&
    !blockedApps.includes(appName.toLowerCase()) &&
    appsList.find((app) => app.url.toLowerCase() === appName.toLowerCase());

  useEffect(() => {
    setLoadedComponent(null);
    setError(null);

    if (!selectedApp) return;

    import(`./${selectedApp.folder}/${selectedApp.folder}.jsx`)
      .then((module) => {
        setLoadedComponent(() => module.default);
      })
      .catch(() => {
        setError(
          `Could not load component from src/apps/${selectedApp.folder}/${selectedApp.folder}.jsx`
        );
      });
  }, [selectedApp]);

  if (!appName) {
    return <AppList />;
  }

  if (blockedApps.includes(appName.toLowerCase())) {
    return <h2 className="error-message">403 - No Access</h2>;
  }

  if (!selectedApp) {
    return (
      <h2 className="status-message">
        App "{appName}" not found in appsData.js.
      </h2>
    );
  }

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  if (!LoadedComponent) {
    return (
      <h2 className="status-message">Loading {selectedApp.title}...</h2>
    );
  }

  return <LoadedComponent />;
}
