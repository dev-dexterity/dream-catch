import React from "react";
import "./Footer.css";
import logo from "../assets/D.png"; // Replace with your actual logo
import { FaGoogle, FaFacebookF } from "react-icons/fa"; // For social icons
import { ImInstagram } from "react-icons/im";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <img
            src={logo}
            alt="Codetech Corporate Training"
            className="footer-logo"
          />
          <h2>Dream Catch Placement and Training</h2>
          <p>
            Institute with the aim to be a global leader in the areas of IT
            training, staffing, software development, and consulting. Proven
            excellence in in-house IT training, corporate training, and
            workshops in Pune.
          </p>
          <div className="social-icons">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaGoogle />
            </a>
            <a href="https://www.facebook.com/share/19HCopVhUT/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/dream_catch_placement?igsh=dmNyZmR4enZvZjZi" target="_blank" rel="noopener noreferrer">
              <ImInstagram />
            </a>
            <a href="https://www.linkedin.com/company/dream-catch-placement-and-training/" target="_blank" rel="noopener noreferrer">
              <LiaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/courses">Courses</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>CONTACT US</h3>
          <p>
            5th floor office 604,
            <br />
            Dangat patil empire ,
            <br />
            Navle Bridge, Pune 411041, Maharashtra,
            <br />
            India
          </p>
          <p>
            <strong>Phone:</strong> +91 8208894835
          </p>
          <p>
            <strong>Email:</strong> info@dreamcatchplacement.com
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        © Copyright <strong>Dream Catch Placement and Training</strong>. All
        Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
