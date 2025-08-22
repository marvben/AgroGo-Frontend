import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/useAuth';
import { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';

export default function RegisterPage() {
  const { register: registerUser, userType } = useAuth();

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });

  const handleRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      setSnack({
        open: true,
        type: 'error',
        msg: 'Passwords do not match',
      });
      return;
    }
    try {
      setLoading(true);
      const registeredUser = await registerUser(data, userType);
      if (registeredUser) {
        window.location.href = '/verify'; // Redirect to verification page
      } else {
        setSnack({
          open: true,
          type: 'error',
          msg: 'Registration failed',
        });
      }
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg: err?.message || 'Registration failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0f172a',
      }}
    >
      <AuthForm mode='register' onSubmit={handleRegister} loading={loading} />
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.type}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
