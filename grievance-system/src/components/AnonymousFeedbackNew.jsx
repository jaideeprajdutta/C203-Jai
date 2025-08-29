import React, { useState } from 'react';
import { Send, FileText, User, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

const AnonymousFeedback = () => {
  const { submitGrievance } = useAppContext();
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    description: '',
    isAnonymous: true,
    contactInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const categories = [
    'Academic Issues',
    'Administrative Issues',
    'Infrastructure',
    'Faculty Conduct',
    'Harassment',
    'Discrimination',
    'Other',
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const grievanceData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
      };

      const refId = await submitGrievance(grievanceData);
      setReferenceId(refId);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting grievance:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <Card>
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Grievance Submitted Successfully!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your grievance has been recorded and will be reviewed by our team.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="font-semibold">Your Reference ID:</p>
              <p className="text-lg font-mono text-primary">{referenceId}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Please save this reference ID to track your grievance status.
              </p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => window.location.href = '/status-tracking'} className="w-full">
                Track Status
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    category: '',
                    priority: '',
                    description: '',
                    isAnonymous: true,
                    contactInfo: '',
                  });
                }}
                className="w-full"
              >
                Submit Another Grievance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-primary">Submit Grievance</CardTitle>
          <CardDescription className="text-lg">
            Share your concerns and feedback securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous Toggle */}
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                {formData.isAnonymous ? (
                  <Shield className="h-5 w-5 text-primary" />
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
                <span className="font-medium">
                  {formData.isAnonymous ? 'Anonymous Submission' : 'Identified Submission'}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
              >
                {formData.isAnonymous ? 'Add Identity' : 'Make Anonymous'}
              </Button>
            </div>

            {/* Contact Info (if not anonymous) */}
            {!formData.isAnonymous && (
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information</Label>
                <Input
                  id="contact"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                  placeholder="Email or phone number (optional)"
                />
              </div>
            )}

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please describe your grievance in detail..."
                rows={6}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !formData.category || !formData.priority || !formData.description}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Grievance
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnonymousFeedback;