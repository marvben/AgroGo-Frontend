import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AddToCartButton() {
  return (
    <Button
      variant='contained'
      sx={{ fontSize: '10px' }}
      startIcon={<ShoppingCartIcon />}
    >
      Add to Cart
    </Button>
  );
}
