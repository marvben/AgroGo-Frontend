import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant='h1' sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant='contained' color='primary' onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
