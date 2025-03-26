import React from "react";
import "./Services.css";
import serviceImage from "../assets/s1.png"; // Replace with actual image path
import illustration from "../assets/s2.png";

const Service = [
  {
    icon: "📈",
    text: "To Recover the Knowledge GAP between Industry and Academics",
  },
  { icon: "🔗", text: "Network with 700+ leading IT Companies across Globe" },
  {
    icon: "💼",
    text: "Dedicated Placement Cell for Excellent Placement Support",
  },
  {
    icon: "🎯",
    text: "Provide you High Tech Lab Facility for Training and Development",
  },
  { icon: "🎓", text: "Free Career Guidance" },
  { icon: "🌍", text: "All Experts are from Industry level" },
  { icon: "👨‍🏫", text: "One to One Personal Guidance" },
  { icon: "💻", text: "We focus on Only Practical and Real-time scenarios" },
  { icon: "🏆", text: "100% Quality and Genuine Training" },
  { icon: "📝", text: "Free Resume Writing" },
];

const Services = () => {
  return (
    <>
      <div className="services-hero">
        <div className="services-hero-content">
          <h2>Leading Manpower Consultancy in Pune</h2>
          <p>
            Our tech-based recruitment techniques are designed to test a
            candidate's talents, strengths, and skills. This means we aim to
            give your organization the best. With over 800 experienced
            recruiters, we understand the need to go beyond scanning job
            applications. Our strategic approach to recruitment truly makes
            Randstad the leading manpower consultancy in Pune.
          </p>
        </div>
        <div className="services-hero-image animated-bounce">
          <img src={serviceImage} alt="Services Icon" />
        </div>
      </div>

      <div className="services-container">
        <section className="services-section">
          <h2 className="services-title">OUR SERVICES</h2>
          <h3 className="services-heading">OFFERS FOLLOWING SERVICES</h3>
          <div className="services-card-container">
            {Service.map((service, index) => (
              <div className="service-card" key={index}>
                <span className="service-icon">{service.icon}</span>
                <p className="service-text">{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="why-us">
          <div className="why-us-container">
            {/* Left Content */}
            <div className="why-us-content">
              <h2>Why Us</h2>
              <ul>
                <li>
                  Certified/ Expert Trainers in Specialized areas for Training
                </li>
                <li>Exhaustive Training Program with Real-time scenarios</li>
                <li>Special Sessions on Interview Techniques & Soft Skills</li>
                <li>
                  Emphasis on Programming Design Principles and Real-Time
                  Scenarios
                </li>
                <li>700+ IT client base across India</li>
                <li>
                  State-of-the-art facility for students to attend lectures and
                  practical sessions
                </li>
                <li>
                  Professionally designed training programs for experienced
                  persons
                </li>
                <li>
                  Innovative teaching methodology for specialization,
                  certification, and academics
                </li>
                <li>
                  Qualified and Trained staff for teaching and Practical
                  sessions
                </li>
                <li>
                  Proper assistance for Job Interviews and placement drives
                </li>
                <li>
                  Staffing solutions for both permanent and contractual jobs
                </li>
                <li>
                  Provided platform to thousands of IT professionals to work
                  with MNCs like IBM, Capgemini, Amdocs, TechM, and more
                </li>
              </ul>
            </div>

            {/* Right Image */}
            <div className="why-us-image">
              <img src={illustration} alt="Training Illustration" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
