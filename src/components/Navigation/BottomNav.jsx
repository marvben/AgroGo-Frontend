import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Store, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Market', icon: Store, path: '/products' },
    // Profile maps to dashboard for now, or could vary
    { label: 'Profile', icon: User, path: '/dashboard' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-background border-t border-border/40 pb-safe'>
      <div className='flex items-center justify-around h-16'>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn('flex flex-col items-center justify-center w-full h-full space-y-1', active ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
            >
              <item.icon className={cn('h-6 w-6', active && 'fill-current/20')} />
              <span className='text-[10px] font-medium'>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
