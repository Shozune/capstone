import { Link, useLocation, useNavigate } from "react-router-dom";
import { DO_NAV_ITEMS } from "./deanOfficeNav";
import "./Sidebar.css";

/**
 * @param {object} props
 * @param {{ id: string, label: string, icon: React.ReactNode }[]} [props.navItems] — local nav (buttons); omit for Dean’s Office router links
 * @param {string} [props.activeNavId] — active item id when using local nav
 * @param {(id: string) => void} [props.onNavSelect]
 * @param {string} [props.departmentTag] — subtitle under CampusCare
 * @param {() => void} [props.onLogoutRequest] — if set, called instead of immediate sign-out (e.g. confirm modal)
 * @param {() => void} [props.onSettingsClick]
 */
function Sidebar({ navItems, activeNavId, onNavSelect, departmentTag, onLogoutRequest, onSettingsClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const useLocalNav = Array.isArray(navItems) && typeof onNavSelect === "function";

  const handleLogout = () => {
    if (typeof onLogoutRequest === "function") {
      onLogoutRequest();
      return;
    }
    window.localStorage.removeItem("campuscare_session_v1");
    navigate("/signin");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-fallback">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="sidebar-brand-text">
          <h3>CampusCare</h3>
          <p>{departmentTag ?? "Welfare Management"}</p>
        </div>
      </div>

      <div className="sidebar-institution">
        <p className="inst-label">Institution</p>
        <p className="inst-name">National University Dasmariñas</p>
      </div>

      <nav className="sidebar-nav">
        {!useLocalNav &&
          DO_NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item${location.pathname === item.path ? " active" : ""}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

        {useLocalNav &&
          navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item${activeNavId === item.id ? " active" : ""}`}
              onClick={() => onNavSelect(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-nav-item"
          onClick={() => {
            if (typeof onSettingsClick === "function") onSettingsClick();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.667" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5.333V8M8 10.667h.007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Settings
        </button>
        <button type="button" className="sidebar-nav-item" onClick={handleLogout}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10.667 11.333L14 8l-3.333-3.333M14 8H6M6 14H2.667A1.333 1.333 0 011.333 12.667V3.333A1.333 1.333 0 012.667 2H6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
