// src/components/AuthFormLayout.jsx
import { Box, Paper, Typography, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { keyframes } from '@mui/system';
// Animation for the card
const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export default function AuthFormLayout({ title, children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isResetPasswordPage = location.pathname === '/reset-password';

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100%'
      bgcolor='#0f172a'
      px={2}
      py={6}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 3,
          bgcolor: '#1e293b',
          border: '1px solid #334155',
          color: '#f8fafc',
          animation: `${fadeUp} 0.6s ease-out`, // card animation
        }}
      >
        <Typography
          variant='h5'
          component='h1'
          gutterBottom
          sx={{ fontWeight: 600, textAlign: 'center', color: '#f1f5f9' }}
        >
          {title}
        </Typography>

        {/* Children (form fields, buttons, etc.) */}
        {children}

        <Box mt={3} textAlign='center'>
          {isLoginPage && !isResetPasswordPage ? (
            <>
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
              <Typography
                variant='body2'
                sx={{ marginTop: 1, color: '#cbd5e1' }}
              >
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
            </>
          ) : (
            !isResetPasswordPage && (
              <Typography variant='body2' sx={{ color: '#cbd5e1' }}>
                Already have an account?
                <Link
                  component={RouterLink}
                  to='/login'
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
                  Login
                </Link>
              </Typography>
            )
          )}
        </Box>
      </Paper>
    </Box>
  );
}
