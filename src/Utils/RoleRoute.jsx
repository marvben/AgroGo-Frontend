// src/components/RoleRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';
import { Box, CircularProgress } from '@mui/material';

const RoleRoute = ({ children, allow = [] }) => {
  const { user, loading } = useAuth();
  if (loading) {
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
        <CircularProgress sx={{ color: '#38bdf8' }} />
      </Box>
    );
  }
  if (!user) return <Navigate to='/login' replace />;

  if (!allow.includes(user.role)) return <Navigate to='/' replace />;
  return children;
};

export default RoleRoute;
