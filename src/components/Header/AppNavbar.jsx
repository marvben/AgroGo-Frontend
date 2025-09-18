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
import { useAuth } from '../../context/AuthContext/useAuth';
import { useUI } from '../../context/UIContext/useUi';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutButton from '../../utils/LogoutButton';
import LoginLink from '../../utils/LoginLink';
import RegisterLink from '../../utils/RegisterLink';

export default function AppNavbar() {
  const { user, userUrl } = useAuth(); // { id, username, role } or null
  const { showHeader } = useUI();
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
        </Stack>

        {/* Auth Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <Stack direction='row' alignItems='center' spacing={1}>
              <Avatar
                component={RouterLink}
                to={userUrl}
                sx={{
                  bgcolor: '#334155',
                  border: '2px solid #475569',
                  fontWeight: 'bold',
                }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                component={RouterLink}
                to={userUrl}
                variant='body2'
                sx={{ color: 'white' }}
              >
                Dashboard
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <LogoutButton />
              </Box>
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
                <Box>
                  <MenuItem
                    component={RouterLink}
                    to={`${userUrl}`}
                    onClick={handleMenuClose}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    My Dashboard
                  </MenuItem>
                  <MenuItem component={LogoutButton} />
                </Box>
              )}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
