import thrinehaImg from "./../../assets/projects/Thrineha.png";
import myTasklyProveImg from "./../../assets/projects/MyTasklyProve.png";
import gamezImg from "./../../assets/projects/GameZ.jpg";
import moodImg from "./../../assets/projects/play-your-mood.jpg";
import erpImg from "./../../assets/projects/erp-classroom-finder.png";
import vibeImg from "./../../assets/projects/vibe-stream.png";
import audioImg from "./../../assets/projects/audio-feel.jpg";
import flapImg from "./../../assets/projects/flap-the-box.jpg";

const projects = [
  {
    title: "Thrineha - AI Chatbot",
    img: thrinehaImg,
    description:
      "Thrineha is an advanced AI chatbot platform that combines Flask, React, and machine learning techniques to provide intelligent text analysis, with secure data storage on MongoDB. Developed following rigorous software engineering principles.",
    tech: [
      "Python (Flask)",
      "Machine Learning",
      "Text Analysis",
      "MongoDB",
      "React",
      "Security",
      "Software Principles",
      "JavaScript",
      "HTML",
      "CSS",
      "Jinja",
    ],
    links: [
      { name: "Live Site", url: "https://thrineha.vercel.app" },
    ],
    date: "Dec 2025 (Ongoing)",
    visible: true,
  },
  {
    title: "MyTasklyProve",
    img: myTasklyProveImg,
    description:
      "An online platform designed for efficient task management and seamless collaboration with friends, enabling users to organize and complete tasks together effectively.",
    tech: [
      "Python (Flask)",
      "PostgreSQL",
      "JavaScript",
      "HTML",
      "CSS",
      "Jinja",
      "CORS",
    ],
    links: [
      { name: "Live Site", url: "https://mytasklyprove.onrender.com/" },
    ],
    date: "June 2025",
    visible: true,
  },
  {
    title: "GameZ - Online Multiplayer Gaming Platform",
    img: gamezImg,
    description:
      "An online multiplayer gaming platform where users can track and utilize game coins earned through physical transactions. Features include an administrative panel, a messaging system, and future plans for multiplayer integration.",
    tech: ["Python (Flask)", "SQLite", "JavaScript", "HTML", "CSS", "Jinja"],
    links: [],
    date: "April 2025",
    visible: true,
  },
  {
    title: "Play Your Mood - Personalized Music Streaming Web App",
    img: moodImg,
    description:
      "A personalized music streaming application that recommends songs based on the user's mood. It features curated playlists, smooth animations, and a modern glassmorphism user interface. Developed with a React frontend and Spring backend.",
    tech: ["HTML", "CSS", "JavaScript", "Java", "Spring", "React", "Postman"],
    links: [],
    date: "April 2025",
    visible: true,
  },
  {
    title: "ERP - Classroom Finder",
    img: erpImg,
    description:
      "A time-slot calculation tool designed to identify available classrooms by subtracting scheduled classes. Optimized to handle large datasets for effective resource allocation.",
    tech: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    links: [],
    date: "March 2025",
    visible: true,
  },
  {
    title: "VibeStream - Social Media Platform",
    img: vibeImg,
    description:
      "A social media platform focused on sharing and discovering various types of media content. Includes user authentication, profile management, and features aimed at maximizing user engagement.",
    tech: ["Python", "Flask", "SQLite3", "HTML", "CSS", "JavaScript"],
    links: [],
    date: "January 2025",
    visible: true,
  },
  {
    title: "Audio Feel - Web-based Music Player",
    img: audioImg,
    description:
      "A web-based music player for managing and playing local songs with playlist creation functionality. Enhanced user retention by 40% through interface optimization.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    links: [],
    date: "May 2024",
    visible: true,
  },
  {
    title: "Flap The Box - 2D HTML5 Canvas Game",
    img: flapImg,
    description:
      "A smooth and engaging HTML5 Canvas game featuring refined difficulty progression and efficient event handling to ensure responsive gameplay.",
    tech: ["HTML", "CSS", "JavaScript", "Canvas"],
    links: [],
    date: "2022",
    visible: true,
  },
];

export default projects;