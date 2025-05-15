
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "employee", // Default to employee
    acceptTerms: false,
    companyCode: "", // For employees joining existing companies
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Please accept the terms",
        description: "You must accept the terms and conditions to create an account",
        variant: "destructive",
      });
      return;
    }
    
    // Validate company code for employees
    if (formData.userType === "employee" && !formData.companyCode) {
      toast({
        title: "Company code required",
        description: "Please enter the company code provided by your administrator",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration request
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Registration successful",
        description: formData.userType === "admin" 
          ? "Your company account has been created. You can now manage your organization."
          : "Your account has been created. Welcome to Wealth Map!",
      });
      
      navigate("/");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          {formData.userType === "admin" 
            ? "Register your company with Wealth Map" 
            : "Join your company on Wealth Map"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userType">Account Type</Label>
          <Select 
            value={formData.userType} 
            onValueChange={handleUserTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee">Employee / End User</SelectItem>
              <SelectItem value="admin">Company Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {formData.userType === "admin" ? (
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="Acme Corporation"
              required
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="companyCode">Company Code</Label>
            <Input
              id="companyCode"
              name="companyCode"
              placeholder="Enter the code provided by your administrator"
              required
              value={formData.companyCode}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">
              This code is provided by your company administrator
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <User className="h-4 w-4" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              className="pl-10"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Create Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              required
              className="pl-10 pr-10"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
            >
              {passwordVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {formData.userType === "admin" 
              ? "Admin passwords require a minimum of 12 characters with special characters" 
              : "Password must be at least 8 characters and include a number and special character"}
          </p>
        </div>
        
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox 
            id="acceptTerms" 
            checked={formData.acceptTerms}
            onCheckedChange={handleCheckboxChange}
            className="mt-1"
          />
          <Label htmlFor="acceptTerms" className="text-sm font-normal">
            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            {formData.userType === "admin" && (
              <span>, and confirm I am authorized to register my company</span>
            )}
          </Label>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading 
            ? "Creating account..." 
            : formData.userType === "admin"
              ? "Register Company"
              : "Create Account"
          }
        </Button>
        
        {formData.userType === "admin" && (
          <p className="text-xs text-center text-muted-foreground">
            After registration, you'll be able to invite team members and configure company settings
          </p>
        )}
      </form>
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
