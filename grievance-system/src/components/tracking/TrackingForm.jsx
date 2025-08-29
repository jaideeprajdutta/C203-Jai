import React, { useState } from 'react';
import { Search, AlertCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { validateReferenceId } from '../../utils/referenceGenerator';

const TrackingForm = ({ onSearch, isLoading = false }) => {
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase().trim();
    setReferenceId(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!referenceId.trim()) {
      setError('Please enter a reference ID');
      return;
    }
    
    if (!validateReferenceId(referenceId)) {
      setError('Please enter a valid reference ID format (e.g., GRV-2024-0116-1234 or TRK-ABC12345)');
      return;
    }
    
    onSearch(referenceId);
  };

  const handleClear = () => {
    setReferenceId('');
    setError('');
  };

  const exampleIds = [
    'GRV-2024-0116-1234',
    'TRK-ABC12345'
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Main Tracking Form */}
      <Card className="card-professional">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-black flex items-center justify-center gap-2">
            <Search className="h-6 w-6" />
            Track Your Grievance
          </CardTitle>
          <CardDescription>
            Enter your reference ID to check the status and progress of your grievance
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Reference ID Input */}
            <div className="space-y-2">
              <label htmlFor="referenceId" className="text-sm font-medium text-black">
                Reference ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="referenceId"
                  type="text"
                  placeholder="Enter your reference ID (e.g., GRV-2024-0116-1234)"
                  value={referenceId}
                  onChange={handleInputChange}
                  className={`pl-10 pr-20 text-center font-mono text-lg ${
                    error ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isLoading}
                />
                {referenceId && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    ×
                  </Button>
                )}
              </div>
              
              {error && (
                <div className="flex items-start gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Reference IDs are case-insensitive and can include dashes
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !referenceId.trim()}
              className="w-full btn-primary py-3 text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Searching...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  Track Grievance
                </div>
              )}
            </Button>
          </form>

          {/* Help Section Toggle */}
          <div className="border-t border-gray-200 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowHelp(!showHelp)}
              className="w-full text-sm text-gray-600 hover:text-black"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              {showHelp ? 'Hide Help' : 'Need help finding your reference ID?'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      {showHelp && (
        <Card className="card-professional bg-blue-50 border-blue-200 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">How to Find Your Reference ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Reference ID Formats:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <code className="bg-white px-2 py-1 rounded border text-sm font-mono">
                      GRV-YYYY-MMDD-XXXX
                    </code>
                    <span className="text-sm text-blue-700">For registered users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="bg-white px-2 py-1 rounded border text-sm font-mono">
                      TRK-XXXXXXXX
                    </code>
                    <span className="text-sm text-blue-700">For anonymous submissions</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-blue-800 mb-2">Where to Find It:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Check your email confirmation after submitting</li>
                  <li>• Look for the receipt you downloaded</li>
                  <li>• Check your dashboard if you're a registered user</li>
                  <li>• Review any SMS notifications you received</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-800 mb-2">Examples:</h4>
                <div className="space-y-1">
                  {exampleIds.map((id, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <code className="bg-white px-2 py-1 rounded border text-sm font-mono">
                        {id}
                      </code>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setReferenceId(id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Try this example
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Support */}
      <Card className="card-professional bg-gray-50">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-medium text-black mb-2">Can't Find Your Reference ID?</h4>
            <p className="text-sm text-gray-600 mb-4">
              Our support team can help you locate your grievance using other information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
              <Button variant="outline" size="sm">
                Call: +1 (555) 123-4567
              </Button>
              <Button variant="outline" size="sm">
                Email: support@university.edu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          Your grievance information is confidential and secure. Only authorized personnel 
          can access your submission details using the reference ID.
        </p>
      </div>
    </div>
  );
};

export default TrackingForm;