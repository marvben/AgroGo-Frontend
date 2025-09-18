import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedPage = ({
  description = 'You must be signed in to access this page.',
}) => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      sx={{ backgroundColor: '#121212', color: '#fff', textAlign: 'center' }}
    >
      <Typography variant='h2' gutterBottom>
        🚫 Not Authorized
      </Typography>
      <Typography variant='body1' gutterBottom>
        {description}
      </Typography>

      {showButtons && (
        <Box mt={3}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Sign In
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NotAuthorizedPage;
