import React from "react";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
  FaMediumM,
  FaTelegramPlane,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const email = "sunkush.koppolu@gmail.com";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `${message}\n\nThis mail is sent from ${window.location} portfolio by ${name}.`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-title">
          <h2>
            Get In <span className="highlight">Touch</span>
          </h2>
          <p>Feel free to reach out for collaborations or just a friendly hello</p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Contact Information</h3>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-text">
                  <h4>Location</h4>
                  <p>Vijayawada, India</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="mailto:sunkush.koppolu@gmail.com" title="Email">
                <FaEnvelope />
              </a>
              <a href="tel:+919440040257" title="Call">
                <FaPhone />
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
                title="Medium Blog"
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
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>
              <span className="highlight">Mail</span> Me
            </h3>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" placeholder=" " required />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group">
                <input type="text" id="subject" placeholder=" " required />
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="form-group">
                <textarea id="message" placeholder=" " required></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              <button type="submit" className="submit-btn">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
