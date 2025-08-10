import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Badge,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  FilterList as FilterIcon,
  GetApp as ExportIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Comment as CommentIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { state, updateGrievanceStatus, addNotification } = useAppContext();
  const { user, grievances } = state;

  // State management
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    dateRange: '',
  });
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    message: '',
  });

  // Check authorization
  useEffect(() => {
    if (!user.isAuthenticated || (user.selectedRole?.name !== 'Admin' && user.selectedRole?.name !== 'Grievance Officer')) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Apply filters and update filtered grievances
  useEffect(() => {
    let filtered = grievances.filter(grievance => 
      grievance.institutionId === user.selectedInstitution?.id
    );

    if (filters.status) {
      filtered = filtered.filter(g => g.status === filters.status);
    }

    if (filters.category) {
      filtered = filtered.filter(g => g.category === filters.category);
    }

    if (filters.dateRange) {
      const now = new Date();
      let dateThreshold;

      switch (filters.dateRange) {
        case 'today':
          dateThreshold = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          dateThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          dateThreshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          dateThreshold = null;
      }

      if (dateThreshold) {
        filtered = filtered.filter(g => new Date(g.submittedAt) >= dateThreshold);
      }
    }

    // Sort by most recent first
    filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    setFilteredGrievances(filtered);
    setPage(0); // Reset to first page when filters change
  }, [grievances, filters, user.selectedInstitution]);

  // Calculate statistics
  const stats = {
    total: filteredGrievances.length,
    pending: filteredGrievances.filter(g => ['Submitted', 'Under Review'].includes(g.status)).length,
    inProgress: filteredGrievances.filter(g => g.status === 'In Progress').length,
    resolved: filteredGrievances.filter(g => g.status === 'Resolved').length,
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

  const handleFilterChange = (field) => (event) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      category: '',
      dateRange: '',
    });
  };

  const handleViewDetails = (grievance) => {
    setSelectedGrievance(grievance);
    setDetailDialogOpen(true);
  };

  const handleUpdateStatus = (grievance) => {
    setSelectedGrievance(grievance);
    setUpdateData({
      status: grievance.status,
      message: '',
    });
    setUpdateDialogOpen(true);
  };

  const handleSaveUpdate = () => {
    if (!updateData.status || !updateData.message.trim()) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Please provide both status and update message.',
      });
      return;
    }

    updateGrievanceStatus(
      selectedGrievance.id,
      updateData.status,
      updateData.message,
      user.selectedRole?.name || 'Admin'
    );

    setUpdateDialogOpen(false);
    setSelectedGrievance(null);
    setUpdateData({ status: '', message: '' });
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      ['Reference ID', 'Category', 'Status', 'Submitted Date', 'Last Updated'],
      ...filteredGrievances.map(g => [
        g.referenceId,
        g.category,
        g.status,
        new Date(g.submittedAt).toLocaleDateString(),
        new Date(g.lastUpdated).toLocaleDateString(),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grievances_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    addNotification({
      type: 'success',
      title: 'Export Complete',
      message: 'Grievances data has been exported successfully.',
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const statusOptions = ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Rejected'];
  const categoryOptions = ['Academic Issues', 'Hostel/Accommodation', 'Harassment/Discrimination', 'Fee/Financial Issues', 'Infrastructure Problems', 'Administrative Issues', 'Other'];

  if (!user.isAuthenticated || (user.selectedRole?.name !== 'Admin' && user.selectedRole?.name !== 'Grievance Officer')) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <AdminIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" color="primary" gutterBottom>
              Administrative Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage grievances for {user.selectedInstitution?.name}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Statistics Cards */}
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
                  <Typography variant="h4" color="warning.main">
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Review
                  </Typography>
                </Box>
                <ScheduleIcon color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" color="primary.main">
                    {stats.inProgress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Progress
                  </Typography>
                </Box>
                <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />
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

      {/* Filters and Actions */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" color="primary">
            Grievance Management
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ExportIcon />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={handleFilterChange('status')}
              >
                <MenuItem value="">All Statuses</MenuItem>
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={handleFilterChange('category')}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categoryOptions.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={filters.dateRange}
                label="Date Range"
                onChange={handleFilterChange('dateRange')}
              >
                <MenuItem value="">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">Last 7 Days</MenuItem>
                <MenuItem value="month">Last 30 Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              onClick={clearFilters}
              startIcon={<FilterIcon />}
              fullWidth
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Grievances Table */}
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGrievances
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((grievance) => (
                  <TableRow key={grievance.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {grievance.referenceId}
                      </Typography>
                      {grievance.isAnonymous && (
                        <Chip label="Anonymous" size="small" variant="outlined" sx={{ mt: 0.5 }} />
                      )}
                    </TableCell>
                    <TableCell>{grievance.category}</TableCell>
                    <TableCell>
                      <Chip
                        label={grievance.status}
                        color={getStatusColor(grievance.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(grievance.submittedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(grievance.lastUpdated)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(grievance)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update Status">
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateStatus(grievance)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredGrievances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Grievance Details - {selectedGrievance?.referenceId}
        </DialogTitle>
        <DialogContent>
          {selectedGrievance && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <ListItemIcon><CategoryIcon /></ListItemIcon>
                    <ListItemText
                      primary="Category"
                      secondary={selectedGrievance.category}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CalendarIcon /></ListItemIcon>
                    <ListItemText
                      primary="Submitted"
                      secondary={formatDate(selectedGrievance.submittedAt)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText
                      primary="Submission Type"
                      secondary={selectedGrievance.isAnonymous ? 'Anonymous' : 'Identified'}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Current Status
                  </Typography>
                  <Chip
                    label={selectedGrievance.status}
                    color={getStatusColor(selectedGrievance.status)}
                    variant="outlined"
                    size="medium"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedGrievance.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Status History
                </Typography>
                <List dense>
                  {selectedGrievance.updates?.map((update) => (
                    <ListItem key={update.id}>
                      <ListItemIcon>
                        <CommentIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Chip
                              label={update.status}
                              size="small"
                              color={getStatusColor(update.status)}
                              variant="outlined"
                            />
                            <Typography variant="caption">
                              by {update.updatedBy}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2">{update.message}</Typography>
                            <Typography variant="caption">
                              {formatDate(update.timestamp)}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Update Status - {selectedGrievance?.referenceId}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>New Status</InputLabel>
                <Select
                  value={updateData.status}
                  label="New Status"
                  onChange={(e) => setUpdateData(prev => ({ ...prev, status: e.target.value }))}
                >
                  {statusOptions.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Update Message"
                placeholder="Provide details about this status update..."
                value={updateData.message}
                onChange={(e) => setUpdateData(prev => ({ ...prev, message: e.target.value }))}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setUpdateDialogOpen(false)}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveUpdate}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;