import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import TopBar from './TopBar';
import SideBar from './SideBar';
import AccountDetails from './AccountDetails';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

export default function Dashboard({ user }) {
  const fadeUp = keyframes`
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    `;

  if (!user.isEmailVerified || !user.isPhoneVerified)
    return <Navigate to='/verify' replace />;

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      {/* Main Content */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: { md: 5, xs: 2 },
          animation: `${fadeUp} 0.6s ease-out`,
        }}
      >
        <TopBar user={user} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: { xs: 4, md: 3 },
            my: 3,
          }}
        >
          <AccountDetails user={user} />
          <QuickActions user={user} />
          <RecentActivity user={user} />
        </Box>
      </Box>
    </Box>
  );
}
