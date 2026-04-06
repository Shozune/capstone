import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";
import "./CaseManagementSubpages.css";

const DOC_REQUESTS = [
  {
    requestId: "DR-2026-0001",
    studentName: "Sofia Gonzalez",
    studentId: "2023-10989",
    documentType: "Good Moral Certificate",
    priority: "high",
    status: "Pending Admission",
    requestedDate: "Feb 10, 2026",
    description: "Request for good moral standing for enrollment requirements.",
    evidence: [{ name: "Request Form - Sofia Gonzalez.pdf" }],
  },
  {
    requestId: "DR-2026-0002",
    studentName: "Ivan Garcia",
    studentId: "2024-10012",
    documentType: "Transcript of Records",
    priority: "medium",
    status: "Approved",
    requestedDate: "Feb 11, 2026",
    description: "Transcript request for scholarship documentation.",
    evidence: [{ name: "Scholarship Letter.pdf" }],
  },
  {
    requestId: "DR-2026-0003",
    studentName: "Ruth Mendoza",
    studentId: "2022-09021",
    documentType: "Certificate of Enrollment",
    priority: "low",
    status: "Awaiting Admission",
    requestedDate: "Feb 12, 2026",
    description: "Enrollment certificate required for internship processing.",
    evidence: [{ name: "HR Internship Email.eml" }],
  },
];

const PRIORITY_OPTIONS = ["low", "medium", "high"];
const DOCUMENT_TYPE_OPTIONS = [
  "Good Moral Certificate",
  "Transcript of Records",
  "Certificate of Enrollment",
  "Honorable Dismissal / Clearance",
  "Other",
];

const statusColor = (status) => {
  if (String(status).toLowerCase().includes("approved")) return "completed";
  if (String(status).toLowerCase().includes("pending")) return "scheduled";
  return "scheduled";
};

