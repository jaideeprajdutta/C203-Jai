import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  User, 
  Calendar, 
  MessageSquare,
  FileText,
  Phone,
  Mail,
  Download,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const GrievanceStatus = ({ grievanceData, onBack, onDownloadReport }) => {
  if (!grievanceData) {
    return (
      <Card className="card-professional">
        <CardContent className="p-8 text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black mb-2">Grievance Not Found</h3>
          <p className="text-gray-600 mb-4">
            The reference ID you entered could not be found in our system.
          </p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'in-progress':
      case 'under-review':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'resolved':
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
      case 'pending':
        return <Badge className="status-pending">Pending Review</Badge>;
      case 'in-progress':
      case 'under-review':
        return <Badge className="status-in-progress">In Progress</Badge>;
      case 'resolved':
      case 'completed':
        return <Badge className="status-resolved">Resolved</Badge>;
      case 'closed':
        return <Badge className="status-closed">Closed</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Normal Priority</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDaysOpen = (submittedDate) => {
    const submitted = new Date(submittedDate);
    const now = new Date();
    const diffTime = Math.abs(now - submitted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-4 text-black hover:bg-[#CFFFE2]"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Search Another Grievance
      </Button>

      {/* Header Card */}
      <Card className="card-professional">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {getStatusIcon(grievanceData.status)}
                <CardTitle className="text-2xl text-black">
                  {grievanceData.title}
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                Reference ID: <span className="font-mono font-medium">{grievanceData.referenceId}</span>
              </CardDescription>
            </div>
            <div className="text-right space-y-2">
              {getStatusBadge(grievanceData.status)}
              {grievanceData.priority && getPriorityBadge(grievanceData.priority)}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Submitted Date</p>
              <p className="text-black">{formatDate(grievanceData.submittedDate)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Category</p>
              <p className="text-black">{grievanceData.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Days Open</p>
              <p className="text-black">{calculateDaysOpen(grievanceData.submittedDate)} days</p>
            </div>
          </div>

          {/* Description */}
          {grievanceData.description && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Description</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-black leading-relaxed">{grievanceData.description}</p>
              </div>
            </div>
          )}

          {/* Assigned Officer */}
          {grievanceData.assignedOfficer && (
            <div className="flex items-center gap-3 p-4 bg-[#CFFFE2]/20 rounded-lg">
              <User className="h-5 w-5 text-black" />
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Officer</p>
                <p className="text-black">{grievanceData.assignedOfficer}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle className="text-xl text-black">Progress Timeline</CardTitle>
          <CardDescription>Track the progress of your grievance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {grievanceData.timeline && grievanceData.timeline.length > 0 ? (
              grievanceData.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event.type === 'submitted' ? 'bg-blue-100 text-blue-600' :
                      event.type === 'assigned' ? 'bg-purple-100 text-purple-600' :
                      event.type === 'in-progress' ? 'bg-orange-100 text-orange-600' :
                      event.type === 'resolved' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {event.type === 'submitted' && <FileText className="h-4 w-4" />}
                      {event.type === 'assigned' && <User className="h-4 w-4" />}
                      {event.type === 'in-progress' && <Clock className="h-4 w-4" />}
                      {event.type === 'resolved' && <CheckCircle className="h-4 w-4" />}
                      {!['submitted', 'assigned', 'in-progress', 'resolved'].includes(event.type) && 
                        <MessageSquare className="h-4 w-4" />}
                    </div>
                    {index < grievanceData.timeline.length - 1 && (
                      <div className="w-px h-8 bg-gray-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-black">{event.title}</h4>
                      <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    {event.officer && (
                      <p className="text-xs text-gray-500 mt-1">By: {event.officer}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No timeline updates available yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Updates & Communications */}
      {grievanceData.updates && grievanceData.updates.length > 0 && (
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="text-xl text-black">Recent Updates</CardTitle>
            <CardDescription>Latest communications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grievanceData.updates.map((update, index) => (
                <div key={index} className="border-l-4 border-[#A2D5C6] pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black">{update.title}</h4>
                    <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{update.message}</p>
                  {update.officer && (
                    <p className="text-xs text-gray-500">From: {update.officer}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card className="card-professional bg-[#CFFFE2]/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#CFFFE2] rounded-lg">
              <MessageSquare className="h-6 w-6 text-black" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-black mb-2">Need to Contact Us?</h4>
              <p className="text-sm text-gray-600 mb-4">
                If you have questions about your grievance or need to provide additional information, 
                you can contact us using the methods below.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call: +1 (555) 123-4567
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email Support
                </Button>
                {onDownloadReport && (
                  <Button variant="outline" size="sm" onClick={onDownloadReport} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Resolution Time */}
      {grievanceData.status !== 'resolved' && grievanceData.status !== 'closed' && (
        <Card className="card-professional border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-800">Expected Resolution</h4>
                <p className="text-sm text-blue-700">
                  Based on the category and complexity, we expect to resolve this grievance within{' '}
                  <span className="font-medium">
                    {grievanceData.category === 'harassment' ? '3-5 working days' :
                     grievanceData.category === 'infrastructure' ? '5-7 working days' :
                     '7-10 working days'}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GrievanceStatus;