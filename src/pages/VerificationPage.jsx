// src/pages/VerifyCode.jsx
import React, { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import API from '../api/axios'; // your axios instance (withCredentials: true)
import { useAuth } from '../context/useAuth';

export default function VerifyCode() {
  const { user, resetExpireTime, userUrl, expireTime } = useAuth(); // Assuming user is fetched from context
  const [showCode, setShowCode] = useState(false);
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });
  const [pageTitle, setPageTitle] = useState('Verify Code');
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { code: '' },
  });

  const onSubmit = async ({ code }) => {
    if (code.trim() === user.verificationCode || !user.isVerified) {
      setPageTitle('Verifying Code...');
      try {
        const res = await API.patch(
          `/api/${user.role}s/verify`,
          { verificationCode: code, email: user.email },
          {
            withCredentials: true,
          }
        );
        if (res.data) {
          setSnack({ open: true, type: 'success', msg: 'Code verified.' });
          // window.location.href = `/${user.role}`; // Redirect to dashboard
          setPageTitle('Account Verified');
          reset();
        } else {
          setPageTitle('Re-enter your code');
          throw new Error(res.data?.message || 'Verification failed');
        }
      } catch (err) {
        setSnack({
          open: true,
          type: 'error',
          msg:
            err?.response?.data?.message ||
            err.message ||
            'Verification failed',
        });

        setPageTitle('Re-enter your code');
      }
    } else {
      setPageTitle('Re-enter your code');
      setSnack({
        open: true,
        type: 'error',
        msg: 'Invalid code. Please try again.',
      });
    }
  };

  const getNewCode = async () => {
    setPageTitle('Sending New Code...');
    try {
      const res = await API.patch(
        `/api/${user.role}s/verification-code`,
        { email: user.email },
        { withCredentials: true }
      );

      // Check for expected success flag or code field
      if (res.data?.verificationCode) {
        await resetExpireTime(); // Reset the expiration time
        console.log(expireTime);
        setPageTitle('Code Sent');
        setSnack({
          open: true,
          type: 'success',
          msg: 'New verification code sent to your email.',
        });
      } else {
        setSnack({
          open: true,
          type: 'error',
          msg: res.data?.message || 'Failed to get new code',
        });
        throw new Error(res.data?.message || 'Failed to get new code');
      }
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg:
          err?.response?.data?.message ||
          err.message ||
          'Failed to get new code',
      });
    }
  };

  if (user?.isVerified) return <Navigate to={userUrl} replace />;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a' /* deep slate bg */ }}>
      {/* Top Bar in dashboard style */}
      <AppBar
        position='sticky'
        sx={{ backgroundColor: '#334155', borderRadius: 0 }}
      >
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Verify Code
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered Card */}
      <Box
        sx={{
          maxWidth: 420,
          mx: 'auto',
          mt: 6,
          px: 2,
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: '#1e293b',
            color: 'white',
            border: '1px solid #475569',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant='h5' gutterBottom>
              {user.isVerified ? 'Your account is verified' : pageTitle}
            </Typography>

            <Typography variant='body2' sx={{ color: '#cbd5e1', mb: 3 }}>
              {user.isVerified
                ? 'You can now access your dashboard.'
                : `Please check your email for the verification code and enter it
              below. If you did not receive a code, please check your spam folder or request a new one.`}
            </Typography>
            {user.isVerified && (
              <Button
                component={RouterLink}
                to={`/${user.role}`}
                variant='contained'
                color='primary'
                fullWidth={true}
              >
                Go to Dashboard
              </Button>
            )}
            {!user.isVerified && (
              <>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Controller
                    name='code'
                    control={control}
                    rules={{ required: 'Code is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={showCode ? 'text' : 'password'}
                        label='Enter Verification Code'
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        error={!!errors.code}
                        helperText={errors.code?.message}
                        InputLabelProps={{ sx: { color: '#e2e8f0' } }}
                        InputProps={{
                          sx: {
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#475569',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#94a3b8',
                            },
                          },
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle code visibility'
                                onClick={() => setShowCode((s) => !s)}
                                edge='end'
                                sx={{ color: '#cbd5e1' }}
                              >
                                {showCode ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      mt: 2,
                      bgcolor: '#2e7d32',
                      '&:hover': { bgcolor: '#1b5e20' },
                      fontWeight: 600,
                    }}
                  >
                    {isSubmitting ? 'Verifying…' : 'Verify'}
                  </Button>
                </form>
                <Button
                  variant='text'
                  color='primary'
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={getNewCode}
                >
                  {isSubmitting ? 'new code sent' : 'Get new code'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>

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