export default function DocumentRequests() {
  const [requests, setRequests] = useState(DOC_REQUESTS);
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const [newForm, setNewForm] = useState({
    studentName: "",
    studentId: "",
    documentType: "",
    priority: "medium",
    description: "",
  });
  const [newEvidence, setNewEvidence] = useState(null);
  const [newErrors, setNewErrors] = useState({});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter((r) => {
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q) ||
        r.documentType.toLowerCase().includes(q) ||
        r.requestId.toLowerCase().includes(q)
      );
    });
  }, [requests, search]);

  const handleCreate = () => {
    const nextErrors = {};
    if (!newForm.studentName.trim())
      nextErrors.studentName = "Student Name is required.";
    if (!newForm.studentId.trim())
      nextErrors.studentId = "Student ID is required.";
    if (!newForm.documentType)
      nextErrors.documentType = "Document Type is required.";
    if (!newForm.description.trim())
      nextErrors.description = "Description is required.";
    if (!newEvidence)
      nextErrors.evidence = "Attachment is required (mock).";

    setNewErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newRequestId = `DR-2026-${String(requests.length + 1).padStart(4, "0")}`;
    const next = {
      requestId: newRequestId,
      studentName: newForm.studentName.trim(),
      studentId: newForm.studentId.trim(),
      documentType: newForm.documentType,
      priority: newForm.priority,
      status: "Pending Admission",
      requestedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      description: newForm.description.trim(),
      evidence: [{ name: newEvidence.name }],
    };

    setRequests((prev) => [...prev, next]);
    setSelectedRequest(next);
    setIsNewOpen(false);
    setNewEvidence(null);
    setNewErrors({});
    setNewForm({
      studentName: "",
      studentId: "",
      documentType: "",
      priority: "medium",
      description: "",
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="header-notifications" type="button" aria-label="Notifications">
            <span className="notif-badge">{requests.filter((r) => String(r.status).toLowerCase().includes("pending")).length}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M15 6.667A5 5 0 005 6.667C5 10.833 3.333 12.5 3.333 12.5h13.334S15 10.833 15 6.667zM11.442 17.5a1.667 1.667 0 01-2.884 0"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
              <span className="header-user-role">Discipline Coordinator</span>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="page-title-row">
            <div>
              <h1>Document Requests</h1>
              <p>Track, validate, and process student document requests</p>
            </div>
            <button className="cc-btn-primary" type="button" onClick={() => setIsNewOpen(true)}>
              New Request
            </button>
          </div>

          <section className="cc-card" style={{ marginTop: 24 }}>
            <div className="cc-card-header">
              <div className="cc-search-row">
                <div className="cc-search">
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      color: "#0f172a",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Search
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, ID, or document type..."
                  />
                </div>
                <div style={{ width: 240, textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      color: "#0f172a",
                      fontSize: 14,
                    }}
                  >
                    Requests ({filtered.length})
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Student</th>
                    <th>Document Type</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Requested Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.requestId}>
                      <td style={{ fontWeight: 600 }}>{r.requestId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{r.studentName}</div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>{r.studentId}</div>
                      </td>
                      <td>{r.documentType}</td>
                      <td>
                        <span className={`cc-pill ${statusColor(r.status)}`}>{r.status}</span>
                      </td>
                      <td>
                        <span className={`badge badge-${r.priority}`}>{r.priority}</span>
                      </td>
                      <td>{r.requestedDate}</td>
                      <td>
                        <button
                          className="cc-btn-secondary"
                          type="button"
                          onClick={() => setSelectedRequest(r)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "24px 8px", color: "#64748b" }}>
                        No document requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {selectedRequest && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setSelectedRequest(null)}
        >
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">Request Details</div>
              <button className="cc-modal-close" type="button" aria-label="Close" onClick={() => setSelectedRequest(null)}>
                ✕
              </button>
            </div>

            <div className="cc-modal-body">
              <div className="cc-modal-row">
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Request ID</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selectedRequest.requestId}</div>
                </div>
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Requested Date</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selectedRequest.requestedDate}</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Student Information</div>
                <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selectedRequest.studentName}</div>
                <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{selectedRequest.studentId}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Document Type</div>
                <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selectedRequest.documentType}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Description</div>
                <div style={{ color: "#0f172a", fontSize: 14, marginTop: 6 }}>{selectedRequest.description}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Attachments</div>
                <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
                  {(selectedRequest.evidence || []).map((ev, idx) => (
                    <div key={`${ev.name}-${idx}`} style={{ color: "#0f172a", fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>{ev.name}</span>
                    </div>
                  ))}
                  {(selectedRequest.evidence || []).length === 0 && (
                    <div style={{ color: "#64748b", fontSize: 14 }}>No attachments submitted.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="cc-modal-actions">
              <button className="cc-btn-secondary" type="button" onClick={() => setSelectedRequest(null)}>
                Close
              </button>
              <button
                className="cc-btn-primary"
                type="button"
                onClick={() => {
                  // Simple UI-only action: mark as approved.
                  setRequests((prev) =>
                    prev.map((r) =>
                      r.requestId === selectedRequest.requestId
                        ? { ...r, status: "Approved" }
                        : r,
                    ),
                  );
                  setSelectedRequest((prev) =>
                    prev ? { ...prev, status: "Approved" } : prev,
                  );
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {isNewOpen && (
        <div className="cc-modal-overlay" role="dialog" aria-modal="true" onMouseDown={() => setIsNewOpen(false)}>
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">New Document Request</div>
              <button className="cc-modal-close" type="button" aria-label="Close" onClick={() => setIsNewOpen(false)}>
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
              }}
            >
              <div className="cc-modal-body">
                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Student Name</div>
                    <input
                      className={`cc-input${newErrors.studentName ? " cc-input-error" : ""}`}
                      value={newForm.studentName}
                      onChange={(e) => setNewForm((p) => ({ ...p, studentName: e.target.value }))}
                      placeholder="e.g., Sofia Gonzalez"
                      aria-invalid={Boolean(newErrors.studentName)}
                    />
                    {newErrors.studentName && (
                      <div className="cc-form-error" role="alert">
                        {newErrors.studentName}
                      </div>
                    )}
                  </div>
                  <div className="cc-field">
                    <div className="cc-label">Student ID</div>
                    <input
                      className={`cc-input${newErrors.studentId ? " cc-input-error" : ""}`}
                      value={newForm.studentId}
                      onChange={(e) => setNewForm((p) => ({ ...p, studentId: e.target.value }))}
                      placeholder="e.g., 2023-10989"
                      aria-invalid={Boolean(newErrors.studentId)}
                    />
                    {newErrors.studentId && (
                      <div className="cc-form-error" role="alert">
                        {newErrors.studentId}
                      </div>
                    )}
                  </div>
                </div>

                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Document Type</div>
                    <select
                      className={`cc-input${newErrors.documentType ? " cc-input-error" : ""}`}
                      value={newForm.documentType}
                      onChange={(e) => setNewForm((p) => ({ ...p, documentType: e.target.value }))}
                      aria-invalid={Boolean(newErrors.documentType)}
                    >
                      <option value="">Select document type</option>
                      {DOCUMENT_TYPE_OPTIONS.map((opt) => (
                        <option value={opt} key={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {newErrors.documentType && (
                      <div className="cc-form-error" role="alert">
                        {newErrors.documentType}
                      </div>
                    )}
                  </div>

                  <div className="cc-field">
                    <div className="cc-label">Priority</div>
                    <select
                      className="cc-input"
                      value={newForm.priority}
                      onChange={(e) => setNewForm((p) => ({ ...p, priority: e.target.value }))}
                    >
                      {PRIORITY_OPTIONS.map((p) => (
                        <option value={p} key={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Description</div>
                  <textarea
                    className={`cc-textarea${newErrors.description ? " cc-input-error" : ""}`}
                    value={newForm.description}
                    onChange={(e) => setNewForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Describe the request..."
                    aria-invalid={Boolean(newErrors.description)}
                  />
                  {newErrors.description && (
                    <div className="cc-form-error" role="alert">
                      {newErrors.description}
                    </div>
                  )}
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Attachment</div>
                  <input
                    className={`cc-input${newErrors.evidence ? " cc-input-error" : ""}`}
                    type="file"
                    onChange={(e) => setNewEvidence(e.target.files?.[0] || null)}
                    aria-invalid={Boolean(newErrors.evidence)}
                  />
                  {newEvidence && (
                    <div style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>
                      Selected: <span style={{ color: "#0f172a" }}>{newEvidence.name}</span>
                    </div>
                  )}
                  {newErrors.evidence && (
                    <div className="cc-form-error" role="alert">
                      {newErrors.evidence}
                    </div>
                  )}
                </div>
              </div>

              <div className="cc-modal-actions">
                <button className="cc-btn-secondary" type="button" onClick={() => setIsNewOpen(false)}>
                  Cancel
                </button>
                <button className="cc-btn-primary" type="submit">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

