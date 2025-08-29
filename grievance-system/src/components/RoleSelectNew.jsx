import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Users, Shield, User, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const RoleSelect = () => {
  const navigate = useNavigate();
  const { state, selectRole } = useAppContext();
  const { user, roles } = state;
  
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [error, setError] = useState('');

  const steps = ['Select Institution', 'Select Role', 'Dashboard'];

  const handleRoleSelect = (roleId) => {
    setSelectedRoleId(roleId);
    setError('');
  };

  const handleNext = () => {
    if (!selectedRoleId) {
      setError('Please select a role to continue');
      return;
    }

    const selectedRoleObj = roles.find(role => role.id === selectedRoleId);
    selectRole(selectedRoleObj);
    
    // Small delay to ensure state is updated before navigation
    setTimeout(() => {
      navigate('/dashboard');
    }, 100);
  };

  const handleBack = () => {
    navigate('/institution-select');
  };

  const getRoleIcon = (roleName) => {
    switch (roleName) {
      case 'Admin':
        return <Shield className="h-8 w-8" />;
      case 'Grievance Officer':
        return <Users className="h-8 w-8" />;
      case 'Student':
        return <User className="h-8 w-8" />;
      case 'Anonymous User':
        return <Eye className="h-8 w-8" />;
      default:
        return <User className="h-8 w-8" />;
    }
  };

  const getRoleDescription = (roleName) => {
    switch (roleName) {
      case 'Admin':
        return 'Full system access with administrative privileges';
      case 'Grievance Officer':
        return 'Manage and respond to grievances and complaints';
      case 'Student':
        return 'Submit grievances and track their progress';
      case 'Anonymous User':
        return 'Submit anonymous feedback without registration';
      default:
        return 'Standard user access';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index <= 1 ? 'bg-black text-white border-black' : 'border-[#A2D5C6] text-[#A2D5C6]'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                index <= 1 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < 1 ? 'bg-black' : 'bg-[#A2D5C6]'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-black">Select Your Role</CardTitle>
          <CardDescription className="text-lg">
            Choose your role at {user.selectedInstitution?.name} to access appropriate features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRoleId === role.id
                    ? 'ring-2 ring-black bg-[#CFFFE2]'
                    : 'hover:bg-[#A2D5C6]/50'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      selectedRoleId === role.id
                        ? 'bg-black text-white'
                        : 'bg-[#A2D5C6] text-black'
                    }`}>
                      {getRoleIcon(role.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getRoleDescription(role.name)}
                      </p>
                    </div>
                    {selectedRoleId === role.id && (
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {error && (
            <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedRoleId}
              className="gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelect;