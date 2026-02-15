import { Link } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Information */}
        <div className="signup-left">
          {/* Logo Section */}
          <div className="signup-logo-section">
            <div className="signup-logo-icon">{/* Icon placeholder - replace with actual logo */}</div>
            <div className="signup-logo-text">
              <h1>CampusCare</h1>
              <p>Health Services Office</p>
            </div>
          </div>

          {/* Heading Section */}
          <div className="signup-heading-section">
            <h2>Join Our Healthcare Team</h2>
            <p>
              Create your staff account to access the CampusCare platform and
              contribute to student health and wellness management.
            </p>
          </div>

          {/* Features List */}
          <div className="signup-features">
            <div className="signup-feature-item">
              <div className="feature-icon-box">
                {/* Icon placeholder - Health icon */}
                <div className="feature-icon"></div>
              </div>
              <div className="feature-content">
                <h4>Comprehensive Care</h4>
                <p>Access complete student health records and consultation history</p>
              </div>
            </div>

            <div className="signup-feature-item">
              <div className="feature-icon-box">
                {/* Icon placeholder - Coordination icon */}
                <div className="feature-icon"></div>
              </div>
              <div className="feature-content">
                <h4>Inter-Office Coordination</h4>
                <p>Seamless referrals to Guidance, Discipline, and Student Development</p>
              </div>
            </div>

            <div className="signup-feature-item">
              <div className="feature-icon-box">
                {/* Icon placeholder - Platform icon */}
                <div className="feature-icon"></div>
              </div>
              <div className="feature-content">
                <h4>Centralized Platform</h4>
                <p>All student welfare services in one integrated system</p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="signup-footer-info">
            <p className="footer-title">National University Dasmariñas</p>
            <p className="footer-subtitle">Student Welfare Management System</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="signup-right">
          <div className="signup-form-container">
            {/* Back Button */}
            <Link to="/signin" className="back-button">
              <div className="back-icon">{/* Icon placeholder - Back arrow */}</div>
              Back to Login
            </Link>

            {/* Form Header */}
            <div className="signup-form-header">
              <h2>Create Account</h2>
              <p>Register as a staff member</p>
            </div>

            {/* Form */}
            <form className="signup-form">
              {/* Name Row */}
              <div className="form-row">
                <div className="form-group form-group-large">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Juan"
                    className="form-input"
                  />
                </div>
                <div className="form-group form-group-small">
                  <label htmlFor="middleInitial">M.I.</label>
                  <input
                    type="text"
                    id="middleInitial"
                    placeholder="D"
                    maxLength="1"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Dela Cruz"
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">University Email *</label>
                <div className="input-with-icon">
                  <div className="input-icon">{/* Icon placeholder - Email icon */}</div>
                  <input
                    type="email"
                    id="email"
                    placeholder="staff@nu-dasma.edu.ph"
                    className="form-input with-icon"
                  />
                </div>
              </div>

              {/* Office */}
              <div className="form-group">
                <label htmlFor="office">Office *</label>
                <select id="office" className="form-select">
                  <option value="">Select office</option>
                  <option value="health">Health Services</option>
                  <option value="guidance">Guidance Services</option>
                  <option value="discipline">Discipline Office</option>
                  <option value="development">Student Development</option>
                </select>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-with-icon">
                  <div className="input-icon">{/* Icon placeholder - Lock icon */}</div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    className="form-input with-icon"
                  />
                </div>
                <p className="form-hint">Must be at least 8 characters</p>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-with-icon">
                  <div className="input-icon">{/* Icon placeholder - Lock icon */}</div>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-input with-icon"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="form-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree to the <span className="link-text">Terms of Service</span> and{" "}
                  <span className="link-text">Privacy Policy</span>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-button">
                Create Account
              </button>

              {/* Sign In Link */}
              <p className="form-footer">
                Already have an account?{" "}
                <Link to="/signin" className="link-text-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;