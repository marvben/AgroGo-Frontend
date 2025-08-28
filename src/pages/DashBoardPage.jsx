import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Box, CircularProgress } from '@mui/material';
import DashboardAdmin from '../components/DashboardAdmin';
import DashboardBuyer from '../components/DashboardBuyer';
import DashBoardFarmer from '../components/DashboardFarmer';

export default function DashboardBuyerPage() {
  const { user } = useAuth();

  user?.role === 'farmer' && <DashBoardFarmer />;

  user?.role === 'buyer' && <DashboardBuyer />;

  user?.role === 'admin' && <DashboardAdmin />;

  return <DashboardBuyer user={user} />;
}
