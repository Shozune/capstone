export const CASE_TYPE_OPTIONS = [
  "Academic Dishonesty",
  "Code of Conduct Violation",
  "Attendance Violation",
  "Property Damage",
  "Plagiarism",
  "Disruptive Behavior",
  "Cheating",
  "Falsification of Records",
];

export const PRIORITY_OPTIONS = ["low", "medium", "high"];
export const STATUS_OPTIONS = ["new", "ongoing", "pending", "closed"];

export const DEFAULT_CASES = [
  {
    id: "DC-2024-089",
    student: "Michael Tan",
    studentId: "2023-10234",
    caseType: "Academic Dishonesty",
    status: "ongoing",
    priority: "high",
    date: "Jan 24, 2024",
    officer: "Prof. Santos",
    description:
      "Reported academic dishonesty based on irregular exam submission and corroborating statements.",
    evidence: [
      { name: "Exam Scenarios - Michael Tan.pdf", kind: "exam_screenshots" },
      { name: "Student Statement - Michael Tan.pdf", kind: "statement" },
    ],
  },
  {
    id: "DC-2024-090",
    student: "Sarah Wong",
    studentId: "2023-11056",
    caseType: "Code of Conduct Violation",
    status: "new",
    priority: "medium",
    date: "Jan 26, 2024",
    officer: "Dr. Reyes",
    description:
      "Violation of campus conduct guidelines requiring review of incident reports and related documentation.",
    evidence: [{ name: "Incident Report - Sarah Wong.pdf", kind: "report" }],
  },
  {
    id: "DC-2024-091",
    student: "James Garcia",
    studentId: "2024-10112",
    caseType: "Attendance Violation",
    status: "pending",
    priority: "low",
    date: "Jan 27, 2024",
    officer: "Prof. Cruz",
    description:
      "Attendance violations reported and pending further verification of attendance logs and communications.",
    evidence: [{ name: "Attendance Logs - James Garcia.pdf", kind: "records" }],
  },
  {
    id: "DC-2024-092",
    student: "Lisa Martinez",
    studentId: "2023-12345",
    caseType: "Property Damage",
    status: "ongoing",
    priority: "high",
    date: "Jan 28, 2024",
    officer: "Admin Lopez",
    description:
      "Incident involving property damage; evidence includes damages documentation and witness notes.",
    evidence: [
      { name: "Damage Photos - Lisa Martinez.png", kind: "photos" },
      { name: "Witness Note - Lisa Martinez.pdf", kind: "statement" },
    ],
  },
  {
    id: "DC-2024-088",
    student: "Robert Cruz",
    studentId: "2023-09876",
    caseType: "Plagiarism",
    status: "closed",
    priority: "medium",
    date: "Jan 22, 2024",
    officer: "Prof. Gonzales",
    description:
      "Plagiarism allegation reviewed and closed after evidence evaluation and official decision documentation.",
    evidence: [{ name: "Plagiarism Report - Robert Cruz.pdf", kind: "report" }],
  },
  {
    id: "DC-2024-087",
    student: "Angela Reyes",
    studentId: "2023-11234",
    caseType: "Disruptive Behavior",
    status: "new",
    priority: "low",
    date: "Jan 21, 2024",
    officer: "Prof. Santos",
    description:
      "Disruptive behavior reported; requires initial review and scheduling of case conference.",
    evidence: [{ name: "Disciplinary Notes - Angela Reyes.pdf", kind: "notes" }],
  },
  {
    id: "DC-2024-086",
    student: "Kevin Santos",
    studentId: "2024-10567",
    caseType: "Cheating",
    status: "ongoing",
    priority: "high",
    date: "Jan 20, 2024",
    officer: "Dr. Tan",
    description:
      "Cheating allegation with supporting exam evidence; ongoing evaluation and interview scheduling.",
    evidence: [{ name: "Cheating Evidence - Kevin Santos.pdf", kind: "exam_screenshots" }],
  },
  {
    id: "DC-2024-085",
    student: "Diana Lopez",
    studentId: "2023-12678",
    caseType: "Falsification of Records",
    status: "pending",
    priority: "high",
    date: "Jan 19, 2024",
    officer: "Registrar",
    description:
      "Potential falsification reported; requires cross-checking of submitted records and supporting documents.",
    evidence: [{ name: "Records Comparison - Diana Lopez.pdf", kind: "records" }],
  },
];

