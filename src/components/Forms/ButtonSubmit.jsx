import { Button, CircularProgress } from '@mui/material';
const ButtonSubmit = ({ children, text, loading }) => {
  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      sx={{
        mt: 3,
        py: 1.5,
        fontWeight: 600,
        bgcolor: '#3b82f6',
        color: '#f8fafc',
        '&:hover': {
          bgcolor: '#60a5fa',
          transform: 'scale(1.02)',
          boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
        },
        transition: 'all 0.3s ease',
      }}
      disabled={loading}
      startIcon={loading && <CircularProgress size={20} />}
    >
      {text}
      {children}
    </Button>
  );
};

export default ButtonSubmit;
