import React, { useState } from 'react';
import { AlertTriangle, MapPin, User, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import FileUploadZone from './FileUploadZone';
import { generateReferenceId } from '../../utils/referenceGenerator';
import { useAppContext } from '../../context/AppContext';

const EnhancedGrievanceForm = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { user } = state;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    incidentDate: '',
    incidentTime: '',
    contactMethod: 'email',
    contactDetails: '',
    isAnonymous: false,
    urgency: 'medium'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [referenceId] = useState(() => generateReferenceId());
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const categories = [
    { value: 'academic', label: 'Academic Issues' },
    { value: 'infrastructure', label: 'Infrastructure & Facilities' },
    { value: 'harassment', label: 'Harassment/Discrimination' },
    { value: 'accommodation', label: 'Accommodation Issues' },
    { value: 'administrative', label: 'Administrative Issues' },
    { value: 'financial', label: 'Financial Issues' },
    { value: 'library', label: 'Library Services' },
    { value: 'transport', label: 'Transportation' },
    { value: 'food', label: 'Food & Catering' },
    { value: 'medical', label: 'Medical Services' },
    { value: 'other', label: 'Other' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Can wait a week', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Needs attention soon', color: 'text-yellow-600' },
    { value: 'high', label: 'High - Urgent attention needed', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical - Immediate action required', color: 'text-red-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Show disclaimer for harassment category
    if (name === 'category' && value === 'harassment') {
      setShowDisclaimer(true);
    } else if (name === 'category' && value !== 'harassment') {
      setShowDisclaimer(false);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Show disclaimer for harassment category
    if (name === 'category' && value === 'harassment') {
      setShowDisclaimer(true);
    } else if (name === 'category' && value !== 'harassment') {
      setShowDisclaimer(false);
    }
  };

  const handleFilesUploaded = (files) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters long';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Incident date is required';
    } else {
      const incidentDate = new Date(formData.incidentDate);
      const today = new Date();
      if (incidentDate > today) {
        newErrors.incidentDate = 'Incident date cannot be in the future';
      }
    }

    if (!formData.incidentTime) {
      newErrors.incidentTime = 'Incident time is required';
    }

    if (!formData.isAnonymous && !formData.contactDetails.trim()) {
      newErrors.contactDetails = 'Contact details are required for non-anonymous submissions';
    }

    if (!formData.isAnonymous && formData.contactMethod === 'email' && formData.contactDetails) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactDetails)) {
        newErrors.contactDetails = 'Please enter a valid email address';
      }
    }

    if (!formData.isAnonymous && formData.contactMethod === 'phone' && formData.contactDetails) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.contactDetails.replace(/\D/g, ''))) {
        newErrors.contactDetails = 'Please enter a valid 10-digit phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to submit grievance
      await new Promise(resolve => setTimeout(resolve, 2000));

      const grievanceData = {
        ...formData,
        referenceId,
        submittedBy: user?.id || 'anonymous',
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        attachments: uploadedFiles
      };

      console.log('Grievance submitted:', grievanceData);

      // Navigate to success page
      navigate('/grievance-success', { 
        state: { 
          referenceId,
          grievanceData: {
            title: formData.title,
            category: formData.category,
            submittedDate: new Date().toISOString()
          }
        }
      });

    } catch (error) {
      setErrors({ submit: 'Failed to submit grievance. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-lg text-black mb-2">Submit a Grievance</h1>
          <p className="body-md text-gray-600">
            Please provide detailed information about your concern. All submissions are treated confidentially.
          </p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Reference ID:</strong> <code className="font-mono">{referenceId}</code> 
              <span className="ml-2 text-blue-600">(Save this for tracking)</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="text-xl text-black flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Provide a clear title and detailed description of your grievance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="form-group">
                <Label htmlFor="title" className="form-label">
                  Grievance Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a clear, descriptive title (minimum 10 characters)"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Description */}
              <div className="form-group">
                <Label htmlFor="description" className="form-label">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the issue, including what happened, when it occurred, and how it has affected you (minimum 50 characters)"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`form-input min-h-32 ${errors.description ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              {/* Category */}
              <div className="form-group">
                <Label htmlFor="category" className="form-label">
                  Category *
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`form-input ${errors.category ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select the category that best describes your grievance" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Harassment Disclaimer */}
              {showDisclaimer && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">Important Notice</h4>
                      <p className="text-sm text-red-700 leading-relaxed">
                        <strong>Ragging or harassment is a criminal offence.</strong> Submitting false complaints 
                        or accusations will lead to strict disciplinary and legal action. Please ensure all 
                        information provided is accurate and truthful.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Urgency Level */}
              <div className="form-group">
                <Label htmlFor="urgency" className="form-label">
                  Urgency Level *
                </Label>
                <Select 
                  value={formData.urgency} 
                  onValueChange={(value) => handleSelectChange('urgency', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <span className={level.color}>{level.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Incident Details */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="text-xl text-black flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Incident Details
              </CardTitle>
              <CardDescription>
                Provide specific details about when and where the incident occurred
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location */}
              <div className="form-group">
                <Label htmlFor="location" className="form-label">
                  Location of Incident *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g., Library 2nd Floor, Hostel Block A Room 204, Main Auditorium"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`pl-10 form-input ${errors.location ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <Label htmlFor="incidentDate" className="form-label">
                    Date of Incident *
                  </Label>
                  <Input
                    id="incidentDate"
                    name="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    className={`form-input ${errors.incidentDate ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.incidentDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.incidentDate}</p>
                  )}
                </div>

                <div className="form-group">
                  <Label htmlFor="incidentTime" className="form-label">
                    Time of Incident *
                  </Label>
                  <Input
                    id="incidentTime"
                    name="incidentTime"
                    type="time"
                    value={formData.incidentTime}
                    onChange={handleInputChange}
                    className={`form-input ${errors.incidentTime ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.incidentTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.incidentTime}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="text-xl text-black flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Supporting Evidence
              </CardTitle>
              <CardDescription>
                Upload any relevant documents, images, or evidence to support your grievance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone
                grievanceId={referenceId}
                onFilesUploaded={handleFilesUploaded}
                maxFiles={5}
                disabled={isSubmitting}
              />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card-professional">
            <CardHeader>
              <CardTitle className="text-xl text-black flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Choose how you'd like to be contacted regarding this grievance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Anonymous Submission */}
              <div className="flex items-start space-x-3">
                <input
                  id="isAnonymous"
                  name="isAnonymous"
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-black focus:ring-black border-[#A2D5C6] rounded mt-1"
                  disabled={isSubmitting}
                />
                <div>
                  <Label htmlFor="isAnonymous" className="text-sm font-medium text-black">
                    Submit anonymously
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Your identity will be kept completely confidential. However, we may not be able to provide updates on your grievance.
                  </p>
                </div>
              </div>

              {/* Contact Details for non-anonymous submissions */}
              {!formData.isAnonymous && (
                <div className="space-y-4 animate-fade-in">
                  <div className="form-group">
                    <Label htmlFor="contactMethod" className="form-label">
                      Preferred Contact Method *
                    </Label>
                    <Select 
                      value={formData.contactMethod} 
                      onValueChange={(value) => handleSelectChange('contactMethod', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="contactDetails" className="form-label">
                      {formData.contactMethod === 'email' ? 'Email Address' : 'Phone Number'} *
                    </Label>
                    <Input
                      id="contactDetails"
                      name="contactDetails"
                      type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                      placeholder={formData.contactMethod === 'email' ? 'your.email@example.com' : '+91 9876543210'}
                      value={formData.contactDetails}
                      onChange={handleInputChange}
                      className={`form-input ${errors.contactDetails ? 'border-red-500' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.contactDetails && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactDetails}</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-8"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Grievance
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnhancedGrievanceForm;