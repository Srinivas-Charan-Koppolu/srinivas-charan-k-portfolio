import React from "react";
import "./Footer.css";
import {
  FaGithub,
  FaLinkedinIn,
  FaMediumM,
  FaTelegramPlane,
  FaWhatsapp,
  // import app icon
  FaGooglePlay
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>© {new Date().getFullYear()} K Srinivas Charan. All Rights Reserved. </p>
        </div>
        <div className="footer-right">
          <a
            href="https://github.com/Srinivas-Charan-Koppolu/"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/srinivascharank/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://medium.com/@SCK855-Thiru"
            target="_blank"
            rel="noreferrer"
            title="Medium"
          >
            <FaMediumM />
          </a>
          <a
            href="https://t.me/SCK855"
            target="_blank"
            rel="noreferrer"
            title="Telegram"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=919440040257&text=Hi%20Srinivas"
            target="_blank"
            rel="noreferrer"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="/myapps"
            title="My Apps"
          >
            <FaGooglePlay />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
