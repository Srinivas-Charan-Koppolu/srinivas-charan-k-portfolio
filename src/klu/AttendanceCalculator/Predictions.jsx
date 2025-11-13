import React, { useState, useEffect } from "react";
import { 
  computePercentage, 
  calculateFutureAttendance,
  COMPONENT_WEIGHTS
} from "./attendanceUtils";

const Predict = ({ subject, inputs }) => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  // Normalize inputs: attended/total
  const normalizeInputs = (inputs) => {
    const normalized = {};
    Object.entries(inputs).forEach(([key, val]) => {
      let attended = parseFloat(val.attended || 0);
      let total = parseFloat(val.total || 0);

      if ((!attended || !total) && val.percent) {
        const pct = parseFloat(val.percent);
        if (!isNaN(pct)) {
          total = total || 100;
          attended = (pct / 100) * total;
        }
      }

      normalized[key] = { attended, total };
    });
    return normalized;
  };

  // Describe a scenario
  const describeScenario = (combo, normalizedInputs) => {
    const attendedList = [];
    const missedList = [];
    const notConsideredList = [];

    Object.keys(normalizedInputs).forEach((key) => {
      const input = normalizedInputs[key];
      const attendedBefore = parseFloat(input.attended || 0);

      if (input.total === 0) {
        notConsideredList.push(key);
        return;
      }

      const attendedNow = combo[key] || 0;
      if (attendedNow > attendedBefore) {
        const delta = attendedNow - attendedBefore;
        attendedList.push(`${delta} ${key}${delta > 1 ? "s" : ""}`);
      } else {
        missedList.push(key);
      }
    });

    const parts = [];
    if (attendedList.length) parts.push(`Attended ${attendedList.join(", ")}`);
    if (missedList.length) parts.push(`Missed ${missedList.join(", ")}`);
    if (notConsideredList.length) parts.push(`Not Considered: ${notConsideredList.join(", ")}`);

    return parts.join("; ");
  };

  useEffect(() => {
    try {
      const normalized = normalizeInputs(inputs);
      const futureResults = calculateFutureAttendance(normalized, 5);

      const resultsWithDesc = futureResults.map((pred) => ({
        ...pred,
        scenarioDescription: describeScenario(pred.combo || {}, normalized),
      }));

      setPredictions(resultsWithDesc);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPredictions([]);
    }
  }, [inputs]);

  if (error) return <div>Error: {error}</div>;
  if (predictions.length === 0) return <div>Predicting...</div>;

  return (
    <div>
      <h2>Future Attendance Predictions for: {subject || "Unnamed Subject"}</h2>
      {predictions.map((pred, idx) => (
        <div key={idx} style={{ marginBottom: "1em", borderBottom: "1px solid #ccc", paddingBottom: "0.5em" }}>
          <h4>Scenario {idx + 1}</h4>
          <p><strong>Description:</strong> {pred.scenarioDescription || "No data"}</p>
          <p><strong>Overall Percentage:</strong> {pred.percentage}%</p>
          <p><strong>Status:</strong> {pred.status}</p>
          <ul>
            {Object.entries(pred.componentAnalysis).map(([name, val]) => (
              <li key={name}>{name}: {val}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Predict;
