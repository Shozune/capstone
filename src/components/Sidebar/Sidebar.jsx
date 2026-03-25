import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Case Management",
    path: "/case-management",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13.333 2H2.667C1.93 2 1.333 2.597 1.333 3.333v9.334C1.333 13.403 1.93 14 2.667 14h10.666c.737 0 1.334-.597 1.334-1.333V3.333C14.667 2.597 14.07 2 13.333 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.333 6h5.334M5.333 9.333h3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Case Conference",
    path: "/case-conference",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10.667 14v-1.333A2.667 2.667 0 008 10H3.333a2.667 2.667 0 00-2.666 2.667V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.667" cy="5.333" r="2.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.667 14v-1.333a2.667 2.667 0 00-2-2.58M10.667 2.087a2.667 2.667 0 010 5.16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Student Records",
    path: "/student-records",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L1.333 4.333v4C1.333 11.853 4.253 14.6 8 15.333c3.747-.733 6.667-3.48 6.667-7V4.333L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Document Requests",
    path: "/document-requests",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M9.333 1.333H3.333C2.597 1.333 2 1.93 2 2.667v10.666C2 14.07 2.597 14.667 3.333 14.667h9.334c.736 0 1.333-.597 1.333-1.334V6L9.333 1.333z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.333 1.333V6h4.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.667 8.667H5.333M10.667 11.333H5.333M6.667 6H5.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Referrals",
    path: "/referrals",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 8.667v4A1.333 1.333 0 0112.667 14H3.333A1.333 1.333 0 012 12.667V3.333A1.333 1.333 0 013.333 2h4M10.667 1.333H14.667V5.333M6.667 9.333L14.667 1.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Sanctions & Compliance",
    path: "/sanctions",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.667" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 5.333V8M8 10.667h.007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Reports & Analytics",
    path: "/reports",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 10.667L10 6.667 6.667 10 2 5.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.667 10.667H14V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-fallback">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="sidebar-brand-text">
          <h3>CampusCare</h3>
          <p>Welfare Management</p>
        </div>
      </div>

      {/* Institution */}
      <div className="sidebar-institution">
        <p className="inst-label">Institution</p>
        <p className="inst-name">National University Dasmariñas</p>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-nav-item${location.pathname === item.path ? " active" : ""}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="sidebar-nav-item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.667" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5.333V8M8 10.667h.007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Settings
        </button>
        <button className="sidebar-nav-item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.667 11.333L14 8l-3.333-3.333M14 8H6M6 14H2.667A1.333 1.333 0 011.333 12.667V3.333A1.333 1.333 0 012.667 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;