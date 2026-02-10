import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext/useAuth';

export default function LogoutButton({ fullWidth = false }) {
  const { logout } = useAuth();

  return (
    <Button variant='outline' onClick={logout} className={fullWidth ? 'w-full' : ''}>
      Logout
    </Button>
  );
}
