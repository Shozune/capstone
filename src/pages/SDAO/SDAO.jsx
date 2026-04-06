import { useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  CalendarRange,
  LayoutDashboard,
  Users,
  UsersRound,
  Sparkles,
} from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import OfficeHeader from "../../components/OfficeHeader/OfficeHeader";
import "../DODashboard/CaseManagementPage.css";
import "../DODashboard/CaseManagementSubpages.css";
import "./SDAO.css";

const SDAO_NOTIFICATIONS = [
  {
    id: "sd-1",
    title: "Org recognition deadline",
    body: "Excellence Awards nominations close Apr 18, 2026.",
    createdAt: "Apr 5, 2026",
    unread: true,
  },
  {
    id: "sd-2",
    title: "Scholar orientation",
    body: "Room assignment confirmed for Block B scholars.",
    createdAt: "Apr 4, 2026",
    unread: true,
  },
  {
    id: "sd-3",
    title: "Partner MOA renewal",
    body: "Community partner agreement auto-renews on Apr 30.",
    createdAt: "Apr 2, 2026",
    unread: false,
  },
];

const PROGRAM_ROWS = [
  { id: "PR-2401", name: "Leadership Lab Series", cohort: "120 students", lead: "SDAO Team", status: "active", window: "Jan–Jun 2026" },
  { id: "PR-2402", name: "Career Jumpstart", cohort: "240 students", lead: "External partner", status: "active", window: "Feb–May 2026" },
  { id: "PR-2398", name: "Service Learning Week", cohort: "Campus-wide", lead: "OSCA liaison", status: "planning", window: "Jul 2026" },
];

const ORG_ROWS = [
  { id: "ORG-118", name: "NU Scholars Guild", members: 86, pres: "A. Mendoza", status: "accredited", category: "Academic" },
  { id: "ORG-119", name: "Campus Creatives", members: 54, pres: "K. Ramos", status: "review", category: "Cultural" },
  { id: "ORG-120", name: "Green Patriots", members: 41, pres: "J. Cruz", status: "accredited", category: "Environmental" },
];

const LEADERSHIP_ROWS = [
  { id: "AW-56", student: "Patricia Go", studentId: "2023-17220", award: "Student Leader of the Month", date: "Mar 2026", status: "published" },
  { id: "AW-55", student: "Diego Ramos", studentId: "2022-14111", award: "Service Excellence", date: "Feb 2026", status: "published" },
  { id: "AW-57", student: "Sofia Torres", studentId: "2023-16002", award: "Org President Merit", date: "Apr 2026", status: "draft" },
];

const SCHOLAR_ROWS = [
  { id: "SC-8801", student: "Ana Reyes", studentId: "2024-20101", program: "Academic Merit", gpa: "3.85", status: "active" },
  { id: "SC-8802", student: "Luis Cruz", studentId: "2023-18765", program: "Leadership Grant", gpa: "3.72", status: "probation" },
  { id: "SC-8803", student: "Mia Santos", studentId: "2024-19820", program: "Service Scholarship", gpa: "3.68", status: "active" },
  { id: "SC-8804", student: "Kenzo Lim", studentId: "2024-20550", program: "Financial Assistance", gpa: "3.54", status: "review" },
];

const ACTIVITY_FEED = [
  { id: "EV-301", title: "Leadership summit — Day 1", date: "Apr 8, 2026", attendees: 180, venue: "Main Hall" },
  { id: "EV-302", title: "Scholar peer mentoring", date: "Apr 9, 2026", attendees: 42, venue: "SDAO Lounge" },
  { id: "EV-303", title: "Org presidents assembly", date: "Apr 11, 2026", attendees: 65, venue: "Room 404" },
];

const iconProps = { size: 16, strokeWidth: 1.5 };

const SDAO_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard {...iconProps} /> },
  { id: "programs", label: "Programs", icon: <Sparkles {...iconProps} /> },
  { id: "organizations", label: "Organizations", icon: <UsersRound {...iconProps} /> },
  { id: "leadership", label: "Leadership & Awards", icon: <Award {...iconProps} /> },
  { id: "scholars", label: "Scholars & Aid", icon: <Users {...iconProps} /> },
  { id: "reports", label: "Reports & Analytics", icon: <BarChart3 {...iconProps} /> },
];

function StatusBadge({ status }) {
  const s = String(status).toLowerCase();
  let variant = "ongoing";
  if (s.includes("planning") || s.includes("review") || s.includes("probation") || s.includes("draft"))
    variant = "pending";
  if (s.includes("active")) variant = "ongoing";
  if (s.includes("accredited") || s.includes("published")) variant = "closed";
  return <span className={`badge badge-${variant}`}>{status}</span>;
}

function SDAO() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [search, setSearch] = useState("");

  const session = useMemo(() => {
    try {
      return JSON.parse(window.localStorage.getItem("campuscare_session_v1") || "null");
    } catch {
      return null;
    }
  }, []);

  const userName = session?.name || "Jamie Del Rosario";
  const userRole = session?.role || "SDAO Coordinator";

  const stats = useMemo(
    () => ({
      programs: PROGRAM_ROWS.filter((p) => p.status === "active").length,
      orgs: ORG_ROWS.filter((o) => o.status === "accredited").length,
      scholars: SCHOLAR_ROWS.filter((s) => s.status === "active").length,
      events: ACTIVITY_FEED.length,
    }),
    [],
  );

  const filteredPrograms = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return PROGRAM_ROWS;
    return PROGRAM_ROWS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.lead.toLowerCase().includes(q),
    );
  }, [search]);

  const renderDashboard = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Student Development &amp; Affairs Office</h1>
          <p>Programs, organizations, leadership, and scholar lifecycle in one workspace</p>
        </div>
        <button type="button" className="btn-new-case sdao-primary-cta">
          <CalendarRange size={16} strokeWidth={1.5} aria-hidden />
          New program event
        </button>
      </div>

      <div className="stats-grid sdao-stats-grid">
        <div className="stat-card">
          <p className="stat-value total">{stats.programs}</p>
          <p className="stat-label">Active programs</p>
        </div>
        <div className="stat-card">
          <p className="stat-value new">{stats.orgs}</p>
          <p className="stat-label">Accredited orgs</p>
        </div>
        <div className="stat-card">
          <p className="stat-value ongoing">{stats.scholars}</p>
          <p className="stat-label">Active scholars</p>
        </div>
        <div className="stat-card">
          <p className="stat-value closed">{stats.events}</p>
          <p className="stat-label">Upcoming milestones</p>
        </div>
      </div>

      <div className="sdao-two-col">
        <div className="cases-panel">
          <div className="cases-panel-header">
            <div className="cases-panel-top">
              <div className="cases-panel-title">
                <CalendarRange size={20} strokeWidth={1.5} aria-hidden />
                Program calendar highlights
              </div>
              <button type="button" className="btn-export">
                Open master calendar
              </button>
            </div>
          </div>
          <div className="cases-table-wrapper">
            <table className="cases-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Attendees</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVITY_FEED.map((row) => (
                  <tr key={row.id}>
                    <td className="cell-case-id">{row.id}</td>
                    <td className="cell-text">{row.title}</td>
                    <td className="cell-date">{row.date}</td>
                    <td className="cell-text">{row.attendees}</td>
                    <td className="cell-text">{row.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sdao-side-stack">
          <div className="sdao-spotlight">
            <p className="sdao-spotlight-label">Student voice</p>
            <h3 className="sdao-spotlight-title">&ldquo;Programs feel coordinated for the first time.&rdquo;</h3>
            <p className="sdao-spotlight-meta">Pulse survey · Mar 2026 · n=412</p>
            <button type="button" className="sdao-ghost-btn">
              View insights
            </button>
          </div>
          <div className="sdao-kpi-card">
            <p className="sdao-kpi-label">Org engagement score</p>
            <p className="sdao-kpi-value">8.4<span className="sdao-kpi-suffix">/10</span></p>
            <p className="sdao-kpi-delta">+0.6 vs. last term</p>
          </div>
        </div>
      </div>

      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-top">
            <div className="cases-panel-title">
              <Sparkles size={20} strokeWidth={1.5} aria-hidden />
              Signature programs
            </div>
          </div>
        </div>
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Program</th>
                <th>Cohort</th>
                <th>Lead</th>
                <th>Window</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PROGRAM_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td className="cell-text">{row.name}</td>
                  <td className="cell-text">{row.cohort}</td>
                  <td className="cell-text">{row.lead}</td>
                  <td className="cell-date">{row.window}</td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderPrograms = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Programs &amp; initiatives</h1>
          <p>Design, deploy, and measure co-curricular learning experiences</p>
        </div>
        <button type="button" className="btn-new-case sdao-primary-cta">
          <Sparkles size={16} strokeWidth={1.5} aria-hidden />
          Launch program
        </button>
      </div>
      <div className="search-bar-wrapper sdao-search">
        <span className="search-icon" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
            <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className="search-input"
          placeholder="Search programs, owners, or codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Program</th>
                <th>Cohort</th>
                <th>Lead</th>
                <th>Window</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td className="cell-text">{row.name}</td>
                  <td className="cell-text">{row.cohort}</td>
                  <td className="cell-text">{row.lead}</td>
                  <td className="cell-date">{row.window}</td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderOrganizations = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Student organizations</h1>
          <p>Accreditation status, leadership rosters, and compliance tracking</p>
        </div>
        <button type="button" className="btn-export">
          Download directory
        </button>
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Org ID</th>
                <th>Name</th>
                <th>Members</th>
                <th>President</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ORG_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td className="cell-text">{row.name}</td>
                  <td className="cell-text">{row.members}</td>
                  <td className="cell-text">{row.pres}</td>
                  <td className="cell-text">{row.category}</td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderLeadership = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Leadership &amp; awards</h1>
          <p>Recognition workflows, publication queue, and nomination intake</p>
        </div>
        <button type="button" className="btn-new-case sdao-primary-cta">
          <Award size={16} strokeWidth={1.5} aria-hidden />
          New nomination
        </button>
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Entry</th>
                <th>Student</th>
                <th>Award</th>
                <th>Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LEADERSHIP_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td>
                    <p className="cell-student-name">{row.student}</p>
                    <p className="cell-student-id">{row.studentId}</p>
                  </td>
                  <td className="cell-text">{row.award}</td>
                  <td className="cell-date">{row.date}</td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderScholars = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Scholars &amp; financial aid</h1>
          <p>Scholar profiles, academic standing, and aid disbursement checkpoints</p>
        </div>
        <button type="button" className="btn-export">
          Generate registrar packet
        </button>
      </div>
      <div className="sdao-banner">
        <strong>Policy reminder:</strong> GPA checks run automatically every term break. Probationary scholars appear in amber status until cleared.
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Scholar ID</th>
                <th>Student</th>
                <th>Program</th>
                <th>GPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SCHOLAR_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td>
                    <p className="cell-student-name">{row.student}</p>
                    <p className="cell-student-id">{row.studentId}</p>
                  </td>
                  <td className="cell-text">{row.program}</td>
                  <td className="cell-text">{row.gpa}</td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderReports = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Reports &amp; analytics</h1>
          <p>Executive summaries for student life outcomes and participation</p>
        </div>
        <button type="button" className="btn-export">
          Export leadership deck
        </button>
      </div>
      <div className="stats-grid sdao-stats-grid">
        <div className="stat-card">
          <p className="stat-value total">18.4k</p>
          <p className="stat-label">Program touchpoints</p>
        </div>
        <div className="stat-card">
          <p className="stat-value new">92%</p>
          <p className="stat-label">Org compliance</p>
        </div>
        <div className="stat-card">
          <p className="stat-value ongoing">640</p>
          <p className="stat-label">Active scholars</p>
        </div>
        <div className="stat-card">
          <p className="stat-value closed">76%</p>
          <p className="stat-label">Retention lift (cohort)</p>
        </div>
      </div>
      <div className="sdao-report-grid">
        <div className="sdao-donut-card">
          <h3 className="sdao-donut-title">Participation mix</h3>
          <div className="sdao-donut" aria-hidden>
            <div className="sdao-donut-inner" />
          </div>
          <ul className="sdao-legend">
            <li>
              <span className="sdao-dot sdao-dot-a" /> Programs
            </li>
            <li>
              <span className="sdao-dot sdao-dot-b" /> Organizations
            </li>
            <li>
              <span className="sdao-dot sdao-dot-c" /> Scholars
            </li>
          </ul>
        </div>
        <div className="cases-panel">
          <div className="cases-panel-header">
            <div className="cases-panel-top">
              <div className="cases-panel-title">Quarterly milestones</div>
            </div>
          </div>
          <div className="cases-table-wrapper">
            <table className="cases-table">
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Owner</th>
                  <th>Target</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cell-text">Org accreditation cycle</td>
                  <td className="cell-text">SDAO</td>
                  <td className="cell-date">May 30, 2026</td>
                  <td className="cell-text">68%</td>
                </tr>
                <tr>
                  <td className="cell-text">Scholar orientation</td>
                  <td className="cell-text">Scholarships unit</td>
                  <td className="cell-date">Apr 20, 2026</td>
                  <td className="cell-text">Ready</td>
                </tr>
                <tr>
                  <td className="cell-text">Leadership awards gala</td>
                  <td className="cell-text">Events team</td>
                  <td className="cell-date">Jun 6, 2026</td>
                  <td className="cell-text">Planning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  const body = (() => {
    switch (activeNav) {
      case "programs":
        return renderPrograms();
      case "organizations":
        return renderOrganizations();
      case "leadership":
        return renderLeadership();
      case "scholars":
        return renderScholars();
      case "reports":
        return renderReports();
      default:
        return renderDashboard();
    }
  })();

  return (
    <div className="dashboard-layout sdao-layout">
      <Sidebar
        departmentTag="Student Development & Affairs"
        navItems={SDAO_NAV_ITEMS}
        activeNavId={activeNav}
        onNavSelect={setActiveNav}
      />
      <div className="dashboard-main">
        <OfficeHeader userName={userName} userRole={userRole} notifications={SDAO_NOTIFICATIONS} />
        <main className="dashboard-content sdao-page">{body}</main>
      </div>
    </div>
  );
}

export default SDAO;
