import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../context/useAuth';

export default function LogoutButton({ fullWidth = false }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // clears cookie on backend + updates ctx
      navigate('/'); // optional redirect
    } catch (err) {
      console.error(err);
      alert('Failed to logout');
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
