import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  UserCheck,
  Eye,
  Send,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Phone,
  Mail,
  FileCheck
} from 'lucide-react';
import Layout from '../layout/Layout';

const OfficerDashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for officer work queue
  const workQueue = [
    {
      id: 'GRV-2024-008',
      title: 'Hostel Room Maintenance Issue',
      student: 'Alice Johnson (CS2021003)',
      category: 'Infrastructure',
      status: 'Assigned to Me',
      submittedDate: '2024-01-17',
      priority: 'high',
      daysOpen: 1,
      lastUpdate: '2024-01-17'
    },
    {
      id: 'GRV-2024-009',
      title: 'Course Registration Problem',
      student: 'Bob Wilson (EE2021004)',
      category: 'Academic',
      status: 'Investigation Required',
      submittedDate: '2024-01-16',
      priority: 'medium',
      daysOpen: 2,
      lastUpdate: '2024-01-16'
    },
    {
      id: 'GRV-2024-010',
      title: 'Library Access Card Issue',
      student: 'Carol Davis (ME2021005)',
      category: 'Infrastructure',
      status: 'Awaiting Response',
      submittedDate: '2024-01-15',
      priority: 'low',
      daysOpen: 3,
      lastUpdate: '2024-01-16'
    }
  ];

  const quickActions = [
    {
      id: 'process-grievances',
      title: 'Process Grievances',
      description: 'Review and process pending grievances',
      icon: FileCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'communicate',
      title: 'Communicate',
      description: 'Send updates to students and faculty',
      icon: MessageSquare,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'generate-reports',
      title: 'Generate Reports',
      description: 'Create status and progress reports',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'contact-users',
      title: 'Contact Users',
      description: 'Reach out to students or faculty',
      icon: Phone,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'assigned to me':
        return 'bg-blue-100 text-blue-800';
      case 'investigation required':
        return 'bg-yellow-100 text-yellow-800';
      case 'awaiting response':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
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

  const getDaysOpenColor = (days) => {
    if (days <= 1) return 'text-green-600';
    if (days <= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <UserCheck className="h-8 w-8 text-black" />
            <h1 className="heading-lg text-black">Officer Dashboard</h1>
          </div>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Welcome, {user?.name || 'Grievance Officer'}. Manage your assigned grievances, 
            communicate with users, and track resolution progress efficiently.
          </p>
        </div>

        {/* Work Queue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">3</p>
                <p className="text-sm text-gray-600">Assigned Cases</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">1</p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">2</p>
                <p className="text-sm text-gray-600">Pending Action</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">12</p>
                <p className="text-sm text-gray-600">Resolved This Week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="card-professional-lg">
          <CardHeader>
            <CardTitle className="heading-sm text-black">Officer Actions</CardTitle>
            <CardDescription className="body-md text-gray-600">
              Essential tools for processing grievances and communicating with users
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
                    onClick={() => navigate(`/officer/${action.id}`)}
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
                onClick={() => navigate('/officer/bulk-update')}
              >
                <Send className="h-4 w-4 mr-2" />
                Bulk Status Update
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
                onClick={() => navigate('/officer/send-notification')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Work Queue */}
        <Card className="card-professional-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="heading-sm text-black">My Work Queue</CardTitle>
              <CardDescription className="body-md text-gray-600">
                Grievances assigned to you requiring attention and action
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/officer/filter')}
                className="border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate('/officer/all-cases')}
                className="border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
              >
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workQueue.map((case_item) => (
                <div 
                  key={case_item.id}
                  className="flex items-center justify-between p-4 border border-[#A2D5C6]/20 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-black">{case_item.title}</h4>
                      <Badge className={getStatusColor(case_item.status)}>
                        {case_item.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(case_item.priority)}>
                        {case_item.priority}
                      </Badge>
                      <span className={`text-sm font-medium ${getDaysOpenColor(case_item.daysOpen)}`}>
                        {case_item.daysOpen} day{case_item.daysOpen !== 1 ? 's' : ''} open
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>ID: {case_item.id}</span>
                      <span>Student: {case_item.student}</span>
                      <span>Category: {case_item.category}</span>
                      <span>Submitted: {new Date(case_item.submittedDate).toLocaleDateString()}</span>
                      <span>Last Update: {new Date(case_item.lastUpdate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/officer/case/${case_item.id}`)}
                      className="text-black hover:bg-[#A2D5C6]"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/officer/case/${case_item.id}/update`)}
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Update
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/officer/case/${case_item.id}/contact`)}
                      className="text-green-600 hover:bg-green-50"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="heading-sm text-black flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                My Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cases Resolved This Month</span>
                  <span className="font-semibold text-green-600">24</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Response Time</span>
                  <span className="font-semibold text-blue-600">1.8 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">User Satisfaction Rating</span>
                  <span className="font-semibold text-purple-600">4.6/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="heading-sm text-black flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Resolved GRV-2024-007</span>
                  <span className="text-gray-400">30 min ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Updated status for GRV-2024-008</span>
                  <span className="text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Contacted student for GRV-2024-009</span>
                  <span className="text-gray-400">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Generated weekly report</span>
                  <span className="text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Assigned new case GRV-2024-010</span>
                  <span className="text-gray-400">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Officer Resources */}
        <Card className="card-professional bg-[#CFFFE2]/30 border-[#A2D5C6]">
          <CardContent className="text-center space-y-4 p-8">
            <h3 className="heading-sm text-black">Officer Resources</h3>
            <p className="body-md text-gray-700 max-w-2xl mx-auto">
              Access processing guidelines, communication templates, and reporting tools 
              to efficiently handle grievances and maintain high service standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/officer/guidelines')}
              >
                Processing Guidelines
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/officer/templates')}
              >
                Communication Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OfficerDashboard;={p
riorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workQueue.map((grievance) => (
              <div
                key={grievance.id}
                className="p-4 border border-[#A2D5C6]/20 rounded-lg hover:border-[#A2D5C6] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-black">{grievance.title}</h4>
                      {getPriorityBadge(grievance.priority)}
                      {getStatusBadge(grievance.status)}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <span>ID: {grievance.id}</span>
                      <span>By: {grievance.submittedBy}</span>
                      <span>Category: {grievance.category}</span>
                      <span className={getDaysOpenColor(grievance.daysOpen)}>
                        Days Open: {grievance.daysOpen}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{grievance.description}</p>
                    <div className="text-sm text-gray-500">
                      Submitted: {new Date(grievance.submittedDate).toLocaleDateString()} | 
                      Last Update: {new Date(grievance.lastUpdate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedGrievance(grievance)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCommunication(grievance.id, 'email')}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Select onValueChange={(value) => handleStatusUpdate(grievance.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Communications */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle className="text-xl text-black">Recent Communications</CardTitle>
          <CardDescription>Your recent interactions with complainants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCommunications.map((comm) => (
              <div
                key={comm.id}
                className="flex items-center justify-between p-4 border border-[#A2D5C6]/20 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-[#CFFFE2] rounded-lg">
                    {comm.type === 'email' ? (
                      <Mail className="h-5 w-5 text-black" />
                    ) : (
                      <Phone className="h-5 w-5 text-black" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-black">{comm.subject}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>To: {comm.recipient}</span>
                      <span>Re: {comm.grievanceId}</span>
                      <span>Sent: {new Date(comm.sentDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">{comm.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Officer Performance */}
      <Card className="card-professional bg-[#CFFFE2]/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#CFFFE2] rounded-lg">
              <TrendingUp className="h-6 w-6 text-black" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-black mb-2">Performance Summary</h4>
              <p className="text-sm text-gray-600 mb-4">
                This week: 12 grievances processed, 94% resolution rate, average response time: 1.2 days
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  View Detailed Report
                </Button>
                <Button variant="outline" size="sm">
                  Performance Metrics
                </Button>
                <Button variant="outline" size="sm">
                  Training Resources
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerDashboard;