import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Box, CircularProgress } from '@mui/material';
import DashboardAdmin from '../components/DashboardAdmin';
import DashboardBuyer from '../components/DashboardBuyer';
import DashBoardFarmer from '../components/DashboardFarmer';
import NotAuthorizedPage from './NotAuthorizedPage';

export default function DashboardBuyerPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 1000);

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

  if (!user) return <NotAuthorizedPage />;

  user?.role === 'farmer' && <DashBoardFarmer />;

  user?.role === 'buyer' && <DashboardBuyer />;

  user?.role === 'admin' && <DashboardAdmin />;

  return <DashboardBuyer user={user} />;
}
