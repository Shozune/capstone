import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";
import "./CaseManagementSubpages.css";

const REFERRALS = [
  {
    referralId: "RF-2026-001",
    studentName: "Michael Tan",
    studentId: "2023-10234",
    referralType: "Guidance Counseling",
    reason: "Student reported stress and requested counseling support.",
    status: "Pending",
    date: "Feb 12, 2026",
    evidence: [{ name: "Counseling Request Form.pdf" }],
  },
  {
    referralId: "RF-2026-002",
    studentName: "Sarah Wong",
    studentId: "2023-11056",
    referralType: "Health Services",
    reason: "Follow-up required for documented concerns.",
    status: "Approved",
    date: "Feb 13, 2026",
    evidence: [{ name: "Student Health Record.pdf" }],
  },
];

const REFERRAL_TYPES = [
  "Guidance Counseling",
  "Health Services",
  "Student Development",
  "Discipline Follow-up",
  "Other",
];

export default function Referrals() {
  const [referrals, setReferrals] = useState(REFERRALS);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const [form, setForm] = useState({
    studentName: "",
    studentId: "",
    referralType: "",
    reason: "",
  });
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [errors, setErrors] = useState({});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return referrals;
    return referrals.filter((r) => {
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q) ||
        r.referralId.toLowerCase().includes(q) ||
        r.referralType.toLowerCase().includes(q)
      );
    });
  }, [referrals, search]);

  const statusPill = (status) => {
    const s = String(status).toLowerCase();
    if (s.includes("approved")) return "completed";
    if (s.includes("pending")) return "scheduled";
    return "scheduled";
  };

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
            <span className="notif-badge">{referrals.filter((r) => r.status === "Pending").length}</span>
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
              <h1>Referrals</h1>
              <p>Manage referrals to other campus offices</p>
            </div>
            <button className="cc-btn-primary" type="button" onClick={() => setIsNewOpen(true)}>
              New Referral
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
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, ID, or type..." />
                </div>
                <div style={{ width: 240, textAlign: "right" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14 }}>
                    Referrals ({filtered.length})
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Referral ID</th>
                    <th>Student</th>
                    <th>Referral Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.referralId}>
                      <td style={{ fontWeight: 600 }}>{r.referralId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{r.studentName}</div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>{r.studentId}</div>
                      </td>
                      <td>{r.referralType}</td>
                      <td>
                        <span className={`cc-pill ${statusPill(r.status)}`}>{r.status}</span>
                      </td>
                      <td>{r.date}</td>
                      <td>
                        <button className="cc-btn-secondary" type="button" onClick={() => setSelected(r)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "24px 8px", color: "#64748b" }}>
                        No referrals found.
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
              <div className="cc-modal-title">Referral Details</div>
              <button className="cc-modal-close" type="button" aria-label="Close" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className="cc-modal-body">
              <div className="cc-modal-row">
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Referral ID</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.referralId}</div>
                </div>
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Date</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.date}</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Student</div>
                <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.studentName}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{selected.studentId}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Referral Type</div>
                <div style={{ fontWeight: 600, color: "#0f172a", marginTop: 6 }}>{selected.referralType}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Reason</div>
                <div style={{ color: "#0f172a", fontSize: 14, marginTop: 6 }}>{selected.reason}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="cc-label">Attachments</div>
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
                  setReferrals((prev) =>
                    prev.map((r) =>
                      r.referralId === selected.referralId ? { ...r, status: "Approved" } : r,
                    ),
                  );
                  setSelected((prev) => (prev ? { ...prev, status: "Approved" } : prev));
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
              <div className="cc-modal-title">New Referral</div>
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
                if (!form.referralType) nextErrors.referralType = "Referral Type is required.";
                if (!form.reason.trim()) nextErrors.reason = "Reason is required.";
                if (!evidenceFile) nextErrors.evidence = "Attachment is required (mock).";

                setErrors(nextErrors);
                if (Object.keys(nextErrors).length > 0) return;

                const nextId = `RF-2026-${String(referrals.length + 1).padStart(3, "0")}`;
                const now = new Date();
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const date = `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

                const newReferral = {
                  referralId: nextId,
                  studentName: form.studentName.trim(),
                  studentId: form.studentId.trim(),
                  referralType: form.referralType,
                  reason: form.reason.trim(),
                  status: "Pending",
                  date,
                  evidence: [{ name: evidenceFile.name }],
                };

                setReferrals((prev) => [...prev, newReferral]);
                setSelected(newReferral);
                setIsNewOpen(false);
                setErrors({});
                setEvidenceFile(null);
                setForm({ studentName: "", studentId: "", referralType: "", reason: "" });
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
                      placeholder="e.g., Michael Tan"
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
                      placeholder="e.g., 2023-10234"
                      aria-invalid={Boolean(errors.studentId)}
                    />
                    {errors.studentId && <div className="cc-form-error" role="alert">{errors.studentId}</div>}
                  </div>
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Referral Type</div>
                  <select
                    className={`cc-input${errors.referralType ? " cc-input-error" : ""}`}
                    value={form.referralType}
                    onChange={(e) => setForm((p) => ({ ...p, referralType: e.target.value }))}
                    aria-invalid={Boolean(errors.referralType)}
                  >
                    <option value="">Select type</option>
                    {REFERRAL_TYPES.map((t) => (
                      <option value={t} key={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.referralType && <div className="cc-form-error" role="alert">{errors.referralType}</div>}
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Reason</div>
                  <textarea
                    className="cc-textarea"
                    value={form.reason}
                    onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
                    placeholder="Describe reason for referral..."
                    aria-invalid={Boolean(errors.reason)}
                  />
                  {errors.reason && <div className="cc-form-error" role="alert">{errors.reason}</div>}
                </div>

                <div className="cc-field" style={{ marginTop: 12 }}>
                  <div className="cc-label">Attachment</div>
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
                  Create Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

