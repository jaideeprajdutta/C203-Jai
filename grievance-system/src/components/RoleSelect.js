import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  NavigateNext as NextIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const RoleSelect = () => {
  const navigate = useNavigate();
  const { state, selectRole, loginUser, loadMockGrievances } = useAppContext();
  const { user, roles } = state;
  
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [error, setError] = useState('');

  const steps = ['Select Institution', 'Select Role', 'Dashboard'];

  // Redirect if no institution selected
  useEffect(() => {
    if (!user.selectedInstitution) {
      navigate('/institution-select');
    }
  }, [user.selectedInstitution, navigate]);

  const handleRoleChange = (event) => {
    setSelectedRoleId(event.target.value);
    setError(''); // Clear any previous errors
  };

  const handleNext = () => {
    if (!selectedRoleId) {
      setError('Please select a role to continue');
      return;
    }

    const selectedRoleObj = roles.find(role => role.id === selectedRoleId);
    selectRole(selectedRoleObj);
    loginUser();
    
    // Load mock grievances for demo purposes
    loadMockGrievances();
    
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/institution-select');
  };

  const getRoleIcon = (roleName) => {
    switch (roleName) {
      case 'Student':
        return '🎓';
      case 'Faculty':
        return '👨‍🏫';
      case 'Admin':
        return '👨‍💼';
      case 'Grievance Officer':
        return '⚖️';
      default:
        return '👤';
    }
  };

  const getRolePermissions = (roleName) => {
    switch (roleName) {
      case 'Student':
        return ['Submit grievances', 'Track status', 'Anonymous feedback'];
      case 'Faculty':
        return ['Submit grievances', 'Track status', 'View department issues'];
      case 'Admin':
        return ['View all grievances', 'Manage users', 'Generate reports', 'Update statuses'];
      case 'Grievance Officer':
        return ['Process grievances', 'Update statuses', 'Communicate with users', 'Generate reports'];
      default:
        return [];
    }
  };

  if (!user.selectedInstitution) {
    return null; // Will redirect via useEffect
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom color="primary">
            Select Your Role
          </Typography>
          <Typography variant="h6" color="text.secondary">
            at {user.selectedInstitution.name}
          </Typography>
        </Box>

        {/* Role Selection */}
        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom color="primary">
              Step 2: Choose Your Role
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Select the role that best describes your position at the institution.
              This will determine your access permissions and available features.
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <RadioGroup
                value={selectedRoleId}
                onChange={handleRoleChange}
                sx={{ gap: 2 }}
              >
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      border: selectedRoleId === role.id ? '2px solid' : '1px solid',
                      borderColor: selectedRoleId === role.id ? 'primary.main' : 'divider',
                      backgroundColor: selectedRoleId === role.id ? 'primary.light' : 'transparent',
                      '&:hover': {
                        backgroundColor: selectedRoleId === role.id ? 'primary.light' : 'action.hover',
                      },
                    }}
                    onClick={() => setSelectedRoleId(role.id)}
                  >
                    <FormControlLabel
                      value={role.id}
                      control={<Radio />}
                      label={
                        <Box sx={{ ml: 1, width: '100%' }}>
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <Typography variant="h6" component="span">
                              {getRoleIcon(role.name)} {role.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {role.description}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {getRolePermissions(role.name).map((permission, index) => (
                              <Chip
                                key={index}
                                label={permission}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: '0.75rem',
                                  height: 24,
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                      sx={{ margin: 0, width: '100%' }}
                    />
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                variant="outlined"
                startIcon={<BackIcon />}
                onClick={handleBack}
                size="large"
              >
                Back
              </Button>
              <Button
                variant="contained"
                endIcon={<NextIcon />}
                onClick={handleNext}
                size="large"
                disabled={!selectedRoleId}
                sx={{ minWidth: 120 }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Information */}
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Note:</strong> Your role selection determines the features and data you can access.
            If you have multiple roles, you can log out and select a different role at any time.
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
};

export default RoleSelect;