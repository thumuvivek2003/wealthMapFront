
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapView from "./pages/MapView/MapView";
import MapChat from "./pages/MapChat/MapView.js";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import PropertiesList from './pages/MapView/PropertyList.jsx'
import WealthAnalytics from "./pages/analytics/index.js";
import PropertySearch from "./pages/propertySearch/index.js";
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.js';


import Loader from './components/Loader';
import { useEffect, useState } from "react";
const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer); 
  }, []);
  

  if (loading) {
    return (
      <Loader />
    );
  }


  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        
          <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/map" replace /> : <Navigate to="/register" replace />
            }
          />
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login  setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />}/>
            </Route>
            
            {/* App Routes */}
            <Route element={<AppLayout />}>
              <Route path="/map" element={<MapView />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mapList" element={<PropertiesList />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/chat" element={<MapChat />} />
              <Route path="/analytics" element={<WealthAnalytics />} />
              <Route path="/propery-search" element={<PropertySearch />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
 );
};

export default App;
