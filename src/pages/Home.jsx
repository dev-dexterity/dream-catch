import React from "react";
import "./Home.css";
import illustration from "../assets/D.png"; // Make sure this matches your uploaded image
import one from "../assets/t.png";
import two from "../assets/c.png";
import three from "../assets/v.png";
import ill from "../assets/ill.png";

const Home = () => {
  return (
    <div className="homepage">
      {/* <header>
        <img src={logo} alt="Codetech Corporate Training" className="logo" />
      </header> */}

      <div className="container">
        <div className="text-section">
          <h1>
            Provide innovative opportunities for students to unlock their
            creativity and reach their full potential.
          </h1>
          <p>
            Providing students with a space to unlock their creativity, foster
            an entrepreneurial spirit, embrace innovation, and develop critical
            thinking skills.
          </p>
          {/* <button className="cta-button">Get Started →</button> */}
        </div>

        <div className="image-section animated-bounce">
          <img src={illustration} alt="Illustration" />
        </div>
      </div>

      <section class="about-us">
        <div class="container">
          <div class="text-section">
            <h2 class="animate-text">About Us</h2>
            <h1 class="animate-text about-us-h1">
              Pioneers in IT Training, Workforce Solutions, and Software
              Consulting
            </h1>
            <p class="animate-text about-us-p">
              Our institution is dedicated to becoming a leading force in IT
              training, staffing, software solutions, and consulting. We have
              consistently delivered excellence in corporate training,
              specialized IT workshops, and talent acquisition for global
              enterprises.
            </p>
            <p class="animate-text about-us-p">
              With a decade of experience, we have built a strong industry
              presence by offering customized software solutions that cater to
              specific business needs while maintaining an outstanding track
              record with our IT partners.
            </p>
            <p class="animate-text about-us-p">
              Our expertise spans professional training, workforce augmentation,
              corporate IT programs, and comprehensive software development,
              ensuring top-tier services in collaboration with multinational
              corporations.
            </p>
          </div>
          <div class="image-section">
            <img src={ill} alt="Training Session" class="animate-image" />
          </div>
        </div>
      </section>

      <section class="objectives">
        <div class="container-object">
          <h3 class="animate-text">OUR OBJECTIVES</h3>
          <h1 class="animate-text objectives-h1">
            Empowering Creativity, Cultivating Entrepreneurship, and Encouraging
            Critical Thinking
          </h1>

          <div class="home-cards">
            <div class="home-card animate-box">
              <img src={one} alt="Training" class="hover-pop" />
              <p className="objectives-p">
                Delivering top-tier education through an innovative blend of
                traditional and modern learning approaches, ensuring a
                well-rounded experience.
              </p>
            </div>

            <div class="home-card animate-box">
              <img src={two} alt="Entrepreneurship" class="hover-pop" />
              <p className="objectives-p">
                Providing a platform for students to unleash their creativity,
                foster entrepreneurial thinking, and develop innovative
                solutions.
              </p>
            </div>

            <div class="home-card animate-box">
              <img src={three} alt="Values" class="hover-pop" />
              <p className="objectives-p">
                Instilling values of integrity, equality, and environmental
                consciousness, shaping individuals into responsible and ethical
                leaders.
              </p>
            </div>

            <div class="home-card animate-box">
              <h2 className="num-h2">1500+</h2>
              <p className="num-p">Placed Students</p>
            </div>

            <div class="home-card animate-box">
              <h2 className="num-h2">30+</h2>
              <p className="num-p">Courses</p>
            </div>

            <div class="home-card animate-box">
              <h2 className="num-h2">20+</h2>
              <p className="num-p">Experts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
