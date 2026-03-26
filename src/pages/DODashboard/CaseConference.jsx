import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./CaseManagementPage.css";
import "./CaseManagementSubpages.css";

const CONFERENCES = [
  {
    conferenceId: "H-006",
    caseId: "DC-2024-088",
    caseTitle: "Plagiarism",
    day: 24,
    dateLabel: "Feb 24, 2026",
    timeLabel: "10:00 AM",
    durationLabel: "1 hour",
    location: "Discipline Office",
    status: "scheduled",
    attendees: ["Michael Tan", "Discipline Coordinator", "Case Officer"],
    notes: "Hearing to review evidence and statements.",
  },
  {
    conferenceId: "Y-023",
    caseId: "DC-2024-089",
    caseTitle: "Academic Dishonesty",
    day: 25,
    dateLabel: "Feb 25, 2026",
    timeLabel: "2:00 PM",
    durationLabel: "45 minutes",
    location: "e.g., Case Room",
    status: "scheduled",
    attendees: ["Diana Lopez", "Discipline Coordinator", "Registrar"],
    notes: "Hearing to determine appropriate sanctions.",
  },
  {
    conferenceId: "Y-024",
    caseId: "DC-2024-085",
    caseTitle: "Falsification of Records",
    day: 27,
    dateLabel: "Feb 27, 2026",
    timeLabel: "9:00 AM",
    durationLabel: "1 hour",
    location: "Case Room",
    status: "scheduled",
    attendees: ["Sarah Wong", "Discipline Coordinator", "Case Officer"],
    notes: "Hearing for document review and case discussion.",
  },
  {
    conferenceId: "A-011",
    caseId: "DC-2024-091",
    caseTitle: "Attendance Violation",
    day: 20,
    dateLabel: "Feb 20, 2026",
    timeLabel: "1:00 PM",
    durationLabel: "30 minutes",
    location: "Discipline Office",
    status: "completed",
    attendees: ["James Garcia", "Discipline Coordinator"],
    notes: "Completed conference.",
  },
  {
    conferenceId: "M-012",
    caseId: "DC-2024-092",
    caseTitle: "Property Damage",
    day: 18,
    dateLabel: "Feb 18, 2026",
    timeLabel: "3:00 PM",
    durationLabel: "1 hour",
    location: "Discipline Office",
    status: "cancelled",
    attendees: ["Lisa Martinez", "Discipline Coordinator"],
    notes: "Conference cancelled.",
  },
];

const ConferencePill = ({ status }) => {
  const cls =
    status === "completed"
      ? "completed"
      : status === "cancelled"
        ? "cancelled"
        : "scheduled";
  return <span className={`cc-pill ${cls}`}>{status}</span>;
};

