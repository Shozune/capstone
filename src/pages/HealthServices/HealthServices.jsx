import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  BarChart3,
  CalendarDays,
  Clock,
  Download,
  Eye,
  FileText,
  FileHeart,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Printer,
  Send,
  Sparkles,
  Stethoscope,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import OfficeHeader from "../../components/OfficeHeader/OfficeHeader";
import CCModal from "../../components/common/CCModal";
import "../DODashboard/CaseManagementPage.css";
import "../DODashboard/CaseManagementSubpages.css";
import "./HealthServices.css";

const iconProps = { size: 16, strokeWidth: 1.5 };

const PAGE_META = {
  dashboard: {
    title: "Health Services",
    subtitle: "Monitor student health visits, appointments, and inter-office referrals",
  },
  visits: {
    title: "Student Visits",
    subtitle: "Record and manage student health consultations and medical visits",
  },
  records: {
    title: "Health Records",
    subtitle: "Manage student medical records and health information",
  },
  appointments: {
    title: "Appointments",
    subtitle: "Medical appointments and schedules",
  },
  referrals: {
    title: "Referrals",
    subtitle: "Create and track referrals to other offices and external partners",
  },
  docrequests: {
    title: "Document Requests",
    subtitle: "Request and track documents from Admissions Office",
  },
  reports: {
    title: "Reports & Analytics",
    subtitle: "Health services statistics, metrics, and insights",
  },
  settings: {
    title: "Profile & Settings",
    subtitle: "Manage your account information and preferences",
  },
};

const HEALTH_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard {...iconProps} /> },
  { id: "visits", label: "Student Visits", icon: <Stethoscope {...iconProps} /> },
  { id: "records", label: "Medical Records", icon: <FileHeart {...iconProps} /> },
  { id: "appointments", label: "Appointments", icon: <CalendarDays {...iconProps} /> },
  { id: "referrals", label: "Referrals", icon: <UserPlus {...iconProps} /> },
  { id: "docrequests", label: "Document Requests", icon: <FileText {...iconProps} /> },
  { id: "reports", label: "Reports & Analytics", icon: <BarChart3 {...iconProps} /> },
];

const HS_NOTIFICATIONS = [
  { id: "hs-1", title: "Medical clearance due", body: "12 students need PE clearance before enrollment.", createdAt: "Apr 4, 2026", unread: true },
  { id: "hs-2", title: "Vaccination batch ready", body: "Influenza vaccines arrived at the clinic.", createdAt: "Apr 5, 2026", unread: true },
  { id: "hs-3", title: "Referral acknowledged", body: "Guidance confirmed HS-REF-2026-014.", createdAt: "Apr 5, 2026", unread: false },
];

const RECENT_CONSULTATIONS = [
  { name: "Maria Santos", time: "9:15 AM", reason: "General checkup", status: "Completed" },
  { name: "John Dela Cruz", time: "10:00 AM", reason: "Follow-up consultation", status: "Ongoing" },
  { name: "Anna Reyes", time: "10:30 AM", reason: "Vaccination", status: "Waiting" },
  { name: "Carlos Gomez", time: "11:00 AM", reason: "Annual physical exam", status: "Scheduled" },
];

const URGENT_CASES = [
  { student: "Kenzo Lim", desc: "Elevated temperature — observation recommended", ago: "2 hours ago" },
  { student: "Sofia Torres", desc: "Reported severe headache and dizziness", ago: "4 hours ago" },
];

const VISIT_CONSULTATIONS = [
  {
    id: "CONS-2024-001",
    student: "Maria Santos",
    studentId: "2023-10234",
    type: "Walk-in",
    followup: true,
    reason: "General checkup",
    date: "Apr 6, 2026",
    time: "9:15 AM",
    doctor: "Dr. Emma Santos",
    status: "completed",
  },
  {
    id: "CONS-2024-002",
    student: "John Dela Cruz",
    studentId: "2024-20101",
    type: "Scheduled",
    followup: false,
    reason: "Follow-up vitals",
    date: "Apr 6, 2026",
    time: "10:00 AM",
    doctor: "Dr. Emma Santos",
    status: "ongoing",
  },
  {
    id: "CONS-2024-003",
    student: "Patricia Reyes",
    studentId: "2023-10234",
    type: "Scheduled",
    followup: true,
    reason: "Immunization record review",
    date: "Apr 6, 2026",
    time: "10:45 AM",
    doctor: "Nurse Pielago",
    status: "scheduled",
  },
  {
    id: "CONS-2024-004",
    student: "Luis Cruz",
    studentId: "2023-18765",
    type: "Walk-in",
    followup: false,
    reason: "Minor injury dressing",
    date: "Apr 5, 2026",
    time: "3:20 PM",
    doctor: "Dr. Ramos",
    status: "completed",
  },
];

const HEALTH_RECORDS_ROWS = [
  {
    id: "HR-PR-01",
    student: "Patricia Reyes",
    studentId: "2023-10234",
    program: "BS Nursing",
    blood: "O+",
    allergies: "None",
    last: "Jan 10, 2024",
    badges: ["cleared", "Vaccinated"],
  },
  {
    id: "HR-MS-02",
    student: "Maria Santos",
    studentId: "2024-00156",
    program: "BS Computer Science",
    blood: "A+",
    allergies: "Penicillin",
    last: "Feb 2, 2024",
    badges: ["followup"],
  },
  {
    id: "HR-JD-03",
    student: "Juan Dela Cruz",
    studentId: "2023-00123",
    program: "BS Engineering",
    blood: "B+",
    allergies: "None",
    last: "Dec 18, 2023",
    badges: ["cleared"],
  },
];

const HS_APPOINTMENTS = [
  { id: "APT-01", student: "Ana Reyes", time: "9:00 AM", room: "Medical Room 1", service: "Annual Physical Exam", status: "confirmed" },
  { id: "APT-02", student: "Luis Cruz", time: "10:30 AM", room: "Medical Room 2", service: "Follow-up visit", status: "pending" },
  { id: "APT-03", student: "Mia Santos", time: "11:15 AM", room: "Medical Room 1", service: "Vaccination", status: "confirmed" },
];

const REFERRAL_LIST = [
  { student: "Mia Santos", office: "Guidance Office", reason: "Stress-related symptoms — follow-up recommended", date: "Apr 4, 2026", by: "Nurse Pielago", status: "In progress", urgent: false },
  { student: "Jon Villarin", office: "External clinic", reason: "Specialist consult for recurring migraines", date: "Apr 1, 2026", by: "Dr. Santos", status: "Sent", urgent: false },
  { student: "Kenzo Lim", office: "SDAO", reason: "Wellness program enrollment", date: "Mar 30, 2026", by: "Nurse Pielago", status: "Accepted", urgent: false },
  { student: "Sofia Torres", office: "Emergency services", reason: "Acute symptoms — immediate coordination", date: "Mar 28, 2026", by: "Dr. Ramos", status: "URGENT", urgent: true },
];

const DOC_REQUESTS = [
  { id: "RDQ-HSO-2024-045", student: "Maria Santos", sid: "2024-00156", doc: "X-ray Result", priority: "Urgent", status: "Pending", date: "Feb 14, 2024" },
  { id: "RDQ-HSO-2024-040", student: "Juan Dela Cruz", sid: "2023-00123", doc: "Official Transcript", priority: "Normal", status: "Uploaded", date: "Feb 10, 2024" },
  { id: "RDQ-HSO-2024-038", student: "Anna Reyes", sid: "2022-88765", doc: "Medical Certificate", priority: "High", status: "Received", date: "Feb 8, 2024" },
  { id: "RDQ-HSO-2024-033", student: "Carlos Gomez", sid: "2024-11200", doc: "Birth Certificate", priority: "Normal", status: "Received", date: "Feb 1, 2024" },
  { id: "RDQ-HSO-2024-030", student: "Patricia Reyes", sid: "2023-10234", doc: "Good Moral", priority: "Normal", status: "Pending", date: "Jan 28, 2024" },
];

function pillClass(status) {
  const s = String(status).toLowerCase();
  if (s.includes("completed") || s.includes("received")) return "hs-pill hs-pill-completed";
  if (s.includes("uploaded")) return "hs-pill hs-pill-ongoing";
  if (s.includes("ongoing")) return "hs-pill hs-pill-ongoing";
  if (s.includes("waiting")) return "hs-pill hs-pill-waiting";
  if (s.includes("scheduled")) return "hs-pill hs-pill-scheduled";
  if (s.includes("confirmed")) return "hs-pill hs-pill-ongoing";
  if (s.includes("pending")) return "hs-pill hs-pill-waiting";
  return "hs-pill hs-pill-waiting";
}

