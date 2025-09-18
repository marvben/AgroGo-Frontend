import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  Logout,
  Dashboard,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const drawerWidth = 240;
const slideRight = keyframes`
      0% { opacity: 0; transform: translateX(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    `;

export default function SideBar() {
  const { logout } = useAuth();
  return (
    <Drawer
      sx={{
        animation: `${slideRight} 0.6s ease-out`,
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
      <List
        sx={{
          mb: 2,
          backgroundColor: '#fff',
          color: '#475569',
          borderRadius: 3,
          mx: 2,
          '&:hover': {
            backgroundColor: '#475569',
            color: '#fff',
            cursor: 'pointer',
          },
          '&:hover .child': { color: '#fff' },
        }}
      >
        <ListItem button onClick={logout}>
          <ListItemIcon className='child' sx={{ color: '#475569' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </Drawer>
  );
}
