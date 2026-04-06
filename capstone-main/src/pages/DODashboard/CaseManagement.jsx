import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";
import "./CaseManagementSubpages.css";
import { CASE_TYPE_OPTIONS, PRIORITY_OPTIONS } from "../../data/mockCases";
import { useCases } from "../../hooks/useCases";
import { DEFAULT_NOTIFICATIONS } from "../../data/mockNotifications";

const TABS = [
  { key: "all", label: (cases) => `All Cases (${cases.length})` },
  {
    key: "new",
    label: (cases) =>
      `New / Unreviewed (${cases.filter((c) => c.status === "new").length})`,
  },
  {
    key: "ongoing",
    label: (cases) =>
      `Ongoing (${cases.filter((c) => c.status === "ongoing").length})`,
  },
  {
    key: "closed",
    label: (cases) =>
      `Closed (${cases.filter((c) => c.status === "closed").length})`,
  },
];

const StatusBadge = ({ status }) => (
  <span className={`badge badge-${status}`}>{status}</span>
);

const PriorityBadge = ({ priority }) => (
  <span className={`badge badge-${priority}`}>{priority}</span>
);

const CaseManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const {
    cases,
    loading: casesLoading,
    fetchError: casesError,
    refresh: refreshCases,
    createCase,
    updateCaseStatus,
  } = useCases([]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const [newCaseForm, setNewCaseForm] = useState({
    student: "",
    studentId: "",
    caseType: "",
    priority: "medium",
    description: "",
  });
  const [newCaseEvidence, setNewCaseEvidence] = useState(null);
  const [newCaseErrors, setNewCaseErrors] = useState({});
  const [statusUpdate, setStatusUpdate] = useState("ongoing");
  const [statusNote, setStatusNote] = useState("");
  const [caseModalError, setCaseModalError] = useState(null);

  useEffect(() => {
    setCaseModalError(null);
  }, [selectedCase]);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "new" && c.status === "new") ||
        (activeTab === "ongoing" && c.status === "ongoing") ||
        (activeTab === "closed" && c.status === "closed");

      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.student.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.caseType.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [cases, activeTab, search]);

  const stats = useMemo(() => {
    return {
      total: cases.length,
      newCount: cases.filter((c) => c.status === "new").length,
      ongoing: cases.filter((c) => c.status === "ongoing").length,
      closed: cases.filter((c) => c.status === "closed").length,
    };
  }, [cases]);

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      cases: filtered,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campuscare_cases_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsExportOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div style={{ position: "relative" }}>
            <button
              className="header-notifications"
              type="button"
              aria-label="Notifications"
              aria-expanded={isNotifOpen}
              onClick={() => setIsNotifOpen((o) => !o)}
            >
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
              <span className="notif-badge">{unreadCount}</span>
            </button>

            {isNotifOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 44,
                  width: 320,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  boxShadow: "0px 18px 60px rgba(15, 23, 42, 0.15)",
                  padding: 12,
                  zIndex: 2500,
                }}
                role="menu"
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    color: "#0f172a",
                    fontSize: 14,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Notifications
                  <button
                    type="button"
                    className="cc-btn-secondary"
                    style={{ height: 28, padding: "0 10px" }}
                    onClick={() => setIsNotifOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {notifications.length === 0 ? (
                    <div style={{ color: "#64748b", fontSize: 13 }}>No notifications.</div>
                  ) : (
                    notifications.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        style={{
                          textAlign: "left",
                          background: "transparent",
                          padding: 8,
                          borderRadius: 10,
                          cursor: "pointer",
                          border: n.unread ? "1px solid #e9d5ff" : "1px solid transparent",
                        }}
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)),
                          );
                        }}
                      >
                        <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 13 }}>
                          {n.title}
                        </div>
                        <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
                          {n.body}
                        </div>
                        <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 4 }}>
                          {n.createdAt}
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                  <button
                    type="button"
                    className="cc-btn-secondary"
                    style={{ height: 30, padding: "0 12px" }}
                    onClick={() => {
                      setNotifications((prev) => prev.map((x) => ({ ...x, unread: false })));
                    }}
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

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
              <span className="header-user-role">Discipline Coordinator</span>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          {(casesError || (casesLoading && cases.length === 0)) && (
            <div
              role="status"
              style={{
                marginBottom: 16,
                padding: "12px 14px",
                borderRadius: 10,
                background: casesError ? "#fef2f2" : "#f8fafc",
                border: `1px solid ${casesError ? "#fecaca" : "#e2e8f0"}`,
                color: casesError ? "#991b1b" : "#475569",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span>
                {casesError
                  ? `Could not load cases: ${casesError}`
                  : "Loading cases…"}
              </span>
              {casesError && (
                <button
                  type="button"
                  className="cc-btn-secondary"
                  style={{ height: 32, padding: "0 12px" }}
                  onClick={() => refreshCases()}
                >
                  Retry
                </button>
              )}
            </div>
          )}
          <div className="page-title-row">
            <div>
              <h1>Case Management</h1>
              <p>Manage and track all disciplinary cases</p>
            </div>

            <button
              className="btn-new-case"
              type="button"
              onClick={() => setIsNewCaseOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3.333v9.334M3.333 8h9.334"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              New Case
            </button>
          </div>

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

          <div className="cases-panel">
            <div className="cases-panel-header">
              <div className="cases-panel-top">
                <div className="cases-panel-title">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M16.667 2.5H3.333C2.413 2.5 1.667 3.246 1.667 4.167v11.666c0 .92.746 1.667 1.666 1.667h13.334c.92 0 1.666-.746 1.666-1.667V4.167c0-.92-.746-1.667-1.666-1.667z"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.667 7.5h6.666M6.667 10.833h4.166"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  All Cases
                </div>

                <button
                  className="btn-export"
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M14 10v2.667A1.333 1.333 0 0112.667 14H3.333A1.333 1.333 0 012 12.667V10M5.333 6.667L8 9.333l2.667-2.666M8 9.333V2"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Export
                </button>
              </div>

              <div className="confidential-notice">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle
                    cx="6"
                    cy="6"
                    r="5"
                    stroke="#f54900"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M6 4v2.5M6 8h.006"
                    stroke="#f54900"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                Confidential - Handle with discretion
              </div>

              <div className="search-bar-wrapper">
                <span className="search-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="7.333"
                      cy="7.333"
                      r="4.667"
                      stroke="#64748b"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 14l-2.667-2.667"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
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

              <div className="tab-list">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`tab-btn${activeTab === tab.key ? " tab-active" : ""}`}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label(cases)}
                  </button>
                ))}
              </div>
            </div>

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
                      <td>
                        <StatusBadge status={c.status} />
                      </td>
                      <td>
                        <PriorityBadge priority={c.priority} />
                      </td>
                      <td className="cell-date">{c.date}</td>
                      <td className="cell-text">{c.officer}</td>
                      <td>
                        <button
                          className="btn-view"
                          type="button"
                          onClick={() => {
                            setSelectedCase(c);
                            setStatusUpdate(c.status);
                            setStatusNote("");
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M1.333 8S3.333 3.333 8 3.333 14.667 8 14.667 8 12.667 12.667 8 12.667 1.333 8 1.333 8z"
                              stroke="#374151"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="8"
                              cy="8"
                              r="1.667"
                              stroke="#374151"
                              strokeWidth="1.5"
                            />
                          </svg>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        style={{
                          textAlign: "center",
                          color: "#64748b",
                          padding: "32px 8px",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
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

      {selectedCase && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setSelectedCase(null)}
        >
          <div
            className="cc-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="cc-modal-header">
              <div className="cc-modal-title">Case Details</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setSelectedCase(null)}
              >
                ✕
              </button>
            </div>

            <div className="cc-modal-body">
              <div style={{ marginBottom: 12 }}>
                <div className="cc-label">Case ID</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>
                  {selectedCase.id}
                </div>
              </div>

              <div className="cc-modal-row">
                <div>
                  <div className="cc-label">Student</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedCase.student}
                  </div>
                </div>
                <div>
                  <div className="cc-label">Student ID</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedCase.studentId}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div className="cc-label">Case Type</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>
                  {selectedCase.caseType}
                </div>
              </div>

              <div className="cc-modal-row">
                <div>
                  <div className="cc-label">Status</div>
                  <div style={{ marginTop: 6 }}>
                    <StatusBadge status={selectedCase.status} />
                  </div>
                </div>
                <div>
                  <div className="cc-label">Priority</div>
                  <div style={{ marginTop: 6 }}>
                    <PriorityBadge priority={selectedCase.priority} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Reporting Officer</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>
                  {selectedCase.officer}
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div className="cc-label">Case Description</div>
                <div
                  style={{
                    color: "#0f172a",
                    fontSize: 14,
                    lineHeight: "20px",
                    marginTop: 6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedCase.description || "No description provided."}
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div className="cc-label">Evidence Submitted</div>
                {selectedCase.evidence && selectedCase.evidence.length > 0 ? (
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedCase.evidence.map((ev, idx) => (
                      <div key={`${ev.name}-${idx}`} style={{ color: "#0f172a", fontSize: 14 }}>
                        <span style={{ fontWeight: 600 }}>{ev.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ marginTop: 6, color: "#64748b", fontSize: 14 }}>
                    No evidence submitted.
                  </div>
                )}
              </div>

              <div className="cc-modal-row" style={{ marginTop: 14 }}>
                <div className="cc-field">
                  <div className="cc-label">Update Status</div>
                  <select
                    className="cc-input"
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                  >
                    <option value="new">new</option>
                    <option value="ongoing">ongoing</option>
                    <option value="pending">pending</option>
                    <option value="closed">closed</option>
                  </select>
                </div>
              </div>

              <div className="cc-field" style={{ marginTop: 12 }}>
                <div className="cc-label">Notes (optional)</div>
                <textarea
                  className="cc-textarea"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Add an update note for this case..."
                />
              </div>
            </div>

            {caseModalError && (
              <div className="cc-form-error" role="alert" style={{ padding: "0 20px 12px" }}>
                {caseModalError}
              </div>
            )}
            <div className="cc-modal-actions">
              <button
                className="cc-btn-secondary"
                type="button"
                onClick={() => setSelectedCase(null)}
              >
                Close
              </button>
              <button
                className="cc-btn-primary"
                type="button"
                onClick={async () => {
                  setCaseModalError(null);
                  try {
                    await updateCaseStatus(selectedCase.id, statusUpdate, statusNote);
                    setSelectedCase(null);
                  } catch (err) {
                    setCaseModalError(
                      err?.message || "Could not update case. Check Supabase and try again.",
                    );
                  }
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {isNewCaseOpen && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setIsNewCaseOpen(false)}
        >
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">New Case</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setIsNewCaseOpen(false)}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const nextErrors = {};

                if (!newCaseForm.student.trim())
                  nextErrors.student = "Student Name is required.";
                if (!newCaseForm.studentId.trim())
                  nextErrors.studentId = "Student ID is required.";
                if (!newCaseForm.caseType)
                  nextErrors.caseType = "Case Type is required.";
                if (!newCaseForm.description.trim())
                  nextErrors.description = "Description is required.";
                if (!newCaseEvidence)
                  nextErrors.evidence = "Evidence file is required.";

                setNewCaseErrors(nextErrors);
                if (Object.keys(nextErrors).length > 0) return;

                try {
                  await createCase({
                    student: newCaseForm.student,
                    studentId: newCaseForm.studentId,
                    caseType: newCaseForm.caseType,
                    description: newCaseForm.description,
                    priority: newCaseForm.priority,
                    evidence: [
                      {
                        name: newCaseEvidence.name,
                        kind: "upload",
                      },
                    ],
                    officer: "Discipline Office",
                  });

                  setIsNewCaseOpen(false);
                  setNewCaseForm({
                    student: "",
                    studentId: "",
                    caseType: "",
                    priority: "medium",
                    description: "",
                  });
                  setNewCaseEvidence(null);
                  setNewCaseErrors({});
                } catch (err) {
                  setNewCaseErrors({
                    _submit: err?.message || "Could not create case. Check Supabase and try again.",
                  });
                }
              }}
            >
              <div className="cc-modal-body">
                {newCaseErrors._submit && (
                  <div className="cc-form-error" role="alert" style={{ marginBottom: 12 }}>
                    {newCaseErrors._submit}
                  </div>
                )}
                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Student Name</div>
                    <input
                      className={`cc-input${
                        newCaseErrors.student ? " cc-input-error" : ""
                      }`}
                      placeholder="e.g., Michael Tan"
                      value={newCaseForm.student}
                      onChange={(e) =>
                        setNewCaseForm((prev) => ({
                          ...prev,
                          student: e.target.value,
                        }))
                      }
                      aria-invalid={Boolean(newCaseErrors.student)}
                    />
                    {newCaseErrors.student && (
                      <div className="cc-form-error" role="alert">
                        {newCaseErrors.student}
                      </div>
                    )}
                  </div>
                  <div className="cc-field">
                    <div className="cc-label">Student ID</div>
                    <input
                      className={`cc-input${
                        newCaseErrors.studentId ? " cc-input-error" : ""
                      }`}
                      placeholder="2023-12345"
                      value={newCaseForm.studentId}
                      onChange={(e) =>
                        setNewCaseForm((prev) => ({
                          ...prev,
                          studentId: e.target.value,
                        }))
                      }
                      aria-invalid={Boolean(newCaseErrors.studentId)}
                    />
                    {newCaseErrors.studentId && (
                      <div className="cc-form-error" role="alert">
                        {newCaseErrors.studentId}
                      </div>
                    )}
                  </div>
                </div>

                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Case Type</div>
                    <select
                      className={`cc-input${
                        newCaseErrors.caseType ? " cc-input-error" : ""
                      }`}
                      value={newCaseForm.caseType}
                      onChange={(e) =>
                        setNewCaseForm((prev) => ({
                          ...prev,
                          caseType: e.target.value,
                        }))
                      }
                      aria-invalid={Boolean(newCaseErrors.caseType)}
                    >
                      <option value="">Select case type</option>
                      {CASE_TYPE_OPTIONS.map((opt) => (
                        <option value={opt} key={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {newCaseErrors.caseType && (
                      <div className="cc-form-error" role="alert">
                        {newCaseErrors.caseType}
                      </div>
                    )}
                  </div>
                </div>

                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Priority</div>
                    <select
                      className="cc-input"
                      value={newCaseForm.priority}
                      onChange={(e) =>
                        setNewCaseForm((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                    >
                      {PRIORITY_OPTIONS.map((p) => (
                        <option value={p} key={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="cc-field">
                  <div className="cc-label">Notes</div>
                  <textarea
                    className="cc-textarea"
                    placeholder="Add a brief description..."
                    value={newCaseForm.description}
                    onChange={(e) =>
                      setNewCaseForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    aria-invalid={Boolean(newCaseErrors.description)}
                  />
                  {newCaseErrors.description && (
                    <div className="cc-form-error" role="alert">
                      {newCaseErrors.description}
                    </div>
                  )}
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Evidence Upload</div>
                  <input
                    className={`cc-input${
                      newCaseErrors.evidence ? " cc-input-error" : ""
                    }`}
                    type="file"
                    onChange={(e) => setNewCaseEvidence(e.target.files?.[0] || null)}
                    aria-invalid={Boolean(newCaseErrors.evidence)}
                  />
                  {newCaseEvidence && (
                    <div style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>
                      Selected: <span style={{ color: "#0f172a" }}>{newCaseEvidence.name}</span>
                    </div>
                  )}
                  {newCaseErrors.evidence && (
                    <div className="cc-form-error" role="alert">
                      {newCaseErrors.evidence}
                    </div>
                  )}
                </div>
              </div>

              <div className="cc-modal-actions">
                <button
                  className="cc-btn-secondary"
                  type="button"
                  onClick={() => setIsNewCaseOpen(false)}
                >
                  Cancel
                </button>
                <button className="cc-btn-primary" type="submit">
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isExportOpen && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setIsExportOpen(false)}
        >
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">Export Cases</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setIsExportOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cc-modal-body">
              <div style={{ color: "#64748b", fontSize: 14, lineHeight: "20px" }}>
                This will download the currently filtered cases as a JSON file.
              </div>
            </div>

            <div className="cc-modal-actions">
              <button
                className="cc-btn-primary"
                type="button"
                onClick={handleExport}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;

