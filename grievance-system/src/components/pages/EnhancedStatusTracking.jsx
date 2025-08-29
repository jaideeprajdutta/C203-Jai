import React, { useState } from 'react';
import TrackingForm from '../tracking/TrackingForm';
import GrievanceStatus from '../tracking/GrievanceStatus';

const EnhancedStatusTracking = () => {
  const [grievanceData, setGrievanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (referenceId) => {
    setIsLoading(true);
    setSearchPerformed(true);
    
    try {
      // Simulate API call to fetch grievance data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - in real app, this would come from API
      const mockData = {
        referenceId: referenceId,
        title: 'Library Access Issue',
        description: 'Unable to access library resources after 8 PM. Security guard denies entry despite valid ID card.',
        category: 'Infrastructure',
        status: 'in-progress',
        priority: 'medium',
        submittedDate: '2024-01-15T10:30:00Z',
        assignedOfficer: 'Officer John Smith',
        timeline: [
          {
            type: 'submitted',
            title: 'Grievance Submitted',
            description: 'Your grievance has been successfully submitted and assigned a reference ID.',
            date: '2024-01-15T10:30:00Z',
            officer: 'System'
          },
          {
            type: 'assigned',
            title: 'Assigned to Officer',
            description: 'Your grievance has been assigned to Officer John Smith for review and investigation.',
            date: '2024-01-15T14:20:00Z',
            officer: 'Admin Team'
          },
          {
            type: 'in-progress',
            title: 'Investigation Started',
            description: 'Officer has started investigating the issue. Library management has been contacted.',
            date: '2024-01-16T09:15:00Z',
            officer: 'Officer John Smith'
          }
        ],
        updates: [
          {
            title: 'Investigation Update',
            message: 'We have contacted the library management and security team. They are reviewing the access policies for evening hours.',
            date: '2024-01-16T15:30:00Z',
            officer: 'Officer John Smith'
          }
        ]
      };
      
      setGrievanceData(mockData);
    } catch (error) {
      console.error('Search failed:', error);
      setGrievanceData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setGrievanceData(null);
    setSearchPerformed(false);
  };

  const handleDownloadReport = () => {
    if (!grievanceData) return;
    
    const reportContent = `
GRIEVANCE STATUS REPORT
======================

Reference ID: ${grievanceData.referenceId}
Title: ${grievanceData.title}
Category: ${grievanceData.category}
Status: ${grievanceData.status}
Priority: ${grievanceData.priority}
Submitted Date: ${new Date(grievanceData.submittedDate).toLocaleString()}
Assigned Officer: ${grievanceData.assignedOfficer}

DESCRIPTION:
${grievanceData.description}

TIMELINE:
${grievanceData.timeline.map(event => 
  `${new Date(event.date).toLocaleString()} - ${event.title}: ${event.description}`
).join('\n')}

RECENT UPDATES:
${grievanceData.updates.map(update => 
  `${new Date(update.date).toLocaleString()} - ${update.title}: ${update.message}`
).join('\n')}

Generated on: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grievance-report-${grievanceData.referenceId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-8">
      <div className="container mx-auto px-4">
        {!searchPerformed || (!grievanceData && !isLoading) ? (
          <TrackingForm onSearch={handleSearch} isLoading={isLoading} />
        ) : (
          <GrievanceStatus 
            grievanceData={grievanceData}
            onBack={handleBack}
            onDownloadReport={handleDownloadReport}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedStatusTracking;