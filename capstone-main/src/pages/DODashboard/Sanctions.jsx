import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";
import "./CaseManagementSubpages.css";

const SANCTIONS = [
  {
    sanctionId: "SC-2026-001",
    studentName: "James Garcia",
    studentId: "2024-10112",
    sanctionType: "Disciplinary Warning",
    status: "In Review",
    dueDate: "Feb 25, 2026",
    notes: "Review compliance with attendance policy and finalize recommendation.",
    evidence: [{ name: "Attendance Review.pdf" }],
  },
  {
    sanctionId: "SC-2026-002",
    studentName: "Lisa Martinez",
    studentId: "2023-12345",
    sanctionType: "Community Service",
    status: "Approved",
    dueDate: "Feb 28, 2026",
    notes: "Community service scheduled pending final documentation.",
    evidence: [{ name: "Damage Repair Schedule.pdf" }],
  },
];

const SANCTION_TYPES = [
  "Disciplinary Warning",
  "Community Service",
  "Suspension",
  "Probation",
  "Other",
];

const statusClass = (status) => {
  const s = String(status).toLowerCase();
  if (s.includes("approved")) return "completed";
  return "scheduled";
};

export default function Sanctions() {
  const [items, setItems] = useState(SANCTIONS);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const [form, setForm] = useState({
    studentName: "",
    studentId: "",
    sanctionType: "",
    dueDate: "",
    notes: "",
  });
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [errors, setErrors] = useState({});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => {
      return (
        i.studentName.toLowerCase().includes(q) ||
        i.studentId.toLowerCase().includes(q) ||
        i.sanctionId.toLowerCase().includes(q) ||
        i.sanctionType.toLowerCase().includes(q)
      );
    });
  }, [items, search]);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="header-notifications" type="button" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M15 6.667A5 5 0 005 6.667C5 10.833 3.333 12.5 3.333 12.5h13.334S15 10.833 15 6.667zM11.442 17.5a1.667 1.667 0 01-2.884 0"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="notif-badge">{items.filter((i) => i.status === "In Review").length}</span>
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
                <circle cx="8" cy="5.333" r="2.667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              <h1>Sanctions & Compliance</h1>
              <p>Track sanctions and compliance actions</p>
            </div>
            <button className="cc-btn-primary" type="button" onClick={() => setIsNewOpen(true)}>
              New Sanction
            </button>
          </div>

          <section className="cc-card" style={{ marginTop: 24 }}>
            <div className="cc-card-header">
              <div className="cc-search-row">
                <div className="cc-search">
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14, marginBottom: 8 }}>
                    Search
                  </div>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, ID, or sanction type..." />
                </div>
                <div style={{ width: 240, textAlign: "right" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14 }}>
                    Sanctions ({filtered.length})
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Sanction ID</th>
                    <th>Student</th>
                    <th>Sanction Type</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((i) => (
                    <tr key={i.sanctionId}>
                      <td style={{ fontWeight: 600 }}>{i.sanctionId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{i.studentName}</div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>{i.studentId}</div>
                      </td>
                      <td>{i.sanctionType}</td>
                      <td>
                        <span className={`cc-pill ${statusClass(i.status)}`}>{i.status}</span>
                      </td>
                      <td>{i.dueDate}</td>
                      <td>
                        <button className="cc-btn-secondary" type="button" onClick={() => setSelected(i)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "24px 8px", color: "#64748b" }}>
                        No sanctions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {selected && (
        <div className="cc-modal-overlay" role="dialog" aria-modal="true" onMouseDown={() => setSelected(null)}>
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">Sanction Details</div>
              <button className="cc-modal-close" type="button" aria-label="Close" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className="cc-modal-body">
              <div className="cc-modal-row">
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Sanction ID</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.sanctionId}</div>
                </div>
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Due Date</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.dueDate}</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Student</div>
                <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.studentName}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{selected.studentId}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Sanction Type</div>
                <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.sanctionType}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Compliance Notes</div>
                <div style={{ color: "#0f172a", fontSize: 14, marginTop: 6 }}>{selected.notes}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Evidence</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
                  {(selected.evidence || []).map((ev, idx) => (
                    <div key={`${ev.name}-${idx}`} style={{ color: "#0f172a", fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>{ev.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cc-modal-actions">
              <button className="cc-btn-secondary" type="button" onClick={() => setSelected(null)}>
                Close
              </button>
              <button
                className="cc-btn-primary"
                type="button"
                onClick={() => {
                  setItems((prev) =>
                    prev.map((p) =>
                      p.sanctionId === selected.sanctionId ? { ...p, status: "Approved" } : p,
                    ),
                  );
                  setSelected((prev) => (prev ? { ...prev, status: "Approved" } : prev));
                }}
              >
                Mark Approved
              </button>
            </div>
          </div>
        </div>
      )}

      {isNewOpen && (
        <div className="cc-modal-overlay" role="dialog" aria-modal="true" onMouseDown={() => setIsNewOpen(false)}>
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">New Sanction</div>
              <button className="cc-modal-close" type="button" aria-label="Close" onClick={() => setIsNewOpen(false)}>
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const nextErrors = {};
                if (!form.studentName.trim()) nextErrors.studentName = "Student Name is required.";
                if (!form.studentId.trim()) nextErrors.studentId = "Student ID is required.";
                if (!form.sanctionType) nextErrors.sanctionType = "Sanction Type is required.";
                if (!form.dueDate.trim()) nextErrors.dueDate = "Due Date is required.";
                if (!form.notes.trim()) nextErrors.notes = "Notes are required.";
                if (!evidenceFile) nextErrors.evidence = "Evidence attachment is required (mock).";

                setErrors(nextErrors);
                if (Object.keys(nextErrors).length > 0) return;

                const nextId = `SC-2026-${String(items.length + 1).padStart(3, "0")}`;
                const newItem = {
                  sanctionId: nextId,
                  studentName: form.studentName.trim(),
                  studentId: form.studentId.trim(),
                  sanctionType: form.sanctionType,
                  status: "In Review",
                  dueDate: form.dueDate.trim(),
                  notes: form.notes.trim(),
                  evidence: [{ name: evidenceFile.name }],
                };

                setItems((prev) => [...prev, newItem]);
                setSelected(newItem);
                setIsNewOpen(false);
                setErrors({});
                setEvidenceFile(null);
                setForm({ studentName: "", studentId: "", sanctionType: "", dueDate: "", notes: "" });
              }}
            >
              <div className="cc-modal-body">
                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Student Name</div>
                    <input
                      className={`cc-input${errors.studentName ? " cc-input-error" : ""}`}
                      value={form.studentName}
                      onChange={(e) => setForm((p) => ({ ...p, studentName: e.target.value }))}
                      aria-invalid={Boolean(errors.studentName)}
                    />
                    {errors.studentName && <div className="cc-form-error" role="alert">{errors.studentName}</div>}
                  </div>
                  <div className="cc-field">
                    <div className="cc-label">Student ID</div>
                    <input
                      className={`cc-input${errors.studentId ? " cc-input-error" : ""}`}
                      value={form.studentId}
                      onChange={(e) => setForm((p) => ({ ...p, studentId: e.target.value }))}
                      aria-invalid={Boolean(errors.studentId)}
                    />
                    {errors.studentId && <div className="cc-form-error" role="alert">{errors.studentId}</div>}
                  </div>
                </div>

                <div className="cc-modal-row" style={{ marginTop: 12 }}>
                  <div className="cc-field">
                    <div className="cc-label">Sanction Type</div>
                    <select
                      className={`cc-input${errors.sanctionType ? " cc-input-error" : ""}`}
                      value={form.sanctionType}
                      onChange={(e) => setForm((p) => ({ ...p, sanctionType: e.target.value }))}
                      aria-invalid={Boolean(errors.sanctionType)}
                    >
                      <option value="">Select type</option>
                      {SANCTION_TYPES.map((t) => (
                        <option value={t} key={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.sanctionType && <div className="cc-form-error" role="alert">{errors.sanctionType}</div>}
                  </div>
                  <div className="cc-field">
                    <div className="cc-label">Due Date</div>
                    <input
                      className={`cc-input${errors.dueDate ? " cc-input-error" : ""}`}
                      value={form.dueDate}
                      onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
                      placeholder="Feb 28, 2026"
                      aria-invalid={Boolean(errors.dueDate)}
                    />
                    {errors.dueDate && <div className="cc-form-error" role="alert">{errors.dueDate}</div>}
                  </div>
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Notes</div>
                  <textarea
                    className="cc-textarea"
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    aria-invalid={Boolean(errors.notes)}
                  />
                  {errors.notes && <div className="cc-form-error" role="alert">{errors.notes}</div>}
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Evidence Attachment</div>
                  <input
                    className={`cc-input${errors.evidence ? " cc-input-error" : ""}`}
                    type="file"
                    onChange={(e) => setEvidenceFile(e.target.files?.[0] || null)}
                    aria-invalid={Boolean(errors.evidence)}
                  />
                  {errors.evidence && <div className="cc-form-error" role="alert">{errors.evidence}</div>}
                </div>
              </div>

              <div className="cc-modal-actions">
                <button className="cc-btn-secondary" type="button" onClick={() => setIsNewOpen(false)}>
                  Cancel
                </button>
                <button className="cc-btn-primary" type="submit">
                  Create Sanction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

