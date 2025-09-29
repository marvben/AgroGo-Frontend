import { useNavigate, Navigate } from 'react-router-dom';

import AuthForm from '../components/Forms/AuthForm/AuthForm';
import { useAuth } from '../context/AuthContext/useAuth';
import { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';

export default function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // const handleRegister = async (data) => {
  //   if (data.password !== data.confirmPassword) {
  //     setSnack({
  //       open: true,
  //       type: 'error',
  //       msg: 'Passwords do not match',
  //     });
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const registeredUser = await register(data);
  //     if (registeredUser) {
  //       await uploadImageToCloudinary(data);
  //       window.location.href = '/verify'; // Redirect to verification page
  //     } else {
  //       setSnack({
  //         open: true,
  //         type: 'error',
  //         msg: 'Registration failed',
  //       });
  //     }
  //   } catch (err) {
  //     setSnack({
  //       open: true,
  //       type: 'error',
  //       msg: err?.message || 'Registration failed',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (user) return <Navigate to='/dashboard' replace />;

  const handleRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      setSnack({
        open: true,
        type: 'error',
        msg: 'Passwords do not match',
      });
      return;
    }
    setLoading(true);
    const registeredUser = await register(data);
    if (registeredUser) navigate('/verify'); // Redirect to verification page
    setLoading(false);
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
    </Box>
  );
}
