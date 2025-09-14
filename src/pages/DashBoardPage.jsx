import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext/useAuth';
import { Box, CircularProgress } from '@mui/material';
import DashboardAdmin from '../components/Dashboards/DashboardAdmin';
import DashboardBuyer from '../components/Dashboards/DashboardBuyer';
import DashBoardFarmer from '../components/Dashboards/DashboardFarmer';

export default function DashboardBuyerPage() {
  const { user } = useAuth();

  user?.role === 'farmer' && <DashBoardFarmer />;

  user?.role === 'buyer' && <DashboardBuyer />;

  user?.role === 'admin' && <DashboardAdmin />;

  return <DashboardBuyer user={user} />;
}
