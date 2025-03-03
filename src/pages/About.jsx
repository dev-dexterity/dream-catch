import React from "react";
import "./About.css";
import one from "../assets/1.png";
import two from "../assets/2.png"; // Replace with actual image path

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Deliver top-tier education through a value-driven, holistic
            approach, combining traditional wisdom with innovative teaching
            methodologies.
          </p>
          {/* <button className="get-started-btn">Get Started →</button> */}
        </div>
        <div className="about-image animated-bounce">
          <img src={one} alt="About Dream Catch" />
        </div>
      </div>

      <div className="about-details">
        <div className="details-content">
          <h2>About Us</h2>
          <h3>
            Pioneers in IT Training, Workforce Solutions, and Software
            Consulting
          </h3>
          <p>
            Our institution is dedicated to becoming a leading force in IT
            training, staffing, software solutions, and consulting. We have
            consistently delivered excellence in corporate training, specialized
            IT workshops, and talent acquisition for global enterprises.
          </p>
          <p>
            With a decade of experience, we have built a strong industry
            presence by offering customized software solutions that cater to
            specific business needs while maintaining an outstanding track
            record with our IT partners.
          </p>
          <p>
            Our expertise spans professional training, workforce augmentation,
            corporate IT programs, and comprehensive software development,
            ensuring top-tier services in collaboration with multinational
            corporations.
          </p>
        </div>
        <div className="details-image">
          <img src={two} alt="Our Services" />
        </div>
      </div>
    </div>
  );
};

export default About;
