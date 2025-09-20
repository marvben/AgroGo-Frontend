import ProductCard from '../ProductCard/ProductCard';
import { Box, Container, Typography } from '@mui/material';
import dummyProducts from '../../../data/products'; // Assuming you have a products data file
import { keyframes } from '@mui/system';
import Loader from '../../../utils/Loader';
import { useAuth } from '../../../context/AuthContext/useAuth.jsx';

const ProductsList = ({
  products = dummyProducts,
  title = 'Title Here',
  description = 'Description Here',
}) => {
  const fadeUp = keyframes`
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  `;
  const { loading } = useAuth();
  if (loading) {
    return <Loader />;
  }

  if (!products || products.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant='h6' color='text.secondary'>
          No products available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        bgcolor: '#0f172a',
        color: '#fff',
        animation: `${fadeUp} 0.6s ease-out`, // card animation
      }}
    >
      <Typography variant='h4' fontWeight='bold' gutterBottom sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant='body1' gutterBottom sx={{ mb: 4 }}>
        {description}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          justifyItems: 'center',

          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat( 6, 1fr)',
            // md: 'repeat(auto-fill, minmax(200px, 1fr))',
          },
        }}
      >
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </Box>
    </Container>
  );
};

export default ProductsList;
