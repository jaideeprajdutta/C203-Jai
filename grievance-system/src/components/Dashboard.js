import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Error as ErrorIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { user, grievances } = state;

  const steps = ['Select Institution', 'Select Role', 'Dashboard'];

  // Redirect if not authenticated
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/institution-select');
    }
  }, [user.isAuthenticated, navigate]);

  // Filter grievances based on user role and institution
  const userGrievances = grievances.filter(grievance => 
    grievance.institutionId === user.selectedInstitution?.id
  );

  // Calculate statistics
  const stats = {
    total: userGrievances.length,
    submitted: userGrievances.filter(g => g.status === 'Submitted').length,
    inProgress: userGrievances.filter(g => g.status === 'In Progress' || g.status === 'Under Review').length,
    resolved: userGrievances.filter(g => g.status === 'Resolved').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return 'info';
      case 'Under Review':
        return 'warning';
      case 'In Progress':
        return 'primary';
      case 'Resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <AssignmentIcon />;
      case 'Under Review':
        return <ScheduleIcon />;
      case 'In Progress':
        return <TrendingUpIcon />;
      case 'Resolved':
        return <CheckCircleIcon />;
      default:
        return <ErrorIcon />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const quickActions = [
    {
      title: 'Submit New Grievance',
      description: 'File a new complaint or feedback',
      icon: <AddIcon />,
      action: () => navigate('/anonymous-feedback'),
      color: 'primary',
    },
    {
      title: 'Track Status',
      description: 'Check the status of your grievances',
      icon: <SearchIcon />,
      action: () => navigate('/status-tracking'),
      color: 'secondary',
    },
  ];

  if (!user.isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <DashboardIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" color="primary" gutterBottom>
              Welcome to Your Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {user.selectedRole?.name} at {user.selectedInstitution?.name}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" color="text.secondary">
          Manage your grievances, track progress, and access institutional services from your
          personalized dashboard. Your voice matters, and we're here to ensure it's heard.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Statistics Cards */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom color="primary">
            Grievance Overview
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" color="primary">
                        {stats.total}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Grievances
                      </Typography>
                    </Box>
                    <AssignmentIcon color="primary" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" color="info.main">
                        {stats.submitted}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Submitted
                      </Typography>
                    </Box>
                    <ScheduleIcon color="info" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" color="warning.main">
                        {stats.inProgress}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        In Progress
                      </Typography>
                    </Box>
                    <TrendingUpIcon color="warning" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" color="success.main">
                        {stats.resolved}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Resolved
                      </Typography>
                    </Box>
                    <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={12} key={index}>
                    <Card variant="outlined" sx={{ cursor: 'pointer' }} onClick={action.action}>
                      <CardContent>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: `${action.color}.main` }}>
                            {action.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">{action.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {action.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Grievances */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                Recent Grievances
              </Typography>
              {userGrievances.length > 0 ? (
                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {userGrievances.slice(0, 5).map((grievance) => (
                    <ListItem
                      key={grievance.id}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        {getStatusIcon(grievance.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {grievance.referenceId}
                            </Typography>
                            <Chip
                              label={grievance.status}
                              size="small"
                              color={getStatusColor(grievance.status)}
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {grievance.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(grievance.submittedAt)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box textAlign="center" py={4}>
                  <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No grievances found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Submit your first grievance to get started
                  </Typography>
                </Box>
              )}
            </CardContent>
            {userGrievances.length > 5 && (
              <CardActions>
                <Button size="small" onClick={() => navigate('/status-tracking')}>
                  View All
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>

        {/* Role-based Access Information */}
        {(user.selectedRole?.name === 'Admin' || user.selectedRole?.name === 'Grievance Officer') && (
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  Administrative Access
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  As a {user.selectedRole.name}, you have access to additional administrative features.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<DashboardIcon />}
                  onClick={() => navigate('/admin-dashboard')}
                  size="large"
                >
                  Access Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;