import { Button } from '../../ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext/useWishlist';

export default function WishlistButton({ productId, className }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(productId);

  return (
    <Button
      variant='secondary'
      size='icon'
      className={cn(
        'h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110',
        isWishlisted ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : 'hover:bg-background',
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(productId);
      }}
    >
      <Heart className={cn('h-4 w-4 transition-colors', isWishlisted && 'fill-current')} />
    </Button>
  );
}