function HealthServices() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [visitTab, setVisitTab] = useState("all");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [newConsultOpen, setNewConsultOpen] = useState(false);
  const [consultDetail, setConsultDetail] = useState(null);
  const [recordDetail, setRecordDetail] = useState(null);
  const [newApptOpen, setNewApptOpen] = useState(false);
  const [newReferralOpen, setNewReferralOpen] = useState(false);
  const [newDocOpen, setNewDocOpen] = useState(false);
  const [docStatusFilter, setDocStatusFilter] = useState("all");

  const session = useMemo(() => {
    try {
      return JSON.parse(window.localStorage.getItem("campuscare_session_v1") || "null");
    } catch {
      return null;
    }
  }, []);

  const userName = session?.name || "Priscilla C. Pelayo";
  const userRole = session?.role || "Admin";

  const meta = PAGE_META[activeNav] ?? PAGE_META.dashboard;

  const confirmLogout = () => {
    window.localStorage.removeItem("campuscare_session_v1");
    setLogoutOpen(false);
    navigate("/signin");
  };

  const filteredRecords = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return HEALTH_RECORDS_ROWS;
    return HEALTH_RECORDS_ROWS.filter(
      (r) =>
        r.student.toLowerCase().includes(q) ||
        r.studentId.includes(q) ||
        r.blood.toLowerCase().includes(q),
    );
  }, [search]);

  const filteredDocs = useMemo(() => {
    return DOC_REQUESTS.filter((d) => {
      if (docStatusFilter === "all") return true;
      return d.status.toLowerCase() === docStatusFilter;
    }).filter((d) => {
      const q = search.toLowerCase();
      if (!q || activeNav !== "docrequests") return true;
      return (
        d.student.toLowerCase().includes(q) ||
        d.sid.includes(q) ||
        d.doc.toLowerCase().includes(q)
      );
    });
  }, [search, docStatusFilter, activeNav]);

  const renderDashboard = () => (
    <>
      <div className="hs-stat-row">
        <div className="hs-stat-card">
          <div className="hs-stat-card-top">
            <p className="hs-stat-label">Today&apos;s Visits</p>
            <div className="hs-stat-icon" aria-hidden>
              <Sparkles size={20} strokeWidth={1.5} />
            </div>
          </div>
          <p className="hs-stat-value">28</p>
          <span className="hs-stat-trend hs-stat-trend--up">+12% from yesterday</span>
        </div>
        <div className="hs-stat-card">
          <div className="hs-stat-card-top">
            <p className="hs-stat-label">Appointments</p>
            <div className="hs-stat-icon" aria-hidden>
              <CalendarDays size={20} strokeWidth={1.5} />
            </div>
          </div>
          <p className="hs-stat-value">15</p>
          <p className="hs-stat-meta">6 completed, 9 remaining</p>
        </div>
        <div className="hs-stat-card">
          <div className="hs-stat-card-top">
            <p className="hs-stat-label">Active Cases</p>
            <div className="hs-stat-icon" aria-hidden>
              <Users size={20} strokeWidth={1.5} />
            </div>
          </div>
          <p className="hs-stat-value">12</p>
          <p className="hs-stat-meta">4 follow-up needed</p>
        </div>
      </div>

      <div className="hs-dash-grid">
        <div className="cases-panel">
          <div className="cases-panel-header">
            <div className="cases-panel-top">
              <div className="cases-panel-title">Recent Consultations</div>
              <button type="button" className="hs-panel-link">
                View All
              </button>
            </div>
          </div>
          <div className="cases-table-wrapper">
            <table className="cases-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_CONSULTATIONS.map((row) => (
                  <tr key={row.name}>
                    <td className="cell-student-name">{row.name}</td>
                    <td className="cell-date">{row.time}</td>
                    <td className="cell-text">{row.reason}</td>
                    <td>
                      <span className={pillClass(row.status)}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="hs-urgent-card">
          <h3 className="hs-urgent-title">Urgent Cases</h3>
          <p className="hs-urgent-sub">Require immediate attention</p>
          {URGENT_CASES.map((u) => (
            <div key={u.student} className="hs-urgent-item">
              <p className="hs-urgent-name">{u.student}</p>
              <p className="hs-urgent-desc">{u.desc}</p>
              <p className="hs-urgent-ago">{u.ago}</p>
            </div>
          ))}
          <button type="button" className="hs-ghost-btn">
            View All Alerts
          </button>
        </div>
      </div>
    </>
  );

  const renderVisits = () => {
    const qv = search.toLowerCase();
    const filtered = VISIT_CONSULTATIONS.filter((c) => {
      if (visitTab === "today") return c.date === "Apr 6, 2026";
      if (visitTab === "followups") return c.followup;
      return true;
    }).filter((c) => {
      if (!qv) return true;
      return `${c.student} ${c.studentId} ${c.reason}`.toLowerCase().includes(qv);
    });
    return (
      <>
        <div className="hs-content-actions">
          <button type="button" className="hs-btn-primary" onClick={() => setNewConsultOpen(true)}>
            <Stethoscope size={16} strokeWidth={1.5} aria-hidden />+ New Consultation
          </button>
        </div>
        <div className="hs-stat-row-4">
          {[
            { label: "Today's Visits", value: "28", sub: "Across all types" },
            { label: "Walk-ins", value: "16", sub: "Unscheduled" },
            { label: "Scheduled", value: "12", sub: "Confirmed slots" },
            { label: "Follow-ups", value: "8", sub: "Due this week" },
          ].map((s) => (
            <div key={s.label} className="hs-stat-card hs-stat-card--plain">
              <p className="hs-stat-label">{s.label}</p>
              <p className="hs-stat-value">{s.value}</p>
              <p className="hs-stat-meta">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="hs-filter-card">
          <div className="search-bar-wrapper" style={{ marginBottom: 0 }}>
            <span className="search-icon" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
                <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <input
              className="search-input"
              placeholder="Search by student name, ID, or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="hs-select" aria-label="Visit type filter" defaultValue="all">
            <option value="all">All Types</option>
            <option value="walkin">Walk-in</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        <div className="hs-tabs">
          {[
            { id: "all", label: "All Consultations" },
            { id: "today", label: "Today" },
            { id: "followups", label: "Follow-ups Required" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              className={`hs-tab${visitTab === t.id ? " hs-tab-active" : ""}`}
              onClick={() => setVisitTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="cases-panel">
          <div className="cases-panel-header">
            <div className="hs-list-header">
              <div>
                <h2 className="hs-list-title">All Consultations ({filtered.length})</h2>
                <p className="hs-list-sub">Confidential — medical staff only</p>
              </div>
            </div>
          </div>
          <div className="cases-table-wrapper" style={{ paddingTop: 8 }}>
            {filtered.map((c) => (
              <div key={c.id} className="hs-consult-row">
                <div>
                  <p className="hs-consult-name">{c.student}</p>
                  <p className="cell-student-id" style={{ margin: 0 }}>
                    {c.studentId}
                  </p>
                  <div className="hs-consult-badges">
                    <span className="hs-pill hs-pill-walkin">{c.type}</span>
                    {c.followup ? <span className="hs-pill hs-pill-followup">Follow-up</span> : null}
                  </div>
                </div>
                <div>
                  <p className="hs-consult-meta">{c.reason}</p>
                  <p className="hs-consult-meta">
                    {c.date} · {c.time}
                  </p>
                  <p className="hs-consult-meta">{c.doctor}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={pillClass(c.status)} style={{ textTransform: "lowercase" }}>
                    {c.status}
                  </span>
                  <div style={{ marginTop: 8 }}>
                    <button type="button" className="hs-link-action" onClick={() => setConsultDetail(c)}>
                      <Eye size={14} strokeWidth={1.5} aria-hidden />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderRecords = () => (
    <>
      <div className="hs-content-actions">
        <button type="button" className="hs-btn-primary">
          <Activity size={16} strokeWidth={1.5} aria-hidden />
          New Record
        </button>
      </div>
      <div className="hs-stat-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="hs-stat-card">
          <p className="hs-stat-label">Total Health Records</p>
          <p className="hs-stat-value">2,456</p>
        </div>
        <div className="hs-stat-card">
          <p className="hs-stat-label">Ongoing Treatment</p>
          <p className="hs-stat-value" style={{ color: "#ea580c" }}>
            28
          </p>
        </div>
        <div className="hs-stat-card">
          <p className="hs-stat-label">Checkups This Week</p>
          <p className="hs-stat-value">42</p>
        </div>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Search Health Records</div>
        </div>
        <div className="cases-table-wrapper" style={{ paddingBottom: 8 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <div className="search-bar-wrapper hs-search-wide" style={{ flex: 1, marginBottom: 0 }}>
              <span className="search-icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5.333" stroke="#64748B" strokeWidth="1.5" />
                  <path d="M13.333 13.333L10 10" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                className="search-input"
                placeholder="Search by name, student ID, or blood type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="button" className="btn-export">
              Filters
            </button>
            <button type="button" className="btn-export">
              <Download size={14} strokeWidth={1.5} aria-hidden />
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Student Health Records</div>
          <div className="hs-banner-warn" style={{ marginTop: 8 }}>
            Confidential Medical Information — HIPAA protected
          </div>
        </div>
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Program</th>
                <th>Blood Type</th>
                <th>Allergies</th>
                <th>Last Checkup</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r) => (
                <tr key={r.id}>
                  <td>
                    <p className="cell-student-name">{r.student}</p>
                    <p className="cell-student-id">{r.studentId}</p>
                    <div className="hs-consult-badges" style={{ marginTop: 6 }}>
                      {r.badges.map((b) => (
                        <span key={b} className="hs-pill hs-pill-ongoing" style={{ textTransform: "capitalize" }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="cell-text">{r.program}</td>
                  <td className="cell-text">{r.blood}</td>
                  <td className="cell-text">{r.allergies}</td>
                  <td className="cell-date">{r.last}</td>
                  <td>
                    <button type="button" className="hs-link-action" onClick={() => setRecordDetail(r)}>
                      <Eye size={14} strokeWidth={1.5} aria-hidden />
                      View Record
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

  const renderAppointments = () => (
    <>
      <div className="hs-content-actions">
        <button type="button" className="hs-btn-primary" onClick={() => setNewApptOpen(true)}>
          <CalendarDays size={16} strokeWidth={1.5} aria-hidden />+ New Appointment
        </button>
      </div>
      <div className="hs-stat-row">
        <div className="hs-stat-card">
          <p className="hs-stat-label">Today&apos;s Appointments</p>
          <p className="hs-stat-value">35</p>
        </div>
        <div className="hs-stat-card">
          <p className="hs-stat-label">Walk-ins</p>
          <p className="hs-stat-value">12</p>
        </div>
        <div className="hs-stat-card">
          <p className="hs-stat-label">Pending</p>
          <p className="hs-stat-value">8</p>
        </div>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Today&apos;s Schedule</div>
        </div>
        <div className="cases-table-wrapper">
          {HS_APPOINTMENTS.map((a) => (
            <div key={a.id} className="hs-appt-card">
              <div className="hs-appt-main">
                <h4>{a.student}</h4>
                <p className="hs-appt-line">
                  <CalendarDays size={14} strokeWidth={1.5} aria-hidden />
                  {a.time}
                  <span style={{ color: "#cbd5e1" }}>•</span>
                  {a.room}
                </p>
                <p className="hs-appt-service">{a.service}</p>
              </div>
              <div className="hs-appt-actions">
                <span className={pillClass(a.status === "confirmed" ? "Completed" : "Waiting")}>
                  {a.status}
                </span>
                <button type="button" className="hs-btn-outline">
                  <Eye size={14} strokeWidth={1.5} aria-hidden />
                  View
                </button>
                {a.status === "pending" ? (
                  <button type="button" className="hs-btn-primary" style={{ height: 34, fontSize: 13 }}>
                    Confirm
                  </button>
                ) : (
                  <button type="button" className="hs-btn-outline">
                    <X size={14} strokeWidth={1.5} aria-hidden />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderReferrals = () => (
    <>
      <div className="hs-content-actions">
        <button type="button" className="hs-btn-primary" onClick={() => setNewReferralOpen(true)}>
          <UserPlus size={16} strokeWidth={1.5} aria-hidden />+ Create Referral
        </button>
      </div>
      <div className="hs-ref-stat-row">
        {[
          { icon: Send, label: "Sent (Pending)", value: "8" },
          { icon: Clock, label: "In Progress", value: "12" },
          { icon: FileText, label: "Completed", value: "45" },
          { icon: AlertCircle, label: "Urgent Cases", value: "3" },
        ].map((s) => (
          <div key={s.label} className="hs-ref-stat">
            <div className="hs-ref-stat-icon" aria-hidden>
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
          <input className="search-input" placeholder="Search referrals..." readOnly />
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
                <button type="button" className="hs-link-action">
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

  const renderDocRequests = () => (
    <>
      <div className="hs-content-actions">
        <button type="button" className="hs-btn-primary" onClick={() => setNewDocOpen(true)}>
          <FileText size={16} strokeWidth={1.5} aria-hidden />+ New Request
        </button>
      </div>
      <div className="hs-doc-stat-row">
        <div className="hs-doc-stat hs-doc-stat--total">
          <p className="hs-stat-value">5</p>
          <p className="hs-stat-label">Total Requests</p>
          <p className="hs-stat-meta">All items</p>
        </div>
        <div className="hs-doc-stat hs-doc-stat--pending">
          <p className="hs-stat-value">2</p>
          <p className="hs-stat-label">Pending</p>
          <p className="hs-stat-meta">Awaiting Admissions</p>
        </div>
        <div className="hs-doc-stat hs-doc-stat--uploaded">
          <p className="hs-stat-value">1</p>
          <p className="hs-stat-label">Uploaded</p>
          <p className="hs-stat-meta">Ready to receive</p>
        </div>
        <div className="hs-doc-stat hs-doc-stat--received">
          <p className="hs-stat-value">2</p>
          <p className="hs-stat-label">Received</p>
          <p className="hs-stat-meta">Completed</p>
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
          <input
            className="search-input"
            placeholder="Search by student, ID, or document type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="hs-select" value={docStatusFilter} onChange={(e) => setDocStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="uploaded">Uploaded</option>
          <option value="received">Received</option>
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
                <th>Document Type</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((d) => (
                <tr key={d.id}>
                  <td className="cell-case-id">{d.id}</td>
                  <td>
                    <p className="cell-student-name">{d.student}</p>
                    <p className="cell-student-id">{d.sid}</p>
                  </td>
                  <td className="cell-text">{d.doc}</td>
                  <td>
                    <span
                      className="hs-pill"
                      style={{
                        background: d.priority === "Urgent" ? "#fee2e2" : d.priority === "High" ? "#ffedd5" : "#dbeafe",
                        color: d.priority === "Urgent" ? "#991b1b" : d.priority === "High" ? "#9a3412" : "#1e40af",
                      }}
                    >
                      {d.priority}
                    </span>
                  </td>
                  <td>
                    <span className={pillClass(d.status)}>{d.status}</span>
                  </td>
                  <td className="cell-date">{d.date}</td>
                  <td>
                    <button type="button" className="hs-link-action">
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

  const renderReports = () => (
    <>
      <div className="hs-reports-toolbar">
        <button type="button" className="btn-export">
          This Week ▾
        </button>
        <button type="button" className="btn-export">
          Print
        </button>
        <button type="button" className="btn-export">
          <Mail size={14} strokeWidth={1.5} aria-hidden />
          Email
        </button>
        <button type="button" className="hs-btn-primary">
          <Download size={16} strokeWidth={1.5} aria-hidden />
          Export PDF
        </button>
      </div>
      <div className="hs-kpi-row-3">
        <div className="hs-kpi-card">
          <div className="hs-kpi-icon" style={{ background: "#ecfdf5", color: "#059669" }}>
            <Activity size={22} strokeWidth={1.5} />
          </div>
          <div className="hs-kpi-body">
            <p className="hs-kpi-label">Students Served</p>
            <p className="hs-kpi-value">2,456</p>
            <span className="hs-kpi-delta hs-kpi-delta--green">+4.2%</span>
          </div>
        </div>
        <div className="hs-kpi-card">
          <div className="hs-kpi-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
            <Users size={22} strokeWidth={1.5} />
          </div>
          <div className="hs-kpi-body">
            <p className="hs-kpi-label">Total Consultations</p>
            <p className="hs-kpi-value">856</p>
            <span className="hs-kpi-delta hs-kpi-delta--blue">+12.5%</span>
          </div>
        </div>
        <div className="hs-kpi-card">
          <div className="hs-kpi-icon" style={{ background: "#fef2f2", color: "#dc2626" }}>
            <BarChart3 size={22} strokeWidth={1.5} />
          </div>
          <div className="hs-kpi-body">
            <p className="hs-kpi-label">Urgent Cases</p>
            <p className="hs-kpi-value">28</p>
            <span className="hs-kpi-delta hs-kpi-delta--red">-15.3%</span>
          </div>
        </div>
      </div>
      <div className="hs-chart-row">
        <div className="hs-chart-panel">
          <h3>Monthly Consultations Trend</h3>
          <p className="hs-chart-caption">General · Treatments · Checkups</p>
          <div className="hs-bar-chart" aria-hidden>
            {[35, 48, 42, 55, 50, 62, 58].map((h, i) => (
              <div key={i} className="hs-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="hs-chart-panel">
          <h3>Common Health Issues</h3>
          <p className="hs-chart-caption">Distribution overview</p>
          <div className="hs-pie-mock" aria-hidden />
        </div>
      </div>
      <div className="cases-panel">
        <div className="cases-panel-header">
          <div className="cases-panel-title">Top Health Concerns</div>
        </div>
        <div className="cases-table-wrapper">
          <table className="cases-table">
            <thead>
              <tr>
                <th>Concern</th>
                <th>Priority</th>
                <th>Cases</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cell-text">Seasonal flu</td>
                <td>
                  <span className="hs-pill" style={{ background: "#fef9c3", color: "#854d0e" }}>
                    medium
                  </span>
                </td>
                <td className="cell-text">124</td>
                <td className="cell-text" style={{ color: "#16a34a" }}>
                  +3.2%
                </td>
              </tr>
              <tr>
                <td className="cell-text">Headaches</td>
                <td>
                  <span className="hs-pill hs-pill-completed">low</span>
                </td>
                <td className="cell-text">89</td>
                <td className="cell-text" style={{ color: "#16a34a" }}>
                  +1.1%
                </td>
              </tr>
              <tr>
                <td className="cell-text">Respiratory</td>
                <td>
                  <span className="hs-pill" style={{ background: "#fee2e2", color: "#991b1b" }}>
                    high
                  </span>
                </td>
                <td className="cell-text">56</td>
                <td className="cell-text" style={{ color: "#dc2626" }}>
                  -2.4%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderSettings = () => (
    <div className="hs-settings-card">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <Users size={20} strokeWidth={1.5} aria-hidden />
        <h2 className="hs-settings-section-title" style={{ margin: 0 }}>
          Personal Information
        </h2>
      </div>
      <p className="hs-settings-section-sub">Update your personal details and contact information.</p>
      <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#1e40af",
          }}
        >
          PCP
        </div>
        <div>
          <button type="button" className="btn-export" style={{ marginBottom: 8 }}>
            Change Photo
          </button>
          <p className="hs-stat-meta">JPG, GIF or PNG. Max size of 2MB</p>
        </div>
      </div>
      <div className="hs-form-grid">
        <div className="hs-field">
          <label htmlFor="hs-fn">Full Name</label>
          <input id="hs-fn" defaultValue={userName} readOnly />
        </div>
        <div className="hs-field">
          <label htmlFor="hs-em">Email Address</label>
          <input id="hs-em" defaultValue="pcpatago@nu-dasma.edu.ph" readOnly />
        </div>
        <div className="hs-field">
          <label htmlFor="hs-ph">Phone Number</label>
          <input id="hs-ph" defaultValue="+63 917 234 5678" readOnly />
        </div>
        <div className="hs-field">
          <label htmlFor="hs-pos">Position</label>
          <input id="hs-pos" defaultValue={userRole} readOnly />
        </div>
        <div className="hs-field">
          <label htmlFor="hs-eid">Employee ID</label>
          <input id="hs-eid" defaultValue="2021-012325" readOnly />
        </div>
        <div className="hs-field">
          <label htmlFor="hs-dj">Date Joined</label>
          <input id="hs-dj" defaultValue="March 2021" readOnly />
        </div>
        <div className="hs-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="hs-loc">Office Location</label>
          <input id="hs-loc" defaultValue="Health Services Office, 6th Floor" readOnly />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
        <button type="button" className="cc-btn-primary">
          Save Changes
        </button>
      </div>
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 10 }}>
        <BarChart3 size={18} strokeWidth={1.5} aria-hidden />
        <span className="hs-settings-section-title" style={{ fontSize: 15 }}>
          Security Settings
        </span>
      </div>
    </div>
  );

  const body = (() => {
    switch (activeNav) {
      case "visits":
        return renderVisits();
      case "records":
        return renderRecords();
      case "appointments":
        return renderAppointments();
      case "referrals":
        return renderReferrals();
      case "docrequests":
        return renderDocRequests();
      case "reports":
        return renderReports();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  })();

  return (
    <div className="dashboard-layout health-services-layout">
      <Sidebar
        departmentTag="Welfare Management"
        navItems={HEALTH_NAV_ITEMS}
        activeNavId={activeNav}
        onNavSelect={setActiveNav}
        onLogoutRequest={() => setLogoutOpen(true)}
        onSettingsClick={() => setActiveNav("settings")}
      />
      <div className="dashboard-main">
        <OfficeHeader
          pageTitle={meta.title}
          pageSubtitle={meta.subtitle}
          userName={userName}
          userRole={userRole}
          notifications={HS_NOTIFICATIONS}
        />
        <main className="dashboard-content hs-page">{body}</main>
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

      <CCModal open={newConsultOpen} title="New Consultation" onClose={() => setNewConsultOpen(false)} centered wide>
        <div className="cc-modal-body">
          <p style={{ fontSize: 13, color: "#64748b", margin: "-8px 0 16px" }}>Record a new student health consultation</p>
          <div className="hs-modal-grid">
            <div className="hs-modal-field">
              <label>Student Name</label>
              <input placeholder="Full name" />
            </div>
            <div className="hs-modal-field">
              <label>Student ID</label>
              <input placeholder="ID number" />
            </div>
            <div className="hs-modal-field">
              <label>Visit Type</label>
              <select defaultValue="walkin">
                <option value="walkin">Walk-in</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div className="hs-modal-field">
              <label>Time</label>
              <input type="time" />
            </div>
          </div>
          <div className="hs-modal-field" style={{ marginTop: 12 }}>
            <label>Chief Complaint</label>
            <textarea placeholder="Describe presenting concern..." />
          </div>
          <p className="hs-modal-section-title">Vital Signs</p>
          <div className="hs-modal-grid">
            <div className="hs-modal-field">
              <label>Blood Pressure</label>
              <input placeholder="120/80" />
            </div>
            <div className="hs-modal-field">
              <label>Temperature (°C)</label>
              <input placeholder="36.5" />
            </div>
            <div className="hs-modal-field">
              <label>Heart Rate (bpm)</label>
              <input placeholder="72" />
            </div>
          </div>
          <div className="hs-modal-field">
            <label>Diagnosis</label>
            <textarea rows={2} />
          </div>
          <div className="hs-modal-field">
            <label>Treatment</label>
            <textarea rows={2} />
          </div>
        </div>
        <div className="hs-modal-footer">
          <button type="button" className="cc-btn-secondary" onClick={() => setNewConsultOpen(false)}>
            Cancel
          </button>
          <button type="button" className="hs-btn-primary" onClick={() => setNewConsultOpen(false)}>
            Save Consultation
          </button>
        </div>
      </CCModal>

      <CCModal open={newApptOpen} title="New Appointment" onClose={() => setNewApptOpen(false)} centered wide>
        <div className="cc-modal-body">
          <p style={{ fontSize: 13, color: "#64748b", margin: "-8px 0 16px" }}>Create a new medical appointment for a student</p>
          <div className="hs-modal-field">
            <label>Student Name</label>
            <input />
          </div>
          <div className="hs-modal-field">
            <label>Student ID</label>
            <input />
          </div>
          <div className="hs-modal-grid">
            <div className="hs-modal-field">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="hs-modal-field">
              <label>Phone</label>
              <input />
            </div>
            <div className="hs-modal-field">
              <label>Date</label>
              <input type="date" />
            </div>
            <div className="hs-modal-field">
              <label>Time</label>
              <input type="time" />
            </div>
          </div>
          <div className="hs-modal-field">
            <label>Purpose of Visit</label>
            <textarea rows={2} />
          </div>
        </div>
        <div className="hs-modal-footer">
          <button type="button" className="cc-btn-secondary" onClick={() => setNewApptOpen(false)}>
            Cancel
          </button>
          <button type="button" className="hs-btn-primary" onClick={() => setNewApptOpen(false)}>
            + Create Appointment
          </button>
        </div>
      </CCModal>

      <CCModal open={newReferralOpen} title="Create New Referral" onClose={() => setNewReferralOpen(false)} centered wide>
        <div className="cc-modal-body">
          <p className="hs-modal-section-title" style={{ marginTop: 0 }}>
            Student Information
          </p>
          <div className="hs-modal-grid">
            <div className="hs-modal-field">
              <label>Student Name</label>
              <input />
            </div>
            <div className="hs-modal-field">
              <label>Student ID</label>
              <input />
            </div>
            <div className="hs-modal-field">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="hs-modal-field">
              <label>Contact Number</label>
              <input />
            </div>
          </div>
          <p className="hs-modal-section-title">Referral Details</p>
          <div className="hs-modal-field">
            <label>Referring Office</label>
            <input readOnly value="Health Services Office" />
          </div>
          <div className="hs-modal-field">
            <label>Receiving Office</label>
            <select>
              <option>Guidance Office</option>
              <option>SDAO</option>
            </select>
          </div>
          <div className="hs-modal-field">
            <label>Reason for Referral</label>
            <textarea rows={3} />
          </div>
        </div>
        <div className="hs-modal-footer">
          <button type="button" className="cc-btn-secondary" onClick={() => setNewReferralOpen(false)}>
            Cancel
          </button>
          <button type="button" className="hs-btn-primary" onClick={() => setNewReferralOpen(false)}>
            Send Referral
          </button>
        </div>
      </CCModal>

      <CCModal open={newDocOpen} title="New Document Request" onClose={() => setNewDocOpen(false)} centered wide>
        <div className="cc-modal-body">
          <p style={{ fontSize: 13, color: "#64748b", margin: "-8px 0 16px" }}>Request a student document from the Admissions Office</p>
          <div className="hs-modal-field">
            <label>Select Student</label>
            <select>
              <option>Choose a student</option>
            </select>
          </div>
          <div className="hs-modal-field">
            <label>Document Type</label>
            <select>
              <option>Choose document type</option>
            </select>
          </div>
          <div className="hs-modal-field">
            <label>Priority Level</label>
            <select defaultValue="normal">
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="hs-modal-field">
            <label>Request Notes</label>
            <textarea placeholder="Explain why this document is needed..." rows={3} />
          </div>
          <div className="hs-banner-info">
            <strong>Request process:</strong> submissions are routed to Admissions; you will be notified when the document is uploaded.
          </div>
        </div>
        <div className="hs-modal-footer">
          <button type="button" className="cc-btn-secondary" onClick={() => setNewDocOpen(false)}>
            Cancel
          </button>
          <button type="button" className="cc-btn-primary" onClick={() => setNewDocOpen(false)}>
            + Submit Request
          </button>
        </div>
      </CCModal>

      {consultDetail ? (
        <div className="hs-drawer-overlay" role="presentation" onMouseDown={() => setConsultDetail(null)}>
          <aside className="hs-drawer" onMouseDown={(e) => e.stopPropagation()}>
            <div className="hs-drawer-header">
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Consultation Details</h2>
                <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>{consultDetail.id}</p>
              </div>
              <button type="button" className="cc-modal-close" aria-label="Close" onClick={() => setConsultDetail(null)}>
                ✕
              </button>
            </div>
            <div className="hs-drawer-body">
              <dl className="hs-detail-grid">
                <div className="hs-detail-item">
                  <dt>Name</dt>
                  <dd>{consultDetail.student}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Student ID</dt>
                  <dd>{consultDetail.studentId}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Date</dt>
                  <dd>{consultDetail.date}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Time</dt>
                  <dd>{consultDetail.time}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Visit Type</dt>
                  <dd>{consultDetail.type}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Attended By</dt>
                  <dd>{consultDetail.doctor}</dd>
                </div>
              </dl>
              <p className="hs-modal-section-title">Chief Complaint</p>
              <p className="hs-consult-meta">{consultDetail.reason}</p>
              <p className="hs-modal-section-title">Vital Signs</p>
              <div className="hs-vital-chips">
                <div className="hs-vital-chip">
                  <span>Blood Pressure</span>
                  <strong>120/80</strong>
                </div>
                <div className="hs-vital-chip">
                  <span>Temperature</span>
                  <strong>36.5°C</strong>
                </div>
                <div className="hs-vital-chip">
                  <span>Heart Rate</span>
                  <strong>72 bpm</strong>
                </div>
              </div>
              <div className="hs-lock-box">
                <Lock size={16} strokeWidth={1.5} aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>CONFIDENTIAL</strong> — Medical Staff Only. Student chart summary for preview; full notes in EMR.
                </span>
              </div>
            </div>
            <div className="hs-modal-footer" style={{ margin: 0 }}>
              <button type="button" className="cc-btn-secondary" onClick={() => setConsultDetail(null)}>
                Close
              </button>
              <button type="button" className="hs-btn-outline">
                <Printer size={14} strokeWidth={1.5} aria-hidden />
                Print Record
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      {recordDetail ? (
        <div className="hs-drawer-overlay" role="presentation" onMouseDown={() => setRecordDetail(null)}>
          <aside className="hs-drawer" onMouseDown={(e) => e.stopPropagation()}>
            <div className="hs-drawer-header">
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Health Record for {recordDetail.student}</h2>
                <p className="hs-banner-warn" style={{ marginTop: 10, marginBottom: 0 }}>
                  Confidential Medical Information
                </p>
              </div>
              <button type="button" className="cc-modal-close" aria-label="Close" onClick={() => setRecordDetail(null)}>
                ✕
              </button>
            </div>
            <div className="hs-drawer-body">
              <dl className="hs-detail-grid">
                <div className="hs-detail-item">
                  <dt>Student ID</dt>
                  <dd>{recordDetail.studentId}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Program</dt>
                  <dd>{recordDetail.program}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Blood Type</dt>
                  <dd>{recordDetail.blood}</dd>
                </div>
                <div className="hs-detail-item">
                  <dt>Last Checkup</dt>
                  <dd>{recordDetail.last}</dd>
                </div>
              </dl>
              <p className="hs-modal-section-title">Contact</p>
              <p className="hs-consult-meta">patricia.reyes@nu-dasma.edu.ph · 0912-345-6789</p>
              <p className="hs-modal-section-title">Vaccinations</p>
              <p className="hs-consult-meta">COVID-19 (Booster), Flu Shot 2024, Hepatitis B</p>
            </div>
            <div className="hs-modal-footer" style={{ margin: 0 }}>
              <button type="button" className="cc-btn-secondary" onClick={() => setRecordDetail(null)}>
                Close
              </button>
              <button type="button" className="hs-btn-primary">
                Edit
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

export default HealthServices;
