import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import campusCareLogo from "../assets/CampusCareLogo.png";
import AuthSplitAside from "../components/auth/AuthSplitAside";
import "./authPagesLayout.css";
import "./SigninPage.css";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { verifyCredentials } from "../utils/authStore";
import { formatAuthError } from "../utils/supabaseErrors";
import { getHomeRouteForOffice } from "../utils/officeRoutes";

const SigninPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupNotice = location.state?.message;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const emailRegex = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    [],
  );

  const clearFieldError = (key) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (isSupabaseConfigured() && supabase) {
      setSubmitting(true);
      setFormError("");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setSubmitting(false);
        setFormError(formatAuthError(error));
        return;
      }

      const authUser = data.user;
      const meta = authUser.user_metadata || {};

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, middle_initial, last_name, office, role")
        .eq("id", authUser.id)
        .maybeSingle();

      const office = profile?.office ?? meta.office ?? "health";
      const displayName = profile
        ? [profile.first_name, profile.last_name].filter(Boolean).join(" ").trim()
        : [meta.first_name, meta.last_name].filter(Boolean).join(" ").trim();

      const session = {
        userId: authUser.id,
        email: authUser.email ?? email.trim(),
        office,
        role: profile?.role ?? meta.role ?? "Staff",
        name: displayName || authUser.email || email.trim(),
        rememberMe,
      };
      window.localStorage.setItem("campuscare_session_v1", JSON.stringify(session));

      setSubmitting(false);
      navigate(getHomeRouteForOffice(office), { replace: true, state: {} });
      return;
    }

    const user = verifyCredentials(email, password);
    if (!user) {
      setFormError("Invalid email or password.");
      return;
    }

    setFormError("");
    const office = user.office;
    const session = {
      userId: user.id,
      email: user.email,
      office,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`,
      rememberMe,
    };
    window.localStorage.setItem("campuscare_session_v1", JSON.stringify(session));

    navigate(getHomeRouteForOffice(office));
  };

  return (
    <div className="signin-page auth-split-page">
      <div className="auth-split-card">
        <div className="auth-split-form-panel auth-split-form-panel--balance">
          <div className="auth-split-form-top">
            <Link to="/" className="auth-split-back">
              ← Back to home
            </Link>
            <div className="auth-split-logo-row">
              <img src={campusCareLogo} alt="" width={44} height={44} />
              <span>CampusCare</span>
            </div>
          </div>

          <div className="auth-split-form-body">
            <h1 className="auth-split-title">Welcome Back</h1>
            <p className="auth-split-subtitle">
              Enter your university email and password to access your account.
            </p>

            {signupNotice ? (
              <p className="auth-banner auth-banner--success" role="status">
                {signupNotice}
              </p>
            ) : null}

            <form className="signin-form auth-form-fields" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">University email</label>
              <div className="input-with-icon">
                <span className="input-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66699 2.66699H13.3337C14.0670 2.66699 14.667 3.26699 14.667 4.00033V12.0003C14.667 12.7337 14.0670 13.3337 13.3337 13.3337H2.66699C1.93366 13.3337 1.33366 12.7337 1.33366 12.0003V4.00033C1.33366 3.26699 1.93366 2.66699 2.66699 2.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.667 4L8.00033 8.66667L1.33366 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className={`form-input with-icon${fieldErrors.email ? " form-input-error" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
              </div>
              <div className="form-feedback-slot" id="email-error">
                {fieldErrors.email ? (
                  <p className="form-error" role="alert">
                    {fieldErrors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <span className="input-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3.33334" y="7.33325" width="9.33333" height="5.33333" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.33334 7.33325V4.66659C5.33334 3.25585 6.47667 2.11243 7.88741 2.11243V2.11243C9.29815 2.11243 10.4415 3.25585 10.4415 4.66659V7.33325" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`form-input with-icon cc-has-pw-toggle${
                    fieldErrors.password ? " form-input-error" : ""
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="cc-pw-toggle-btn"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} strokeWidth={1.6} /> : <Eye size={20} strokeWidth={1.6} />}
                </button>
              </div>
              <div className="form-feedback-slot" id="password-error">
                {fieldErrors.password ? (
                  <p className="form-error" role="alert">
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>
            </div>

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

            {formError ? (
              <p className="form-error form-error-global" role="alert">
                {formError}
              </p>
            ) : null}

            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>

            <div className="form-divider">
              <span>Or continue with</span>
            </div>

            <Link to="/signup" className="create-account-button create-account-button--with-icon">
              <UserPlus size={18} strokeWidth={1.75} aria-hidden />
              Create account
            </Link>

            <p className="form-inline-register">
              Don&apos;t have an account?{" "}
              <Link to="/signup">Register now</Link>
            </p>
          </form>
          </div>
        </div>

        <AuthSplitAside
          title="Effortlessly coordinate student welfare across campus."
          subtitle="Sign in to open your office workspace—cases, referrals, and health records stay in one secure, role-aware platform."
        />
      </div>
    </div>
  );
};

export default SigninPage;
