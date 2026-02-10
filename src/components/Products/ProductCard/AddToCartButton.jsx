import { Button } from '../../ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext/useCart';

export default function AddToCartButton({ product, className, ...props }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation if inside a clickable card
    e.preventDefault();
    if (product) {
      addToCart(product);
    }
  };

  return (
    <Button variant='default' size='sm' className={cn('gap-2 text-xs h-8', className)} onClick={handleAddToCart} {...props}>
      <ShoppingCart className='h-3.5 w-3.5' />
      Add to Cart
    </Button>
  );
}
