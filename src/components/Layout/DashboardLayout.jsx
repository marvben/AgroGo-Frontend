import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppNavbar from '../Header/AppNavbar';

export default function DashboardLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <AppNavbar />
      <div className='flex flex-1'>
        <aside className='hidden md:block w-64 shrink-0'>
          <Sidebar />
        </aside>
        <main className='flex-1 p-6 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
