import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutButton from './LogoutButton';
import LoginLink from './LoginLink';
import RegisterLink from './RegisterLink';

export default function AppNavbar() {
  const { user, userUrl, showHeader } = useAuth(); // { id, username, role } or null
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  if (!showHeader) return '';

  return (
    <AppBar
      position='sticky'
      elevation={2}
      sx={{
        backgroundColor: '#1e293b', // dark slate (same as dashboard sidebar)
        color: 'white',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand */}
        <Typography
          variant='h5'
          component={RouterLink}
          to='/'
          sx={{
            fontWeight: 700,
            color: 'white',
            textDecoration: 'none',
            letterSpacing: 1,
          }}
        >
          🌱 AgroGo
        </Typography>

        {/* Desktop Nav Links */}
        <Stack
          direction='row'
          spacing={2}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Button component={RouterLink} to='/' sx={{ color: 'white' }}>
            Home
          </Button>
          <Button component={RouterLink} to='/products' sx={{ color: 'white' }}>
            Products
          </Button>

          {user && (
            <Button
              component={RouterLink}
              to={userUrl}
              sx={{ color: 'white', textTransform: 'capitalize' }}
            >
              {user.role} Dashboard
            </Button>
          )}
        </Stack>

        {/* Auth Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <Stack direction='row' alignItems='center' spacing={1}>
              <Avatar
                sx={{
                  bgcolor: '#334155',
                  border: '2px solid #475569',
                  fontWeight: 'bold',
                }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant='body2' sx={{ color: 'white' }}>
                {user.username} ({user.role})
              </Typography>
              <LogoutButton />
            </Stack>
          ) : (
            <Stack direction='row' spacing={1}>
              <LoginLink />
              <RegisterLink />
            </Stack>
          )}

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { backgroundColor: '#1e293b', color: 'white' },
              }}
            >
              <MenuItem component={RouterLink} to='/' onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to='/products'
                onClick={handleMenuClose}
              >
                Products
              </MenuItem>
              <Divider sx={{ backgroundColor: '#475569' }} />
              {user && (
                <MenuItem
                  component={RouterLink}
                  to={`${userUrl}`}
                  onClick={handleMenuClose}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {user.role} Dashboard
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
