import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LZString from "lz-string";
import "./CountdownTimer.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ENC_KEYS = [134, 3451, 9812, 772, 54321];

export default function CountdownTimer() {
  const query = useQuery();
  const navigate = useNavigate();

  const enc = query.get("enc");
  const data = query.get("data");

  const [timeLeft, setTimeLeft] = useState({});
  const [completed, setCompleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const defaultTarget = new Date(Date.now() + 24 * 60 * 60 * 1000);

  let payload = null;
  if (data) {
    try {
      const decoded = LZString.decompressFromBase64(decodeURIComponent(data));
      payload = JSON.parse(decoded);
    } catch (e) {
      console.error("Invalid encoded data");
    }
  }

  // values for timer target
  const year = payload?.year || defaultTarget.getFullYear();
  const month = payload?.month || defaultTarget.getMonth() + 1;
  const day = payload?.day || defaultTarget.getDate();
  const hour = payload?.hour || defaultTarget.getHours();
  const minute = payload?.minute || defaultTarget.getMinutes();
  const second = payload?.second || defaultTarget.getSeconds();
  const title = payload?.title || "Custom Event";

  const targetDate = new Date(year, month - 1, day, hour, minute, second);

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    const absDiff = Math.abs(diff);

    const time = {
      totalHours: Math.floor(absDiff / (1000 * 60 * 60)),
      days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((absDiff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((absDiff / (1000 * 60)) % 60),
      seconds: Math.floor((absDiff / 1000) % 60),
    };

    if (diff <= 0) {
      setCompleted(true);
    }
    return time;
  };

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [data]);

  // --- sync datetime-local <-> form
  const [dateTimeValue, setDateTimeValue] = useState(() => {
    return `${defaultTarget.getFullYear()}-${String(
      defaultTarget.getMonth() + 1
    ).padStart(2, "0")}-${String(defaultTarget.getDate()).padStart(
      2,
      "0"
    )}T${String(defaultTarget.getHours()).padStart(2, "0")}:${String(
      defaultTarget.getMinutes()
    ).padStart(2, "0")}`;
  });

  const handleDateTimeChange = (e) => {
    const newVal = e.target.value;
    setDateTimeValue(newVal);

    const dt = new Date(newVal);
    if (!isNaN(dt)) {
      document.querySelector("input[name='year']").value = dt.getFullYear();
      document.querySelector("input[name='month']").value = dt.getMonth() + 1;
      document.querySelector("input[name='day']").value = dt.getDate();
      document.querySelector("input[name='hour']").value = dt.getHours();
      document.querySelector("input[name='minute']").value = dt.getMinutes();
      document.querySelector("input[name='second']").value = dt.getSeconds();
    }
  };

  const handleFormSync = () => {
    const year = document.querySelector("input[name='year']").value || defaultTarget.getFullYear();
    const month = document.querySelector("input[name='month']").value || defaultTarget.getMonth() + 1;
    const day = document.querySelector("input[name='day']").value || defaultTarget.getDate();
    const hour = document.querySelector("input[name='hour']").value || defaultTarget.getHours();
    const minute = document.querySelector("input[name='minute']").value || defaultTarget.getMinutes();
    const second = document.querySelector("input[name='second']").value || defaultTarget.getSeconds();

    const newVal = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    setDateTimeValue(newVal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());
    const encoded = encodeURIComponent(
      LZString.compressToBase64(JSON.stringify(payload))
    );
    const randomEnc = ENC_KEYS[Math.floor(Math.random() * ENC_KEYS.length)];
    navigate(`?enc=${randomEnc}&data=${encoded}`);
    setEditMode(false);
  };

  const quickCountdown = (seconds, title = "Quick Timer") => {
    const target = new Date(Date.now() + seconds * 1000);
    const payload = {
      title,
      year: target.getFullYear(),
      month: target.getMonth() + 1,
      day: target.getDate(),
      hour: target.getHours(),
      minute: target.getMinutes(),
      second: target.getSeconds(),
    };
    const encoded = encodeURIComponent(
      LZString.compressToBase64(JSON.stringify(payload))
    );
    const randomEnc = ENC_KEYS[Math.floor(Math.random() * ENC_KEYS.length)];
    navigate(`?enc=${randomEnc}&data=${encoded}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // -------------------
  // No data yet OR edit mode → show form
  // -------------------
  if (!data || editMode) {
    const defaultValues = payload || {
      title: "My Event",
      year: defaultTarget.getFullYear(),
      month: defaultTarget.getMonth() + 1,
      day: defaultTarget.getDate(),
      hour: defaultTarget.getHours(),
      minute: defaultTarget.getMinutes(),
      second: defaultTarget.getSeconds(),
    };

    return (
      <div className="countdown-container">
        <div className="countdown-card">
          {!editMode && (
            <>
              <h1 className="heading">Quick Timers</h1>
              <div className="quick-buttons">
                <button onClick={() => quickCountdown(600, "10 Min Timer")}>10 Min</button>
                <button onClick={() => quickCountdown(1800, "30 Min Timer")}>30 Min</button>
                <button onClick={() => quickCountdown(3600, "1 Hour Timer")}>1 Hour</button>
                <button onClick={() => quickCountdown(7200, "2 Hour Timer")}>2 Hours</button>
                <button onClick={() => quickCountdown(86400, "1 Day Timer")}>1 Day</button>
                <button onClick={() => quickCountdown(604800, "1 Week Timer")}>1 Week</button>
                <button onClick={() => quickCountdown(86400 * 30, "30 Days Timer")}>30 Days</button>
              </div>
            </>
          )}

          <h1>{editMode ? "Edit Countdown" : "Create Countdown"}</h1>

          {/* datetime-local */}
          <div className="datetime-picker">
            <label>
              Pick Date & Time (Local):
              <input
                className="force-bg-white-theme"
                type="datetime-local"
                value={dateTimeValue}
                onChange={handleDateTimeChange}
              />
            </label>
          </div>

          {/* datetime (legacy) */}
          <div className="datetime-picker">
            <label>
              Pick Date & Time (Legacy):
              <input
                type="datetime"
                value={dateTimeValue}
                onChange={handleDateTimeChange}
              />
            </label>
          </div>

          {/* Manual form */}
          <form className="countdown-form" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>Title:</td>
                  <td>
                    <input type="text" name="title" defaultValue={defaultValues.title} required />
                  </td>
                </tr>
                <tr>
                  <td>Year:</td>
                  <td>
                    <input type="number" name="year" defaultValue={defaultValues.year} onChange={handleFormSync} />
                  </td>
                </tr>
                <tr>
                  <td>Month:</td>
                  <td>
                    <input type="number" name="month" defaultValue={defaultValues.month} onChange={handleFormSync} />
                  </td>
                </tr>
                <tr>
                  <td>Day:</td>
                  <td>
                    <input type="number" name="day" defaultValue={defaultValues.day} onChange={handleFormSync} />
                  </td>
                </tr>
                <tr>
                  <td>Hour:</td>
                  <td>
                    <input type="number" name="hour" defaultValue={defaultValues.hour} onChange={handleFormSync} />
                  </td>
                </tr>
                <tr>
                  <td>Minute:</td>
                  <td>
                    <input type="number" name="minute" defaultValue={defaultValues.minute} onChange={handleFormSync} />
                  </td>
                </tr>
                <tr>
                  <td>Second:</td>
                  <td>
                    <input type="number" name="second" defaultValue={defaultValues.second} onChange={handleFormSync} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">{editMode ? "Update" : "Generate"}</button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------
  // Display countdown
  // -------------------
  document.title = `Srinivas Charan K | ${title} - ${targetDate.toLocaleString()}`;

  return (
    <div className="countdown-container">
      <div className="countdown-card">
        {completed && <div className="ribbon">C O M P L E T E D</div>}
        {showToast && <div className="toast">Link Copied!</div>}

        <h1>{title}</h1>
        <p className="target-date">Target: {targetDate.toLocaleString()}</p>

        {completed ? (
          <div className="countdown-time completed">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s ago
            <div className="hours-left">({timeLeft.totalHours} hours ago)</div>
          </div>
        ) : (
          <div className="countdown-time active">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            <div className="hours-left">({timeLeft.totalHours} hours left)</div>
          </div>
        )}

        <div className="actions">
          <button onClick={copyLink}>Copy Link</button>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => navigate("")}>New Timer</button>
        </div>
      </div>
    </div>
  );
}
