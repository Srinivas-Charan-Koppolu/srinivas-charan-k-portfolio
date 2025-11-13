// src/pages/Klu/Klu.jsx
import React from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import "./klu.css";

// Internal KLU pages
import AttendanceCalculator from "./AttendanceCalculator/AttendanceCalculator.jsx";
import PercentageCalculator from "./PercentageCalculator/PercentageCalculator.jsx";

const Klu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we are at the base /klu path
  const isBasePath = location.pathname === "/klu";

  return (
    <div className="klu-container">
      <h2>Welcome to KLU Portal</h2>

      {isBasePath ? (
        // Show menu only on the base KLU page
        <nav>
          <ul>
            <li>
              <Link to="attendance-calculator">Attendance Calculator</Link>
            </li>
            <li>
              <Link to="grade-calculator">Grade Calculator</Link>
            </li>
          </ul>
        </nav>
      ) : (
        // Show back button on nested pages
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to KLU Home
        </button>
      )}

      <hr />

      <Routes>
        <Route path="/" element={<p>Select a KLU tool or page above.</p>} />
        <Route path="attendance-calculator" element={<AttendanceCalculator />} />
        <Route path="grade-calculator" element={<PercentageCalculator />} />
        <Route path="*" element={<p>Page not found inside KLU.</p>} />
      </Routes>
    </div>
  );
};

export default Klu;
