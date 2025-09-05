import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../context/useAuth';

export default function LogoutButton({ fullWidth = false }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const ok = await logout();
      if (ok) navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      variant='outlined'
      color='inherit'
      onClick={handleLogout}
      fullWidth={fullWidth}
    >
      Logout
    </Button>
  );
}
