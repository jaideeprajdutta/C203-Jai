import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Eye,
  BookOpen,
  GraduationCap,
  Calendar,
  TrendingUp
} from 'lucide-react';
import Layout from '../layout/Layout';

const FacultyDashboard = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  // Mock data for faculty-specific grievances
  const assignedGrievances = [
    {
      id: 'GRV-2024-003',
      title: 'Course Material Access Issues',
      student: 'John Doe (CS2021001)',
      category: 'Academic',
      status: 'Pending Review',
      submittedDate: '2024-01-16',
      priority: 'medium',
      department: 'Computer Science'
    },
    {
      id: 'GRV-2024-004',
      title: 'Exam Schedule Conflict',
      student: 'Jane Smith (CS2021002)',
      category: 'Academic',
      status: 'In Progress',
      submittedDate: '2024-01-14',
      priority: 'high',
      department: 'Computer Science'
    }
  ];

  const quickActions = [
    {
      id: 'academic-support',
      title: 'Academic Support',
      description: 'Help students with course-related issues',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'student-counseling',
      title: 'Student Counseling',
      description: 'Provide guidance and mentorship',
      icon: Users,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'curriculum-feedback',
      title: 'Curriculum Feedback',
      description: 'Submit feedback on course improvements',
      icon: GraduationCap,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending review':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
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
          <h1 className="heading-lg text-black">Welcome, {user?.name || 'Faculty Member'}</h1>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Your faculty dashboard helps you manage student grievances, provide academic support, 
            and contribute to improving the educational experience.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">2</p>
                <p className="text-sm text-gray-600">Assigned Cases</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">1</p>
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
                <p className="text-2xl font-bold text-black">1</p>
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
                <p className="text-2xl font-bold text-black">15</p>
                <p className="text-sm text-gray-600">Resolved This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="card-professional-lg">
          <CardHeader>
            <CardTitle className="heading-sm text-black">Faculty Actions</CardTitle>
            <CardDescription className="body-md text-gray-600">
              Common actions to support students and improve academic processes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className={`h-auto p-6 flex flex-col items-center space-y-3 border-2 hover:shadow-md transition-all duration-200 ${action.color}`}
                    onClick={() => navigate(`/faculty/${action.id}`)}
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
                onClick={() => navigate('/faculty/submit-report')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Faculty Report
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
                onClick={() => navigate('/faculty/student-feedback')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                View Student Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Grievances */}
        <Card className="card-professional-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="heading-sm text-black">Assigned Grievances</CardTitle>
              <CardDescription className="body-md text-gray-600">
                Student grievances requiring your attention and expertise
              </CardDescription>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/faculty/all-grievances')}
              className="border-[#A2D5C6] text-black hover:bg-[#A2D5C6]"
            >
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {assignedGrievances.length > 0 ? (
              <div className="space-y-4">
                {assignedGrievances.map((grievance) => (
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
                        <span>Submitted: {new Date(grievance.submittedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/faculty/grievance/${grievance.id}`)}
                        className="text-black hover:bg-[#A2D5C6]"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/faculty/grievance/${grievance.id}/respond`)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No grievances assigned at the moment</p>
                <p className="text-sm text-gray-500">
                  New grievances will appear here when they require your expertise
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Faculty Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="heading-sm text-black flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Resolved grievance GRV-2024-001</span>
                  <span className="text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Responded to student inquiry</span>
                  <span className="text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Updated course feedback</span>
                  <span className="text-gray-400">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="heading-sm text-black flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">Faculty Meeting</p>
                    <p className="text-sm text-blue-600">Grievance Review Session</p>
                  </div>
                  <span className="text-sm text-blue-600">Jan 20</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">Student Counseling</p>
                    <p className="text-sm text-green-600">Office Hours</p>
                  </div>
                  <span className="text-sm text-green-600">Jan 22</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="card-professional bg-[#CFFFE2]/30 border-[#A2D5C6]">
          <CardContent className="text-center space-y-4 p-8">
            <h3 className="heading-sm text-black">Faculty Resources</h3>
            <p className="body-md text-gray-700 max-w-2xl mx-auto">
              Access guidelines, best practices, and support resources to effectively 
              handle student grievances and provide quality academic support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/faculty/guidelines')}
              >
                Faculty Guidelines
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={() => navigate('/faculty/training')}
              >
                Training Resources
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FacultyDashboard;