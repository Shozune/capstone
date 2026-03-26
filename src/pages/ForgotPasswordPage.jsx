import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";
import {
  clearReset,
  startPasswordReset,
  updatePassword,
  verifyResetCode,
} from "../utils/authStore";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const emailRegex = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    [],
  );

  const [step, setStep] = useState("email"); // email | code | reset
  const [email, setEmail] = useState("");
  const [codeDigits, setCodeDigits] = useState(Array.from({ length: 6 }, () => ""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const code = codeDigits.join("");

  const validateEmailOnly = (value) => {
    if (!value.trim()) return "Email is required.";
    if (!emailRegex.test(value.trim())) return "Enter a valid email address.";
    return "";
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    const emailErr = validateEmailOnly(email);
    const nextErrors = {};
    if (emailErr) nextErrors.email = emailErr;
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startPasswordReset(email);
    setFormError("");
    setCodeDigits(Array.from({ length: 6 }, () => ""));
    setStep("code");
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!code || code.length !== 6 || !/^\d{6}$/.test(code))
      nextErrors.code = "Enter the 6-digit verification code.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const ok = verifyResetCode(email, code);
    if (!ok) {
      setFormError("Invalid or expired verification code.");
      return;
    }

    setFormError("");
    setStep("reset");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!newPassword) nextErrors.newPassword = "Password is required.";
    else if (newPassword.length < 8)
      nextErrors.newPassword = "Password must be at least 8 characters.";

    if (!confirmNewPassword)
      nextErrors.confirmNewPassword = "Please confirm your password.";
    else if (confirmNewPassword !== newPassword)
      nextErrors.confirmNewPassword = "Passwords do not match.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const ok = updatePassword(email, newPassword);
    if (!ok) {
      setFormError("Unable to reset password for this email.");
      return;
    }

    clearReset();
    setFormError("");
    navigate("/signin");
  };

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
              <h2>
                {step === "email" ? "Forgot Password" : step === "code" ? "Verify Code" : "Reset Password"}
              </h2>
              <p>
                {step === "email"
                  ? "Enter your email to receive a verification code"
                  : step === "code"
                    ? "Enter the 6-digit code sent to your email"
                    : "Create a new password"}
              </p>
            </div>

            {/* Form */}
            <form
              className="forgot-password-form"
              onSubmit={(e) => {
                if (step === "email") handleSendCode(e);
                else if (step === "code") handleVerifyCode(e);
                else handleResetPassword(e);
              }}
            >
              {step === "email" && (
                <>
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">University Email</label>
                    <div className="input-with-icon">
                      <div className="input-icon">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.66699 2.66699H13.3337C14.0670 2.66699 14.667 3.26699 14.667 4.00033V12.0003C14.667 12.7337 14.0670 13.3337 13.3337 13.3337H2.66699C1.93366 13.3337 1.33366 12.7337 1.33366 12.0003V4.00033C1.33366 3.26699 1.93366 2.66699 2.66699 2.66699Z"
                            stroke="#64748B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.667 4L8.00033 8.66667L1.33366 4"
                            stroke="#64748B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        placeholder="email@nu-dasma.edu.ph"
                        className={`form-input with-icon${fieldErrors.email ? " form-input-error" : ""}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.email)}
                      />
                    </div>
                    {fieldErrors.email ? (
                      <p className="form-error" role="alert">
                        {fieldErrors.email}
                      </p>
                    ) : (
                      <p className="form-hint">
                        We'll send a verification code to this email address
                      </p>
                    )}
                  </div>

                  <button type="submit" className="submit-button">
                    Send Verification Code
                  </button>
                </>
              )}

              {step === "code" && (
                <>
                  <div className="form-group">
                    <label htmlFor="verificationCode">Verification Code</label>
                    <div className="cc-code-grid" role="group" aria-label="6-digit verification code">
                      {codeDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`verificationCode-${idx}`}
                          className="cc-code-input"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 1);
                            setCodeDigits((prev) => {
                              const next = [...prev];
                              next[idx] = v;
                              return next;
                            });
                            if (v && idx < 5) {
                              const nextEl = document.getElementById(`verificationCode-${idx + 1}`);
                              if (nextEl) nextEl.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !digit && idx > 0) {
                              const prevEl = document.getElementById(`verificationCode-${idx - 1}`);
                              if (prevEl) prevEl.focus();
                            }
                          }}
                          aria-invalid={Boolean(fieldErrors.code)}
                        />
                      ))}
                    </div>
                    {fieldErrors.code && (
                      <p className="form-error" role="alert">
                        {fieldErrors.code}
                      </p>
                    )}
                    {!fieldErrors.code && (
                      <p className="form-hint">Enter the 6-digit code you received.</p>
                    )}
                  </div>

                  {formError && (
                    <p className="form-error form-error-global" role="alert">
                      {formError}
                    </p>
                  )}

                  <button type="submit" className="submit-button">
                    Verify Code
                  </button>
                </>
              )}

              {step === "reset" && (
                <>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="input-with-icon">
                      <div className="input-icon">{/* Icon placeholder */}</div>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        placeholder="Create a new password"
                        className={`form-input with-icon cc-has-pw-toggle${
                          fieldErrors.newPassword ? " form-input-error" : ""
                        }`}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.newPassword)}
                      />
                      <button
                        type="button"
                        className="cc-pw-toggle-btn"
                        onClick={() => setShowNewPassword((s) => !s)}
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {fieldErrors.newPassword && (
                      <p className="form-error" role="alert">
                        {fieldErrors.newPassword}
                      </p>
                    )}
                    {!fieldErrors.newPassword && (
                      <p className="form-hint">Must be at least 8 characters.</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <div className="input-with-icon">
                      <div className="input-icon">{/* Icon placeholder */}</div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmNewPassword"
                        placeholder="Confirm new password"
                        className={`form-input with-icon cc-has-pw-toggle${
                          fieldErrors.confirmNewPassword ? " form-input-error" : ""
                        }`}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.confirmNewPassword)}
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
                    {fieldErrors.confirmNewPassword && (
                      <p className="form-error" role="alert">
                        {fieldErrors.confirmNewPassword}
                      </p>
                    )}
                  </div>

                  {formError && (
                    <p className="form-error form-error-global" role="alert">
                      {formError}
                    </p>
                  )}

                  <button type="submit" className="submit-button">
                    Reset Password
                  </button>
                </>
              )}

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