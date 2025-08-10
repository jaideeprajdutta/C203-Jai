import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppContextProvider } from './context/AppContext';
import Header from './components/Header';
import InstitutionSelect from './components/InstitutionSelect';
import RoleSelect from './components/RoleSelect';
import Dashboard from './components/Dashboard';
import AnonymousFeedback from './components/AnonymousFeedback';
import StatusTracking from './components/StatusTracking';
import AdminDashboard from './components/AdminDashboard';
import NotificationProvider from './components/NotificationProvider';
import ChatbotWidget from './components/ChatbotWidget';

// Professional light theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#1976d2',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#1976d2',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<Navigate to="/institution-select" replace />} />
                <Route path="/institution-select" element={<InstitutionSelect />} />
                <Route path="/role-select" element={<RoleSelect />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/anonymous-feedback" element={<AnonymousFeedback />} />
                <Route path="/status-tracking" element={<StatusTracking />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Routes>
              <ChatbotWidget />
            </div>
          </Router>
        </NotificationProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
