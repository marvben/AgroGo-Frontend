import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

const TopBar = ({ user, newProfileImage }) => {
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
        <Avatar
          alt={user?.name}
          src={newProfileImage || 'https://i.pravatar.cc/40'}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
