import { useAuth } from '../context/AuthContext/useAuth';

import Dashboard from '../components/Dashboard/DashBoard';

export default function DashboardPage() {
  const { user } = useAuth();

  return <Dashboard user={user} />;
}
