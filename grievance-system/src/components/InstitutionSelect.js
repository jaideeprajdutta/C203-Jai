import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  School as SchoolIcon,
  NavigateNext as NextIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const InstitutionSelect = () => {
  const navigate = useNavigate();
  const { state, selectInstitution } = useAppContext();
  const { institutions } = state;
  
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
  const [error, setError] = useState('');

  const steps = ['Select Institution', 'Select Role', 'Dashboard'];

  const handleInstitutionChange = (event) => {
    setSelectedInstitutionId(event.target.value);
    setError(''); // Clear any previous errors
  };

  const handleNext = () => {
    if (!selectedInstitutionId) {
      setError('Please select an institution to continue');
      return;
    }

    const selectedInst = institutions.find(inst => inst.id === selectedInstitutionId);
    selectInstitution(selectedInst);
    navigate('/role-select');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={0} alternativeLabel>
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
          <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom color="primary">
            Welcome to Grievance Redressal System
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            A secure platform for submitting feedback, tracking complaints, and ensuring
            your voice is heard. Please select your institution to begin.
          </Typography>
        </Box>

        {/* Institution Selection */}
        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom color="primary">
              Step 1: Select Your Institution
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Choose your educational institution from the list below to access the grievance system.
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="institution-select-label">Institution</InputLabel>
              <Select
                labelId="institution-select-label"
                id="institution-select"
                value={selectedInstitutionId}
                label="Institution"
                onChange={handleInstitutionChange}
                error={!!error}
              >
                <MenuItem value="">
                  <em>Please select an institution</em>
                </MenuItem>
                {institutions.map((institution) => (
                  <MenuItem key={institution.id} value={institution.id}>
                    <Box>
                      <Typography variant="body1">{institution.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {institution.type}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Don't see your institution? Contact your system administrator.
              </Typography>
              <Button
                variant="contained"
                endIcon={<NextIcon />}
                onClick={handleNext}
                size="large"
                disabled={!selectedInstitutionId}
                sx={{ minWidth: 120 }}
              >
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  🔒 Secure & Anonymous
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your privacy is protected. Submit feedback anonymously or with your identity
                  as preferred.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  📊 Track Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor the status of your complaints and grievances with real-time updates
                  and notifications.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  💬 Get Help
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access our intelligent chatbot for instant help with frequently asked
                  questions and guidance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InstitutionSelect;