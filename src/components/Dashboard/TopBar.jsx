import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';

const TopBar = ({ user, newProfileImage }) => {
  const [profileImage, setProfileImage] = useState(
    user?.profileImage?.secure_url ||
      newProfileImage ||
      'https://i.pravatar.cc/40'
  );

  useEffect(() => {
    setProfileImage(newProfileImage || 'https://i.pravatar.cc/40');
  }, [newProfileImage]);

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
