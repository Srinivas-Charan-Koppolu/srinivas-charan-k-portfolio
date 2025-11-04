// attendanceUtils.js
// ============================================
// Attendance calculation utilities
// ============================================

import { v4 as uuidv4 } from "uuid";

export const LOCAL_STORAGE_KEY = "SCK-KL-Attendance";

// Component weightings
export const COMPONENT_WEIGHTS = {
  Lecture: 100,
  Tutorial: 25,
  Practical: 50,
  Skilling: 25,
};

// ---------------- Compute percentage from raw inputs ----------------
export const computePercentage = ({ percent, attended, total }) => {
  if (percent !== "" && percent != null && !isNaN(percent)) {
    const p = parseFloat(percent);
    if (p < 0 || p > 100) throw new Error("Percentage must be 0-100");
    return p;
  }
  if (attended !== "" && total !== "" && !isNaN(attended) && !isNaN(total)) {
    const a = parseFloat(attended);
    const t = parseFloat(total);
    if (t <= 0) throw new Error("Total classes must be greater than 0");
    if (a < 0 || a > t) throw new Error("Attended classes must be between 0 and total");
    return (a / t) * 100;
  }
  return null;
};

// ---------------- Get attendance status ----------------
export const getAttendanceStatus = (percent) =>
  percent >= 85 ? "Excellent" : percent >= 75 ? "Good" : "Warning";

// ---------------- Get component analysis ----------------
export const getComponentAnalysis = (components) =>
  Object.fromEntries(
    Object.entries(components).map(([name, val]) => [
      name,
      val != null && !isNaN(val) ? `${val.toFixed(2)}%` : "Not entered",
    ])
  );

// ---------------- Get recommendations ----------------
export const getRecommendations = (overallPercent, components) => {
  const recs = [];
  if (overallPercent < 85) recs.push(`Need ${(85 - overallPercent).toFixed(2)}% improvement to reach excellence.`);

  Object.entries(components).forEach(([name, val]) => {
    if (val != null && val < 75) {
      recs.push(`${name} attendance is critical at ${val.toFixed(2)}% – needs immediate attention.`);
    }
  });

  return recs;
};

// ---------------- Calculate overall attendance ----------------
export const calculateAttendance = (lecture, tutorial, practical, skilling) => {
  const comps = { Lecture: lecture, Tutorial: tutorial, Practical: practical, Skilling: skilling };

  let totalScore = 0;
  let totalWeight = 0;
  let hasValid = false;

  for (const [name, val] of Object.entries(comps)) {
    if (val != null && !isNaN(val)) {
      totalScore += val * (COMPONENT_WEIGHTS[name] / 100);
      totalWeight += COMPONENT_WEIGHTS[name];
      hasValid = true;
    }
  }

  if (!hasValid) throw new Error("Enter at least one component");

  const overallPercent = (totalScore / totalWeight) * 100;

  return {
    percentage: overallPercent.toFixed(2),
    status: getAttendanceStatus(overallPercent),
    componentAnalysis: getComponentAnalysis(comps),
    recommendations: getRecommendations(overallPercent, comps),
  };
};

// ---------------- Generate future attendance combinations ----------------
export const generateFutureCombinations = (inputs, maxFutureClasses = 3) => {
  console.log("Generating future combinations with inputs:", inputs, "and maxFutureClasses:", maxFutureClasses);
  const increments = Array.from({ length: maxFutureClasses + 1 }, (_, i) => i);

  const components = Object.entries(inputs)
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

// ---------------- Local Storage Utilities ----------------
export const saveToLocal = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
};

export const loadFromLocal = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// ---------------- Helper: Build compact input string ----------------
export const buildCompactInput = (inputs) => {
  const buildComp = (comp) => {
    if (comp.percent) return comp.percent;
    if (comp.attended && comp.total) return `${comp.attended}/${comp.total}`;
    return "";
  };
  return [
    buildComp(inputs.lecture),
    buildComp(inputs.tutorial),
    buildComp(inputs.practical),
    buildComp(inputs.skilling),
  ].join("|");
};

// ---------------- Helper: Parse compact input string ----------------
export const parseCompactInput = (inputStr) => {
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

// ---------------- Calculate future attendance ----------------
export const calculateFutureAttendance = (inputs, maxFutureClasses = 3) => {
  const combos = generateFutureCombinations(inputs, maxFutureClasses);
  return combos.map((combo) => {
    const futurePercentages = {};
    Object.entries(inputs).forEach(([key, val]) => {
      const attended = combo[key] !== undefined ? combo[key] : parseFloat(val.attended || 0);
      const total = val.total ? parseFloat(val.total) + maxFutureClasses : null;
      futurePercentages[key] = total ? (attended / total) * 100 : null;
    });
    return {
      ...calculateAttendance(
        futurePercentages.lecture,
        futurePercentages.tutorial,
        futurePercentages.practical,
        futurePercentages.skilling
      ),
      combo // attach combo for scenario description
    };
  });
};
