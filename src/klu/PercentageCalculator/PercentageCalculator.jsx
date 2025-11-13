// src/pages/Klu/PercentageCalculator/PercentageCalculator.jsx
import React, { useState, useEffect } from "react";
import "./PercentageCalculator.css";

const LOCAL_STORAGE_KEY = "SCK-KL-PercentageHistory";

const PercentageCalculator = () => {
  const [subjectName, setSubjectName] = useState("");
  const [components, setComponents] = useState([
    { id: 1, name: "", weight: 0, max: 0, marks: "" },
  ]);
  const [output, setOutput] = useState("");
  const [weightMsg, setWeightMsg] = useState("");
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("calculator"); // "calculator" or "history"

  // Load history on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setHistory(storedHistory);
  }, []);

  const addComponent = () => {
    setComponents((prev) => [
      ...prev,
      { id: prev.length + 1, name: "", weight: 0, max: 0, marks: "" },
    ]);
  };

  const removeComponent = (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const updateComponent = (id, field, value) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculateGrade = (compList = components) => {
    let totalGrade = 0;
    let totalWeight = 0;
    let missingComponents = [];

    compList.forEach((c) => {
      const w = parseFloat(c.weight);
      const max = parseFloat(c.max);
      const marks = c.marks === "" ? null : parseFloat(c.marks);

      if (isNaN(w) || w < 0) return;
      if (isNaN(max) || max <= 0) return;
      if (marks !== null && (marks < 0 || marks > max)) return;

      totalWeight += w;

      if (marks === null) missingComponents.push(c.name || `#${c.id}`);
      else totalGrade += (marks / max) * w;
    });

    // Weightage message
    if (totalWeight > 100) setWeightMsg("Error: Total weightage exceeds 100%!");
    else if (totalWeight < 100)
      setWeightMsg(`Warning: Still ${(100 - totalWeight).toFixed(2)}% weightage is missing!`);
    else setWeightMsg("");

    // Determine grade
    let grade = "";
    if (totalGrade >= 90) grade = "O";
    else if (totalGrade >= 80) grade = "A+";
    else if (totalGrade >= 70) grade = "A";
    else if (totalGrade >= 60) grade = "B+";
    else if (totalGrade >= 50) grade = "B";
    else if (totalGrade >= 40) grade = "C+";
    else if (totalGrade >= 30) grade = "C";
    else grade = "D";

    let outputText = `Subject: ${subjectName || "Subject"}\nTotal Marks Obtained: ${totalGrade.toFixed(
      2
    )}%\nGrade: ${grade}\n---\n`;

    if (missingComponents.length > 0)
      outputText += `These components are missing: ${missingComponents.join(", ")}\n`;

    if (totalWeight < 100) outputText += `Still ${(100 - totalWeight).toFixed(2)}% weightage is missing`;

    setOutput(outputText);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output).then(() => alert("Output copied to clipboard!"));
  };

  // ----------------- HISTORY FUNCTIONS -----------------

  const saveToHistory = () => {
    const newRecord = {
      id: Date.now(), // unique ID
      subject: subjectName,
      components: components.map((c) => ({ ...c })), // deep copy
    };

    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    alert("Saved to history!");
  };

  const deleteFromHistory = (id) => {
    const updatedHistory = history.filter((rec) => rec.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const reuseFromHistory = (record) => {
    setSubjectName(record.subject);
    setComponents(record.components.map((c, idx) => ({ ...c, id: idx + 1 })));
    setActiveTab("calculator");
    calculateGrade(record.components);
  };

  // ----------------- UI -----------------

  return (
    <div className="percentage-calculator">
      <h1>Course Grade Calculator</h1>

      <div className="tabs">
        <button
          className={activeTab === "calculator" ? "active" : ""}
          onClick={() => setActiveTab("calculator")}
        >
          Calculator
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {activeTab === "calculator" && (
        <>
          <label>
            Subject Name:
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
            />
          </label>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Component Name</th>
                <th>Weightage (%)</th>
                <th>Max Marks</th>
                <th>Marks Obtained</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {components.map((c, idx) => (
                <tr key={c.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => updateComponent(c.id, "name", e.target.value)}
                      placeholder="Component Name"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={c.weight}
                      min={0}
                      onChange={(e) => updateComponent(c.id, "weight", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={c.max}
                      min={1}
                      onChange={(e) => updateComponent(c.id, "max", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={c.marks}
                      min={0}
                      placeholder="Leave empty if not released"
                      onChange={(e) => updateComponent(c.id, "marks", e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="removeBtn" onClick={() => removeComponent(c.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={addComponent}>Add Component</button>
          <button onClick={() => calculateGrade()}>Calculate Total Grade</button>
          <button onClick={saveToHistory}>Save to History</button>

          {weightMsg && (
            <div className={`weightMsg ${weightMsg.includes("Error") ? "error" : "warning"}`}>
              {weightMsg}
            </div>
          )}

          {output && (
            <div>
              <div id="output">{output}</div>
              <button onClick={copyOutput}>Copy Output</button>
            </div>
          )}
        </>
      )}

      {activeTab === "history" && (
        <div className="history-tab">
          <h2>Saved History</h2>
          {history.length === 0 && <p>No records found.</p>}
          {history.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject Name</th>
                  <th>Components</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((rec, idx) => (
                  <tr key={rec.id}>
                    <td>{idx + 1}</td>
                    <td>{rec.subject}</td>
                    <td>
                      {rec.components.map((c, i) => (
                        <div key={i}>
                          {c.name} ({c.marks}/{c.max}, {c.weight}%)
                        </div>
                      ))}
                    </td>
                    <td>
                      <button onClick={() => reuseFromHistory(rec)}>Edit</button>
                      <button onClick={() => deleteFromHistory(rec.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator;
