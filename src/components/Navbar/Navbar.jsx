import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const shortLogo = (
    <>
      <span className="logo-s">S</span>
      <span className="logo-c">C</span>
      <span className="logo-k">K</span>.
    </>
  );

  const fullLogo = (
    <>
      <span className="logo-name-s">Srinivas</span>{" "}
      <span className="logo-name-c">Charan</span>{" "}
      <span className="logo-name-k">K</span>.
    </>
  );

  const [logoText, setLogoText] = useState(shortLogo);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoText((prev) => (prev === shortLogo ? fullLogo : shortLogo));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/">{logoText}</a>
        </div>

        <ul className="nav-links">
          <li><a href="/#hero">Home</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#skills">Skills</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
