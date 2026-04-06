import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileHeart,
  Stethoscope,
  Syringe,
  UserPlus,
} from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import OfficeHeader from "../../components/OfficeHeader/OfficeHeader";
import "../DODashboard/CaseManagementPage.css";
import "../DODashboard/CaseManagementSubpages.css";
import "./HealthServices.css";

const HS_NOTIFICATIONS = [
  {
    id: "hs-1",
    title: "Medical clearance due",
    body: "12 students need PE clearance before Mar 15 enrollment.",
    createdAt: "Apr 4, 2026",
    unread: true,
  },
  {
    id: "hs-2",
    title: "Vaccination batch ready",
    body: "Influenza vaccines for Block B arrived at the clinic.",
    createdAt: "Apr 5, 2026",
    unread: true,
  },
  {
    id: "hs-3",
    title: "Referral acknowledged",
    body: "Guidance office confirmed receipt of HS-REF-2026-014.",
    createdAt: "Apr 5, 2026",
    unread: false,
  },
];

const TODAY_APPOINTMENTS = [
  { id: "A-901", student: "Ana Reyes", studentId: "2024-20101", time: "9:00 AM", reason: "Annual PE", status: "checked-in" },
  { id: "A-902", student: "Luis Cruz", studentId: "2023-18765", time: "9:30 AM", reason: "Follow-up", status: "scheduled" },
  { id: "A-903", student: "Mia Santos", studentId: "2024-19820", time: "10:15 AM", reason: "Illness", status: "scheduled" },
  { id: "A-904", student: "Jon Villarin", studentId: "2022-15440", time: "11:00 AM", reason: "Clearance", status: "completed" },
];

const MEDICAL_RECORDS = [
  { id: "MR-4401", student: "Ana Reyes", studentId: "2024-20101", lastVisit: "Apr 5, 2026", category: "PE & Vitals", nurse: "R.N. Dela Cruz" },
  { id: "MR-4402", student: "Luis Cruz", studentId: "2023-18765", lastVisit: "Apr 3, 2026", category: "Consultation", nurse: "R.N. Ramos" },
  { id: "MR-4403", student: "Mia Santos", studentId: "2024-19820", lastVisit: "Mar 28, 2026", category: "Immunization", nurse: "R.N. Dela Cruz" },
  { id: "MR-4404", student: "Patricia Go", studentId: "2023-17220", lastVisit: "Mar 20, 2026", category: "Dental referral", nurse: "R.N. Ramos" },
];

const CLEARANCE_ROWS = [
  { id: "CL-120", student: "Kenzo Lim", studentId: "2024-20550", type: "Medical", due: "Apr 12, 2026", status: "pending" },
  { id: "CL-121", student: "Sofia Torres", studentId: "2023-16002", type: "PE Uniform", due: "Apr 10, 2026", status: "submitted" },
  { id: "CL-122", student: "Diego Ramos", studentId: "2022-14111", type: "Sports waiver", due: "Apr 8, 2026", status: "approved" },
];

const REFERRAL_ROWS = [
  { id: "HS-REF-2026-014", student: "Mia Santos", to: "Guidance Office", reason: "Stress-related symptoms", date: "Apr 4, 2026", status: "sent" },
  { id: "HS-REF-2026-011", student: "Jon Villarin", to: "External clinic", reason: "Specialist consult", date: "Apr 1, 2026", status: "acknowledged" },
  { id: "HS-REF-2026-009", student: "Patricia Go", to: "Dental partner", reason: "Routine dental", date: "Mar 27, 2026", status: "closed" },
];

const INVENTORY_SNAPSHOT = [
  { item: "Surgical masks (box)", qty: 48, threshold: 20, status: "ok" },
  { item: "Alcohol 500ml", qty: 14, threshold: 24, status: "low" },
  { item: "Digital thermometers", qty: 9, threshold: 6, status: "ok" },
  { item: "First aid kits", qty: 5, threshold: 4, status: "ok" },
];

