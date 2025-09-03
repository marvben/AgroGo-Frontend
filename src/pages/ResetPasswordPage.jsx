import AuthForm from '../components/Forms/AuthForm';
import { useAuth } from '../context/useAuth';
import { useEffect, useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword, saveNewPassword, checkResetPasswordUrlValidity } =
    useAuth();
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });
  const params = location.search;
  const requestType = params ? 'patch' : 'post';

  const urlParams = new URLSearchParams(params);
  const getTokenParam = urlParams.get('token');
  const getTokenUserId = urlParams.get('userid');

  useEffect(() => {
    const isResetLinkExpired = async () => {
      await checkResetPasswordUrlValidity(params);
    };

    if (getTokenParam && getTokenUserId) {
      isResetLinkExpired();
    }
  }, []);

  const handlePasswordReset = async (data) => {
    try {
      setLoading(true);

      // Choose request based on requestType
      let ok;
      if (requestType === 'post') {
        ok = await resetPassword(data);
        navigate('/login');
      } else {
        ok = await saveNewPassword(data, params);
        navigate('/dashboard');
      }

      if (ok) {
        setLoading(false);
      } else {
        // fallback delay before removing loading
        setTimeout(() => setLoading(false), 5000);
      }
    } catch (error) {
      console.error('Password reset failed');
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
        <AuthForm
          mode='resetPassword'
          onSubmit={handlePasswordReset}
          loading={loading}
        />
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
