import "./CallToAction.css";

const CallToAction = () => {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Ready to Get Started?</h2>
        <p>
          Join our student welfare management platform and provide better care
          for your students.
        </p>
        <div className="cta-buttons">
          <button className="cta-btn-primary">
            Access Portal
            <span className="arrow">→</span>
          </button>
          <button className="cta-btn-secondary">Create Account</button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;