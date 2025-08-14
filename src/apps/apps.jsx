import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appsList from "./appsData";

/**
 * Renders the list of all available apps.
 */
function renderAppList(navigate) {
  return (
    <div>
      <h1>All Apps</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {appsList.map((app) => (
          <div
            key={app.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "250px",
            }}
          >
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

/**
 * Finds the selected app object from appsData.js using a case-insensitive match.
 */
function findSelectedApp(appName) {
  return appsList.find((app) => app.url.toLowerCase() === appName.toLowerCase());
}

/**
 * Dynamically loads the app component by folder name.
 */
function loadAppComponent(folder, setLoadedComponent, setError) {
  import(`./${folder}/${folder}.jsx`)
    .then((module) => {
      setLoadedComponent(() => module.default);
    })
    .catch(() => {
      setError(
        `Could not load component from src/apps/${folder}/${folder}.jsx`
      );
    });
}

/**
 * Main Apps component
 */
export default function Apps() {
  const { appName } = useParams();
  const navigate = useNavigate();
  const [LoadedComponent, setLoadedComponent] = useState(null);
  const [error, setError] = useState(null);

  // If no specific app is requested, show the list
  if (!appName) {
    return renderAppList(navigate);
  }

  // Find the selected app
  const selectedApp = findSelectedApp(appName);
  if (!selectedApp) {
    return <h2>App "{appName}" not found in appsData.js.</h2>;
  }

  // Load the app component dynamically
  useEffect(() => {
    loadAppComponent(selectedApp.folder, setLoadedComponent, setError);
  }, [selectedApp.folder]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!LoadedComponent) {
    return <h2>Loading {selectedApp.title}...</h2>;
  }

  return <LoadedComponent />;
}
