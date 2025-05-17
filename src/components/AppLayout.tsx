
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { SidebarTrigger } from './ui/sidebar';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <div className='flex'>
          <SidebarTrigger className="m-5" />
          <div className='flex-1 flex flex-col'>
            <AppHeader />
          </div>
        </div>
        <div className="flex-1 p-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
