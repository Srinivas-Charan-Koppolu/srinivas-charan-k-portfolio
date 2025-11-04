import React, { useState, useEffect } from "react";
import { 
  computePercentage, 
  calculateAttendance, 
  saveToLocal, 
  loadFromLocal, 
  buildCompactInput,
  LOCAL_STORAGE_KEY
} from "./attendanceUtils"; // adjust path if needed


const Calculate = ({ subject, inputs }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      // Compute percentages for each component
      const lecturePct = computePercentage(inputs.lecture);
      const tutorialPct = computePercentage(inputs.tutorial);
      const practicalPct = computePercentage(inputs.practical);
      const skillingPct = computePercentage(inputs.skilling);

      // Calculate overall attendance
      const res = calculateAttendance(
        lecturePct,
        tutorialPct,
        practicalPct,
        skillingPct
      );

      setResult(res);
      setError(null);
      setSaved(false); // reset saved state when inputs change
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  }, [inputs]);

  const handleSaveToHistory = () => {
    if (!result) return;

    // Load existing history
    const history = loadFromLocal(LOCAL_STORAGE_KEY);

    // Build new record
    const newRecord = {
      id: Date.now(), // or use uuid if preferred
      subject: subject || "Unnamed Subject",
      timestamp: new Date().toISOString(),
      inputs: buildCompactInput(inputs),
      result,
    };

    // Save back to local storage
    saveToLocal(LOCAL_STORAGE_KEY, [newRecord, ...history]);
    setSaved(true);
  };

  if (error) return <div>Error: {error}</div>;
  if (!result) return <div>Calculating...</div>;

  return (
    <div>
      <h2>Attendance Result for: {subject || "Unnamed Subject"}</h2>
      
      <h3>Overall Attendance</h3>
      <p>Percentage: {result.percentage}%</p>
      <p>Status: {result.status}</p>

      <h3>Component Analysis</h3>
      <ul>
        {Object.entries(result.componentAnalysis).map(([name, val]) => (
          <li key={name}>{name}: {val}</li>
        ))}
      </ul>

      <h3>Recommendations</h3>
      {result.recommendations.length === 0 ? (
        <p>All good! No recommendations.</p>
      ) : (
        <ul>
          {result.recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      )}

      <button onClick={handleSaveToHistory} disabled={saved} style={{ marginTop: "1em" }}>
        {saved ? "Saved to History" : "Save to History"}
      </button>
    </div>
  );
};

export default Calculate;
