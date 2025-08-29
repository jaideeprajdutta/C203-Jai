import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  UserPlus,
  Eye,
  Download,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  Shield,
  Database
} from 'lucide-react';
import Layout from '../layout/Layout';

const AdminDashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Mock data for admin overview
  const systemStats = {
    totalGrievances: 156,
    pendingReview: 23,
    inProgress: 45,
    resolved: 88,
    totalUsers: 1247,
    activeOfficers: 8,
    departments: 12
  };

  const recentGrievances = [
    {
      id: 'GRV-2024-005',
      title: 'Campus Security Concerns',
      student: 'Anonymous',
      category: 'Safety',
      status: 'High Priority',
      submittedDate: '2024-01-17',
      priority: 'high',
      assignedTo: 'Officer GRO001'
    },
    {
      id: 'GRV-2024-006',
      title: 'Cafeteria Food Quality',
      student: 'Multiple Students',
      category: 'Infrastructure',
      status: 'Under Investigation',
      submittedDate: '2024-01-16',
      priority: 'medium',
      assignedTo: 'Officer GRO002'
    },
    {
      id: 'GRV-2024-007',
      title: 'Library Resource Access',
      student: 'CS Department',
      category: 'Academic',
      status: 'Pending Assignment',
      submittedDate: '2024-01-15',
      priority: 'low',
      assignedTo: 'Unassigned'
    }
  ];

  const quickActions = [
    {
      id: 'manage-users',
      title: 'Manage Users',
      description: 'Add, edit, or remove system users',
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'system-reports',
      title: 'Generate Reports',
      description: 'Create comprehensive system reports',
      icon: BarChart3,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: Settings,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'data-backup',
      title: 'Data Management',
      description: 'Backup and restore system data',
      icon: Database,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'high priority':
        return 'bg-red-100 text-red-800';
      case 'under investigation':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending assignment':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="h-8 w-8 text-black" />
            <h1 className="heading-lg text-black">Administrator Dashboard</h1>
          </div>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive system overview and management tools for the grievance redressal system. 
            Monitor all activities, manage users, and generate detailed reports.
          </p>
        </div>

        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{systemStats.totalGrievances}</p>
                <p className="text-sm text-gray-600">Total Grievances</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{systemStats.pendingReview}</p>
                <p className="text-sm text-gray-600">Pending Review</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{systemStats.inProgress}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{systemStats.resolved}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{systemStats.totalUsers}</p>
                <p className="text-sm text-gray-600">Total System Users</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{systemStats.activeOfficers}</p>
                <p className="text-sm text-gray-600">Active Officers</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100">
                <BarChart3 className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{systemStats.departments}</p>
                <p className="text-sm text-gray-600">Departments</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="card-professional-lg">
          <CardHeader>
            <CardTitle className="heading-sm text-black">Administrative Actions</CardTitle>
            <CardDescription className="body-md text-gray-600">
              Essential system management and administrative functions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className={`h-auto p-6 flex flex-col items-center space-y-3 border-2 hover:shadow-md transition-all duration-200 ${action.color}`}
                    onClick={() => navigate(`/admin/${action.id}`)}
                  >
                    <IconComponent className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-sm opacity-80">{action.description}</p>
                    </div>
                  </Button>
                );
              })}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-primary flex-1"
                onClick={() => navigate('/admin/add-user')}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
                onClick={() => navigate('/admin/export-data')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export System Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Grievances Management */}
        <Card className="card-professional-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="heading-sm text-black">Recent Grievances</CardTitle>
              <CardDescription className="body-md text-gray-600">
                Latest grievances requiring administrative attention
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/filter-grievances')}
                className="border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/all-grievances')}
                className="border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
              >
                <Search className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrievances.map((grievance) => (
                <div 
                  key={grievance.id}
                  className="flex items-center justify-between p-4 border border-[#A2D5C6]/20 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-black">{grievance.title}</h4>
                      <Badge className={getStatusColor(grievance.status)}>
                        {grievance.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(grievance.priority)}>
                        {grievance.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>ID: {grievance.id}</span>
                      <span>Student: {grievance.student}</span>
                      <span>Category: {grievance.category}</span>
                      <span>Assigned: {grievance.assignedTo}</span>
                      <span>Date: {new Date(grievance.submittedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/admin/grievance/${grievance.id}`)}
                      className="text-black hover:bg-[#A2D5C6]"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/admin/grievance/${grievance.id}/assign`)}
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Analytics */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="heading-sm text-black flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                System Analytics
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={selectedTimeframe === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('week')}
                  className="text-xs"
                >
                  Week
                </Button>
                <Button
                  variant={selectedTimeframe === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('month')}
                  className="text-xs"
                >
                  Month
                </Button>
                <Button
                  variant={selectedTimeframe === 'year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('year')}
                  className="text-xs"
                >
                  Year
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resolution Rate</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Response Time</span>
                  <span className="font-semibold text-blue-600">2.3 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">User Satisfaction</span>
                  <span className="font-semibold text-purple-600">4.2/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Activity */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="heading-sm text-black flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Recent System Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">New officer GRO009 added to system</span>
                  <span className="text-gray-400">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">System backup completed successfully</span>
                  <span className="text-gray-400">3 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Monthly report generated</span>
                  <span className="text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">System settings updated</span>
                  <span className="text-gray-400">2 days ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Security audit completed</span>
                  <span className="text-gray-400">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="card-professional bg-[#CFFFE2]/30 border-[#A2D5C6]">
          <CardContent className="text-center space-y-4 p-8">
            <h3 className="heading-sm text-black">System Administration</h3>
            <p className="body-md text-gray-700 max-w-2xl mx-auto">
              Monitor system health, manage user access, generate comprehensive reports, 
              and maintain the integrity of the grievance redressal system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/admin/system-health')}
              >
                System Health Check
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/admin/audit-logs')}
              >
                View Audit Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;