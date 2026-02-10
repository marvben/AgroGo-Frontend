import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';
import { cn } from '../../../lib/utils';
import { CheckCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Handle potential missing data gracefully
  if (!product) return null;

  const {
    _id,
    id,
    title,
    price,
    image, // Assuming URL string
    category, // Assuming object or string
    owner,
    tags = [],
  } = product;

  // Normalize ID
  const productId = _id || id;

  // Normalize Category Name
  const categoryName = typeof category === 'object' ? category?.name : category;

  return (
    <Card
      className='group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full flex flex-col'
      onClick={() => navigate(`/product/${productId}`)}
    >
      {/* Image Container */}
      <div className='relative aspect-[4/3] overflow-hidden bg-muted'>
        <img src={image || 'https://placehold.co/400x300?text=AgroGo+Product'} alt={title} className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' />

        {/* Wishlist Button */}
        <div className='absolute top-2 right-2 z-10'>
          <WishlistButton productId={productId} />
        </div>

        {/* Category Badge */}
        {categoryName && (
          <Badge
            variant='secondary'
            className='absolute bottom-2 left-2 backdrop-blur-md bg-black/50 text-white hover:bg-black/60 border-none px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold'
          >
            {categoryName}
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardContent className='p-4 flex flex-col flex-grow'>
        <div className='flex justify-between items-start mb-2 gap-2'>
          <h3 className='font-semibold text-foreground line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-primary transition-colors'>{title}</h3>
        </div>

        {/* Seller Info */}
        <div className='flex items-center gap-2 mb-3 text-xs text-muted-foreground'>
          <Avatar className='h-5 w-5 border border-border'>
            <AvatarImage src={owner?.profileImage?.secure_url} />
            <AvatarFallback>{owner?.username?.charAt(0).toUpperCase() || 'F'}</AvatarFallback>
          </Avatar>
          <span className='truncate max-w-[100px]'>{owner?.username || 'Verified Farmer'}</span>
          {/* Mock verified check for now, can be logic based */}
          <CheckCircle className='h-3 w-3 text-primary' />
        </div>

        {/* Price & Action */}
        <div className='mt-auto flex items-center justify-between pt-2 border-t border-border/50'>
          <div className='flex flex-col'>
            <span className='text-[10px] text-muted-foreground uppercase tracking-wider'>Price</span>
            <span className='font-bold text-lg text-primary'>₦{Number(price).toLocaleString()}</span>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartButton product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
