import { useState } from "react";
import ShowSecretApps from "./ShowSecretApps.jsx";
import "./SecretPage.css";

// Store ONLY the encoded password
const ENCRYPTED_PASSWORD = "U3JpbnVAMTIzNDU=";

export default function SecretPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compare encoded user input with stored encoded password
    if (btoa(input) === ENCRYPTED_PASSWORD) {
      setIsAuthorized(true);
    } else {
      alert("Invalid secret code!");
      setInput("");
    }
  };

  if (isAuthorized) {
    return <ShowSecretApps />;
  }

  return (
    <div className="secret-container">
      <h1 className="secret-title">Enter Secret Code</h1>
      <form onSubmit={handleSubmit} className="secret-form">
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter secret code"
          className="secret-input"
        />
        <button type="submit" className="secret-button">Unlock</button>
      </form>
    </div>
  );
}
