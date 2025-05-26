
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import MapIcon from '../assets/images/map.jpeg';

import { 
  LayoutDashboard, 
  Map, 
  Search, 
  FileText, 
  Users, 
  Settings, 
  Info,
  LogOut,
  MessageCircle,
  PieChart
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function AppSidebar() {
  const location = useLocation();
  
  const mainNavItems = [
    { title: "Map Explorer", icon: Map, path: "/map" },
    { title: "Chat", icon: MessageCircle, path: "/chat" },
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Wealth Analytics", icon: PieChart, path: "/analytics" },
    { title: "Property Search", icon: Search, path: "/propery-search" },
  ];
  
  const managementNavItems = [
    { title: "User Management", icon: Users, path: "/users" },
    { title: "Settings", icon: Settings, path: "/settings" },
    { title: "Help & Support", icon: Info, path: "/support" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={MapIcon} alt="Map Icon" className="w-6 h-6" />
        </div>
        <span className="font-bold text-lg">Wealth Map</span>
      </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(
                    location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(
                    location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">admin@company.com</p>
          </div>
          <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
