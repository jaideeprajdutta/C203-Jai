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
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  LinearProgress,
  Fade,
  Slide,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
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
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  AttachFile as AttachFileIcon,
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
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Fade in timeout={800}>
          <Box textAlign="center" mb={6}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
              }}
            >
              <SearchIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                color: 'white',
                fontWeight: 800,
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Track Your Grievance
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Enter your reference ID to get real-time updates on your grievance status and resolution progress
            </Typography>
          </Box>
        </Fade>

        {/* Search Section */}
        <Slide in direction="up" timeout={600}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              mb: 4,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Box display="flex" gap={2} alignItems="flex-start">
              <TextField
                fullWidth
                label="Reference ID"
                placeholder="Enter your reference ID (e.g., GRV001234)"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                onKeyPress={handleKeyPress}
                error={!!error && !searchedGrievance}
                helperText={error && !searchedGrievance ? error : 'Enter the reference ID provided when you submitted your grievance'}
                InputProps={{
                  style: { textTransform: 'uppercase' },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: referenceId && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setReferenceId('')}
                        edge="end"
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={isSearching}
                sx={{ 
                  minWidth: 140, 
                  height: 56,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.6)',
                  },
                }}
                startIcon={isSearching ? <RefreshIcon /> : <SearchIcon />}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </Box>
            
            {isSearching && (
              <Box mt={2}>
                <LinearProgress 
                  sx={{
                    borderRadius: 2,
                    height: 6,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    },
                  }}
                />
              </Box>
            )}
          </Paper>
        </Slide>

        {/* Search Results */}
        {searchedGrievance && (
          <Fade in timeout={1000}>
            <Grid container spacing={4}>
              {/* Grievance Details */}
              <Grid item xs={12} md={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    mb: 3,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      p: 3,
                      color: 'white',
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          width: 56,
                          height: 56,
                        }}
                      >
                        <AssignmentIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Grievance Details
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Reference ID: {searchedGrievance.referenceId}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', width: 40, height: 40 }}>
                            <CategoryIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Category
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {searchedGrievance.category}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <Avatar sx={{ bgcolor: 'success.50', color: 'success.main', width: 40, height: 40 }}>
                            <CalendarIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Submitted
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {formatDateShort(searchedGrievance.submittedAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <Avatar sx={{ bgcolor: 'warning.50', color: 'warning.main', width: 40, height: 40 }}>
                            <ScheduleIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Last Updated
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {formatDateShort(searchedGrievance.lastUpdated)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <Avatar sx={{ bgcolor: 'info.50', color: 'info.main', width: 40, height: 40 }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Submission Type
                            </Typography>
                            <Chip
                              label={searchedGrievance.isAnonymous ? 'Anonymous' : 'Identified'}
                              size="small"
                              color={searchedGrievance.isAnonymous ? 'warning' : 'success'}
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      Description
                    </Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        backgroundColor: 'grey.50',
                        border: '1px solid',
                        borderColor: 'grey.200',
                      }}
                    >
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {searchedGrievance.description}
                      </Typography>
                    </Paper>

                    {searchedGrievance.attachments && searchedGrievance.attachments.length > 0 && (
                      <Box mt={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
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
                              icon={<AttachFileIcon />}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'primary.50',
                                  borderColor: 'primary.main',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Status Progress */}
              <Grid item xs={12} md={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    mb: 3,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${getStatusColor(searchedGrievance.status) === 'success' ? '#10b981' : 
                                   getStatusColor(searchedGrievance.status) === 'warning' ? '#f59e0b' :
                                   getStatusColor(searchedGrievance.status) === 'error' ? '#ef4444' :
                                   getStatusColor(searchedGrievance.status) === 'info' ? '#3b82f6' : '#6366f1'} 0%, ${
                                   getStatusColor(searchedGrievance.status) === 'success' ? '#059669' : 
                                   getStatusColor(searchedGrievance.status) === 'warning' ? '#d97706' :
                                   getStatusColor(searchedGrievance.status) === 'error' ? '#dc2626' :
                                   getStatusColor(searchedGrievance.status) === 'info' ? '#2563eb' : '#8b5cf6'} 100%)`,
                      p: 3,
                      color: 'white',
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          width: 56,
                          height: 56,
                        }}
                      >
                        {getStatusIcon(searchedGrievance.status)}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Current Status
                        </Typography>
                        <Chip
                          label={searchedGrievance.status}
                          sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 500,
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                      Progress Overview
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {Math.round(((getStatusProgress(searchedGrievance.status) + 1) / statusSteps.length) * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={((getStatusProgress(searchedGrievance.status) + 1) / statusSteps.length) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(135deg, ${getStatusColor(searchedGrievance.status) === 'success' ? '#10b981' : 
                                         getStatusColor(searchedGrievance.status) === 'warning' ? '#f59e0b' :
                                         getStatusColor(searchedGrievance.status) === 'error' ? '#ef4444' :
                                         getStatusColor(searchedGrievance.status) === 'info' ? '#3b82f6' : '#6366f1'} 0%, ${
                                         getStatusColor(searchedGrievance.status) === 'success' ? '#059669' : 
                                         getStatusColor(searchedGrievance.status) === 'warning' ? '#d97706' :
                                         getStatusColor(searchedGrievance.status) === 'error' ? '#dc2626' :
                                         getStatusColor(searchedGrievance.status) === 'info' ? '#2563eb' : '#8b5cf6'} 100%)`,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ pl: 2 }}>
                      {statusSteps.map((step, index) => {
                        const isActive = index === getStatusProgress(searchedGrievance.status);
                        const isCompleted = index < getStatusProgress(searchedGrievance.status);
                        
                        return (
                          <Box key={step} display="flex" alignItems="center" gap={2} mb={2}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: isCompleted || isActive ? 'primary.main' : 'grey.300',
                                fontSize: '0.875rem',
                              }}
                            >
                              {isCompleted ? <CheckCircleIcon sx={{ fontSize: 18 }} /> : getStatusIcon(step)}
                            </Avatar>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? 'primary.main' : isCompleted ? 'text.primary' : 'text.secondary',
                              }}
                            >
                              {step}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Status Timeline */}
              <Grid item xs={12}>
                <Card 
                  elevation={0}
                  sx={{ 
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                      p: 3,
                      color: 'white',
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          width: 56,
                          height: 56,
                        }}
                      >
                        <ScheduleIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Status Timeline
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Complete history of your grievance processing
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    <Timeline sx={{ p: 0 }}>
                      {searchedGrievance.updates
                        .slice()
                        .reverse()
                        .map((update, index) => (
                          <TimelineItem key={update.id}>
                            <TimelineOppositeContent 
                              color="text.secondary" 
                              sx={{ 
                                flex: 0.3,
                                pr: 2,
                              }}
                            >
                              <Paper
                                variant="outlined"
                                sx={{
                                  p: 1.5,
                                  backgroundColor: 'grey.50',
                                  textAlign: 'center',
                                }}
                              >
                                <Typography variant="caption" fontWeight={500}>
                                  {formatDateShort(update.timestamp)}
                                </Typography>
                              </Paper>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineDot 
                                sx={{
                                  bgcolor: `${getStatusColor(update.status)}.main`,
                                  boxShadow: `0 0 0 4px ${getStatusColor(update.status) === 'success' ? 'rgba(16, 185, 129, 0.2)' : 
                                            getStatusColor(update.status) === 'warning' ? 'rgba(245, 158, 11, 0.2)' :
                                            getStatusColor(update.status) === 'error' ? 'rgba(239, 68, 68, 0.2)' :
                                            getStatusColor(update.status) === 'info' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
                                  width: 48,
                                  height: 48,
                                }}
                              >
                                {getStatusIcon(update.status)}
                              </TimelineDot>
                              {index < searchedGrievance.updates.length - 1 && (
                                <TimelineConnector 
                                  sx={{ 
                                    bgcolor: 'grey.300',
                                    width: 2,
                                  }} 
                                />
                              )}
                            </TimelineSeparator>
                            <TimelineContent sx={{ pb: 3 }}>
                              <Card 
                                variant="outlined" 
                                sx={{ 
                                  p: 3,
                                  backgroundColor: 'white',
                                  border: '1px solid',
                                  borderColor: 'grey.200',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                  '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                  },
                                }}
                              >
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                  <Chip
                                    label={update.status}
                                    size="small"
                                    color={getStatusColor(update.status)}
                                    sx={{ fontWeight: 500 }}
                                  />
                                  <Box display="flex" alignItems="center" gap={1}>
                                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                      {update.updatedBy}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
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
          </Fade>
        )}

        {/* Sample Reference IDs for Demo */}
        {!searchedGrievance && (
          <Slide in direction="up" timeout={800}>
            <Paper 
              elevation={0}
              sx={{ 
                mt: 4, 
                p: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Box textAlign="center" mb={3}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'info.main',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <InfoIcon />
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Try Demo Reference IDs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For demonstration purposes, click on any of these sample reference IDs:
                </Typography>
              </Box>
              <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
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
                    sx={{ 
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'primary.50',
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Slide>
        )}

        {/* Clear Search */}
        {searchedGrievance && (
          <Fade in timeout={1200}>
            <Box display="flex" justifyContent="center" mt={4}>
              <Button 
                variant="outlined" 
                onClick={clearSearch} 
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Search Another Grievance
              </Button>
            </Box>
          </Fade>
        )}

        {/* Information Alert */}
        <Slide in direction="up" timeout={1000}>
          <Alert 
            severity="info" 
            sx={{ 
              mt: 4,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: 'info.main',
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              <strong>Need Help?</strong> If you can't find your grievance or have questions about the status,
              please contact our support team or use the chat feature for immediate assistance.
            </Typography>
          </Alert>
        </Slide>
      </Container>
    </Box>
  );
};

export default StatusTracking;