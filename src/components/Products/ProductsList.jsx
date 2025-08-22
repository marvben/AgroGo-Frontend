import ProductCard from './ProductCard/ProductCard';
import { Box, Container, Typography } from '@mui/material';
import dummyProducts from '../../data/products'; // Assuming you have a products data file
import { Description } from '@mui/icons-material';

const ProductsList = ({
  products = dummyProducts,
  title = 'title',
  description = ' description',
}) => {
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
            md: 'repeat(auto-fill, minmax(300px, 1fr))',
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
