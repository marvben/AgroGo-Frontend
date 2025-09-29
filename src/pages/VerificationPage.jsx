// src/pages/VerifyCode.jsx
import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Loader from '../utils/Loader';
import { useAuth } from '../context/AuthContext/useAuth';

export default function VerifyCode() {
  const {
    user,
    role,
    userUrl,
    verifyEmail,
    getEmailNewVerificationCode,
    loading,
  } = useAuth(); // Assuming user is fetched from context
  const [showCode, setShowCode] = useState(false);
  const [pageTitle, setPageTitle] = useState('Verify Code');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { code: '' },
  });

  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (user?.isEmailVerified) {
    return <Navigate to={userUrl} replace />;
  }

  const onSubmit = async ({ code }) => {
    setPageTitle('Verifying Code...');
    const ok = await verifyEmail(code.trim());
    if (ok) {
      navigate(userUrl);
      reset();
    }
  };

  const getNewCode = async () => {
    setPageTitle('Sending New Code...');
    const ok = await getEmailNewVerificationCode();

    if (ok) {
      setPageTitle('Code Sent');
    } else {
      throw new Error('Failed to get new code');
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
                to={`/${role}`}
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
    </Box>
  );
}
