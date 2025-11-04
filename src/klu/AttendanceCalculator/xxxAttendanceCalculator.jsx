import React, { useState, useEffect } from "react";
import "./AttendanceCalculator.css";
import { v4 as uuidv4 } from "uuid";

const COMPONENT_WEIGHTS = {
  Lecture: 100,
  Tutorial: 25,
  Practical: 50,
  Skilling: 25,
};

// === Helper Functions ===
const getAttendanceStatus = (p) =>
  p >= 85 ? "Excellent" : p >= 75 ? "Good" : "Warning";

const getComponentAnalysis = (c) =>
  Object.fromEntries(
    Object.entries(c).map(([n, v]) => [n, v != null ? `${v.toFixed(2)}%` : "Not entered"])
  );

const getRecommendations = (p, c) => {
  const r = [];
  if (p < 85)
    r.push(`Need ${(85 - p).toFixed(2)}% improvement to reach excellence.`);
  Object.entries(c).forEach(([n, v]) => {
    if (v != null && v < 75)
      r.push(`${n} attendance is critical at ${v.toFixed(2)}% – needs immediate attention.`);
  });
  return r;
};

const calculateAttendance = (l, t, p, s) => {
  const comps = { Lecture: l, Tutorial: t, Practical: p, Skilling: s };
  let score = 0,
    weight = 0,
    valid = false;
  for (const [n, v] of Object.entries(comps)) {
    if (v !== null && !isNaN(v)) {
      score += v * (COMPONENT_WEIGHTS[n] / 100);
      weight += COMPONENT_WEIGHTS[n];
      valid = true;
    }
  }
  if (!valid) throw new Error("Enter at least one component.");
  const pct = (score / weight) * 100;
  return {
    percentage: pct.toFixed(2),
    status: getAttendanceStatus(pct),
    componentAnalysis: getComponentAnalysis(comps),
    recommendations: getRecommendations(pct, comps),
  };
};

// === Generate future attendance combinations ===
const generateFutureCombinations = (currentInputs) => {
  const increments = [0, 1, 2, 3]; // possible future classes
  const components = Object.entries(currentInputs)
    .filter(([key, val]) => val.total && val.attended)
    .map(([key, val]) => ({
      key,
      attended: parseFloat(val.attended),
      total: parseFloat(val.total),
    }));

  const results = [];

  const recurse = (index, combo) => {
    if (index === components.length) {
      results.push({ ...combo });
      return;
    }
    const comp = components[index];
    increments.forEach((inc) => {
      const newCombo = { ...combo, [comp.key]: comp.attended + inc };
      recurse(index + 1, newCombo);
    });
  };

  recurse(0, {});
  return results;
};

