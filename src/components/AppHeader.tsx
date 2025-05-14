
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AppHeader() {
  return (
    <header className="border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search properties, owners, or locations..." 
            className="pl-9 pr-4 h-9 bg-muted/40"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">New property added</p>
                    <p className="text-xs text-muted-foreground">A new property at 123 Main St has been added to the database.</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">Data integration complete</p>
                    <p className="text-xs text-muted-foreground">The PitchBook data integration has successfully completed.</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Yesterday</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">System update</p>
                    <p className="text-xs text-muted-foreground">The system will be undergoing maintenance on Friday at 11pm PST.</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">2 days ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 justify-center">
                <Button variant="ghost" className="w-full text-xs">View all notifications</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="h-6 w-px bg-border"></div>
          
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Acme Corporation</p>
            <p className="text-xs text-muted-foreground">Enterprise Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}
