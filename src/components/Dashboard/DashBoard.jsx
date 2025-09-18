import { Link as RouterLink, Navigate } from 'react-router-dom';

import { Box } from '@mui/material';

import { keyframes } from '@mui/system';

import TopBar from './TopBar';
import SideBar from './SideBar';
import AccountDetails from './AccountDetails';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import { useState, useEffect } from 'react';

export default function Dashboard({ user }) {
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || 'https://i.pravatar.cc/40'
  );

  useEffect(() => {
    setProfileImage(user?.profileImage || 'https://i.pravatar.cc/40');
  }, [user?.profileImage]);

  if (!user.isEmailVerified || !user.isPhoneVerified)
    return <Navigate to='/verify' replace />;

  const fadeUp = keyframes`
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    `;

  return (
    <Box sx={{ display: 'flex', animation: `${fadeUp} 0.6s ease-out` }}>
      <SideBar />
      {/* Main Content */}
      <Box component='main' sx={{ flexGrow: 1, p: 3, minHeight: '100%' }}>
        <TopBar user={user} profileImage={profileImage} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2,
            mt: 3,
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
