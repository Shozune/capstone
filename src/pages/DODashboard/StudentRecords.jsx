import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";
import "./CaseManagementSubpages.css";

const STUDENT_RECORDS = [
  {
    studentName: "Michael Tan",
    studentId: "2023-10234",
    program: "BS Computer Science",
    cases: 2,
    lastIncident: "Jan 24, 2024",
    status: "active",
    riskLevel: "high",
    notes: "Follow-up required for evidence review and hearing scheduling.",
  },
  {
    studentName: "Sarah Wong",
    studentId: "2023-11056",
    program: "BS Psychology",
    cases: 1,
    lastIncident: "Jan 26, 2024",
    status: "active",
    riskLevel: "medium",
    notes: "Record updated after initial investigation.",
  },
  {
    studentName: "James Garcia",
    studentId: "2024-10112",
    program: "BS Psychology",
    cases: 3,
    lastIncident: "Feb 10, 2024",
    status: "good",
    riskLevel: "low",
    notes: "No pending actions.",
  },
  {
    studentName: "Lisa Martinez",
    studentId: "2023-12345",
    program: "BS Accountancy",
    cases: 2,
    lastIncident: "Jan 28, 2024",
    status: "active",
    riskLevel: "high",
    notes: "Monitoring scheduled for next week.",
  },
  {
    studentName: "Robert Cruz",
    studentId: "2023-09876",
    program: "BS Psychology",
    cases: 1,
    lastIncident: "Jan 22, 2024",
    status: "closed",
    riskLevel: "medium",
    notes: "Closed after disciplinary review.",
  },
];

const StatusPill = ({ status }) => {
  const cls =
    status === "active"
      ? "scheduled"
      : status === "closed"
        ? "cancelled"
        : "completed";
  return <span className={`cc-pill ${cls}`}>{status}</span>;
};

