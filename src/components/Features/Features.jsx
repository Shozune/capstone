import "./Features.css";

const Features = () => {
  return (
    <section className="features">
      <div className="features-header">
        <h2>Platform Features</h2>
        <p>Everything you need for comprehensive student welfare management</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon"></div>
          <h3>Health Management</h3>
          <p>
            Track student health visits, manage medical records, process
            appointments, and coordinate referrals to other offices.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon"></div>
          <h3>Inter-Office Coordination</h3>
          <p>
            Seamless referrals between offices, shared student records, and
            collaborative case management for holistic support.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon"></div>
          <h3>Secure & Confidential</h3>
          <p>
            Role-based access control, encrypted data, and HIPAA-compliant
            medical record storage for student privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;