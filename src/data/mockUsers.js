export const OFFICE_OPTIONS = [
  { value: "health", label: "Health Services" },
  { value: "guidance", label: "Guidance Services" },
  { value: "discipline", label: "Discipline Office" },
  { value: "development", label: "Student Development" },
];

// Note: This is UI-only authentication with deterministic mock credentials for testing.
export const DEFAULT_USERS = [
  {
    id: "u-1",
    firstName: "Arny",
    middleInitial: "L",
    lastName: "Saragina",
    email: "ar.saragina@nu-dasma.edu.ph",
    password: "Password123!",
    office: "discipline",
    role: "Discipline Coordinator",
  },
  {
    id: "u-2",
    firstName: "Test",
    middleInitial: "",
    lastName: "Coordinator",
    email: "test.coordinator@nu-dasma.edu.ph",
    password: "Password123!",
    office: "discipline",
    role: "Discipline Coordinator",
  },
  {
    id: "u-3",
    firstName: "Health",
    middleInitial: "",
    lastName: "Officer",
    email: "health.officer@nu-dasma.edu.ph",
    password: "Password123!",
    office: "health",
    role: "Health Services",
  },
];

