import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#1E293B',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent='space-between'>
          {/* Brand Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
              🌱 AgroGo
            </Typography>
            <Typography variant='body2'>
              Connecting Farmers and Buyers with trust and efficiency.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
              Quick Links
            </Typography>
            {['Home', 'About', 'Marketplace', 'Contact'].map((link) => (
              <Typography
                key={link}
                variant='body2'
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  mt: 1,
                  '&:hover': {
                    color: '#38BDF8',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                {link}
              </Typography>
            ))}
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
              Follow Us
            </Typography>
            <Box>
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: 'white',
                    transition: 'all 0.3s ease',
                    mx: 0.5,
                    '&:hover': {
                      color: '#38BDF8',
                      backgroundColor: '#0F172A',
                      transform: 'scale(1.2)',
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            borderTop: '1px solid #334155',
            pt: 2,
          }}
        >
          <Typography variant='body2'>
            © {new Date().getFullYear()} 🌱 AgroGo. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
