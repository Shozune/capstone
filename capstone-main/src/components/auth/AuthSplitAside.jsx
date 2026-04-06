import AuthDisciplineDashboardPreview from "./AuthDisciplineDashboardPreview";

/**
 * Right panel — brand headline + Discipline Office dashboard preview (reference layout).
 */
function AuthSplitAside({ title, subtitle }) {
  return (
    <aside className="auth-split-aside" aria-label="CampusCare overview">
      <div className="auth-split-aside__glow" aria-hidden />
      <div className="auth-split-aside__intro">
        <h2 className="auth-split-aside__title">{title}</h2>
        <p className="auth-split-aside__subtitle">{subtitle}</p>

        <div className="auth-split-aside__badges" aria-label="Institution">
          <span className="auth-split-aside__badge">National University Dasmariñas</span>
          <span className="auth-split-aside__badge">Student Welfare</span>
        </div>
      </div>

      <div className="auth-split-aside__float-wrap">
        <figure className="auth-split-aside__figure">
          <AuthDisciplineDashboardPreview />
        </figure>
      </div>
    </aside>
  );
}

export default AuthSplitAside;
