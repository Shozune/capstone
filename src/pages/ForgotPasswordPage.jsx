import { Link } from "react-router-dom";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        {/* Left Side - Information */}
        <div className="forgot-password-left">
          {/* Logo Section */}
          <div className="forgot-password-logo-section">
            <div className="forgot-password-logo-icon"></div>
            <div className="forgot-password-logo-text">
              <h1>CampusCare</h1>
              <p>Student Welfare Management</p>
            </div>
          </div>

          {/* Heading Section */}
          <div className="forgot-password-heading-section">
            <h2>Reset Your Password</h2>
            <p>
              Enter your university email address and we'll send you a verification code to reset your password securely.
            </p>
          </div>

          {/* Steps */}
          <div className="forgot-password-steps">
            <div className="forgot-password-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Enter Email</h4>
                <p>Provide your registered university email</p>
              </div>
            </div>

            <div className="forgot-password-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Verify Code</h4>
                <p>Check your email for the verification code</p>
              </div>
            </div>

            <div className="forgot-password-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Create New Password</h4>
                <p>Set a strong, secure password</p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="forgot-password-footer-info">
            <p className="footer-title">National University Dasmariñas</p>
            <p className="footer-subtitle">Student Welfare Management System</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="forgot-password-right">
          <div className="forgot-password-form-container">
            {/* Form Header */}
            <div className="forgot-password-form-header">
              <h2>Forgot Password</h2>
              <p>Enter your email to receive a verification code</p>
            </div>

            {/* Form */}
            <form className="forgot-password-form">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">University Email</label>
                <div className="input-with-icon">
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.66699 2.66699H13.3337C14.0670 2.66699 14.667 3.26699 14.667 4.00033V12.0003C14.667 12.7337 14.0670 13.3337 13.3337 13.3337H2.66699C1.93366 13.3337 1.33366 12.7337 1.33366 12.0003V4.00033C1.33366 3.26699 1.93366 2.66699 2.66699 2.66699Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.667 4L8.00033 8.66667L1.33366 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="email@nu-dasma.edu.ph"
                    className="form-input with-icon"
                  />
                </div>
                <p className="form-hint">We'll send a verification code to this email address</p>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-button">
                Send Verification Code
              </button>

              {/* Divider */}
              <div className="form-divider">
                <span>Remember your password?</span>
              </div>

              {/* Back to Login Button */}
              <Link to="/signin" className="back-to-login-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6667 8H3.33333" stroke="#314158" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12.6667L3.33333 8L8 3.33333" stroke="#314158" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Login
              </Link>

              {/* Footer Text */}
              <p className="form-footer-text">
                For security reasons, this link will expire in 15 minutes
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;