import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext/useAuth';

export default function LogoutButton({ fullWidth = false }) {
  const { logout } = useAuth();

  return (
    <Button
      variant='outlined'
      color='inherit'
      onClick={logout}
      fullWidth={fullWidth}
    >
      Logout
    </Button>
  );
}
