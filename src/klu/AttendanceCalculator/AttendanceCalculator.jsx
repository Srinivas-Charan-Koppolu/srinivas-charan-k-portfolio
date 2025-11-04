import React, { useState } from "react";
import "./AttendanceCalculator.css";

// Import child components
import Calculate from "./Calculate.jsx";
import Predict from "./Predictions.jsx";
import History from "./History.jsx";

const AttendanceCalculator = () => {
  const [subject, setSubject] = useState("");
  const [inputs, setInputs] = useState({
    lecture: { percent: "", attended: "", total: "" },
    tutorial: { percent: "", attended: "", total: "" },
    practical: { percent: "", attended: "", total: "" },
    skilling: { percent: "", attended: "", total: "" },
  });

  const [tab, setTab] = useState("");

  const handleInput = (section, field, value) => {
    setInputs((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const renderRow = (label, key) => (
    <div className="input-row" key={key}>
      <label>{label}</label>
      <div className="dual-input">
        <input
          type="number"
          placeholder="%"
          value={inputs[key].percent}
          onChange={(e) => handleInput(key, "percent", e.target.value)}
        />
        <span className="divider">or</span>
        <div className="xy-input">
          <input
            type="number"
            placeholder="Attended"
            value={inputs[key].attended}
            onChange={(e) => handleInput(key, "attended", e.target.value)}
          />
          <span>/</span>
          <input
            type="number"
            placeholder="Total"
            value={inputs[key].total}
            onChange={(e) => handleInput(key, "total", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

const handleReuse = (inputs, subjectName) => {
  setSubject(subjectName || "");
  if (inputs) {
    setInputs(inputs);
  }
  setTab("calculate"); // automatically switch to calculate tab
};

  return (
    <div className="attendance-page">
      <h1>KLU Attendance Input</h1>

      {/* Top input section */}
      <div className="input-section">
        <label>Subject Name:</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject name"
        />

        {renderRow("Lecture", "lecture")}
        {renderRow("Tutorial", "tutorial")}
        {renderRow("Practical", "practical")}
        {renderRow("Skilling", "skilling")}
      </div>

      {/* Bottom tabs section */}
      <div className="bottom-tabs">
        <button
          className={tab === "calculate" ? "active" : ""}
          onClick={() => setTab("calculate")}
        >
          CALCULATE
        </button>
        <button
          className={tab === "predict" ? "active" : ""}
          onClick={() => setTab("predict")}
        >
          PREDICT
        </button>
        <button
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          HISTORY
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {tab === "calculate" && <Calculate subject={subject} inputs={inputs} />}
        {tab === "predict" && <Predict subject={subject} inputs={inputs} />}
        {tab === "history" && <History onReuse={handleReuse} />}
      </div>
    </div>
  );
};

export default AttendanceCalculator;
