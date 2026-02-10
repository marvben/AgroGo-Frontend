import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingBag, List, Tag, Settings, LogOut, Users, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext/useAuth';

export default function Sidebar({ className }) {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  const links = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/dashboard/products', icon: ShoppingBag, roles: ['farmer'] },
    { name: 'Categories', path: '/dashboard/categories', icon: List, roles: ['admin'] },
    { name: 'Tags', path: '/dashboard/tags', icon: Tag, roles: ['admin'] },
    { name: 'Users', path: '/dashboard/users', icon: Users, roles: ['admin'] },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingBag, roles: ['admin', 'farmer'] },
    { name: 'Profile', path: '/dashboard/profile', icon: UserCheck, roles: ['admin', 'farmer', 'customer'] },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings, roles: ['admin', 'farmer', 'customer'] },
  ];

  return (
    <div className={cn('pb-12 min-h-screen border-r bg-background', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Dashboard</h2>
          <div className='space-y-1'>
            {links.map((link) => {
              // Check if user role is allowed for this link
              if (link.roles && !link.roles.includes(user?.role)) return null;

              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <Button variant={pathname === link.path ? 'secondary' : 'ghost'} className='w-full justify-start'>
                    <Icon className='mr-2 h-4 w-4' />
                    {link.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Account</h2>
          <div className='space-y-1'>
            <Button variant='ghost' className='w-full justify-start text-destructive hover:text-destructive' onClick={logout}>
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
