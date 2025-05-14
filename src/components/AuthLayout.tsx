
import { Outlet } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-wealth-gray-light p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-wealth-blue-dark flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/>
              <path d="M19 17v4"/>
              <path d="M3 5h4"/>
              <path d="M17 19h4"/>
            </svg>
            Wealth Map
          </h1>
          <p className="text-wealth-gray-dark mt-2">
            Discover and analyze property ownership and wealth data
          </p>
        </div>
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