const iconProps = { size: 16, strokeWidth: 1.5 };

const HEALTH_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <Activity {...iconProps} /> },
  { id: "appointments", label: "Appointments", icon: <CalendarDays {...iconProps} /> },
  { id: "records", label: "Medical Records", icon: <FileHeart {...iconProps} /> },
  { id: "clearances", label: "Clearances & PE", icon: <ClipboardList {...iconProps} /> },
  { id: "referrals", label: "Referrals", icon: <UserPlus {...iconProps} /> },
  { id: "reports", label: "Reports & Analytics", icon: <BarChart3 {...iconProps} /> },
];

function StatusBadge({ status }) {
  const s = String(status).toLowerCase();
  let variant = "ongoing";
  if (s.includes("scheduled") || s.includes("submitted") || s.includes("pending") || s.includes("low"))
    variant = "pending";
  if (s.includes("checked")) variant = "ongoing";
  if (s.includes("completed") || s.includes("approved") || s.includes("closed") || s.includes("healthy"))
    variant = "closed";
  if (s.includes("sent")) variant = "new";
  if (s.includes("acknowledged")) variant = "ongoing";
  return <span className={`badge badge-${variant}`}>{status}</span>;
}

function HealthServices() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [search, setSearch] = useState("");

  const session = useMemo(() => {
    try {
      return JSON.parse(window.localStorage.getItem("campuscare_session_v1") || "null");
    } catch {
      return null;
    }
  }, []);

  const userName = session?.name || "Dr. Maria Santos";
  const userRole = session?.role || "Health Services Officer";

  const stats = useMemo(
    () => ({
      today: TODAY_APPOINTMENTS.length,
      pendingClearance: CLEARANCE_ROWS.filter((r) => r.status === "pending").length,
      referralsOpen: REFERRAL_ROWS.filter((r) => r.status !== "closed").length,
      immunizationRate: 94,
    }),
    [],
  );

  const filteredRecords = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return MEDICAL_RECORDS;
    return MEDICAL_RECORDS.filter(
      (r) =>
        r.student.toLowerCase().includes(q) ||
        r.studentId.includes(q) ||
        r.id.toLowerCase().includes(q),
    );
  }, [search]);

  const renderDashboard = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Health Services Office</h1>
          <p>Clinical operations, clearances, and student wellness coordination</p>
        </div>
        <button type="button" className="btn-new-case hs-primary-cta">
          <Stethoscope size={16} strokeWidth={1.5} aria-hidden />
          New walk-in visit
        </button>
      </div>

      <div className="stats-grid hs-stats-grid">
        <div className="stat-card">
          <p className="stat-value total">{stats.today}</p>
          <p className="stat-label">Today&apos;s queue</p>
        </div>
        <div className="stat-card">
          <p className="stat-value new">{stats.pendingClearance}</p>
          <p className="stat-label">Pending clearances</p>
        </div>
        <div className="stat-card">
          <p className="stat-value ongoing">{stats.referralsOpen}</p>
          <p className="stat-label">Open referrals</p>
        </div>
        <div className="stat-card">
          <p className="stat-value closed">{stats.immunizationRate}%</p>
          <p className="stat-label">Immunization compliance</p>
        </div>
      </div>

      <div className="hs-two-col">
        <div className="cases-panel hs-panel">
          <div className="cases-panel-header">
            <div className="cases-panel-top">
              <div className="cases-panel-title">
                <CalendarDays size={20} strokeWidth={1.5} aria-hidden />
                Today&apos;s appointments
              </div>
              <button type="button" className="btn-export">
                View full schedule
              </button>
            </div>
            <p className="hs-panel-sub">Front desk queue and clinic room assignments</p>
          </div>
          <div className="cases-table-wrapper">
            <table className="cases-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {TODAY_APPOINTMENTS.map((row) => (
                  <tr key={row.id}>
                    <td className="cell-case-id">{row.id}</td>
                    <td>
                      <p className="cell-student-name">{row.student}</p>
                      <p className="cell-student-id">{row.studentId}</p>
                    </td>
                    <td className="cell-date">{row.time}</td>
                    <td className="cell-text">{row.reason}</td>
                    <td>
                      <StatusBadge status={row.status.replace("-", " ")} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="hs-side-stack">
          <div className="hs-mini-card">
            <div className="hs-mini-title">
              <Syringe size={18} strokeWidth={1.5} aria-hidden />
              Immunization drive
            </div>
            <p className="hs-mini-body">Block scheduling for Apr 12–14. 186 students pre-registered.</p>
            <button type="button" className="hs-link-btn">
              Open roster
            </button>
          </div>
          <div className="hs-mini-card">
            <div className="hs-mini-title">
              <Activity size={18} strokeWidth={1.5} aria-hidden />
              Clinic capacity
            </div>
            <div className="hs-capacity-bar">
              <div className="hs-capacity-fill" style={{ width: "68%" }} />
            </div>
            <p className="hs-mini-meta">68% utilized · 3 bays available</p>
          </div>
        </div>
      </div>

      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-top">
            <div className="cases-panel-title">
              <ClipboardList size={20} strokeWidth={1.5} aria-hidden />
              Clearance pipeline
            </div>
          </div>
        </div>
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Student</th>
                <th>Type</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {CLEARANCE_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td>
                    <p className="cell-student-name">{row.student}</p>
                    <p className="cell-student-id">{row.studentId}</p>
                  </td>
                  <td className="cell-text">{row.type}</td>
                  <td className="cell-date">{row.due}</td>
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

  const renderAppointments = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Appointments &amp; walk-ins</h1>
          <p>Schedule management, room assignment, and visit documentation</p>
        </div>
        <button type="button" className="btn-new-case hs-primary-cta">
          <CalendarDays size={16} strokeWidth={1.5} aria-hidden />
          Schedule slot
        </button>
      </div>
      <div className="hs-toolbar">
        <div className="search-bar-wrapper hs-search">
          <span className="search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
              <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            className="search-input"
            placeholder="Search student name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="hs-chip-row">
          <button type="button" className="hs-chip hs-chip-active">
            Today
          </button>
          <button type="button" className="hs-chip">
            This week
          </button>
          <button type="button" className="hs-chip">
            Walk-ins only
          </button>
        </div>
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {TODAY_APPOINTMENTS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td>
                    <p className="cell-student-name">{row.student}</p>
                    <p className="cell-student-id">{row.studentId}</p>
                  </td>
                  <td className="cell-date">{row.time}</td>
                  <td className="cell-text">{row.reason}</td>
                  <td>
                    <StatusBadge status={row.status.replace("-", " ")} />
                  </td>
                  <td>
                    <button type="button" className="hs-table-action">
                      Open chart
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

  const renderRecords = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Medical records</h1>
          <p>Visit history, vitals, and confidential clinical notes (UI preview)</p>
        </div>
        <button type="button" className="btn-export">
          Export summary (CSV)
        </button>
      </div>
      <div className="search-bar-wrapper hs-search-wide">
        <span className="search-icon" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
            <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className="search-input"
          placeholder="Search by student, ID, or record number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Record</th>
                <th>Student</th>
                <th>Last visit</th>
                <th>Category</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td>
                    <p className="cell-student-name">{row.student}</p>
                    <p className="cell-student-id">{row.studentId}</p>
                  </td>
                  <td className="cell-date">{row.lastVisit}</td>
                  <td className="cell-text">{row.category}</td>
                  <td className="cell-text">{row.nurse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderClearances = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Clearances &amp; PE</h1>
          <p>Enrollment medical requirements, PE uniforms, and sports waivers</p>
        </div>
        <button type="button" className="btn-new-case hs-primary-cta">
          <ClipboardList size={16} strokeWidth={1.5} aria-hidden />
          New clearance request
        </button>
      </div>
      <div className="hs-alert-banner">
        <strong>Registrar sync:</strong> Medical holds refresh every night at 11:00 PM. Manual overrides require dual sign-off.
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Student</th>
                <th>Type</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {CLEARANCE_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td>
                    <p className="cell-student-name">{row.student}</p>
                    <p className="cell-student-id">{row.studentId}</p>
                  </td>
                  <td className="cell-text">{row.type}</td>
                  <td className="cell-date">{row.due}</td>
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

  const renderReferrals = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Referrals</h1>
          <p>Inter-office and external referrals with acknowledgement tracking</p>
        </div>
        <button type="button" className="btn-new-case hs-primary-cta">
          <UserPlus size={16} strokeWidth={1.5} aria-hidden />
          Create referral
        </button>
      </div>
      <div className="cases-panel">
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Referral ID</th>
                <th>Student</th>
                <th>Destination</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {REFERRAL_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="cell-case-id">{row.id}</td>
                  <td className="cell-text">{row.student}</td>
                  <td className="cell-text">{row.to}</td>
                  <td className="cell-text">{row.reason}</td>
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

  const renderReports = () => (
    <>
      <div className="page-title-row">
        <div>
          <h1>Reports &amp; analytics</h1>
          <p>Utilization, compliance, and inventory snapshots for leadership review</p>
        </div>
        <button type="button" className="btn-export">
          Download monthly pack
        </button>
      </div>
      <div className="stats-grid hs-stats-grid">
        <div className="stat-card">
          <p className="stat-value total">1,248</p>
          <p className="stat-label">Visits YTD</p>
        </div>
        <div className="stat-card">
          <p className="stat-value new">312</p>
          <p className="stat-label">Walk-ins</p>
        </div>
        <div className="stat-card">
          <p className="stat-value ongoing">4.6</p>
          <p className="stat-label">Avg. wait (min)</p>
        </div>
        <div className="stat-card">
          <p className="stat-value closed">99.1%</p>
          <p className="stat-label">Chart completion</p>
        </div>
      </div>
      <div className="hs-two-col">
        <div className="hs-chart-card">
          <h3 className="hs-chart-title">Visit volume (mock)</h3>
          <div className="hs-bars" aria-hidden>
            {[40, 62, 48, 70, 55, 80, 66].map((h, i) => (
              <div key={i} className="hs-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="hs-chart-caption">Last 7 clinic days · Mon → Sun</p>
        </div>
        <div className="cases-panel hs-panel">
          <div className="cases-panel-header">
            <div className="cases-panel-top">
              <div className="cases-panel-title">Inventory watchlist</div>
            </div>
          </div>
          <div className="cases-table-wrapper">
            <table className="cases-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>On hand</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY_SNAPSHOT.map((row) => (
                  <tr key={row.item}>
                    <td className="cell-text">{row.item}</td>
                    <td className="cell-text">{row.qty}</td>
                    <td className="cell-text">{row.threshold}</td>
                    <td>
                      <StatusBadge status={row.status === "low" ? "low stock" : "healthy"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  const body = (() => {
    switch (activeNav) {
      case "appointments":
        return renderAppointments();
      case "records":
        return renderRecords();
      case "clearances":
        return renderClearances();
      case "referrals":
        return renderReferrals();
      case "reports":
        return renderReports();
      default:
        return renderDashboard();
    }
  })();

  return (
    <div className="dashboard-layout health-services-layout">
      <Sidebar
        departmentTag="Health Services Office"
        navItems={HEALTH_NAV_ITEMS}
        activeNavId={activeNav}
        onNavSelect={setActiveNav}
      />
      <div className="dashboard-main">
        <OfficeHeader userName={userName} userRole={userRole} notifications={HS_NOTIFICATIONS} />
        <main className="dashboard-content hs-page">{body}</main>
      </div>
    </div>
  );
}

export default HealthServices;
