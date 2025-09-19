import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
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
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },

        flexShrink: { md: 0 },
      }}
    >
      {/* Top Bar with Button */}
      <Toolbar
        sx={{
          backgroundColor: '#1e293b',
          color: 'white',
          width: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          py: 3,
          animation: `${slideRight} 0.6s ease-out`,
          height: '100%',
          minHeight: '100vh !important',
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{ color: 'white', mr: 2 }}
          edge='start'
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <Drawer
        anchor='left'
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e293b',
            color: 'white',
            transition: 'all 0.3s ease-in-out',
          },
        }}
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
    </Box>
  );
}
