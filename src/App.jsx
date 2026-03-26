import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CaseManagementPage from "./pages/DODashboard/CaseManagement";
import DashboardPage from "./pages/DODashboard/Dashboard";
import CaseConferencePage from "./pages/DODashboard/CaseConference";
import StudentRecordsPage from "./pages/DODashboard/StudentRecords";
import DocumentRequestsPage from "./pages/DODashboard/DocumentRequests";
import ReferralsPage from "./pages/DODashboard/Referrals";
import SanctionsPage from "./pages/DODashboard/Sanctions";
import ReportsPage from "./pages/DODashboard/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/case-conference" element={<CaseConferencePage />} />
        <Route path="/student-records" element={<StudentRecordsPage />} />
        <Route path="/case-management" element={<CaseManagementPage />} />
        <Route path="/document-requests" element={<DocumentRequestsPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/sanctions" element={<SanctionsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}

export default App;