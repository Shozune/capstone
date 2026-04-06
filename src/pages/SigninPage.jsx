import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SigninPage.css";
import { verifyCredentials } from "../utils/authStore";

const PORTAL_ROUTES = {
  do: "/dashboard",
  health: "/health-services",
  sdao: "/sdao",
};

const SigninPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portal, setPortal] = useState("do");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const emailRegex = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    [],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!emailRegex.test(email.trim()))
      nextErrors.email = "Enter a valid email address.";

    if (!password) nextErrors.password = "Password is required.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const user = verifyCredentials(email, password);
    if (!user) {
      setFormError("Invalid email or password.");
      return;
    }

    setFormError("");
    // Deterministic UI-only session storage for testable navigation.
    const session = {
      userId: user.id,
      email: user.email,
      office: user.office,
      portal,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`,
      rememberMe,
    };
    window.localStorage.setItem("campuscare_session_v1", JSON.stringify(session));

    navigate(PORTAL_ROUTES[portal] ?? "/dashboard");
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        {/* Left Side - Information */}
        <div className="signin-left">
          {/* Logo Section */}
          <div className="signin-logo-section">
            <div className="signin-logo-icon"></div>
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
              <div className="feature-icon-large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Health First</h4>
              <p>Prioritizing student wellness</p>
            </div>

            <div className="signin-feature-box">
              <div className="feature-icon-large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#2B7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
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
            <form className="signin-form" onSubmit={handleSubmit}>
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
                    placeholder="Enter university email"
                    className={`form-input with-icon${
                      fieldErrors.email ? " form-input-error" : ""
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="form-error" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3.33334" y="7.33325" width="9.33333" height="5.33333" rx="1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.33334 7.33325V4.66659C5.33334 3.25585 6.47667 2.11243 7.88741 2.11243V2.11243C9.29815 2.11243 10.4415 3.25585 10.4415 4.66659V7.33325" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    className={`form-input with-icon cc-has-pw-toggle${
                      fieldErrors.password ? " form-input-error" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.password)}
                  />
                  <button
                    type="button"
                    className="cc-pw-toggle-btn"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="form-error" role="alert">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="office-portal">Office portal</label>
                <select
                  id="office-portal"
                  className="form-input signin-office-select"
                  value={portal}
                  onChange={(e) => setPortal(e.target.value)}
                >
                  <option value="do">Dean&apos;s Office (DO)</option>
                  <option value="health">Health Services</option>
                  <option value="sdao">SDAO</option>
                </select>
                <p className="signin-office-hint">
                  Choose which workspace to open after sign-in (frontend preview).
                </p>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              {formError && (
                <p className="form-error form-error-global" role="alert">
                  {formError}
                </p>
              )}

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