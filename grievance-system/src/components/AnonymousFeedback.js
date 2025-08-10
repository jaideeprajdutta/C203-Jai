import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Feedback as FeedbackIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AnonymousFeedback = () => {
  const navigate = useNavigate();
  const { state, submitGrievance, addNotification } = useAppContext();
  const { categories, user } = state;

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    isAnonymous: true,
    urgency: 'Medium',
  });
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [generatedReferenceId, setGeneratedReferenceId] = useState('');

  const urgencyLevels = ['Low', 'Medium', 'High', 'Critical'];

  const handleInputChange = (field) => (event) => {
    const value = field === 'isAnonymous' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/', 'application/pdf', 'text/', 'application/msword', 'application/vnd.openxmlformats-officedocument'];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        addNotification({
          type: 'error',
          title: 'File Too Large',
          message: `${file.name} is too large. Maximum size is 5MB.`,
        });
        return false;
      }

      const isValidType = allowedTypes.some(type => file.type.startsWith(type));
      if (!isValidType) {
        addNotification({
          type: 'error',
          title: 'Invalid File Type',
          message: `${file.name} is not a supported file type.`,
        });
        return false;
      }

      return true;
    });

    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a description';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file upload process
      const uploadedFiles = attachments.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: `mock-url/${file.name}`, // In real app, this would be the uploaded file URL
      }));

      const referenceId = `GRV${Date.now().toString().slice(-6)}`;
      
      const grievanceData = {
        ...formData,
        attachments: uploadedFiles,
        referenceId,
        institutionId: user.selectedInstitution?.id || 'anonymous',
        submitterRole: user.selectedRole?.name || 'Anonymous',
      };

      submitGrievance(grievanceData);
      
      setGeneratedReferenceId(referenceId);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        category: '',
        description: '',
        isAnonymous: true,
        urgency: 'Medium',
      });
      setAttachments([]);
      setErrors({});

    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'There was an error submitting your grievance. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      case 'Critical':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (submitSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3} sx={{ textAlign: 'center', p: 4, borderRadius: 3 }}>
          <FeedbackIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" color="success.main" gutterBottom>
            Grievance Submitted Successfully!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Your reference ID is: <strong>{generatedReferenceId}</strong>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Please save this reference ID to track your grievance status.
            You will receive updates on the progress of your complaint.
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained"
              onClick={() => navigate('/status-tracking')}
              size="large"
            >
              Track Status
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setSubmitSuccess(false);
                setGeneratedReferenceId('');
              }}
              size="large"
            >
              Submit Another
            </Button>
            <Button
              variant="text"
              onClick={() => navigate('/dashboard')}
              size="large"
            >
              Go to Dashboard
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <FeedbackIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom color="primary">
            Submit Feedback or Grievance
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your voice matters. Share your concerns and feedback with us.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Anonymous Switch */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={1}>
                    {formData.isAnonymous ? <LockIcon color="primary" /> : <PersonIcon color="primary" />}
                    <Typography variant="h6">
                      {formData.isAnonymous ? 'Anonymous Submission' : 'Identified Submission'}
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isAnonymous}
                        onChange={handleInputChange('isAnonymous')}
                        color="primary"
                      />
                    }
                    label="Submit Anonymously"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {formData.isAnonymous 
                    ? 'Your identity will be kept completely confidential.' 
                    : 'We may contact you for additional information.'}
                </Typography>
              </Card>
            </Grid>

            {/* Category Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category *</InputLabel>
                <Select
                  value={formData.category}
                  label="Category *"
                  onChange={handleInputChange('category')}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Urgency Level */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Urgency Level</InputLabel>
                <Select
                  value={formData.urgency}
                  label="Urgency Level"
                  onChange={handleInputChange('urgency')}
                >
                  {urgencyLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          size="small"
                          label={level}
                          color={getUrgencyColor(level)}
                          variant="outlined"
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Description *"
                placeholder="Please provide detailed information about your grievance or feedback..."
                value={formData.description}
                onChange={handleInputChange('description')}
                error={!!errors.description}
                helperText={
                  errors.description || 
                  `${formData.description.length}/2000 characters`
                }
                inputProps={{ maxLength: 2000 }}
              />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Attachments (Optional)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload supporting documents, images, or files (Max 5MB each)
                </Typography>
                
                <input
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  style={{ display: 'none' }}
                  id="file-upload"
                  multiple
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    sx={{ mb: 2 }}
                  >
                    Upload Files
                  </Button>
                </label>

                {attachments.length > 0 && (
                  <List dense>
                    {attachments.map((file, index) => (
                      <ListItem key={index} divider>
                        <ListItemText
                          primary={file.name}
                          secondary={`${formatFileSize(file.size)} • ${file.type}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeAttachment(index)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Card>
            </Grid>

            {/* Information Alert */}
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Important:</strong> Your grievance will be reviewed by the appropriate department. 
                  You will receive a reference ID to track the status of your submission. 
                  Please keep this reference ID safe for future communication.
                </Typography>
              </Alert>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={<SendIcon />}
                  sx={{ minWidth: 200 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AnonymousFeedback;