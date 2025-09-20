// src/components/AuthFormLayout.jsx
import { Box, Paper, Typography, Link } from '@mui/material';
import { keyframes } from '@mui/system';

export default function AuthFormLayout({ title, children }) {
  // Animation for the card
  const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100%'
      bgcolor='#0f172a'
      px={2}
      py={6}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 3,
          bgcolor: '#1e293b',
          border: '1px solid #334155',
          color: '#f8fafc',
          animation: `${fadeUp} 0.6s ease-out`, // card animation
        }}
      >
        <Typography
          variant='h5'
          component='h1'
          gutterBottom
          sx={{ fontWeight: 600, textAlign: 'center', color: '#f1f5f9' }}
        >
          {title}
        </Typography>

        {/* Children (form fields, buttons, etc.) */}
        {children}
      </Paper>
    </Box>
  );
}
