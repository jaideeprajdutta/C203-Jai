import React, { useEffect } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Box,
  Fade,
  Stack,
} from '@mui/material';
import { useAppContext } from '../context/AppContext';

const NotificationProvider = ({ children }) => {
  const { state, removeNotification } = useAppContext();
  const { notifications } = state;

  // Auto-remove notifications after delay
  useEffect(() => {
    notifications.forEach((notification) => {
      if (!notification.persistent) {
        const timer = setTimeout(() => {
          removeNotification(notification.id);
        }, notification.duration || 6000); // Default 6 seconds

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, removeNotification]);

  const handleClose = (notificationId) => {
    removeNotification(notificationId);
  };

  const getSeverity = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <>
      {children}
      
      {/* Notification Stack */}
      <Box
        sx={{
          position: 'fixed',
          top: 80, // Below the header
          right: 20,
          zIndex: 1400,
          maxWidth: 400,
        }}
      >
        <Stack spacing={1}>
          {notifications.map((notification) => (
            <Fade key={notification.id} in={true}>
              <Alert
                severity={getSeverity(notification.type)}
                onClose={() => handleClose(notification.id)}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                variant="filled"
              >
                {notification.title && (
                  <AlertTitle>{notification.title}</AlertTitle>
                )}
                {notification.message}
              </Alert>
            </Fade>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default NotificationProvider;