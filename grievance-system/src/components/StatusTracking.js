import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const StatusTracking = () => {
  const { state } = useAppContext();
  const { grievances } = state;

  const [referenceId, setReferenceId] = useState('');
  const [searchedGrievance, setSearchedGrievance] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!referenceId.trim()) {
      setError('Please enter a reference ID');
      return;
    }

    setIsSearching(true);
    setError('');

    // Simulate search delay
    setTimeout(() => {
      const foundGrievance = grievances.find(
        g => g.referenceId.toLowerCase() === referenceId.toLowerCase().trim()
      );

      if (foundGrievance) {
        setSearchedGrievance(foundGrievance);
        setError('');
      } else {
        setSearchedGrievance(null);
        setError('No grievance found with this reference ID. Please check and try again.');
      }
      
      setIsSearching(false);
    }, 1000);
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
      case 'Rejected':
        return 'error';
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
      case 'Rejected':
        return <ErrorIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDateShort = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusProgress = (status) => {
    const statusMap = {
      'Submitted': 0,
      'Under Review': 1,
      'In Progress': 2,
      'Resolved': 3,
      'Rejected': 3,
    };
    return statusMap[status] || 0;
  };

  const statusSteps = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setReferenceId('');
    setSearchedGrievance(null);
    setError('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <SearchIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom color="primary">
            Track Grievance Status
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Enter your reference ID to track the progress of your grievance
          </Typography>
        </Box>

        {/* Search Section */}
        <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Search by Reference ID
          </Typography>
          <Box display="flex" gap={2} alignItems="flex-start">
            <TextField
              fullWidth
              label="Reference ID"
              placeholder="e.g., GRV001234"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              onKeyPress={handleKeyPress}
              error={!!error && !searchedGrievance}
              helperText={error && !searchedGrievance ? error : 'Enter the reference ID provided when you submitted your grievance'}
              InputProps={{
                style: { textTransform: 'uppercase' },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching}
              sx={{ minWidth: 120, height: 56 }}
              startIcon={<SearchIcon />}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </Card>

        {/* Search Results */}
        {searchedGrievance && (
          <Grid container spacing={4}>
            {/* Grievance Details */}
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{ mb: 3 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AssignmentIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" color="primary">
                        Grievance Details
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reference ID: {searchedGrievance.referenceId}
                      </Typography>
                    </Box>
                  </Box>

                  <List dense>
                    <ListItem>
                      <CategoryIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      <ListItemText
                        primary="Category"
                        secondary={searchedGrievance.category}
                      />
                    </ListItem>
                    <ListItem>
                      <CalendarIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      <ListItemText
                        primary="Submitted"
                        secondary={formatDate(searchedGrievance.submittedAt)}
                      />
                    </ListItem>
                    <ListItem>
                      <ScheduleIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      <ListItemText
                        primary="Last Updated"
                        secondary={formatDate(searchedGrievance.lastUpdated)}
                      />
                    </ListItem>
                    <ListItem>
                      <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
                      <ListItemText
                        primary="Submission Type"
                        secondary={searchedGrievance.isAnonymous ? 'Anonymous' : 'Identified'}
                      />
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {searchedGrievance.description}
                  </Typography>

                  {searchedGrievance.attachments && searchedGrievance.attachments.length > 0 && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Attachments
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {searchedGrievance.attachments.map((attachment, index) => (
                          <Chip
                            key={index}
                            label={attachment.name}
                            variant="outlined"
                            size="small"
                            clickable
                          />
                        ))}
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Status Progress */}
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{ mb: 3 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar sx={{ bgcolor: getStatusColor(searchedGrievance.status) + '.main' }}>
                      {getStatusIcon(searchedGrievance.status)}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" color="primary">
                        Current Status
                      </Typography>
                      <Chip
                        label={searchedGrievance.status}
                        color={getStatusColor(searchedGrievance.status)}
                        variant="outlined"
                        size="medium"
                      />
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    Progress Overview
                  </Typography>
                  <Stepper
                    activeStep={getStatusProgress(searchedGrievance.status)}
                    orientation="vertical"
                    sx={{ mt: 2 }}
                  >
                    {statusSteps.map((step, index) => (
                      <Step key={step}>
                        <StepLabel
                          StepIconComponent={({ active, completed }) => (
                            <Avatar
                              sx={{
                                bgcolor: completed || active ? 'primary.main' : 'grey.300',
                                width: 32,
                                height: 32,
                              }}
                            >
                              {getStatusIcon(step)}
                            </Avatar>
                          )}
                        >
                          {step}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
            </Grid>

            {/* Status Timeline */}
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary">
                    Status Timeline
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Track the complete history of your grievance processing
                  </Typography>

                  <Timeline>
                    {searchedGrievance.updates
                      .slice()
                      .reverse()
                      .map((update, index) => (
                        <TimelineItem key={update.id}>
                          <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.3 }}>
                            <Typography variant="caption">
                              {formatDateShort(update.timestamp)}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color={getStatusColor(update.status)}>
                              {getStatusIcon(update.status)}
                            </TimelineDot>
                            {index < searchedGrievance.updates.length - 1 && <TimelineConnector />}
                          </TimelineSeparator>
                          <TimelineContent>
                            <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Chip
                                  label={update.status}
                                  size="small"
                                  color={getStatusColor(update.status)}
                                  variant="outlined"
                                />
                                <Typography variant="caption" color="text.secondary">
                                  by {update.updatedBy}
                                </Typography>
                              </Box>
                              <Typography variant="body2">
                                {update.message}
                              </Typography>
                            </Card>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                  </Timeline>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Sample Reference IDs for Demo */}
        {!searchedGrievance && (
          <Card variant="outlined" sx={{ mt: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Demo Reference IDs
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              For demonstration purposes, try searching with these sample reference IDs:
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {grievances.map((grievance) => (
                <Chip
                  key={grievance.id}
                  label={grievance.referenceId}
                  variant="outlined"
                  clickable
                  onClick={() => {
                    setReferenceId(grievance.referenceId);
                    setError('');
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Card>
        )}

        {/* Clear Search */}
        {searchedGrievance && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="outlined" onClick={clearSearch} size="large">
              Search Another Grievance
            </Button>
          </Box>
        )}

        {/* Information Alert */}
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Need Help?</strong> If you can't find your grievance or have questions about the status,
            please contact our support team or use the chat feature for immediate assistance.
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
};

export default StatusTracking;