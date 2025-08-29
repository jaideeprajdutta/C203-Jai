import React, { useState } from 'react';
import { GraduationCap, ChevronRight, Shield, BarChart3, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

const InstitutionSelect = () => {
  const navigate = useNavigate();
  const { state, selectInstitution } = useAppContext();
  const { institutions } = state;
  
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
  const [error, setError] = useState('');

  const steps = ['Select Institution', 'Select Role', 'Dashboard'];



  const handleNext = () => {
    if (!selectedInstitutionId) {
      setError('Please select an institution to continue');
      return;
    }

    const selectedInst = institutions.find(inst => inst.id === selectedInstitutionId);
    selectInstitution(selectedInst);
    navigate('/role-select');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index === 0 ? 'bg-black text-white border-black' : 'border-[#A2D5C6] text-[#A2D5C6]'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                index === 0 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index === 0 ? 'bg-muted' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <GraduationCap className="h-15 w-15 text-black mx-auto mb-4" size={60} />
            <h1 className="text-4xl font-bold text-black mb-4">
              Welcome to Grievance Redressal System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A secure platform for submitting feedback, tracking complaints, and ensuring
              your voice is heard. Please select your institution to begin.
            </p>
          </div>

          {/* Institution Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-black">Step 1: Select Your Institution</CardTitle>
              <CardDescription>
                Choose your educational institution from the list below to access the grievance system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institution-select">Institution</Label>
                <Select value={selectedInstitutionId} onValueChange={(value) => {
                  setSelectedInstitutionId(value);
                  setError('');
                }}>
                  <SelectTrigger id="institution-select">
                    <SelectValue placeholder="Please select an institution" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        <div>
                          <div className="font-medium">{institution.name}</div>
                          <div className="text-sm text-muted-foreground">{institution.type}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Don't see your institution? Contact your system administrator.
                </p>
                <Button
                  onClick={handleNext}
                  disabled={!selectedInstitutionId}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-black" />
                  <h3 className="font-semibold text-black">Secure & Anonymous</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your privacy is protected. Submit feedback anonymously or with your identity
                  as preferred.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-black" />
                  <h3 className="font-semibold text-black">Track Progress</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitor the status of your complaints and grievances with real-time updates
                  and notifications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-6 w-6 text-black" />
                  <h3 className="font-semibold text-black">Get Help</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access our intelligent chatbot for instant help with frequently asked
                  questions and guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionSelect;