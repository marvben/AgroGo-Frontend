// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import ProductsList from '../components/Products/ProductsList';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
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
        <CircularProgress sx={{ color: '#38bdf8' }} />
      </Box>
    );
  }

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', color: 'white', p: 4 }}>
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
