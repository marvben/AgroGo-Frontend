import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext/useAuth';
import { useCart } from '@/context/CartContext/useCart';
import { useWishlist } from '@/context/WishlistContext/useWishlist';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, ShoppingCart, LogOut, LayoutDashboard, User, Sprout, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { CartSheet } from '@/components/Cart/CartSheet';
import { WishlistSheet } from '@/components/Wishlist/WishlistSheet';

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2 font-bold text-xl tracking-tight transition-opacity hover:opacity-90'>
          <Sprout className='h-6 w-6 text-primary' />
          <span className='font-bold text-xl'>
            Agro<span className='text-primary'>Go</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-6'>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={cn('text-sm font-medium transition-colors hover:text-primary', isActive(link.path) ? 'text-primary' : 'text-muted-foreground')}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className='hidden md:flex items-center gap-4'>
          {/* Wishlist Icon */}
          <WishlistSheet>
            <Button variant='ghost' size='icon' className='relative'>
              <Heart className='h-5 w-5' />
              {wishlist.length > 0 && (
                <Badge className='absolute -top-1 -right-1 h-4 w-4 px-0 flex items-center justify-center text-[10px] bg-red-500 text-white border-none shadow-sm'>{wishlist.length}</Badge>
              )}
            </Button>
          </WishlistSheet>

          {/* Cart Icon */}
          <CartSheet>
            <Button variant='ghost' size='icon' className='relative'>
              <ShoppingCart className='h-5 w-5' />
              {cartCount > 0 && (
                <Badge className='absolute -top-1 -right-1 h-4 w-4 px-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-none shadow-sm'>{cartCount}</Badge>
              )}
            </Button>
          </CartSheet>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={user.profileImage?.secure_url} alt={user.username} />
                    <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>{user.username}</p>
                    <p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <LayoutDashboard className='mr-2 h-4 w-4' />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className='text-destructive focus:text-destructive'>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to='/login'>
                <Button variant='ghost' size='sm'>
                  Login
                </Button>
              </Link>
              <Link to='/register'>
                <Button size='sm'>Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle using Sheet */}
        <div className='md:hidden'>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
              <nav className='flex flex-col gap-4 mt-6'>
                <Link to='/' className='flex items-center gap-2 font-bold text-xl mb-4'>
                  <Sprout className='h-6 w-6 text-primary' />
                  <span>
                    Agro<span className='text-primary'>Go</span>
                  </span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn('text-lg font-medium py-2 border-b border-border/10', isActive(link.path) ? 'text-primary' : 'text-muted-foreground')}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className='flex items-center gap-4 py-4 border-b border-border/10'>
                  <Link to='/wishlist' onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2 text-muted-foreground hover:text-primary'>
                    <Heart className='h-5 w-5' />
                    <span>Wishlist ({wishlist.length})</span>
                  </Link>
                  <Link to='/cart' onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2 text-muted-foreground hover:text-primary'>
                    <ShoppingCart className='h-5 w-5' />
                    <span>Cart ({cartCount})</span>
                  </Link>
                </div>

                <div className='flex flex-col gap-3 mt-4'>
                  {user ? (
                    <>
                      <div className='flex items-center gap-3 mb-4 px-2'>
                        <Avatar className='h-10 w-10'>
                          <AvatarImage src={user.profileImage?.secure_url} />
                          <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='font-medium'>{user.username}</span>
                          <span className='text-xs text-muted-foreground'>{user.email}</span>
                        </div>
                      </div>
                      <Link to='/dashboard' onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className='w-full justify-start' variant='outline'>
                          <LayoutDashboard className='mr-2 h-4 w-4' /> Dashboard
                        </Button>
                      </Link>
                      <Button onClick={handleLogout} className='w-full justify-start' variant='destructive'>
                        <LogOut className='mr-2 h-4 w-4' /> Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to='/login' onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className='w-full' variant='outline'>
                          Login
                        </Button>
                      </Link>
                      <Link to='/register' onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className='w-full'>Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
