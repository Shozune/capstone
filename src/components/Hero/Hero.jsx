import "./Hero.css";
import ServicesCard from "../ServicesCard/ServicesCard";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="badge">Student Welfare Management System</span>

        <h1>
          Comprehensive <br />
          Student Care <br />
          Platform
        </h1>

        <p>
          Unified platform for Health Services, Guidance, Discipline,
          and Student Development offices to coordinate student support
          and wellness.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Access Portal →</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>

      <div className="hero-right">
        <div className="services-container">
          <ServicesCard
            title="Health Services Office"
            description="Medical care & wellness"
          />
          <ServicesCard
            title="Admissions Office"
            description="Counseling & support"
          />
          <ServicesCard
            title="Discipline Office"
            description="Student conduct"
          />
          <ServicesCard
            title="Student Development Office"
            description="Scholarships & Discounts"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
