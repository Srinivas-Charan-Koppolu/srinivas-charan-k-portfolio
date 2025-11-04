// src/pages/Klu/Klu.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import your internal KLU pages
import AttendanceCalculator from "./AttendanceCalculator/AttendanceCalculator.jsx";

const Klu = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to KLU Portal</h2>

      {/* Internal navigation just for /klu routes */}
      <nav>
        <ul>
          <li><Link to="attendance-calculator">Attendance Calculator</Link></li>
        </ul>
      </nav>

      <hr />

      {/* 👇 Internal router for /klu/* subpaths */}
      <Routes>
        <Route path="/" element={<p>Select a KLU tool or page above.</p>} />
        <Route path="attendance-calculator" element={<AttendanceCalculator />} />
        <Route path="*" element={<p>Page not found inside KLU.</p>} />
      </Routes>
    </div>
  );
};

export default Klu;