const CaseConference = () => {
  const [selectedDay, setSelectedDay] = useState(24);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);

  const stats = useMemo(() => {
    const scheduled = CONFERENCES.filter((c) => c.status === "scheduled").length;
    const completed = CONFERENCES.filter((c) => c.status === "completed").length;
    const cancelled = CONFERENCES.filter((c) => c.status === "cancelled").length;
    // Simple heuristic for "this week": days 20-28
    const thisWeek = CONFERENCES.filter((c) => c.day >= 20 && c.day <= 28).length;
    return { scheduled, thisWeek, completed, cancelled };
  }, []);

  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const c of CONFERENCES) {
      map.set(c.day, (map.get(c.day) || []).concat(c));
    }
    return map;
  }, []);

  const upcoming = useMemo(() => {
    const scheduled = CONFERENCES.filter((c) => c.status === "scheduled");
    // Pick the first scheduled by day
    return scheduled.sort((a, b) => a.day - b.day)[0] || null;
  }, []);

  const conferenceList = useMemo(() => {
    return [...CONFERENCES].sort((a, b) => a.day - b.day);
  }, []);

  const activeEvents = eventsByDay.get(selectedDay) || [];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        {/* Top Header */}
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
              <h1>Case Conference</h1>
              <p>Manage and track disciplinary hearings</p>
            </div>
            <button
              className="cc-schedule-btn"
              type="button"
              onClick={() => setIsScheduleOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2.667V13.333M2.667 8H13.333"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Schedule Hearing
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-value total">{stats.scheduled}</p>
              <p className="stat-label">Scheduled Conferences</p>
            </div>
            <div className="stat-card">
              <p className="stat-value new">{stats.thisWeek}</p>
              <p className="stat-label">This Week</p>
            </div>
            <div className="stat-card">
              <p className="stat-value ongoing">{stats.completed}</p>
              <p className="stat-label">Completed</p>
            </div>
            <div className="stat-card">
              <p className="stat-value closed">{stats.cancelled}</p>
              <p className="stat-label">Cancelled</p>
            </div>
          </div>

          <div className="cc-two-column">
            <section className="cc-col-main cc-card">
              <div className="cc-card-header">
                <div className="cc-calendar-head">
                  <div className="cc-month-nav">
                    <button className="cc-icon-btn" type="button" aria-label="Previous month">
                      ‹
                    </button>
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          color: "#0f172a",
                          fontSize: 16,
                          lineHeight: "20px",
                        }}
                      >
                        February 2026
                      </div>
                      <div style={{ fontFamily: "Inter, sans-serif", color: "#64748b", fontSize: 12 }}>
                        Click a date to view conference
                      </div>
                    </div>
                    <button className="cc-icon-btn" type="button" aria-label="Next month">
                      ›
                    </button>
                  </div>
                </div>

                <div className="cc-weekdays" aria-hidden="true">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div className="cc-weekday" key={d}>
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              <div className="cc-card-body">
                <div className="cc-calendar-grid">
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                    const hasEvent = eventsByDay.has(day);
                    const selected = day === selectedDay;
                    const cls = [
                      "cc-day",
                      hasEvent ? "has-event" : "",
                      selected ? "selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <button
                        key={day}
                        type="button"
                        className={cls}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 14 }}>
                    {activeEvents.length > 0 ? "Upcoming Conference" : "No conference"}
                  </div>
                  {activeEvents.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      {activeEvents.slice(0, 2).map((c) => (
                        <div key={c.conferenceId} style={{ marginBottom: 8 }}>
                          <div style={{ fontWeight: 600 }}>{c.caseId}</div>
                          <div style={{ color: "#64748b", fontSize: 12 }}>
                            {c.timeLabel} • {c.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <aside className="cc-col-side">
              <div className="cc-card">
                <div className="cc-card-header">
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 16 }}>
                    Upcoming Conference
                  </div>
                  <div style={{ marginTop: 6, color: "#64748b", fontSize: 12 }}>
                    Next 7 days
                  </div>
                </div>
                <div className="cc-card-body">
                  {upcoming ? (
                    <div className="cc-upcoming-item">
                      <div style={{ marginTop: 2 }}>
                        <ConferencePill status={upcoming.status} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>
                          {upcoming.caseTitle}
                        </div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>
                          {upcoming.dateLabel} • {upcoming.timeLabel}
                        </div>
                        <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
                          {upcoming.location}
                        </div>
                        <div style={{ marginTop: 12 }}>
                          <button
                            className="cc-btn-secondary"
                            type="button"
                            onClick={() => setSelectedConference(upcoming)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: "#64748b", fontSize: 14 }}>No upcoming conferences.</div>
                  )}
                </div>
              </div>
            </aside>
          </div>

          <section className="cc-card" style={{ marginTop: 24 }}>
            <div className="cc-card-header">
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#0f172a", fontSize: 16 }}>
                All Scheduled Case Conferences
              </div>
              <div style={{ marginTop: 6, color: "#64748b", fontSize: 12 }}>
                Complete list of conferences
              </div>
            </div>
            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {conferenceList.map((c) => (
                    <tr key={c.conferenceId}>
                      <td style={{ fontWeight: 600 }}>{c.caseId}</td>
                      <td>{c.dateLabel}</td>
                      <td>{c.timeLabel}</td>
                      <td>{c.location}</td>
                      <td>
                        <ConferencePill status={c.status} />
                      </td>
                      <td>
                        <button
                          className="cc-btn-secondary"
                          type="button"
                          onClick={() => setSelectedConference(c)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {isScheduleOpen && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setIsScheduleOpen(false)}
        >
          <div className="cc-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <div className="cc-modal-title">Schedule New Case Conference</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setIsScheduleOpen(false)}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsScheduleOpen(false);
              }}
            >
              <div className="cc-modal-body">
                <div className="cc-field" style={{ marginBottom: 12 }}>
                  <div className="cc-label">Select Case</div>
                  <select className="cc-input" defaultValue={CONFERENCES[0].caseId}>
                    {CONFERENCES.map((c) => (
                      <option value={c.caseId} key={c.conferenceId}>
                        {c.caseId} - {c.caseTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cc-modal-row">
                  <div className="cc-field">
                    <div className="cc-label">Date</div>
                    <input className="cc-input" defaultValue="Feb 26, 2026" />
                  </div>
                  <div className="cc-field">
                    <div className="cc-label">Time</div>
                    <input className="cc-input" defaultValue="10:00 AM" />
                  </div>
                </div>

                <div className="cc-field" style={{ marginBottom: 10 }}>
                  <div className="cc-label">Location</div>
                  <input className="cc-input" defaultValue="e.g., Case Room, Discipline Office" />
                </div>

                <div className="cc-field">
                  <div className="cc-label">Notes</div>
                  <textarea
                    className="cc-textarea"
                    defaultValue="Additional information or special instructions"
                  />
                </div>
              </div>

              <div className="cc-modal-actions">
                <button
                  className="cc-btn-secondary"
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                >
                  Cancel
                </button>
                <button className="cc-btn-primary" type="submit">
                  Schedule Hearing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedConference && (
        <div
          className="cc-modal-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setSelectedConference(null)}
        >
          <div
            className="cc-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="cc-modal-header">
              <div className="cc-modal-title">Case Conference Details</div>
              <button
                className="cc-modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setSelectedConference(null)}
              >
                ✕
              </button>
            </div>

            <div className="cc-modal-body">
              <div className="cc-modal-row">
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Conference ID</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedConference.conferenceId}
                  </div>
                </div>
                <div className="cc-field" style={{ flex: 1 }}>
                  <div className="cc-label">Case ID</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedConference.caseId}
                  </div>
                </div>
              </div>

              <div className="cc-modal-row">
                <div className="cc-field">
                  <div className="cc-label">Date</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedConference.dateLabel}
                  </div>
                </div>
                <div className="cc-field">
                  <div className="cc-label">Time</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>
                    {selectedConference.timeLabel}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div className="cc-label">Location</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>
                  {selectedConference.location}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div className="cc-label">Attendees</div>
                <div style={{ color: "#0f172a", fontSize: 14 }}>
                  {selectedConference.attendees.join(", ")}
                </div>
              </div>

              <div>
                <div className="cc-label">Notes</div>
                <div style={{ color: "#0f172a", fontSize: 14 }}>
                  {selectedConference.notes}
                </div>
              </div>
            </div>

            <div className="cc-modal-actions">
              <button
                className="cc-btn-secondary"
                type="button"
                onClick={() => setSelectedConference(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseConference;

