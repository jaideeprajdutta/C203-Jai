import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Feedback as FeedbackIcon,
  Search as SearchIcon,
  AdminPanelSettings as AdminIcon,
  Chat as ChatIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, logoutUser, toggleChatbot } = useAppContext();
  const { user } = state;

  const handleLogout = () => {
    logoutUser();
    navigate('/institution-select');
  };

  const navigationItems = [
    {
      label: 'Anonymous Feedback',
      path: '/anonymous-feedback',
      icon: <FeedbackIcon />,
      public: true,
    },
    {
      label: 'Track Status',
      path: '/status-tracking',
      icon: <SearchIcon />,
      public: true,
    },
  ];

  const authenticatedNavItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <HomeIcon />,
    },
    ...(user.selectedRole?.name === 'Admin' || user.selectedRole?.name === 'Grievance Officer'
      ? [
          {
            label: 'Admin Dashboard',
            path: '/admin-dashboard',
            icon: <AdminIcon />,
          },
        ]
      : []),
  ];

  const currentItems = user.isAuthenticated
    ? [...authenticatedNavItems, ...navigationItems]
    : navigationItems;

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          Grievance Redressal System
        </Typography>

        {/* Institution and Role Display */}
        {user.selectedInstitution && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            <Chip
              label={user.selectedInstitution.name}
              variant="outlined"
              size="small"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.7)',
                '& .MuiChip-label': { color: 'white' },
              }}
            />
            {user.selectedRole && (
              <Chip
                label={user.selectedRole.name}
                variant="outlined"
                size="small"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.7)',
                  '& .MuiChip-label': { color: 'white' },
                }}
              />
            )}
          </Box>
        )}

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {currentItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor:
                  location.pathname === item.path
                    ? 'rgba(255,255,255,0.1)'
                    : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* Chatbot Toggle */}
          <Tooltip title="Open Help Chat">
            <IconButton
              color="inherit"
              onClick={toggleChatbot}
              sx={{
                backgroundColor: state.chatbotOpen
                  ? 'rgba(255,255,255,0.1)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ChatIcon />
            </IconButton>
          </Tooltip>

          {/* Logout Button */}
          {user.isAuthenticated && (
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;