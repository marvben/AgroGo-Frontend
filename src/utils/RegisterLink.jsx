// RegisterLink.jsx
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function RegisterLink({ fullWidth = false }) {
  return (
    <Button
      component={RouterLink}
      to='/register'
      variant='outlined'
      fullWidth={fullWidth}
      sx={{
        borderColor: '#38bdf8', // cyan-400
        color: '#38bdf8',
        fontWeight: 600,
        textTransform: 'none',
        px: 2.5,
        py: 1,
        borderRadius: 2,
        '&:hover': {
          borderColor: '#0ea5e9', // cyan-500
          color: '#0ea5e9',
          backgroundColor: 'rgba(56,189,248,0.08)', // subtle hover bg
        },
      }}
    >
      Register
    </Button>
  );
}
