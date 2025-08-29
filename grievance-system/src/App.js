import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import InstitutionSelect from './components/InstitutionSelect';
import RoleSelect from './components/RoleSelectNew';
import Dashboard from './components/DashboardNew';
import AnonymousFeedback from './components/AnonymousFeedbackNew';
import StatusTracking from './components/StatusTrackingNew';
import AdminDashboard from './components/AdminDashboardNew';
import NotificationProvider from './components/NotificationProviderNew';
import ChatbotWidget from './components/ChatbotWidgetNew';
import EnhancedGrievanceForm from './components/forms/EnhancedGrievanceForm';
import GrievanceSuccessPage from './components/pages/GrievanceSuccessPage';
import StudentLogin from './components/auth/StudentLogin';
import FacultyLogin from './components/auth/FacultyLogin';
import AdminLogin from './components/auth/AdminLogin';
import OfficerLogin from './components/auth/OfficerLogin';

function App() {
  return (
    <AppContextProvider>
      <NotificationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/institution-select" replace />} />
              <Route path="/institution-select" element={<InstitutionSelect />} />
              <Route path="/role-select" element={<RoleSelect />} />
              
              {/* Authentication Routes */}
              <Route path="/login/student" element={<StudentLogin />} />
              <Route path="/login/faculty" element={<FacultyLogin />} />
              <Route path="/login/admin" element={<AdminLogin />} />
              <Route path="/login/officer" element={<OfficerLogin />} />
              
              {/* Main Application Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/anonymous-feedback" element={<AnonymousFeedback />} />
              <Route path="/status-tracking" element={<StatusTracking />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Enhanced Grievance System Routes */}
              <Route path="/enhanced-grievance-form" element={<EnhancedGrievanceForm />} />
              <Route path="/grievance-success" element={<GrievanceSuccessPage />} />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/institution-select" replace />} />
            </Routes>
            <ChatbotWidget />
          </Layout>
        </Router>
      </NotificationProvider>
    </AppContextProvider>
  );
}

export default App;
