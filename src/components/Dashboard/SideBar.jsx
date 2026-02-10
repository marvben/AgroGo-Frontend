import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';
import { cn } from '../../lib/utils';
import { LayoutDashboard, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'; // Assuming Sheet exists, or using conditional rendering

export default function SideBar({ className }) {
  const { logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { text: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { text: 'Account', icon: User, path: '/profile' },
    { text: 'Settings', icon: Settings, path: '/settings' },
  ];

  const NavContent = () => (
    <div className='flex flex-col h-full py-4'>
      <div className='px-6 py-2 mb-6 border-b border-border/50'>
        <h2 className='text-2xl font-bold tracking-tight text-primary'>AgroGo</h2>
        <p className='text-xs text-muted-foreground'>My Dashboard</p>
      </div>

      <nav className='flex-1 px-4 space-y-2'>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted',
              location.pathname === item.path ? 'bg-primary/10 text-primary hover:bg-primary/15' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <item.icon className='h-5 w-5' />
            {item.text}
          </Link>
        ))}
      </nav>

      <div className='px-4 mt-auto'>
        <Button variant='ghost' className='w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10' onClick={logout}>
          <LogOut className='h-5 w-5' />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn('hidden md:flex flex-col w-64 border-r border-border bg-card min-h-screen fixed left-0 top-0 z-40', className)}>
        <NavContent />
      </aside>

      {/* Mobile Toggle Trigger (Usually needs to be outside, but dashboard layout handles it. 
          Here we might return null if the DashboardTopBar handles the toggle, 
          but for simplicity I'll return the standard structure) */}
    </>
  );
}
