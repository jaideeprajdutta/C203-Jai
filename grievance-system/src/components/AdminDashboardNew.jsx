import React from 'react';
import { BarChart3, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const AdminDashboard = () => {
  const { state } = useAppContext();
  const { grievances, user } = state;

  // Filter grievances for the current institution
  const institutionGrievances = grievances.filter(
    g => g.institutionId === user.selectedInstitution?.id
  );

  const stats = {
    total: institutionGrievances.length,
    pending: institutionGrievances.filter(g => g.status === 'Submitted' || g.status === 'Under Review').length,
    inProgress: institutionGrievances.filter(g => g.status === 'In Progress').length,
    resolved: institutionGrievances.filter(g => g.status === 'Resolved').length,
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
        return <Clock className="h-4 w-4" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage grievances and monitor system activity for {user.selectedInstitution?.name}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
              <Clock className="h-10 w-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <BarChart3 className="h-10 w-10 text-blue-600" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grievances */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Grievances</CardTitle>
            <CardDescription>Latest submissions requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {institutionGrievances.length > 0 ? (
              <div className="space-y-4">
                {institutionGrievances.slice(0, 5).map((grievance) => (
                  <div
                    key={grievance.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50"
                  >
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
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Category: {grievance.category}</span>
                        <span>Priority: {grievance.priority}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No grievances found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Grievances by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Academic Issues', 'Administrative Issues', 'Infrastructure', 'Faculty Conduct', 'Other'].map((category) => {
                const count = institutionGrievances.filter(g => g.category === category).length;
                const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;