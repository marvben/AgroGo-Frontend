import { useAuth } from '../../context/AuthContext/useAuth';
import DashboardBuyer from './DashBoard';
import { keyframes } from '@mui/system';

export default function DashboardBuyerPage() {
  const { user } = useAuth();
  const fadeUp = keyframes`
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  `;

  return (
    <DashboardBuyer user={user} sx={{ animation: `${fadeUp} 0.6s ease-out` }} />
  );
}
