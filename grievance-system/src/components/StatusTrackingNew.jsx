import React, { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Label } from './ui/label';

const StatusTracking = () => {
  const { state } = useAppContext();
  const { grievances } = state;
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!searchId.trim()) {
      setError('Please enter a reference ID');
      return;
    }

    const grievance = grievances.find(g => g.referenceId === searchId.trim());
    if (grievance) {
      setSearchResult(grievance);
      setError('');
    } else {
      setSearchResult(null);
      setError('No grievance found with this reference ID');
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
        return <AlertCircle className="h-4 w-4" />;
    }
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

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-primary">Track Your Grievance</CardTitle>
          <CardDescription className="text-lg">
            Enter your reference ID to check the status of your complaint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reference-id">Reference ID</Label>
              <div className="flex gap-2">
                <Input
                  id="reference-id"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter your reference ID (e.g., GRV-2024-001)"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
                {error}
              </div>
            )}
          </div>

          {/* Search Result */}
          {searchResult && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(searchResult.status)}
                    {searchResult.referenceId}
                  </CardTitle>
                  <Badge variant={getStatusVariant(searchResult.status)}>
                    {searchResult.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{searchResult.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Category</h4>
                    <p className="text-muted-foreground">{searchResult.category}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Priority</h4>
                    <Badge variant="outline">{searchResult.priority}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Submitted Date</h4>
                    <p className="text-muted-foreground">
                      {new Date(searchResult.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Last Updated</h4>
                    <p className="text-muted-foreground">
                      {new Date(searchResult.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {searchResult.response && (
                  <div>
                    <h4 className="font-semibold mb-2">Response</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-muted-foreground">{searchResult.response}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recent Grievances for authenticated users */}
          {state.user.isAuthenticated && grievances.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Recent Grievances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grievances.slice(0, 5).map((grievance) => (
                    <div
                      key={grievance.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => {
                        setSearchId(grievance.referenceId);
                        setSearchResult(grievance);
                        setError('');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(grievance.status)}
                        <div>
                          <p className="font-medium">{grievance.referenceId}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {grievance.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(grievance.status)}>
                        {grievance.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusTracking;