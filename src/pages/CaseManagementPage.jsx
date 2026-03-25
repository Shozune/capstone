import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";

const CASES = [
  { id: "DC-2024-089", student: "Michael Tan",    studentId: "2023-10234", caseType: "Academic Dishonesty",     status: "ongoing", priority: "high",   date: "Jan 24, 2024", officer: "Prof. Santos"    },
  { id: "DC-2024-090", student: "Sarah Wong",     studentId: "2023-11056", caseType: "Code of Conduct Violation", status: "new",     priority: "medium", date: "Jan 26, 2024", officer: "Dr. Reyes"      },
  { id: "DC-2024-091", student: "James Garcia",   studentId: "2024-10112", caseType: "Attendance Violation",     status: "pending", priority: "low",    date: "Jan 27, 2024", officer: "Prof. Cruz"     },
  { id: "DC-2024-092", student: "Lisa Martinez",  studentId: "2023-12345", caseType: "Property Damage",          status: "ongoing", priority: "high",   date: "Jan 28, 2024", officer: "Admin Lopez"    },
  { id: "DC-2024-088", student: "Robert Cruz",    studentId: "2023-09876", caseType: "Plagiarism",               status: "closed",  priority: "medium", date: "Jan 22, 2024", officer: "Prof. Gonzales" },
  { id: "DC-2024-087", student: "Angela Reyes",   studentId: "2023-11234", caseType: "Disruptive Behavior",      status: "new",     priority: "low",    date: "Jan 21, 2024", officer: "Prof. Santos"   },
  { id: "DC-2024-086", student: "Kevin Santos",   studentId: "2024-10567", caseType: "Cheating",                 status: "ongoing", priority: "high",   date: "Jan 20, 2024", officer: "Dr. Tan"        },
  { id: "DC-2024-085", student: "Diana Lopez",    studentId: "2023-12678", caseType: "Falsification of Records", status: "pending", priority: "high",   date: "Jan 19, 2024", officer: "Registrar"      },
];

const TABS = [
  { key: "all",     label: (cases) => `All Cases (${cases.length})` },
  { key: "new",     label: (cases) => `New / Unreviewed (${cases.filter(c => c.status === "new").length})` },
  { key: "ongoing", label: (cases) => `Ongoing (${cases.filter(c => c.status === "ongoing").length})` },
  { key: "closed",  label: (cases) => `Closed (${cases.filter(c => c.status === "closed").length})` },
];

const StatusBadge = ({ status }) => (
  <span className={`badge badge-${status}`}>{status}</span>
);

const PriorityBadge = ({ priority }) => (
  <span className={`badge badge-${priority}`}>{priority}</span>
);

const CaseManagementPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = CASES.filter((c) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "new"     && c.status === "new")     ||
      (activeTab === "ongoing" && c.status === "ongoing") ||
      (activeTab === "closed"  && c.status === "closed");

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.student.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.caseType.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const stats = {
    total:   CASES.length,
    newCount: CASES.filter(c => c.status === "new").length,
    ongoing: CASES.filter(c => c.status === "ongoing").length,
    closed:  CASES.filter(c => c.status === "closed").length,
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <button className="header-notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 6.667A5 5 0 005 6.667C5 10.833 3.333 12.5 3.333 12.5h13.334S15 10.833 15 6.667zM11.442 17.5a1.667 1.667 0 01-2.884 0" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="notif-badge">3</span>
          </button>

          <div className="header-user">
            <div className="header-avatar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.333 14v-1.333A2.667 2.667 0 0010.667 10H5.333a2.667 2.667 0 00-2.666 2.667V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="5.333" r="2.667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="header-user-info">
              <span className="header-user-name">Arny Lynne Saragina</span>
              <span className="header-user-role">Discipline Coordinator</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          {/* Title Row */}
          <div className="page-title-row">
            <div>
              <h1>Case Management</h1>
              <p>Manage and track all disciplinary cases</p>
            </div>
            <button className="btn-new-case">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3.333v9.334M3.333 8h9.334" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              New Case
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-value total">{stats.total}</p>
              <p className="stat-label">Total Cases</p>
            </div>
            <div className="stat-card">
              <p className="stat-value new">{stats.newCount}</p>
              <p className="stat-label">New / Unreviewed</p>
            </div>
            <div className="stat-card">
              <p className="stat-value ongoing">{stats.ongoing}</p>
              <p className="stat-label">Ongoing</p>
            </div>
            <div className="stat-card">
              <p className="stat-value closed">{stats.closed}</p>
              <p className="stat-label">Closed</p>
            </div>
          </div>

          {/* Cases Panel */}
          <div className="cases-panel">
            <div className="cases-panel-header">
              {/* Panel top row */}
              <div className="cases-panel-top">
                <div className="cases-panel-title">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 2.5H3.333C2.413 2.5 1.667 3.246 1.667 4.167v11.666c0 .92.746 1.667 1.666 1.667h13.334c.92 0 1.666-.746 1.666-1.667V4.167c0-.92-.746-1.667-1.666-1.667z" stroke="#0f172a" strokeWidth="1.5"/>
                    <path d="M6.667 7.5h6.666M6.667 10.833h4.166" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  All Cases
                </div>
                <button className="btn-export">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 10v2.667A1.333 1.333 0 0112.667 14H3.333A1.333 1.333 0 012 12.667V10M5.333 6.667L8 9.333l2.667-2.666M8 9.333V2" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Export
                </button>
              </div>

              {/* Confidential notice */}
              <div className="confidential-notice">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#f54900" strokeWidth="1.2"/>
                  <path d="M6 4v2.5M6 8h.006" stroke="#f54900" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Confidential - Handle with discretion
              </div>

              {/* Search */}
              <div className="search-bar-wrapper">
                <span className="search-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7.333" cy="7.333" r="4.667" stroke="#64748b" strokeWidth="1.5"/>
                    <path d="M14 14l-2.667-2.667" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by student name, case ID, or case type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Tabs */}
              <div className="tab-list">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`tab-btn${activeTab === tab.key ? " tab-active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label(CASES)}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="cases-table-wrapper">
              <table className="cases-table">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Student</th>
                    <th>Case Type</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Reported Date</th>
                    <th>Reporting Officer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id}>
                      <td className="cell-case-id">{c.id}</td>
                      <td>
                        <p className="cell-student-name">{c.student}</p>
                        <p className="cell-student-id">{c.studentId}</p>
                      </td>
                      <td className="cell-text">{c.caseType}</td>
                      <td><StatusBadge status={c.status} /></td>
                      <td><PriorityBadge priority={c.priority} /></td>
                      <td className="cell-date">{c.date}</td>
                      <td className="cell-text">{c.officer}</td>
                      <td>
                        <button className="btn-view">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M1.333 8S3.333 3.333 8 3.333 14.667 8 14.667 8 12.667 12.667 8 12.667 1.333 8 1.333 8z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="8" cy="8" r="1.667" stroke="#374151" strokeWidth="1.5"/>
                          </svg>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", color: "#64748b", padding: "32px 8px", fontFamily: "'Inter', sans-serif" }}>
                        No cases found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CaseManagementPage;