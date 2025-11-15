// src/pages/Klu/PercentageCalculator/PercentageCalculator.jsx
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas"; // Import html2canvas

import { SUBJECT_TEMPLATES, getSubjectTemplateById } from "./loadsubjects.jsx";

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
  const [activeTab, setActiveTab] = useState("calculator");

  // Load history on component mount
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setHistory(storedHistory);
  }, []);

  // ----------------- LOAD TEMPLATE BY ID -----------------
  const loadTemplate = (id) => {
    const template = getSubjectTemplateById(id);
    if (!template) return;

    setSubjectName(template.subject);

    setComponents(
      template.components.map((c, idx) => ({
        id: idx + 1,
        name: c.name,
        weight: c.weight,
        max: c.max,
        marks: "",
      }))
    );
  };

  // Add a component row
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

  // ----------------- CALCULATE GRADE -----------------
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
    if (totalWeight > 100)
      setWeightMsg("Error: Total weightage exceeds 100%!");
    else if (totalWeight < 100)
      setWeightMsg(
        `Warning: Still ${(100 - totalWeight).toFixed(
          2
        )}% weightage is missing!`
      );
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
    else grade = "F";

    let outputText = `Subject: ${
      subjectName || "Subject"
    }\nTotal Marks Obtained: ${totalGrade.toFixed(
      2
    )}%\nGrade: ${grade}\n\n`;

    if (missingComponents.length > 0)
      outputText += `These components are missing: \n\t${missingComponents.join(
        ", \n\t"
      )}\n`;

    if (totalWeight < 100)
      outputText += `Still ${(100 - totalWeight).toFixed(
        2
      )}% weightage is missing`;

    setOutput(outputText);
  };

  const copyOutput = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => alert("Output copied to clipboard!"));
  };


