import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext/useProduct';
import dummyProducts from '../data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator'; // Fallback to div if not exists, but I'll check/install
import { Star, ShoppingCart, Heart, Share2, CheckCircle, ArrowLeft } from 'lucide-react';
import AddToCartButton from '@/components/Products/ProductCard/AddToCartButton';
import WishlistButton from '@/components/Products/ProductCard/WishlistButton';
import ShareButton from '@/components/Products/ProductCard/ShareButton';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { getProduct, loading: contextLoading } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      // 1. Try to find in dummy data first (since user specifically asked for dummy data usage)
      let foundProduct = dummyProducts.find((p) => p._id === productId || p.id === productId);

      // 2. If not found, try context/API
      if (!foundProduct) {
        try {
          foundProduct = await getProduct(productId);
        } catch (error) {
          console.error('Failed to fetch product', error);
        }
      }

      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.image || foundProduct.images?.[0]?.secure_url);
      }
      setLoading(false);
    };

    loadProduct();
  }, [productId, getProduct]);

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <Skeleton className='h-[400px] w-full rounded-xl' />
          <div className='space-y-4'>
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-4 w-1/4' />
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-10 w-1/3' />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Product Not Found</h2>
        <Link to='/products'>
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  // Helper to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />);
  };

  return (
    <div className='min-h-screen bg-background pb-12'>
      <div className='container mx-auto px-4 py-8'>
        {/* Breadcrumb / Back */}
        <div className='mb-6'>
          <Link to='/products' className='inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Marketplace
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
          {/* Left Column: Images */}
          <div className='space-y-4'>
            <div className='aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted relative'>
              <img src={activeImage} alt={product.title} className='h-full w-full object-cover transition-all duration-300' />
              <div className='absolute top-4 right-4'>
                <WishlistButton productId={product._id} className='h-10 w-10 bg-white/80 hover:bg-white' />
              </div>
            </div>

            {/* Thumbnails (if multiple images) */}
            {product.images && product.images.length > 1 && (
              <div className='flex gap-2 overflow-x-auto pb-2'>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img.secure_url)}
                    className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === img.secure_url ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img.secure_url} alt={`View ${idx}`} className='h-full w-full object-cover' />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className='space-y-6'>
            <div>
              <div className='flex items-center justify-between mb-2'>
                {product.category && (
                  <Badge variant='secondary' className='uppercase tracking-wider text-[10px] font-semibold'>
                    {product.category.name || product.category}
                  </Badge>
                )}
                <span className='text-xs text-muted-foreground'>ID: {product._id}</span>
              </div>

              <h1 className='text-3xl font-bold tracking-tight text-foreground mb-2'>{product.title}</h1>

              <div className='flex items-center gap-4 mb-4'>
                <div className='flex items-center'>
                  {renderStars(product.rating || 0)}
                  <span className='ml-2 text-sm text-muted-foreground'>({product.reviewCount || 0} reviews)</span>
                </div>
                {product.stock > 0 ? (
                  <span className='text-sm font-medium text-green-600 flex items-center'>
                    <CheckCircle className='h-3 w-3 mr-1' /> In Stock ({product.stock})
                  </span>
                ) : (
                  <span className='text-sm font-medium text-destructive'>Out of Stock</span>
                )}
              </div>

              <div className='text-3xl font-bold text-primary'>₦{Number(product.price).toLocaleString()}</div>
            </div>
            <div className='prose prose-sm text-muted-foreground'>
              <p>{product.description}</p>
            </div>
            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-border'>
              <div className='flex-1'>
                <AddToCartButton product={product} className='w-full h-12 text-base' />
              </div>
              <ShareButton url={window.location.href} title={product.title} className='h-12 w-12 p-0 rounded-md border-input bg-background hover:bg-accent hover:text-accent-foreground' />
            </div>
            {/* Meta Info */}
            <div className='pt-6 space-y-4 border-t border-border'>
              {/* Seller */}
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Sold by</span>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={product.owner?.profileImage?.secure_url} />
                    <AvatarFallback>{product.owner?.username?.charAt(0) || 'S'}</AvatarFallback>
                  </Avatar>
                  <span className='text-sm hover:underline cursor-pointer font-medium'>{product.owner?.username || 'Unknown Seller'}</span>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>Tags:</span>
                  <div className='flex flex-wrap gap-1'>
                    {product.tags.map((tag) => (
                      <span key={tag._id} className='text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground'>
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <div className='mt-16'>
          <h3 className='text-xl font-bold mb-6'>Customer Reviews</h3>
          {/* Review list would go here */}
          <div className='p-8 text-center bg-muted/30 rounded-xl border border-border dashed'>
            <p className='text-muted-foreground'>No reviews yet for this product.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