const StudentRecords = () => {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return STUDENT_RECORDS;
    return STUDENT_RECORDS.filter((r) => {
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q) ||
        r.program.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const stats = useMemo(() => {
    return {
      total: STUDENT_RECORDS.length,
      active: STUDENT_RECORDS.filter((r) => r.status === "active").length,
      good: STUDENT_RECORDS.filter((r) => r.status === "good").length,
      closed: STUDENT_RECORDS.filter((r) => r.status === "closed").length,
    };
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="header-notifications" type="button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 6.667A5 5 0 005 6.667C5 10.833 3.333 12.5 3.333 12.5h13.334S15 10.833 15 6.667zM11.442 17.5a1.667 1.667 0 01-2.884 0"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="notif-badge">3</span>
          </button>

          <div className="header-user">
            <div className="header-avatar" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.333 14v-1.333A2.667 2.667 0 0010.667 10H5.333a2.667 2.667 0 00-2.666 2.667V14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="8"
                  cy="5.333"
                  r="2.667"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="header-user-info">
              <span className="header-user-name">Arny Lynne Saragina</span>
              <span className="header-user-role">
                Discipline Coordinator
              </span>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="page-title-row">
            <div>
              <h1>Student Records</h1>
              <p>Manage and monitor student disciplinary actions and compliance</p>
            </div>
            <button
              className="cc-btn-primary"
              type="button"
              onClick={() => setIsCreateOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2.667V13.333M2.667 8H13.333"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              New Record
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-value total">{stats.total}</p>
              <p className="stat-label">Total Records</p>
            </div>
            <div className="stat-card">
              <p className="stat-value new">{stats.active}</p>
              <p className="stat-label">Active</p>
            </div>
            <div className="stat-card">
              <p className="stat-value ongoing">{stats.good}</p>
              <p className="stat-label">Good Standing</p>
            </div>
            <div className="stat-card">
              <p className="stat-value closed">{stats.closed}</p>
              <p className="stat-label">Closed</p>
            </div>
          </div>

          <section className="cc-card" style={{ marginTop: 24 }}>
            <div className="cc-card-header">
              <div className="cc-search-row">
                <div className="cc-search">
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14, marginBottom: 8 }}>
                    Search
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, ID, or program..."
                  />
                </div>

                <div style={{ width: 240, textAlign: "right" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14 }}>
                    Student Records ({filtered.length})
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Program</th>
                    <th>Cases</th>
                    <th>Last Incident</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.studentId}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{r.studentName}</div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>{r.studentId}</div>
                      </td>
                      <td>{r.program}</td>
                      <td>{r.cases}</td>
                      <td>{r.lastIncident}</td>
                      <td>
                        <StatusPill status={r.status} />
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button
                            className="cc-btn-secondary"
                            type="button"
                            onClick={() => setSelectedStudent(r)}
                          >
                            View
                          </button>
                          <button
                            className="cc-btn-secondary"
                            type="button"
                            onClick={() => {
                              setSelectedStudent(r);
                              setIsManageOpen(true);
                            }}
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "24px 8px", color: "#64748b" }}>
                        No student records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {selectedStudent && !isManageOpen && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setSelectedStudent(null)}
        >
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">Student Record Details</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setSelectedStudent(null)}
              >
                ✕
              </button>
            </div>

            <div className="cc-modal-body">
              <div className="cc-modal-row">
                <div className="cc-field">
                  <div className="cc-label">Student</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedStudent.studentName}
                  </div>
                </div>
                <div className="cc-field">
                  <div className="cc-label">Student ID</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedStudent.studentId}
                  </div>
                </div>
              </div>

              <div className="cc-modal-row">
                <div className="cc-field">
                  <div className="cc-label">Program</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedStudent.program}
                  </div>
                </div>
                <div className="cc-field">
                  <div className="cc-label">Risk Level</div>
                  <div style={{ marginTop: 6 }}>
                    <span className="cc-pill scheduled">
                      {selectedStudent.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Case Summary</div>
                <div style={{ color: "#0f172a", fontSize: 14, marginTop: 6 }}>
                  {selectedStudent.cases} total case(s). Last incident on{" "}
                  {selectedStudent.lastIncident}.
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Notes</div>
                <div style={{ color: "#0f172a", fontSize: 14 }}>
                  {selectedStudent.notes}
                </div>
              </div>
            </div>

            <div className="cc-modal-actions">
              <button
                className="cc-btn-secondary"
                type="button"
                onClick={() => {
                  setIsManageOpen(true);
                }}
              >
                Manage Record
              </button>
              <button
                className="cc-btn-secondary"
                type="button"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isManageOpen && selectedStudent && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setIsManageOpen(false)}
        >
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">Manage Student Record</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setIsManageOpen(false)}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsManageOpen(false);
              }}
            >
              <div className="cc-modal-body">
                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Student Status</div>
                    <select className="cc-input" defaultValue={selectedStudent.status}>
                      <option value="active">active</option>
                      <option value="good">good</option>
                      <option value="closed">closed</option>
                    </select>
                  </div>
                </div>

                <div className="cc-field">
                  <div className="cc-label">Monitoring Notes</div>
                  <textarea className="cc-textarea" defaultValue={selectedStudent.notes} />
                </div>
              </div>

              <div className="cc-modal-actions">
                <button
                  className="cc-btn-secondary"
                  type="button"
                  onClick={() => setIsManageOpen(false)}
                >
                  Cancel
                </button>
                <button className="cc-btn-primary" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCreateOpen && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setIsCreateOpen(false)}
        >
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">New Student Record</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setIsCreateOpen(false)}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsCreateOpen(false);
              }}
            >
              <div className="cc-modal-body">
                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Student Name</div>
                    <input className="cc-input" placeholder="e.g., Michael Tan" />
                  </div>
                  <div className="cc-field">
                    <div className="cc-label">Student ID</div>
                    <input className="cc-input" placeholder="2023-10234" />
                  </div>
                </div>

                <div className="cc-field">
                  <div className="cc-label">Program</div>
                  <input className="cc-input" placeholder="BS Computer Science" />
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Notes</div>
                  <textarea className="cc-textarea" placeholder="Initial record notes..." />
                </div>
              </div>

              <div className="cc-modal-actions">
                <button
                  className="cc-btn-secondary"
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button className="cc-btn-primary" type="submit">
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRecords;

