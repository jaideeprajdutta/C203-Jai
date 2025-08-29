import React, { useState } from 'react';
import { CheckCircle, Copy, Download, ArrowRight, Share2, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const GrievanceSubmissionSuccess = ({ 
  referenceId, 
  submissionData, 
  onTrackGrievance, 
  onSubmitAnother,
  onGoToDashboard 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referenceId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReceipt = () => {
    const receiptData = {
      referenceId,
      submissionDate: new Date().toLocaleString(),
      title: submissionData?.title || 'Grievance Submission',
      category: submissionData?.category || 'General',
      status: 'Submitted'
    };

    const receiptText = `
GRIEVANCE SUBMISSION RECEIPT
============================

Reference ID: ${receiptData.referenceId}
Submission Date: ${receiptData.submissionDate}
Title: ${receiptData.title}
Category: ${receiptData.category}
Status: ${receiptData.status}

IMPORTANT INSTRUCTIONS:
- Keep this reference ID safe for tracking your grievance
- You will receive updates on the progress of your submission
- Expected response time: 2-3 working days
- For urgent matters, contact: +1 (555) 911-HELP

Thank you for using the Grievance Redressal System.
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grievance-receipt-${referenceId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareReference = async () => {
    const shareData = {
      title: 'Grievance Reference ID',
      text: `My grievance reference ID: ${referenceId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        handleCopyReference();
      }
    } else {
      handleCopyReference();
    }
  };

  const handleEmailReference = () => {
    const subject = encodeURIComponent('Grievance Reference ID');
    const body = encodeURIComponent(`
Dear Support Team,

I have submitted a grievance with the following reference ID: ${referenceId}

Submission Date: ${new Date().toLocaleString()}
Title: ${submissionData?.title || 'Grievance Submission'}
Category: ${submissionData?.category || 'General'}

Please keep me updated on the progress.

Thank you.
    `.trim());
    
    window.open(`mailto:grievance@university.edu?subject=${subject}&body=${body}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Success Header */}
      <Card className="card-professional border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            Grievance Submitted Successfully!
          </h1>
          <p className="text-green-700">
            Your grievance has been received and will be reviewed by our team.
          </p>
        </CardContent>
      </Card>

      {/* Reference ID Card */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle className="text-xl text-black">Your Reference ID</CardTitle>
          <CardDescription>
            Save this reference ID to track your grievance status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reference ID Display */}
          <div className="bg-[#CFFFE2]/20 border-2 border-[#A2D5C6] rounded-lg p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Reference ID</p>
              <div className="text-3xl font-mono font-bold text-black mb-4 tracking-wider">
                {referenceId}
              </div>
              <Badge className="bg-[#CFFFE2] text-black">
                Keep this ID safe
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleCopyReference}
              variant="outline"
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy ID'}
            </Button>
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
            <Button
              onClick={handleShareReference}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share ID
            </Button>
            <Button
              onClick={handleEmailReference}
              variant="outline"
              className="gap-2"
            >
              <Mail className="h-4 w-4" />
              Email ID
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submission Details */}
      {submissionData && (
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="text-lg text-black">Submission Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Title</p>
                <p className="text-black">{submissionData.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Category</p>
                <p className="text-black">{submissionData.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Submission Date</p>
                <p className="text-black">{new Date().toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge className="status-pending">Submitted</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle className="text-lg text-black">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#CFFFE2] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-black">1</span>
              </div>
              <div>
                <h4 className="font-medium text-black">Initial Review</h4>
                <p className="text-sm text-gray-600">
                  Your grievance will be reviewed within 2-3 working days to ensure all required information is provided.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#A2D5C6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-black">2</span>
              </div>
              <div>
                <h4 className="font-medium text-black">Assignment & Investigation</h4>
                <p className="text-sm text-gray-600">
                  Your grievance will be assigned to the appropriate officer for detailed investigation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#CFFFE2] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-black">3</span>
              </div>
              <div>
                <h4 className="font-medium text-black">Resolution & Feedback</h4>
                <p className="text-sm text-gray-600">
                  You will be contacted with updates and the final resolution of your grievance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onTrackGrievance}
          className="btn-primary flex-1 gap-2"
        >
          Track My Grievance
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={onSubmitAnother}
          variant="outline"
          className="flex-1"
        >
          Submit Another Grievance
        </Button>
        {onGoToDashboard && (
          <Button
            onClick={onGoToDashboard}
            variant="outline"
            className="flex-1"
          >
            Go to Dashboard
          </Button>
        )}
      </div>

      {/* Important Notice */}
      <Card className="card-professional bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Important Reminders</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Keep your reference ID safe - you'll need it to track progress</li>
                <li>• Check your email regularly for updates</li>
                <li>• For urgent matters, call our 24/7 helpline: +1 (555) 911-HELP</li>
                <li>• You can track your grievance status anytime using the reference ID</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrievanceSubmissionSuccess;