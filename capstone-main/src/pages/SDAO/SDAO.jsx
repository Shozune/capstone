import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  Award,
  ClipboardCheck,
  Download,
  Eye,
  FileText,
  LayoutDashboard,
  LogOut,
  Send,
  User,
  Users,
} from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import OfficeHeader from "../../components/OfficeHeader/OfficeHeader";
import CCModal from "../../components/common/CCModal";
import { logoutCampusCare } from "../../utils/campusCareAuth";
import "../DODashboard/CaseManagementPage.css";
import "../DODashboard/CaseManagementSubpages.css";
import "./SDAO.css";
import "../HealthServices/HealthServices.css";

const iconProps = { size: 16, strokeWidth: 1.5 };

const PAGE_META = {
  dashboard: {
    title: "SDAO Dashboard",
    subtitle: "Scholarship management overview with reports and analytics",
  },
  scholars: {
    title: "Scholars Management",
    subtitle: "Monitor scholar status, GPA, and compliance across programs",
  },
  scholarshipTypes: {
    title: "Scholarship Types",
    subtitle: "Review and process student scholarship and benefit applications",
  },
  clearance: {
    title: "Clearance Management",
    subtitle: "Monitor and manage student clearance status and requirements",
  },
  docrequests: {
    title: "Document Requests",
    subtitle: "Request and track documents from Admissions Office",
  },
  referrals: {
    title: "Referrals",
    subtitle: "Coordinate referrals with partner offices and programs",
  },
};

const SDAO_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard {...iconProps} /> },
  { id: "scholars", label: "Scholars Management", icon: <Users {...iconProps} /> },
  { id: "scholarshipTypes", label: "Scholarship Types", icon: <Award {...iconProps} /> },
  { id: "clearance", label: "Clearance Management", icon: <ClipboardCheck {...iconProps} /> },
  { id: "docrequests", label: "Document Requests", icon: <FileText {...iconProps} /> },
  { id: "referrals", label: "Referrals", icon: <Send {...iconProps} /> },
];

const SDAO_NOTIFICATIONS = [
  { id: "sd-1", title: "Clearance batch", body: "56 cases pending review this week.", createdAt: "Apr 5, 2026", unread: true },
  { id: "sd-2", title: "Scholar orientation", body: "Room assignment confirmed for Block B.", createdAt: "Apr 4, 2026", unread: true },
  { id: "sd-3", title: "MOA renewal", body: "Partner agreement auto-renews Apr 30.", createdAt: "Apr 2, 2026", unread: false },
];

const DISTRIBUTION = [
  { label: "White Scholarship", count: 412, pct: 33, color: "#2563eb" },
  { label: "Blue Scholarship", count: 358, pct: 28.7, color: "#7c3aed" },
  { label: "UAEB Scholarship", count: 245, pct: 19.6, color: "#16a34a" },
  { label: "SM Scholarship", count: 156, pct: 12.5, color: "#ea580c" },
  { label: "Armed Forces Scholarship", count: 76, pct: 6.1, color: "#dc2626" },
];

const PROGRAMS_COMPACT = [
  { name: "Academic Excellence", scholars: 125, amount: "₱3.5M", pct: 35, bar: "#2563eb" },
  { name: "Leadership Grant", scholars: 98, amount: "₱2.8M", pct: 28, bar: "#7c3aed" },
  { name: "Service Scholarship", scholars: 76, amount: "₱2.1M", pct: 22, bar: "#16a34a" },
];

const TOP_PROGRAMS = [
  { program: "BS Computer Science", count: 45 },
  { program: "BS Engineering", count: 38 },
  { program: "BS Accountancy", count: 32 },
  { program: "BS Psychology", count: 28 },
  { program: "BS Nursing", count: 24 },
];

const SCHOLAR_ROWS = [
  { id: "SC-8801", student: "Maria Santos", studentId: "2023-10234", program: "White Scholarship", gpa: "3.95", status: "active" },
  { id: "SC-8802", student: "Luis Cruz", studentId: "2023-18765", program: "Blue Scholarship", gpa: "3.72", status: "probation" },
  { id: "SC-8803", student: "Ana Reyes", studentId: "2024-20101", program: "UAEB Scholarship", gpa: "3.68", status: "active" },
  { id: "SC-8804", student: "Kenzo Lim", studentId: "2024-20550", program: "SM Scholarship", gpa: "3.54", status: "review" },
];

