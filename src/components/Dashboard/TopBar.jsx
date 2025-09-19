import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';

const TopBar = ({ user }) => {
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/40');

  useEffect(() => {
    if (user?.profileImage?.secure_url) {
      setProfileImage(user.profileImage?.secure_url);
    }
  }, [user?.profileImage?.secure_url]);

  return (
    <AppBar
      position='static'
      sx={{ backgroundColor: '#334155', borderRadius: 2 }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1, py: { xs: 2, md: 1 } }}
          style={{ textTransform: 'capitalize' }}
        >
          Welcome Back, {user?.name || 'User'}!
        </Typography>
        <Avatar alt={user?.name} src={profileImage} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