// === Component ===
const AttendanceCalculator = () => {
  const [tab, setTab] = useState("calc");
  const [subject, setSubject] = useState("");
  const [inputs, setInputs] = useState({
    lecture: { percent: "", attended: "", total: "" },
    tutorial: { percent: "", attended: "", total: "" },
    practical: { percent: "", attended: "", total: "" },
    skilling: { percent: "", attended: "", total: "" },
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("klu_records_v2");
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  const saveToLocal = (arr) => {
    setSaved(arr);
    localStorage.setItem("klu_records_v2", JSON.stringify(arr));
  };

  const computePercentage = ({ percent, attended, total }) => {
    if (percent) return parseFloat(percent);
    if (attended && total) return (parseFloat(attended) / parseFloat(total)) * 100;
    return null;
  };

  const handleInput = (section, field, value) =>
    setInputs((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));

  const handleCalculate = () => {
    try {
      const parsed = {
        lecture: computePercentage(inputs.lecture),
        tutorial: computePercentage(inputs.tutorial),
        practical: computePercentage(inputs.practical),
        skilling: computePercentage(inputs.skilling),
      };
      const res = calculateAttendance(parsed.lecture, parsed.tutorial, parsed.practical, parsed.skilling);
      setResult(res);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const buildCompact = (comp) => {
    if (comp.percent) return comp.percent;
    if (comp.attended && comp.total) return `${comp.attended}/${comp.total}`;
    return "";
  };

  const saveRecord = () => {
    const compactStr = [
      buildCompact(inputs.lecture),
      buildCompact(inputs.tutorial),
      buildCompact(inputs.practical),
      buildCompact(inputs.skilling),
    ].join("|");

    const newRec = {
      id: uuidv4(),
      subject: subject.trim() || "Unnamed",
      inputs: compactStr,
      date: new Date().toISOString(),
    };
    saveToLocal([...saved, newRec]);
  };

  const deleteRecord = (id) => saveToLocal(saved.filter((r) => r.id !== id));
  const clearHistory = () => {
    if (window.confirm("Clear all saved records?")) saveToLocal([]);
  };

  const parseInputString = (inputStr) => {
    const [l, t, p, s] = inputStr.split("|");
    const parseComponent = (val) => {
      if (!val) return { percent: "", attended: "", total: "" };
      if (val.includes("/")) {
        const [att, tot] = val.split("/");
        return { percent: "", attended: att || "", total: tot || "" };
      }
      return { percent: val, attended: "", total: "" };
    };
    return {
      lecture: parseComponent(l),
      tutorial: parseComponent(t),
      practical: parseComponent(p),
      skilling: parseComponent(s),
    };
  };

  const reuseRecord = (record) => {
    const parsed = parseInputString(record.inputs);
    setInputs(parsed);
    setSubject(record.subject);
    setTab("calc");
  };

  const viewRecord = (record) => {
    const parsed = parseInputString(record.inputs);
    try {
      const computed = {
        lecture: computePercentage(parsed.lecture),
        tutorial: computePercentage(parsed.tutorial),
        practical: computePercentage(parsed.practical),
        skilling: computePercentage(parsed.skilling),
      };
      const res = calculateAttendance(
        computed.lecture,
        computed.tutorial,
        computed.practical,
        computed.skilling
      );
      setPopup({ subject: record.subject, result: res });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const calculateFutureAttendance = (inputs) => {
    const combos = generateFutureCombinations(inputs);
    return combos.map((combo) => {
      const futurePercentages = {};
      Object.entries(inputs).forEach(([key, val]) => {
        const attended = combo[key] !== undefined ? combo[key] : parseFloat(val.attended || 0);
        const total = val.total ? parseFloat(val.total) + 3 : null; // add 3 future classes
        futurePercentages[key] = total ? (attended / total) * 100 : null;
      });
      return calculateAttendance(
        futurePercentages.lecture,
        futurePercentages.tutorial,
        futurePercentages.practical,
        futurePercentages.skilling
      );
    });
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

  return (
    <div className="attendance-page">
      <h1>KLU Attendance Calculator</h1>

      <div className="tabs">
        <button className={tab === "calc" ? "active" : ""} onClick={() => setTab("calc")}>
          Calculate Attendance
        </button>
        <button className={tab === "saved" ? "active" : ""} onClick={() => setTab("saved")}>
          Saved Records
        </button>
      </div>

      {tab === "calc" && (
        <div className="calc-section">
          <label>Subject Name:</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject name" />
          {renderRow("Lecture", "lecture")}
          {renderRow("Tutorial", "tutorial")}
          {renderRow("Practical", "practical")}
          {renderRow("Skilling", "skilling")}

          <button onClick={handleCalculate}>Calculate</button>

          {error && <div className="error">{error}</div>}
          {result && (
            <div className="results">
              <h2>{subject || "Unnamed"}</h2>
              <p>Overall: {result.percentage}%</p>
              <p>Status: {result.status}</p>
              <h3>Component Analysis</h3>
              <ul>
                {Object.entries(result.componentAnalysis).map(([n, v]) => (
                  <li key={n}>{n}: {v}</li>
                ))}
              </ul>
              <h3>Recommendations</h3>
              <ul>
                {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              <button onClick={saveRecord}>💾 Save Input</button>
              <button
                onClick={() => {
                  const futureResults = calculateFutureAttendance(inputs);
                  setPopup({ subject: subject, future: futureResults });
                }}
              >
                🔮 Predict Future Attendance
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "saved" && (
        <div className="saved-section">
          <div className="saved-header">
            <h2>Saved Records</h2>
            {saved.length > 0 && <button className="clear-btn" onClick={clearHistory}>🧹 Clear All</button>}
          </div>
          {saved.length === 0 && <p>No records saved yet.</p>}
          <ul className="saved-list">
            {saved.map((r) => (
              <li key={r.id}>
                <div className="saved-info">
                  <strong>{r.subject}</strong>
                  <small>{new Date(r.date).toLocaleString()}</small>
                </div>
                <div className="saved-buttons">
                  <button onClick={() => viewRecord(r)}>View</button>
                  <button onClick={() => reuseRecord(r)}>Reuse</button>
                  <button className="delete-btn" onClick={() => deleteRecord(r.id)}>✖</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {popup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{popup.subject}</h2>

            {popup.result && (
              <>
                <p><strong>Overall:</strong> {popup.result.percentage}%</p>
                <p><strong>Status:</strong> {popup.result.status}</p>
                <h3>Component Analysis</h3>
                <ul>
                  {Object.entries(popup.result.componentAnalysis).map(([n, v]) => (
                    <li key={n}>{n}: {v}</li>
                  ))}
                </ul>
                <h3>Recommendations</h3>
                <ul>
                  {popup.result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </>
            )}

            {popup.future && (
              <>
                <h3>Future Scenarios</h3>
                <ul>
                  {popup.future.map((res, idx) => (
                    <li key={idx}>
                      {res.componentAnalysis.Lecture} {res.componentAnalysis.Tutorial} {res.componentAnalysis.Practical} {res.componentAnalysis.Skilling} - {res.percentage}% (Status: {res.status})
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button onClick={() => setPopup(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCalculator;
