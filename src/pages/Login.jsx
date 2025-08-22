import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/useAuth';
import { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';
export default function LoginPage() {
  const { login, user, userUrl } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });

  // If already logged in, redirect away
  useEffect(() => {
    if (user) {
      window.location.href = userUrl;
    }
  }, [user, userUrl]);

  const handleLogin = async (data) => {
    try {
      setLoading(true);

      const ok = await login(data); // expect login() returns user
      if (ok) {
        window.location.href = '/verify';
      } else {
        setSnack({
          open: true,
          type: 'error',
          msg: 'Invalid credentials, please try again.',
        });
      }
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg: err?.message || 'Login failed. Please try again.',
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
      <div className='w-full max-w-md bg-white p-6 rounded-2xl shadow-lg'>
        <AuthForm mode='login' onSubmit={handleLogin} loading={loading} />
      </div>

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
