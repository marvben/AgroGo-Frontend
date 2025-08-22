import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AddToCartButton() {
  return (
    <Button variant='contained' startIcon={<ShoppingCartIcon />}>
      Add to Cart
    </Button>
  );
}
