
import { Outlet } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-wealth-gray-light p-4">
      <div className="w-full">
        <Card className="shadow-xl border-wealth-gray-light">
          <CardContent className="p-6">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
