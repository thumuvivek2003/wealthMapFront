
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "employee", // Default to employee
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login request
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: `${formData.userType === "admin" ? "Administrator" : "Employee"} login successful`,
        description: `Welcome to Wealth Map ${formData.userType === "admin" ? "(Admin Access)" : ""}`,
      });
      
      navigate("/");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Login to access your Wealth Map account
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
          <p className="text-xs text-muted-foreground mt-1">
            {formData.userType === "admin" 
              ? "Admin accounts have full access to company settings and user management" 
              : "Employee accounts have access to property and wealth data"
            }
          </p>
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              className="pl-10 pr-10"
              required
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
          {formData.userType === "admin" && (
            <p className="text-xs text-muted-foreground">
              Admin passwords require a minimum of 12 characters with special characters
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="rememberMe" 
            checked={formData.rememberMe} 
            onCheckedChange={handleCheckboxChange} 
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>
        
        <Button type="submit" className="w-full flex items-center gap-2" disabled={isLoading}>
          <LogIn className="h-4 w-4" />
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
        
        {formData.userType === "admin" && (
          <p className="text-xs text-center text-muted-foreground">
            Admin accounts require company verification. 
            Your first login may be pending approval.
          </p>
        )}
      </form>
      
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
