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
        position: 'relative',
        maxWidth: 400,
        width: '100%',
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
          marginTop: 'auto',
        }}
      >
        <QuantitySelector />
        <AddToCartButton product={product} />
      </CardContent>

      <CardActions
        sx={{
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
        }}
      >
        <WishlistButton productId={product.id} />
        <ShareButton product={product} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