const downloadOutputAsImage = () => {
  // Create container
  const container = document.createElement("div");
  container.style.padding = "30px";
  container.style.width = "550px";
  container.style.background = "var(--apps-card-bg)";
  container.style.color = "var(--apps-text)";
  container.style.fontFamily = "var(--font-main)";
  container.style.border = "2px solid var(--apps-card-border)";
  container.style.borderRadius = "18px";
  container.style.boxShadow =
    "0 0 25px rgba(0, 255, 255, 0.25), inset 0 0 20px rgba(0,255,255,0.08)";
  container.style.backdropFilter = "blur(12px)";
  container.style.fontSize = "16px";
  container.style.lineHeight = "1.6";
  container.style.letterSpacing = "0.4px";

  // TITLE
  const title = document.createElement("h2");
  title.style.marginBottom = "20px";
  title.style.textAlign = "center";
  title.style.fontSize = "32px";  // Increase font size for better prominence
  title.style.fontWeight = "600";
  title.style.color = "var(--apps-text)"; // Ensure the text is visible
  title.style.textShadow = `
    0 0 10px rgba(255, 0, 128, 0.8),
    0 0 20px rgba(255, 0, 128, 0.6),
    0 0 30px rgba(255, 0, 128, 0.4),
    0 0 40px rgba(255, 0, 128, 0.2),
    0 0 50px rgba(255, 0, 128, 0.1),
    0 0 60px rgba(0, 255, 255, 0.6)
  `;  // Glow effect to simulate a gradient
  title.innerText = subjectName || "Subject";
  container.appendChild(title);

  // HR LINE
  const hr1 = document.createElement("hr");
  hr1.style.border = "0";
  hr1.style.height = "1px";
  hr1.style.background =
    "linear-gradient(90deg, transparent, var(--apps-text-glow), transparent)";
  hr1.style.marginBottom = "18px";
  container.appendChild(hr1);

  // TOTAL PERCENTAGE
  const percentMatch = output.match(/Total Marks Obtained: ([0-9.]+)/);
  const percent = percentMatch ? percentMatch[1] : "0";
  const totalGrade = parseFloat(percent);

  let grade = "";
  if (totalGrade >= 90) grade = "O";
  else if (totalGrade >= 80) grade = "A+";
  else if (totalGrade >= 70) grade = "A";
  else if (totalGrade >= 60) grade = "B+";
  else if (totalGrade >= 50) grade = "B";
  else if (totalGrade >= 40) grade = "C+";
  else if (totalGrade >= 30) grade = "C";
  else grade = "F";


  const percentP = document.createElement("p");
  percentP.style.color = "var(--apps-accent-green)";
  percentP.style.fontSize = "20px";
  percentP.style.textAlign = "center";
  percentP.style.marginBottom = "15px";
  percentP.style.textShadow = "0 0 10px rgba(0, 255, 153, 0.5)";
  percentP.innerHTML = `${percent}% - (${grade})`;
  container.appendChild(percentP);

  // COMPONENT HEADER
  const compHeader = document.createElement("h3");
  compHeader.style.color = "var(--apps-text-glow)";
  compHeader.style.marginBottom = "10px";
  compHeader.style.fontSize = "20px";
  compHeader.style.textShadow = "0 0 8px rgba(0,255,255,0.6)";
  compHeader.innerText = "Component Details";
  container.appendChild(compHeader);

  // TABLE
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.marginTop = "8px";
  table.style.borderCollapse = "collapse";
  table.style.fontSize = "15px";

  // HEADER ROW
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.style.borderBottom = "1px solid var(--apps-card-border)";
  headerRow.style.background = "rgba(0,255,255,0.05)";

  const headers = ["Component Name", "Weightage", "Max Marks", "Marks Obtained"];
  const alignments = ["left", "center", "center", "center"];

  headers.forEach((text, index) => {
    const th = document.createElement("th");
    th.style.padding = "12px 10px";
    th.style.color = "var(--apps-text-glow)";
    th.style.textAlign = alignments[index];
    th.style.fontWeight = "600";
    th.style.textShadow = "0 0 6px rgba(0,255,255,0.4)";
    th.innerText = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // BODY
  const tbody = document.createElement("tbody");

  components.forEach((c) => {
    const row = document.createElement("tr");
    row.style.borderBottom = "1px solid rgba(255,255,255,0.06)";
    row.style.transition = "background 0.2s ease";

    const values = [
      c.name || "Untitled Component",
      c.weight,
      c.max,
      c.marks === "" ? "Not Released" : c.marks,
    ];

    values.forEach((val, index) => {
      const td = document.createElement("td");
      td.style.padding = "10px 8px";
      td.style.color = "var(--apps-text)";
      td.style.textAlign = alignments[index];
      td.style.opacity = index === 3 && val === "Not Released" ? "0.6" : "1";
      td.style.textShadow = "0 0 4px rgba(255,255,255,0.1)";
      td.innerText = val;
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  // FOOTER
  const footer = document.createElement("p");
  footer.style.marginTop = "25px";
  footer.style.fontSize = "12px";
  footer.style.textAlign = "center";
  footer.style.color = "var(--apps-text-muted)";
  footer.style.textShadow = "0 0 6px rgba(0,255,255,0.3)";
  footer.innerText = `Source: ${window.location.href}`;
  container.appendChild(footer);

  // Append temporarily to body
  document.body.appendChild(container);

  // Capture with html2canvas
  html2canvas(container, { scale: 2 }).then((canvas) => {
    const imgURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgURL;
    link.download = `${subjectName || "output"}.png`;
    link.click();

    document.body.removeChild(container);
  });
};



  // ----------------- HISTORY -----------------
  const saveToHistory = () => {
    const newRecord = {
      id: Date.now(),
      subject: subjectName,
      components: components.map((c) => ({ ...c })),
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

      {/* ---------------- TEMPLATE SCROLLER ---------------- */}
      <span style={{background: "#330000", padding: "5px", borderRadius: "10px", fontSize: "10px"}}>!! Select the template carefully | If you need any template - Send me out the details (You can find the message box near Home Contact)</span>
      <div className="template-scroller"> 
        <span className="template-chip" style={{background:"transparent",border:"0px",color:"red"}}>Subject: </span> 
        {SUBJECT_TEMPLATES.map((subj) => (
          <span
            key={subj.id}
            className="template-chip"
            onClick={() => loadTemplate(subj.id)}
          >
            {subj.subject}
          </span>
        ))}
      </div>

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

      {/* ---------------- CALCULATOR TAB ---------------- */}
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
                      onChange={(e) =>
                        updateComponent(c.id, "name", e.target.value)
                      }
                      placeholder="Component Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={c.weight}
                      min={0}
                      onChange={(e) =>
                        updateComponent(c.id, "weight", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={c.max}
                      min={1}
                      onChange={(e) =>
                        updateComponent(c.id, "max", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={c.marks}
                      min={0}
                      placeholder="Leave empty if not released"
                      onChange={(e) =>
                        updateComponent(c.id, "marks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="removeBtn"
                      onClick={() => removeComponent(c.id)}
                    >
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
            <div
              className={`weightMsg ${
                weightMsg.includes("Error") ? "error" : "warning"
              }`}
            >
              {weightMsg}
            </div>
          )}

          {output && (
            <div>
              <div id="output">{output}</div>
              <button onClick={copyOutput}>Copy Output</button>
              <button onClick={downloadOutputAsImage}>Download Output</button>
            </div>
          )}
        </>
      )}

      {/* ---------------- HISTORY TAB ---------------- */}
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
                      <button onClick={() => reuseFromHistory(rec)}>
                        Edit
                      </button>
                      <button onClick={() => deleteFromHistory(rec.id)}>
                        Delete
                      </button>
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
