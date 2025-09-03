import { Link as RouterLink, Navigate } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  Logout,
  Dashboard,
} from '@mui/icons-material';

const drawerWidth = 240;

import ImageUpload from '../ImageUpload/CloudinaryUploadImage';

export default function DashboardBuyer({ user }) {
  if (!user.isVerified) return <Navigate to='/verify' replace />;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e293b',
            color: 'white',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar>
          <Typography variant='h6' noWrap sx={{ fontWeight: 'bold' }}>
            My Dashboard
          </Typography>
        </Toolbar>
        <Divider sx={{ backgroundColor: '#475569' }} />
        <List>
          {[
            { text: 'Overview', icon: <Dashboard /> },
            { text: 'Account', icon: <AccountCircle /> },
            { text: 'Settings', icon: <Settings /> },
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Drawer> */}

      {/* Main Content */}
      <Box component='main' sx={{ flexGrow: 1, p: 3, minHeight: '100%' }}>
        {/* Top Bar */}
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
            <Avatar
              alt={user?.name}
              src={
                user?.profileImageUrl?.secure_url || 'https://i.pravatar.cc/40'
              }
            />
          </Toolbar>
        </AppBar>

        {/* User Info Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2,
            mt: 3,
          }}
        >
          {/* Account Details */}
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6'>Account Details</Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                textTransform={'capitalize'}
              >
                Username: {user?.username}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                style={{ textTransform: 'capitalize' }}
              >
                Name: {user?.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Email: {user?.email}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Phone: {user?.phone}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Address: {user?.address}, {user?.city}, {user?.state},{' '}
                {user?.country}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Role:{' '}
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Verified: {user?.isVerified ? 'Yes' : 'No'}
              </Typography>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h5' textAlign='center'>
                Quick Actions
              </Typography>
              <ImageUpload />
              <Button variant='contained' fullWidth sx={{ mt: 2 }}>
                Update Profile
              </Button>
              <Button
                component={RouterLink}
                to='/reset-password'
                variant='outlined'
                fullWidth
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6'>Recent Activity</Typography>
              <Typography variant='body2' color='text.secondary'>
                • Logged in from Chrome
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                • Updated email address
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                • Placed an order
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
