
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Mail, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CompanyRegistration = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    adminName: "",
    adminEmail: "",
    employeeCount: "",
    industry: ""
  });

  const steps = [
    { id: 1, title: "Company Info", icon: Building2 },
    { id: 2, title: "Admin Setup", icon: Shield },
    { id: 3, title: "Team Details", icon: Users },
    { id: 4, title: "Complete", icon: CheckCircle }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
              <p className="text-gray-600">Tell us about your organization</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <Input
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                <Input
                  type="email"
                  placeholder="company@example.com"
                  value={formData.companyEmail}
                  onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                >
                  <option value="">Select your industry</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="investment">Investment Management</option>
                  <option value="consulting">Consulting</option>
                  <option value="legal">Legal Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrator Setup</h2>
              <p className="text-gray-600">Configure your admin account</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Full Name</label>
                <Input
                  placeholder="Enter admin full name"
                  value={formData.adminName}
                  onChange={(e) => handleInputChange("adminName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                <Input
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.adminEmail}
                  onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Security Features</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Multi-factor authentication required</li>
                  <li>• Role-based access controls</li>
                  <li>• Activity logging and monitoring</li>
                  <li>• Data encryption at rest and in transit</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Configuration</h2>
              <p className="text-gray-600">Set up your team access</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Number of Users</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                >
                  <option value="">Select team size</option>
                  <option value="1-10">1-10 users</option>
                  <option value="11-50">11-50 users</option>
                  <option value="51-100">51-100 users</option>
                  <option value="100+">100+ users</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Standard User</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• View property maps</li>
                    <li>• Search and filter data</li>
                    <li>• Export basic reports</li>
                    <li>• Access wealth analytics</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Admin User</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• All standard features</li>
                    <li>• Manage team members</li>
                    <li>• Configure data access</li>
                    <li>• Advanced reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Complete!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to Wealth Map, {formData.companyName}
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
              <h4 className="font-semibold text-green-900 mb-4">What's Next?</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800">Account verification email sent</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800">Team invitation instructions provided</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800">Security settings configured</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="text-center p-4">
                <CardContent>
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Company Portal</h4>
                  <p className="text-sm text-gray-600">Manage your organization</p>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent>
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Invite Team</h4>
                  <p className="text-sm text-gray-600">Add your team members</p>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent>
                  <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Start Exploring</h4>
                  <p className="text-sm text-gray-600">Begin using the platform</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600">
            {steps.map(step => (
              <span key={step.id} className={currentStep >= step.id ? 'text-blue-600' : ''}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6"
                >
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  className="px-6 bg-blue-600 hover:bg-blue-700"
                >
                  {currentStep === 3 ? 'Complete Registration' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex justify-center mt-8">
                <Button
                    onClick={() => {setIsLoggedIn(true);navigate('/map')}}
                    className="px-8 bg-blue-600 hover:bg-blue-700 text-lg"
                  >
                  Access Your Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Footer */}
        {currentStep < 4 && (
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <Badge variant="outline" className="px-3 py-1">
                <Shield className="w-4 h-4 mr-1" />
                Enterprise Security
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                Team Management
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Building2 className="w-4 h-4 mr-1" />
                Multi-tenant Architecture
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyRegistration;