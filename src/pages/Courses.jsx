import React, { useState, useEffect } from "react";
import "./Courses.css";
import illustration from "../assets/c1.png";

const courses = [
  "Java",
  "Software Testing",
  "Salesforce",
  "PHP",
  "Power BI/ Tableau",
  "Data Scientist",
  "AWS/ DevOps",
  "Dot Net",
  "UI Technologies (Angular/ React/ React Native)",
  "PLSQL/ SQL Server/ Oracle",
  "Python with Django/ Flask",
  "SAP-MM/ PP/ SD/ FICO/ ABAP",
];

const Attendees = [
  "Graduation in BE/BTECH/ME/MTECH/MCA/BCS/BCA, Diploma in any Stream/Branch",
  "Those who want to move in IT from BCOM/BSC/BA/PHARMA, we have a separate plan for them",
  "Those who are working in KPO/BPO",
  "Those who are working in Teaching as a professor",
  "Those who are working in Non-Technical/Technical Support Job",
  "Those who are working in IT with multiple switches, we have a separate plan for them",
  "Basic Coding Knowledge/Basic Coding Skills in respective domain",
  "Average Communication skill and personality is required",
  "Those who are working in IT at low package, we can move them for Higher package",
  "We are providing this service for anyone who belongs to India or Abroad",
];

const Courses = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <div className="courses-container">
      {/* Header Section with Left Content and Right Image */}
      <div className="course-header">
        <div className="course-content">
          <h2 className="course-title">OUR COURSES</h2>
          <p className="course-description">
            Provide exceptional training by fostering a value-based,
            comprehensive learning experience that blends time-honored methods
            with modern techniques.
          </p>
        </div>
        <div className="course-image">
          <img src={illustration} alt="Course Illustration" />
        </div>
      </div>

      {/* Courses Section Below */}
      <div className="offers-section">
        <h2 className="offers-title">Offers following courses</h2>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <span className="checkmark">✓</span>
              <span className="course-name">{course}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendees Section */}
      <div className={`attendees-section ${visible ? "fade-in" : ""}`}>
        <div className="attend-container">
          <h3 className="subtitle">Prerequisite</h3>
          <h2 className="title">Who Can Attend This Program</h2>
          <div className="attendees-grid">
            {Attendees.map((item, index) => (
              <div
                key={index}
                className="attendee-card"
                style={{ "--i": index }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
