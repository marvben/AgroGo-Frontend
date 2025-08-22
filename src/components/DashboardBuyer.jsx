import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import DashboardBuyer from './DashBoard';
import { Box, CircularProgress } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';

export default function DashboardBuyerPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  user && setTimeout(() => setLoading(false), 1000);

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

  return <DashboardBuyer user={user} />;
}
