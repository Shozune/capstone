import "./Hero.css";
import ServiceCard from "../ServiceCard/ServiceCard";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="badge">Student Welfare Management System</div>

        <h1>
          Comprehensive
          <br />
          Student Care
          <br />
          Platform
        </h1>

        <p>
          Unified platform for Health Services, Guidance, Discipline,
          and Student Development offices to coordinate student support
          and wellness.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Access Portal
            <span className="arrow">→</span>
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>

      <div className="hero-cards">
        <div className="cards-container">
          <ServiceCard
            title="Health Services"
            description="Medical care & wellness"
          />
          <ServiceCard
            title="Guidance Services"
            description="Counseling & support"
          />
          <ServiceCard
            title="Discipline Office"
            description="Student conduct"
          />
          <ServiceCard
            title="Student Development"
            description="Programs & activities"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;