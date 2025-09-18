import { Box } from '@mui/material';
import ProductsList from '../components/Products/ProductsList/ProductsList';

const ProductPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      bgcolor: '#0f172a',
      color: 'white',
      p: { xs: 1, sm: 2, md: 4 },
    }}
  >
    <ProductsList
      title='Our Products'
      description='List of our all our products'
    />
  </Box>
);

export default ProductPage;
