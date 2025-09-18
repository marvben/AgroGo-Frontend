import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext/useAuth';

import Dashboard from '../components/Dashboard/Dashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  return <Dashboard user={user} />;
}
