import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext/useWishlist';
import { useProduct } from '@/context/ProductContext/useProduct';
import { Heart, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import dummyProducts from '@/data/products';

export function WishlistSheet({ children }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { getProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      setLoading(true);
      const fetchedProducts = [];

      for (const id of wishlist) {
        const dummy = dummyProducts.find((p) => p._id === id || p.id === id);
        if (dummy) {
          fetchedProducts.push(dummy);
          continue;
        }

        try {
          const product = await getProduct(id);
          if (product) fetchedProducts.push(product);
        } catch (err) {
          console.error(`Failed to fetch product ${id}`, err);
        }
      }
      setProducts(fetchedProducts);
      setLoading(false);
    };

    if (wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setProducts([]);
    }
  }, [wishlist, getProduct]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='w-full sm:w-[540px] flex flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='px-1'>
          <SheetTitle className='flex items-center gap-2'>
            <Heart className='h-5 w-5' /> Wishlist ({wishlist.length})
          </SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className='flex-1 flex items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
          </div>
        ) : products.length > 0 ? (
          <>
            <ScrollArea className='flex-1 -mr-4 pr-6 my-4'>
              <div className='space-y-4'>
                {products.map((item) => (
                  <div key={item._id || item.id} className='flex gap-4'>
                    <div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted'>
                      <img src={item.image || item.images?.[0]?.secure_url || 'https://placehold.co/100'} alt={item.title} className='h-full w-full object-cover' />
                    </div>
                    <div className='flex flex-1 flex-col justify-between'>
                      <div className='grid gap-1'>
                        <h4 className='font-medium text-sm line-clamp-1'>
                          <Link to={`/product/${item._id || item.id}`} className='hover:underline'>
                            {item.title}
                          </Link>
                        </h4>
                        <p className='text-sm font-bold text-primary'>₦{Number(item.price).toLocaleString()}</p>
                      </div>
                      <div className='flex items-center justify-end'>
                        <Button variant='ghost' size='sm' className='h-8 text-muted-foreground hover:text-destructive text-xs gap-1' onClick={() => removeFromWishlist(item._id || item.id)}>
                          <Trash2 className='h-3 w-3' /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className='pr-6 pt-4 border-t mr-6'>
              <SheetClose asChild>
                <Button className='w-full' asChild>
                  <Link to='/wishlist'>
                    View Full Wishlist <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </>
        ) : (
          <div className='flex-1 flex flex-col items-center justify-center space-y-4 pr-6'>
            <Heart className='h-12 w-12 text-muted-foreground' />
            <div className='text-center space-y-1'>
              <h3 className='font-semibold text-lg'>Your wishlist is empty</h3>
              <p className='text-muted-foreground text-sm'>Save items you love to revisit later.</p>
            </div>
            <SheetClose asChild>
              <Button asChild variant='outline'>
                <Link to='/products'>Explore Products</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
