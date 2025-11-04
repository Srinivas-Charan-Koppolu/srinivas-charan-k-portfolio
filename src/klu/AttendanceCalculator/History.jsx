import React, { useState, useEffect } from "react";
import { loadFromLocal, parseCompactInput, LOCAL_STORAGE_KEY } from "./attendanceUtils"; // adjust path if needed
import "./AttendanceCalculator.css";

// const LOCAL_STORAGE_KEY = "SCK-KL-Attendance";

const History = ({ onReuse }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = loadFromLocal(LOCAL_STORAGE_KEY);
    setHistory(storedHistory);
  }, []);

  const handleDelete = (id) => {
    const updated = history.filter((rec) => rec.id !== id);
    setHistory(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  if (history.length === 0) {
    return (
      <div className="history-tab">
        <h2>Attendance History</h2>
        <p>No records found.</p>
      </div>
    );
  }

  return (
    <div className="history-tab">
      <h2>Attendance History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>SUBJECT NAME</th>
            <th>L</th>
            <th>T</th>
            <th>P</th>
            <th>S</th>
            <th>Overall</th>
            <th>Reuse</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => {
            const inputs = parseCompactInput(record.inputs);
            return (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.subject}</td>
                <td>{inputs.lecture.percent || `${inputs.lecture.attended}/${inputs.lecture.total}`}</td>
                <td>{inputs.tutorial.percent || `${inputs.tutorial.attended}/${inputs.tutorial.total}`}</td>
                <td>{inputs.practical.percent || `${inputs.practical.attended}/${inputs.practical.total}`}</td>
                <td>{inputs.skilling.percent || `${inputs.skilling.attended}/${inputs.skilling.total}`}</td>
                <td>{record.result?.percentage}%</td>
                <td>
                  <button onClick={() => onReuse(inputs, record.subject)}>Reuse</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(record.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default History;
