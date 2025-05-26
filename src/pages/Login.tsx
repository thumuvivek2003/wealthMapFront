import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, LogIn, User, Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "employee",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, userType: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${formData.userType === "admin" ? "Administrator" : "Employee"} login successful`,
        description: `Welcome to Wealth Map ${formData.userType === "admin" ? "(Admin Access)" : ""}`,
      });
      setIsLoggedIn(true);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg shadow-lg border-0">
        <CardHeader className="text-center">
          <Shield className="w-10 h-10 mx-auto text-blue-600 mb-2" />
          <CardTitle className="text-2xl font-bold">Login to Wealth Map</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Secure access for employees and administrators</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* User Type */}
            <div>
              <Label htmlFor="userType">Account Type</Label>
              <Select value={formData.userType} onValueChange={handleUserTypeChange}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee / End User</SelectItem>
                  <SelectItem value="admin">Company Administrator</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.userType === "admin"
                  ? "Admins manage users and settings"
                  : "Employees access wealth data and analytics"}
              </p>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
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
                  {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.userType === "admin" && (
                <p className="text-xs text-muted-foreground mt-1">
                  Admin passwords must be at least 12 characters with symbols
                </p>
              )}
            </div>

            {/* Remember Me */}
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

            {/* Submit Button */}
            <Button type="submit" onClick={()=>{navigate('/map')}} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              <LogIn className="h-4 w-4" />
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Admin Note */}
            {formData.userType === "admin" && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                Admin accounts require company verification on first login.
              </p>
            )}
          </form>

          {/* Footer Link */}
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
