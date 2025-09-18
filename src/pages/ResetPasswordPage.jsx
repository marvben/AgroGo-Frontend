import AuthForm from '../components/Forms/AuthForm/AuthForm';
import { useAuth } from '../context/AuthContext/useAuth';
import { useEffect, useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { forgotPassword, resetPassword, resetExpireTime, checkUrlValidity } =
    useAuth();

  const [loading, setLoading] = useState(false);

  const params = location.search;
  const requestType = params ? 'patch' : 'post';

  const urlParams = new URLSearchParams(params);
  const getTokenParam = urlParams.get('resetToken');

  useEffect(() => {
    const isResetLinkExpired = async () => {
      await checkUrlValidity(getTokenParam);
      await resetExpireTime();
    };

    if (getTokenParam) isResetLinkExpired();
  }, []);

  const handlePasswordReset = async (data) => {
    try {
      setLoading(true);

      // Choose request based on requestType
      let ok;
      if (requestType === 'post') {
        console.log(data);
        ok = await forgotPassword(data);

        setLoading(false);
        if (ok) navigate('/login');
      } else {
        ok = await resetPassword(data, getTokenParam);
        setLoading(false);
        if (ok) navigate('/login');
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
    </Box>
  );
}
