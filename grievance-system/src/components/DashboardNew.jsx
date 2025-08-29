import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Search, 
  TrendingUp, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { user, grievances } = state;

  const steps = ['Select Institution', 'Select Role', 'Dashboard'];

  // Redirect if not authenticated or missing required data
  useEffect(() => {
    if (!user.isAuthenticated || !user.selectedInstitution || !user.selectedRole) {
      if (!user.selectedInstitution) {
        navigate('/institution-select');
      } else if (!user.selectedRole) {
        navigate('/role-select');
      }
    }
  }, [user.isAuthenticated, user.selectedInstitution, user.selectedRole, navigate]);

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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Submitted':
        return 'secondary';
      case 'Under Review':
        return 'outline';
      case 'In Progress':
        return 'default';
      case 'Resolved':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <FileText className="h-4 w-4" />;
      case 'Under Review':
        return <Clock className="h-4 w-4" />;
      case 'In Progress':
        return <TrendingUp className="h-4 w-4" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
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
      icon: <Plus className="h-5 w-5" />,
      action: () => navigate('/anonymous-feedback'),
    },
    {
      title: 'Track Status',
      description: 'Check the status of your grievances',
      icon: <Search className="h-5 w-5" />,
      action: () => navigate('/status-tracking'),
    },
  ];

  if (!user.isAuthenticated || !user.selectedInstitution || !user.selectedRole) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index <= 2 ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground text-muted-foreground'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                index <= 2 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < 2 ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground">
              <LayoutDashboard className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-3xl">Welcome to Your Dashboard</CardTitle>
              <CardDescription className="text-lg">
                {user.selectedRole?.name} at {user.selectedInstitution?.name}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Manage your grievances, track progress, and access institutional services from your
            personalized dashboard. Your voice matters, and we're here to ensure it's heard.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {/* Statistics Cards */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-4">Grievance Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Grievances</p>
                  </div>
                  <FileText className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{stats.submitted}</p>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                  </div>
                  <Clock className="h-10 w-10 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-amber-600">{stats.inProgress}</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-amber-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={action.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Recent Grievances */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-primary">Recent Grievances</CardTitle>
            </CardHeader>
            <CardContent>
              {userGrievances.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-auto">
                  {userGrievances.slice(0, 5).map((grievance) => (
                    <div
                      key={grievance.id}
                      className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getStatusIcon(grievance.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{grievance.referenceId}</span>
                            <Badge variant={getStatusVariant(grievance.status)}>
                              {grievance.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-1">
                            {grievance.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(grievance.submittedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-1">No grievances found</p>
                  <p className="text-sm text-muted-foreground">
                    Submit your first grievance to get started
                  </p>
                </div>
              )}
              {userGrievances.length > 5 && (
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/status-tracking')}
                  >
                    View All
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Role-based Access Information */}
        {(user.selectedRole?.name === 'Admin' || user.selectedRole?.name === 'Grievance Officer') && (
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Administrative Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                As a {user.selectedRole.name}, you have access to additional administrative features.
              </p>
              <Button 
                onClick={() => navigate('/admin-dashboard')}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Access Admin Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;