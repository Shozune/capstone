import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { OFFICE_OPTIONS } from "../data/mockUsers";
import { registerUser } from "../utils/authStore";

const SignupPage = () => {
  const navigate = useNavigate();
  const emailRegex = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    [],
  );

  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [office, setOffice] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const roleByOffice = useMemo(
    () => ({
      health: "Health Services",
      guidance: "Guidance Services",
      discipline: "Discipline Coordinator",
      development: "Student Development",
    }),
    [],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";

    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!emailRegex.test(email.trim()))
      nextErrors.email = "Enter a valid email address.";

    if (!office) nextErrors.office = "Please select an office.";

    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 8)
      nextErrors.password = "Password must be at least 8 characters.";

    if (!confirmPassword)
      nextErrors.confirmPassword = "Confirm password is required.";
    else if (confirmPassword !== password)
      nextErrors.confirmPassword = "Passwords do not match.";

    if (!termsAccepted)
      nextErrors.terms = "You must accept the Terms of Service and Privacy Policy.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      registerUser({
        firstName: firstName.trim(),
        middleInitial: middleInitial.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        office,
        role: roleByOffice[office] || "Staff",
      });
      setFormError("");
      navigate("/signin");
    } catch (err) {
      setFormError(err?.message || "Unable to create account.");
    }
  };

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
            <form className="signup-form" onSubmit={handleSubmit}>
              {/* Name Row */}
              <div className="form-row">
                <div className="form-group form-group-large">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Juan"
                    className={`form-input${fieldErrors.firstName ? " form-input-error" : ""}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.firstName)}
                  />
                  {fieldErrors.firstName && (
                    <p className="form-error" role="alert">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>
                <div className="form-group form-group-small">
                  <label htmlFor="middleInitial">M.I.</label>
                  <input
                    type="text"
                    id="middleInitial"
                    placeholder="D"
                    maxLength="1"
                    className="form-input"
                    value={middleInitial}
                    onChange={(e) => setMiddleInitial(e.target.value)}
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
                  className={`form-input${fieldErrors.lastName ? " form-input-error" : ""}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.lastName)}
                />
                {fieldErrors.lastName && (
                  <p className="form-error" role="alert">
                    {fieldErrors.lastName}
                  </p>
                )}
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
                    className={`form-input with-icon${fieldErrors.email ? " form-input-error" : ""}`}
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

              {/* Office */}
              <div className="form-group">
                <label htmlFor="office">Office *</label>
                <select
                  id="office"
                  className={`form-select${fieldErrors.office ? " form-input-error" : ""}`}
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.office)}
                >
                  <option value="">Select office</option>
                  {OFFICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.office && (
                  <p className="form-error" role="alert">
                    {fieldErrors.office}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-with-icon">
                  <div className="input-icon">{/* Icon placeholder - Lock icon */}</div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter Password"
                    className={`form-input with-icon cc-has-pw-toggle${fieldErrors.password ? " form-input-error" : ""}`}
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
                <p className="form-hint">Must be at least 8 characters</p>
                {fieldErrors.password && (
                  <p className="form-error" role="alert">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-with-icon">
                  <div className="input-icon">{/* Icon placeholder - Lock icon */}</div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className={`form-input with-icon cc-has-pw-toggle${
                      fieldErrors.confirmPassword ? " form-input-error" : ""
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.confirmPassword)}
                  />
                  <button
                    type="button"
                    className="cc-pw-toggle-btn"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="form-error" role="alert">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  aria-invalid={Boolean(fieldErrors.terms)}
                />
                <label htmlFor="terms">
                  I agree to the <span className="link-text">Terms of Service</span> and{" "}
                  <span className="link-text">Privacy Policy</span>
                </label>
              </div>
              {fieldErrors.terms && (
                <p className="form-error" role="alert">
                  {fieldErrors.terms}
                </p>
              )}

              {/* Submit Button */}
              <button type="submit" className="submit-button">
                Create Account
              </button>

              {formError && (
                <p className="form-error form-error-global" role="alert">
                  {formError}
                </p>
              )}

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