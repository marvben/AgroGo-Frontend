import { TextField, Box, Typography, Link } from '@mui/material';
import ButtonSubmit from './ButtonSubmit';
import { Link as RouterLink } from 'react-router-dom';
const LoginFormFields = ({ inputStyles, register, errors, loading }) => {
  return (
    <>
      <TextField
        label='Email'
        type='email'
        fullWidth
        margin='normal'
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={inputStyles}
      />
      <TextField
        label='Password'
        type='password'
        fullWidth
        margin='normal'
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={inputStyles}
      />
      <ButtonSubmit loading={loading} text='Login' />
      <Box mt={3} textAlign='center'>
        <Typography variant='body2' sx={{ color: '#cbd5e1' }}>
          Don’t have an account?{' '}
          <Link
            component={RouterLink}
            to='/register'
            sx={{
              color: '#3b82f6',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
                color: '#60a5fa',
              },
            }}
          >
            Register
          </Link>
        </Typography>
        <Typography variant='body2' sx={{ marginTop: 1, color: '#cbd5e1' }}>
          Forgot Password?
          <Link
            component={RouterLink}
            to='/reset-password'
            sx={{
              color: '#3b82f6',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
                color: '#60a5fa',
              },
            }}
          >
            Reset Password
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default LoginFormFields;