const SCHOLARSHIP_APPS = [
  {
    student: "Maria Santos",
    sid: "2023-10234",
    degree: "BS Computer Science",
    type: "White Scholarship",
    gpa: "3.95",
    submitted: "Jan 15, 2024",
    status: "validated",
  },
  {
    student: "John Dela Cruz",
    sid: "2024-00124",
    degree: "BS Engineering",
    type: "Blue Scholarship",
    gpa: "3.82",
    submitted: "Jan 18, 2024",
    status: "disbursed",
  },
  {
    student: "Patricia Reyes",
    sid: "2023-10234",
    degree: "BS Nursing",
    type: "Service Scholarship",
    gpa: "3.91",
    submitted: "Jan 20, 2024",
    status: "pending",
  },
];

const CLEARANCE_ROWS = [
  { student: "Maria Santos", sid: "2023-10234", program: "BS Computer Science · Yr 3", scholarship: "White", progress: 100, status: "Completed" },
  { student: "Luis Cruz", sid: "2023-18765", program: "BS Engineering · Yr 2", scholarship: "Blue", progress: 66, status: "Pending" },
  { student: "Ana Reyes", sid: "2024-20101", program: "BS Nursing · Yr 1", scholarship: "UAEB", progress: 45, status: "Incomplete" },
  { student: "Kenzo Lim", sid: "2024-20550", program: "BS CS · Yr 2", scholarship: "SM", progress: 80, status: "Pending" },
  { student: "Sofia Torres", sid: "2023-16002", program: "BS Psych · Yr 4", scholarship: "White", progress: 33, status: "Pending" },
  { student: "Diego Ramos", sid: "2022-14111", program: "BS Acc · Yr 3", scholarship: "AFPS", progress: 100, status: "Completed" },
];

const DOC_REQUESTS = [
  { id: "REQ-SDAO-2024-012", student: "Ana Reyes", sid: "2024-00124", doc: "Transcript of Records", priority: "Normal", status: "Uploaded", date: "Feb 14, 2024" },
  { id: "REQ-SDAO-2024-010", student: "Maria Santos", sid: "2023-10234", doc: "Certificate of Enrollment", priority: "Normal", status: "Received", date: "Feb 12, 2024" },
  { id: "REQ-SDAO-2024-008", student: "Luis Cruz", sid: "2023-18765", doc: "Good Moral Character", priority: "Urgent", status: "Pending", date: "Feb 10, 2024" },
];

const REFERRAL_LIST = [
  { student: "Patricia Go", office: "Guidance Office", reason: "Wellness follow-up after leadership seminar", date: "Apr 2, 2026", by: "Ms. Dorias", status: "In-progress", urgent: false },
  { student: "Jon Villarin", office: "Health Services", reason: "Medical clearance verification", date: "Mar 28, 2026", by: "Ms. Torres", status: "accepted", urgent: false },
  { student: "Kenzo Lim", office: "OSCA", reason: "Org accreditation support", date: "Mar 22, 2026", by: "Ms. Dorias", status: "sent", urgent: false },
  { student: "Sofia Torres", office: "External partner", reason: "Leadership immersion placement", date: "Mar 18, 2026", by: "Ms. Dorias", status: "URGENT", urgent: true },
];

function pillClass(status) {
  const s = String(status).toLowerCase();
  if (s.includes("completed")) return "badge badge-closed";
  if (s.includes("pending")) return "badge badge-ongoing";
  if (s.includes("incomplete")) return "badge badge-pending";
  if (s.includes("probation")) return "badge badge-pending";
  if (s.includes("active")) return "badge badge-closed";
  if (s.includes("review")) return "badge badge-pending";
  if (s.includes("validated")) return "badge badge-closed";
  if (s.includes("disbursed")) return "badge badge-pending";
  if (s.includes("uploaded")) return "badge badge-ongoing";
  if (s.includes("received")) return "badge badge-closed";
  return "badge badge-new";
}

