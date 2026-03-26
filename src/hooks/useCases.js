import { usePersistentState } from "./usePersistentState";
import { DEFAULT_CASES, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../data/mockCases";

const CASES_KEY = "campuscare_cases_v1";

function parseCaseIndex(id) {
  // Expected format: DC-2024-089
  const parts = String(id).split("-");
  const last = parts[parts.length - 1];
  const n = Number(last);
  return Number.isFinite(n) ? n : 0;
}

function makeNextCaseId(cases) {
  const year = "2024";
  const prefix = `DC-${year}-`;
  const maxIdx = cases.reduce((acc, c) => Math.max(acc, parseCaseIndex(c.id)), 0);
  const next = maxIdx + 1;
  return `${prefix}${String(next).padStart(3, "0")}`;
}

function getDefaultPriority(priority) {
  return PRIORITY_OPTIONS.includes(priority) ? priority : "medium";
}

function getDefaultStatus(status) {
  return STATUS_OPTIONS.includes(status) ? status : "new";
}

export function useCases(initialCases = DEFAULT_CASES) {
  const [cases, setCases] = usePersistentState(CASES_KEY, initialCases);

  const createCase = ({
    student,
    studentId,
    caseType,
    description,
    evidence = [],
    priority = "medium",
    officer = "Discipline Office",
  }) => {
    const id = makeNextCaseId(cases);
    const now = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    const newCase = {
      id,
      student: student.trim(),
      studentId: studentId.trim(),
      caseType,
      status: "new",
      priority: getDefaultPriority(priority),
      date,
      officer,
      description: description.trim(),
      evidence,
    };

    setCases((prev) => [...prev, newCase]);
    return newCase;
  };

  const updateCaseStatus = (caseId, status, note) => {
    const nextStatus = getDefaultStatus(status);
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status: nextStatus,
              description: note ? `${c.description}\n\n${note}` : c.description,
            }
          : c,
      ),
    );
  };

  const appendEvidence = (caseId, evidenceItem) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, evidence: [...(c.evidence || []), evidenceItem] }
          : c,
      ),
    );
  };

  return {
    cases,
    createCase,
    updateCaseStatus,
    appendEvidence,
    setCases,
  };
}

