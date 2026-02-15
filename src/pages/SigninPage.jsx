import { Link } from "react-router-dom";
import "./SigninPage.css";

const SigninPage = () => {
  return (
    <div className="signin-page">
      <div className="signin-container">
        {/* Left Side - Information */}
        <div className="signin-left">
          {/* Logo Section */}
          <div className="signin-logo-section">
            <div className="signin-logo-icon">{/* Icon placeholder - replace with actual logo */}</div>
            <div className="signin-logo-text">
              <h1>CampusCare</h1>
              <p>Student Welfare Management</p>
            </div>
          </div>

          {/* Heading Section */}
          <div className="signin-heading-section">
            <h2>Comprehensive Student Care Platform</h2>
            <p>
              Unified platform for Health Services, Guidance, Discipline, and
              Student Development to coordinate student support and wellness.
            </p>
          </div>

          {/* Features Grid */}
          <div className="signin-features">
            <div className="signin-feature-box">
              <div className="feature-icon-large">{/* Icon placeholder - Health First icon */}</div>
              <h4>Health First</h4>
              <p>Prioritizing student wellness</p>
            </div>

            <div className="signin-feature-box">
              <div className="feature-icon-large">{/* Icon placeholder - Secure icon */}</div>
              <h4>Secure</h4>
              <p>Protected student data</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="signin-right">
          <div className="signin-form-container">
            {/* Form Header */}
            <div className="signin-form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access CampusCare</p>
            </div>

            {/* Form */}
            <form className="signin-form">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">University Email</label>
                <div className="input-with-icon">
                  <div className="input-icon">{/* Icon placeholder - Email icon */}</div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter university email"
                    className="form-input with-icon"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <div className="input-icon">{/* Icon placeholder - Lock icon */}</div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="form-input with-icon"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button type="submit" className="submit-button">
                Sign In
              </button>

              {/* Divider */}
              <div className="form-divider">
                <span>New to CampusCare?</span>
              </div>

              {/* Create Account Button */}
              <Link to="/signup" className="create-account-button">
                Create Account
              </Link>

              {/* Footer Text */}
              <p className="form-footer-text">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;