function SDAO() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);

  const session = useMemo(() => {
    try {
      return JSON.parse(window.localStorage.getItem("campuscare_session_v1") || "null");
    } catch {
      return null;
    }
  }, []);

  const userName = session?.name || "Ma. Lourdes Virginia G. Dorias";
  const userRole = session?.role || "Senior Supervisor";

  const meta = PAGE_META[activeNav] ?? PAGE_META.dashboard;

  const confirmLogout = async () => {
    await logoutCampusCare();
    setLogoutOpen(false);
    navigate("/signin");
  };

  const renderDashboard = () => (
    <>
      <div className="sdao-toolbar-right">
        <button type="button" className="sdao-btn-export">
          <Download size={16} strokeWidth={1.5} aria-hidden />
          Export Report
        </button>
      </div>

      <div className="sdao-kpi-row">
        <div className="sdao-kpi-stat">
          <div className="sdao-kpi-stat-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
            <User size={20} strokeWidth={1.5} />
          </div>
          <p className="sdao-kpi-stat-label">Total Active Scholars</p>
          <p className="sdao-kpi-stat-value">1,247</p>
          <p className="sdao-kpi-stat-sub">+8.2% from last semester</p>
        </div>
        <div className="sdao-kpi-stat">
          <div className="sdao-kpi-stat-icon" style={{ background: "#fff7ed", color: "#ea580c" }}>
            <AlertTriangle size={20} strokeWidth={1.5} />
          </div>
          <p className="sdao-kpi-stat-label">Scholars Under Probation</p>
          <p className="sdao-kpi-stat-value">23</p>
          <p className="sdao-kpi-stat-sub">Requires monitoring</p>
        </div>
        <div className="sdao-kpi-stat">
          <div className="sdao-kpi-stat-icon" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
            <ClipboardCheck size={20} strokeWidth={1.5} />
          </div>
          <p className="sdao-kpi-stat-label">Pending Clearance Cases</p>
          <p className="sdao-kpi-stat-value">56</p>
          <p className="sdao-kpi-stat-sub">12 urgent</p>
        </div>
        <div className="sdao-kpi-stat">
          <div className="sdao-kpi-stat-icon" style={{ background: "#fef2f2", color: "#dc2626" }}>
            <FileText size={20} strokeWidth={1.5} />
          </div>
          <p className="sdao-kpi-stat-label">Missing Requirements</p>
          <p className="sdao-kpi-stat-value">89</p>
          <p className="sdao-kpi-stat-sub">Action needed</p>
        </div>
      </div>

      <div className="sdao-distribution-card">
        <div className="sdao-distribution-head">
          <div>
            <h2 className="sdao-distribution-title">
              <Award size={18} strokeWidth={1.5} aria-hidden />
              Scholarship Distribution by Type
            </h2>
            <p className="sdao-distribution-sub">Current semester enrollment breakdown — Total: 1,247 scholars</p>
          </div>
        </div>
        {DISTRIBUTION.map((d) => (
          <div key={d.label} className="sdao-bar-row">
            <span className="sdao-bar-label">{d.label}</span>
            <div className="sdao-bar-track">
              <div className="sdao-bar-fill" style={{ width: `${d.pct}%`, background: d.color }} />
            </div>
            <span className="sdao-bar-meta">
              {d.count} ({d.pct}%)
            </span>
          </div>
        ))}
      </div>

      <div className="sdao-mid-grid">
        <div className="cases-panel">
          <div className="cases-panel-header">
            <div className="cases-panel-title">Scholarship Programs</div>
          </div>
          <div className="cases-table-wrapper">
            <ul className="sdao-program-list">
              {PROGRAMS_COMPACT.map((p) => (
                <li key={p.name}>
                  <span>
                    <strong>{p.name}</strong>
                    <span style={{ color: "#9ca3af" }}>
                      {" "}
                      · {p.scholars} scholars · {p.amount}
                    </span>
                  </span>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "#f3f4f6",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {p.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cases-panel">
          <div className="cases-panel-header">
            <div className="cases-panel-title">Top Performing Programs</div>
          </div>
          <div className="cases-table-wrapper">
            <ul className="sdao-program-list">
              {TOP_PROGRAMS.map((p) => (
                <li key={p.program}>
                  <span>{p.program}</span>
                  <strong>{p.count} scholars</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Scholarship Performance Metrics</div>
        </div>
        <div className="cases-table-wrapper">
          <div className="sdao-metrics-row">
            <div className="sdao-metric-card">
              <p className="sdao-metric-label">Average GPA of Scholars</p>
              <p className="sdao-metric-value">3.78</p>
              <p className="sdao-metric-trend">↑ 0.12 from last semester</p>
            </div>
            <div className="sdao-metric-card">
              <p className="sdao-metric-label">Scholarship Retention Rate</p>
              <p className="sdao-metric-value">94%</p>
              <p className="sdao-metric-trend">↑ 2% improvement</p>
            </div>
            <div className="sdao-metric-card">
              <p className="sdao-metric-label">Application Approval Rate</p>
              <p className="sdao-metric-value">68%</p>
              <p className="sdao-metric-muted">124 of 182 applications</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderScholars = () => (
    <>
      <div className="search-bar-wrapper" style={{ maxWidth: 480, marginBottom: 20 }}>
        <span className="search-icon" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
            <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className="search-input"
          placeholder="Search scholars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Active Scholars</div>
        </div>
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Scholarship</th>
                <th>GPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SCHOLAR_ROWS.filter(
                (r) =>
                  !search ||
                  r.student.toLowerCase().includes(search.toLowerCase()) ||
                  r.studentId.includes(search),
              ).map((r) => (
                <tr key={r.id}>
                  <td className="cell-case-id">{r.id}</td>
                  <td>
                    <p className="cell-student-name">{r.student}</p>
                    <p className="cell-student-id">{r.studentId}</p>
                  </td>
                  <td className="cell-text" style={{ color: "#2563eb", fontWeight: 500 }}>
                    {r.program}
                  </td>
                  <td className="cell-text">{r.gpa}</td>
                  <td>
                    <span className={pillClass(r.status)}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderScholarshipTypes = () => (
    <>
      <div className="sdao-type-stat-row">
        <div className="sdao-type-stat">
          <p className="sdao-type-stat-label">Pending Review</p>
          <p className="sdao-type-stat-value">0</p>
          <p className="sdao-type-stat-hint">Awaiting validation</p>
        </div>
        <div className="sdao-type-stat sdao-type-stat--validated">
          <p className="sdao-type-stat-label">Validated</p>
          <p className="sdao-type-stat-value">4</p>
          <p className="sdao-type-stat-hint">Ready for next step</p>
        </div>
        <div className="sdao-type-stat sdao-type-stat--declined">
          <p className="sdao-type-stat-label">Declined</p>
          <p className="sdao-type-stat-value">0</p>
          <p className="sdao-type-stat-hint">Requires resubmission</p>
        </div>
        <div className="sdao-type-stat sdao-type-stat--disbursed">
          <p className="sdao-type-stat-label">Disbursed</p>
          <p className="sdao-type-stat-value">3</p>
          <p className="sdao-type-stat-hint">Completed cycle</p>
        </div>
      </div>
      <div className="hs-filter-card" style={{ marginBottom: 20 }}>
        <div className="search-bar-wrapper" style={{ marginBottom: 0, flex: 1 }}>
          <span className="search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
              <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            className="search-input"
            placeholder="Search by student name, ID, or scholarship type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" className="btn-export">
          Filters
        </button>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Scholarship Applications</div>
        </div>
        <div className="cases-table-wrapper">
          {SCHOLARSHIP_APPS.filter(
            (a) =>
              !search ||
              a.student.toLowerCase().includes(search.toLowerCase()) ||
              a.type.toLowerCase().includes(search.toLowerCase()),
          ).map((a) => (
            <div key={a.sid + a.submitted} className="sdao-app-card">
              <div className="sdao-app-head">
                <p className="sdao-app-name">{a.student}</p>
                <span className={pillClass(a.status)} style={{ textTransform: "capitalize" }}>
                  {a.status}
                </span>
              </div>
              <p className="sdao-app-meta">
                ID: {a.sid} · {a.degree}
              </p>
              <div className="sdao-app-grid">
                <span style={{ color: "#2563eb", fontWeight: 600 }}>{a.type}</span>
                <span>GPA {a.gpa}</span>
                <span className="cell-date">{a.submitted}</span>
                <button type="button" className="hs-link-action" style={{ color: "#2563eb" }}>
                  <Eye size={14} strokeWidth={1.5} aria-hidden />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderClearance = () => (
    <>
      <div className="hs-filter-card" style={{ marginBottom: 20 }}>
        <div className="search-bar-wrapper" style={{ marginBottom: 0, flex: 1 }}>
          <span className="search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
              <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input className="search-input" placeholder="Search by student name, ID, or program..." />
        </div>
        <select className="hs-select" defaultValue="all">
          <option value="all">All Status</option>
        </select>
        <button type="button" className="btn-export" aria-label="Download">
          <Download size={16} strokeWidth={1.5} />
        </button>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Student Clearance Status</div>
          <div className="hs-banner-warn" style={{ marginTop: 8 }}>
            Confidential — handle with discretion
          </div>
        </div>
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Program &amp; Year</th>
                <th>Scholarship</th>
                <th>Completion</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {CLEARANCE_ROWS.map((r) => (
                <tr key={r.sid}>
                  <td>
                    <p className="cell-student-name">{r.student}</p>
                    <p className="cell-student-id">{r.sid}</p>
                  </td>
                  <td className="cell-text">{r.program}</td>
                  <td className="cell-text">{r.scholarship}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="sdao-clear-bar" style={{ flex: 1, maxWidth: 120 }}>
                        <div
                          className="sdao-clear-fill"
                          style={{
                            width: `${r.progress}%`,
                            background:
                              r.progress === 100 ? "#16a34a" : r.progress >= 60 ? "#2563eb" : "#ea580c",
                          }}
                        />
                      </div>
                      <span className="cell-text">{r.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={pillClass(r.status)}>{r.status}</span>
                  </td>
                  <td>
                    <button type="button" className="hs-link-action" style={{ color: "#2563eb" }}>
                      <Eye size={14} strokeWidth={1.5} aria-hidden />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="hs-stat-meta" style={{ padding: "12px 0 0", margin: 0 }}>
            Showing {CLEARANCE_ROWS.length} of {CLEARANCE_ROWS.length} students
          </p>
        </div>
      </div>
    </>
  );

  const renderDocRequests = () => (
    <>
      <div className="sdao-toolbar-right">
        <button type="button" className="cc-btn-primary">
          <FileText size={16} strokeWidth={1.5} aria-hidden />+ New Request
        </button>
      </div>
      <div className="sdao-doc-stat-row">
        <div className="sdao-doc-stat sdao-doc-stat--total">
          <p className="sdao-type-stat-value">5</p>
          <p className="sdao-type-stat-label">Total Requests</p>
          <p className="sdao-type-stat-hint">All time</p>
        </div>
        <div className="sdao-doc-stat sdao-doc-stat--pending">
          <p className="sdao-type-stat-value">1</p>
          <p className="sdao-type-stat-label">Pending</p>
          <p className="sdao-type-stat-hint">Awaiting Admissions</p>
        </div>
        <div className="sdao-doc-stat sdao-doc-stat--uploaded">
          <p className="sdao-type-stat-value">1</p>
          <p className="sdao-type-stat-label">Uploaded</p>
          <p className="sdao-type-stat-hint">Ready to receive</p>
        </div>
        <div className="sdao-doc-stat sdao-doc-stat--received">
          <p className="sdao-type-stat-value">3</p>
          <p className="sdao-type-stat-label">Received</p>
          <p className="sdao-type-stat-hint">Completed</p>
        </div>
      </div>
      <div className="hs-filter-card">
        <div className="search-bar-wrapper" style={{ marginBottom: 0, flex: 1 }}>
          <span className="search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
              <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input className="search-input" placeholder="Search by student, ID, or document type..." />
        </div>
        <select className="hs-select" defaultValue="all">
          <option value="all">All Status</option>
        </select>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">My Document Requests</div>
          <p className="hs-list-sub">Track status of document requests sent to Admissions</p>
        </div>
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Student</th>
                <th>Document</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {DOC_REQUESTS.map((d) => (
                <tr key={d.id}>
                  <td className="cell-case-id">{d.id}</td>
                  <td>
                    <p className="cell-student-name">{d.student}</p>
                    <p className="cell-student-id">{d.sid}</p>
                  </td>
                  <td className="cell-text">{d.doc}</td>
                  <td>
                    <span className={pillClass(d.priority === "Urgent" ? "pending" : "new")}>{d.priority}</span>
                  </td>
                  <td>
                    <span className={pillClass(d.status)}>{d.status}</span>
                  </td>
                  <td className="cell-date">{d.date}</td>
                  <td>
                    <button type="button" className="hs-link-action" style={{ color: "#2563eb" }}>
                      <Eye size={14} strokeWidth={1.5} aria-hidden />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderReferrals = () => (
    <>
      <div className="sdao-toolbar-right">
        <button type="button" className="sdao-btn-purple">
          <Send size={16} strokeWidth={1.5} aria-hidden />+ Create Referral
        </button>
      </div>
      <div className="hs-ref-stat-row">
        {[
          { icon: Send, label: "Sent (Pending)", value: "5" },
          { icon: Activity, label: "In Progress", value: "8" },
          { icon: FileText, label: "Completed", value: "42" },
          { icon: AlertTriangle, label: "Urgent Case", value: "1" },
        ].map((s) => (
          <div key={s.label} className="hs-ref-stat">
            <div className="hs-ref-stat-icon" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
              <s.icon size={18} strokeWidth={1.5} />
            </div>
            <div>
              <p className="hs-ref-stat-value">{s.value}</p>
              <p className="hs-ref-stat-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hs-filter-card">
        <div className="search-bar-wrapper" style={{ marginBottom: 0, flex: 1 }}>
          <span className="search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
              <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input className="search-input" placeholder="Search by student name..." />
        </div>
        <select className="hs-select" defaultValue="all">
          <option value="all">All Status</option>
        </select>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">All Referrals ({REFERRAL_LIST.length})</div>
        </div>
        <div className="cases-table-wrapper">
          {REFERRAL_LIST.map((r) => (
            <div key={r.student + r.date} className="hs-consult-row">
              <div>
                <p className="hs-consult-name">{r.student}</p>
                <p className="hs-consult-meta">{r.office}</p>
                <div className="hs-consult-badges" style={{ marginTop: 8 }}>
                  {r.urgent ? <span className="hs-badge-urgent">URGENT</span> : null}
                  <span className="hs-pill hs-pill-scheduled">{r.status}</span>
                </div>
              </div>
              <div>
                <p className="hs-consult-meta">{r.reason}</p>
                <p className="hs-consult-meta">
                  {r.date} · {r.by}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <button type="button" className="hs-link-action" style={{ color: "#7c3aed" }}>
                  <Eye size={14} strokeWidth={1.5} aria-hidden />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const body = (() => {
    switch (activeNav) {
      case "scholars":
        return renderScholars();
      case "scholarshipTypes":
        return renderScholarshipTypes();
      case "clearance":
        return renderClearance();
      case "docrequests":
        return renderDocRequests();
      case "referrals":
        return renderReferrals();
      default:
        return renderDashboard();
    }
  })();

  return (
    <div className="dashboard-layout sdao-layout">
      <Sidebar
        departmentTag="Scholarship Management"
        navItems={SDAO_NAV_ITEMS}
        activeNavId={activeNav}
        onNavSelect={setActiveNav}
        onLogoutRequest={() => setLogoutOpen(true)}
      />
      <div className="dashboard-main">
        <OfficeHeader
          pageTitle={meta.title}
          pageSubtitle={meta.subtitle}
          userName={userName}
          userRole={userRole}
          notifications={SDAO_NOTIFICATIONS}
        />
        <main className="dashboard-content sdao-page">{body}</main>
      </div>

      <CCModal open={logoutOpen} title="Logout" onClose={() => setLogoutOpen(false)} centered showHeader={false}>
        <div className="cc-modal-body" style={{ padding: "24px 28px 20px" }}>
          <div className="hs-logout-icon-wrap">
            <LogOut size={22} strokeWidth={1.5} aria-hidden />
          </div>
          <h2 className="hs-logout-title">Logout Confirmation</h2>
          <p className="hs-logout-text">Are you sure you want to logout? Any unsaved changes will be lost.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button type="button" className="cc-btn-secondary" onClick={() => setLogoutOpen(false)}>
              Cancel
            </button>
            <button type="button" className="hs-btn-navy" onClick={confirmLogout}>
              Yes, Logout
            </button>
          </div>
        </div>
      </CCModal>
    </div>
  );
}

export default SDAO;
