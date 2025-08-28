import { useAuth } from '../context/useAuth';
import DashboardBuyer from './DashBoard';

export default function DashboardBuyerPage() {
  const { user } = useAuth();

  return <DashboardBuyer user={user} />;
}
