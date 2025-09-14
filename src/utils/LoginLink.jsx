// LoginLink.jsx
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function LoginLink({ fullWidth = false }) {
  return (
    <Button
      component={RouterLink}
      to='/login'
      variant='contained'
      fullWidth={fullWidth}
      sx={{
        backgroundColor: '#3b82f6', // blue-500
        color: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        px: 2.5,
        py: 1,
        borderRadius: 2,
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        '&:hover': {
          backgroundColor: '#2563eb', // blue-600
        },
      }}
    >
      Login
    </Button>
  );
}
