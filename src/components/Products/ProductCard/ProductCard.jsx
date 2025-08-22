import { Card, CardContent, CardActions } from '@mui/material';
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';
import ShareButton from './ShareButton';
import QuantitySelector from './QuantitySelector';

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: '#1e293b',
        color: 'white',
        borderRadius: 3,
        border: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 2px 5px 2px rgba(255, 255, 255, 0.2)', // bright glow
        transition: '0.3s',
        '&:hover': {
          boxShadow: '2px 2px 10px 3px rgba(0, 255, 255, 0.6)', // neon glow on hover
          transform: 'translateY(-6px)',
        },
      }}
    >
      <ProductImage src={product.image} alt={product.title} />

      <CardContent>
        <ProductDetails product={product} />
      </CardContent>

      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <QuantitySelector />
        <AddToCartButton product={product} />
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <WishlistButton productId={product.id} />
        <ShareButton product={product} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
