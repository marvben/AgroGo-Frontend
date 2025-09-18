import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

const TopBar = ({ user, profileImage }) => {
  return (
    <AppBar
      position='static'
      sx={{ backgroundColor: '#334155', borderRadius: 2 }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1 }}
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
