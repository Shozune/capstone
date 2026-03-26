import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";
import "./CaseManagementSubpages.css";

const REPORTS = [
  {
    reportId: "RP-2026-001",
    title: "Discipline Case Status Summary",
    category: "Discipline",
    generatedAt: "Feb 12, 2026",
    items: 18,
  },
  {
    reportId: "RP-2026-002",
    title: "Student Compliance Monitoring",
    category: "Compliance",
    generatedAt: "Feb 13, 2026",
    items: 12,
  },
  {
    reportId: "RP-2026-003",
    title: "Case Conference Schedule Overview",
    category: "Conferences",
    generatedAt: "Feb 14, 2026",
    items: 6,
  },
];

const CATEGORY_OPTIONS = ["All", "Discipline", "Compliance", "Conferences"];

export default function Reports() {
  const [reports] = useState(REPORTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isExportOpen, setIsExportOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesCategory = category === "All" ? true : r.category === category;
      const matchesQuery = !q
        ? true
        : r.title.toLowerCase().includes(q) ||
          r.reportId.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [reports, search, category]);

  const stats = useMemo(() => {
    return {
      total: reports.length,
      filtered: filtered.length,
      totalItems: filtered.reduce((acc, r) => acc + (r.items || 0), 0),
    };
  }, [reports.length, filtered]);

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      filters: { search, category },
      reports: filtered,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campuscare_reports_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsExportOpen(false);
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
            <span className="notif-badge">1</span>
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
              <h1>Reports & Analytics</h1>
              <p>Generate summaries for cases, compliance, and conferences</p>
            </div>
            <div className="cc-page-actions">
              <button className="cc-btn-primary" type="button" onClick={() => setIsExportOpen(true)}>
                Export
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-value total">{stats.total}</p>
              <p className="stat-label">Total Reports</p>
            </div>
            <div className="stat-card">
              <p className="stat-value new">{stats.filtered}</p>
              <p className="stat-label">Filtered Results</p>
            </div>
            <div className="stat-card">
              <p className="stat-value ongoing">{stats.totalItems}</p>
              <p className="stat-label">Total Items</p>
            </div>
            <div className="stat-card">
              <p className="stat-value closed">—</p>
              <p className="stat-label">Charts (UI-only)</p>
            </div>
          </div>

          <section className="cc-card" style={{ marginTop: 24 }}>
            <div className="cc-card-header">
              <div className="cc-search-row">
                <div className="cc-search">
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14, marginBottom: 8 }}>
                    Search
                  </div>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports..." />
                </div>
                <div style={{ width: 240, textAlign: "right" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14, marginBottom: 8 }}>
                    Category
                  </div>
                  <select className="cc-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Generated At</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.reportId}>
                      <td style={{ fontWeight: 600 }}>{r.reportId}</td>
                      <td>{r.title}</td>
                      <td>{r.category}</td>
                      <td>{r.generatedAt}</td>
                      <td>{r.items}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "24px 8px", color: "#64748b" }}>
                        No reports match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {isExportOpen && (
        <div className="cc-modal-overlay" role="dialog" aria-modal="true" onMouseDown={() => setIsExportOpen(false)}>
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">Export Reports</div>
              <button className="cc-modal-close" type="button" aria-label="Close" onClick={() => setIsExportOpen(false)}>
                ✕
              </button>
            </div>
            <div className="cc-modal-body">
              <div style={{ color: "#64748b", fontSize: 14, lineHeight: "20px" }}>
                This will download the currently filtered reports as JSON.
              </div>
            </div>
            <div className="cc-modal-actions">
              <button className="cc-btn-primary" type="button" onClick={handleExport}>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

