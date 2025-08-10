import React, { useState, useEffect } from "react";
import "./Skills.css";

// Fisher-Yates shuffle algorithm to randomize the array order
const shuffleSkills = (skills) => {
  const shuffledSkills = [...skills];
  for (let i = shuffledSkills.length / 2 - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSkills[i], shuffledSkills[j]] = [shuffledSkills[j], shuffledSkills[i]];
  }
  return shuffledSkills;
};

// Skill data without color in JSX (handled by CSS)
const skills = [
  { name: "Python", level: "expert" },
  { name: "Flask", level: "advanced" },
  { name: "SQL", level: "advanced" },
  { name: "HTML", level: "advanced" },
  { name: "CSS", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "React", level: "beginner" },
  { name: "Java", level: "advanced" },
  { name: "OOPS", level: "intermediate" },
  { name: "DSA", level: "intermediate" },
  { name: "Spring", level: "intermediate" },
  { name: "Git", level: "intermediate" },
  { name: "Figma", level: "intermediate" },
  { name: "Canvas", level: "intermediate" },
  { name: "Machine Learning", level: "intermediate" },
  { name: "PostgreSQL", level: "intermediate" },
  { name: "Postman", level: "beginner" },
  { name: "AWS", level: "beginner" },
  { name: "Automation", level: "beginner" },
  { name: "Django", level: "beginner" },
  { name: "Jinja", level: "intermediate" },
  { name: "Full Stack", level: "intermediate" },
];

const Skills = () => {
  // State to hold shuffled skills
  const [shuffledSkills, setShuffledSkills] = useState([]);

  useEffect(() => {
    // Shuffle the skills when the component mounts
    setShuffledSkills(shuffleSkills(skills));
  }, []);

  return (
    <section id="skills" className="skills-section container">
      <div className="section-title">
        <h2>
          My <span className="highlight">Skills</span>
        </h2>
        <p className="subtitle">Technologies & tools I work with</p>
        <div className="title-decoration"></div>
      </div>

      <div className="skills-legend">
        <span className="skill-dot expert"></span> Expert
        <span className="skill-dot advanced"></span> Advanced
        <span className="skill-dot intermediate"></span> Intermediate
        <span className="skill-dot beginner"></span> Beginner
      </div>

      <div className="skills-cloud">
        {shuffledSkills.map((skill, index) => (
          <span
            key={index}
            className={`skill-item ${skill.level}`}
            title={`${skill.name}: ${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
