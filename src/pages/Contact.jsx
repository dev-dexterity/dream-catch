import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import logo from "../assets/contact.png";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    query: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus("");

    // Initialize EmailJS
    // Make sure these values match exactly with your EmailJS account
    const serviceId = "service_krn3p99";
    const templateId = "template_9irt36r";
    const publicKey = "eri-3oeuGI1uH9joL";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log("Email sent successfully!", result.text);
        setFormData({
          name: "",
          contactNo: "",
          email: "",
          query: "",
        });
        setSubmitStatus("success");
        setSubmitMessage("Your message has been sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setSubmitStatus("error");
        setSubmitMessage("Failed to send message. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);

        // Clear success/error message after 5 seconds
        setTimeout(() => {
          setSubmitMessage("");
          setSubmitStatus("");
        }, 5000);
      });
  };

  return (
    <div className="contact-page">
      {/* Hero section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>
            Encompasses training, staffing, corporate programs, software
            development and project consultancy and our tie-ups with leading
            MNC's
          </p>  
        </div>
        <div className="contact-hero-image">
          <div className="animated-bounce">
            <img src={logo} alt="" />
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-section">
        <div className="contact-header">
          <span className="contact-subtitle">CONTACT</span>
          <h2>Contact Us</h2>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            {/* Address Card */}
            <div className="info-card">
              <div className="card-icon">
                <i className="location-icon"></i>
              </div>
              <h3>Address</h3>
              <p>
                5th floor office 604,
                <br />
                Dangat patil empire ,
                <br />
                Navle Bridge, Pune 411041, Maharashtra,
                <br />
                India
              </p>
            </div>

            {/* Call Us Card */}
            <div className="info-card">
              <div className="card-icon">
                <i className="phone-icon"></i>
              </div>
              <h3>Call Us</h3>
              <p>+91 8208894835</p>
            </div>

            {/* Email Us Card */}
            <div className="info-card">
              <div className="card-icon">
                <i className="email-icon"></i>
              </div>
              <h3>Email Us</h3>
              <p>info@dreamcatchplacement.com</p>
            </div>

            {/* Open Hours Card */}
            <div className="info-card">
              <div className="card-icon">
                <i className="clock-icon"></i>
              </div>
              <h3>Open Hours</h3>
              <p>Monday - Saturday</p>
              <p>10:00AM - 07:00PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contactNo"
                placeholder="Contact No"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="query"
                placeholder="Query"
                value={formData.query}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submitMessage && (
                <div className={`submit-message ${submitStatus}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
