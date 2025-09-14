// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import ProductsList from '../components/Products/ProductsList/ProductsList';
import API from '../api/axios';
import { Box, Typography, Alert } from '@mui/material';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/api/products');
        setProducts(res.data || []);
        // setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         minHeight: '100vh',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         bgcolor: '#0f172a',
  //       }}
  //     >
  //       <CircularProgress sx={{ color: '#38bdf8' }} />
  //     </Box>
  //   );
  // }

  /////////////////////

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#0f172a',
        }}
      >
        <Alert severity='error' variant='filled'>
          {error}
        </Alert>
      </Box>
    );
  }

  ////////////////////

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f172a',
        color: 'white',
        p: { xs: 1, sm: 2, md: 4 },
      }}
    >
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant='h3' fontWeight='bold' sx={{ color: '#38bdf8' }}>
          Welcome to AgroGo
        </Typography>
        <Typography variant='h6' sx={{ mt: 1, color: '#cbd5e1' }}>
          Your trusted agricultural marketplace.
        </Typography>
      </Box>

      {/* Products Grid */}

      <ProductsList title='Latest Products' />
    </Box>
  );
}
