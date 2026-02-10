import { useEffect, useState } from 'react';
import { useWishlist } from '@/context/WishlistContext/useWishlist';
import { useProduct } from '@/context/ProductContext/useProduct';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import dummyProducts from '@/data/products';

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const { getProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      setLoading(true);
      const fetchedProducts = [];

      // We need to fetch details for each item in the wishlist
      // Since we might be using dummy data mixed with real data, we check both
      for (const id of wishlist) {
        // 1. Try dummy data
        const dummy = dummyProducts.find((p) => p._id === id || p.id === id);
        if (dummy) {
          fetchedProducts.push(dummy);
          continue;
        }

        // 2. Try API
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
      setLoading(false);
    }
  }, [wishlist, getProduct]);

  if (loading) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4'>
        <div className='bg-muted/30 p-8 rounded-full mb-6'>
          <Heart className='h-12 w-12 text-muted-foreground' />
        </div>
        <h2 className='text-2xl font-bold mb-2'>Your wishlist is empty</h2>
        <p className='text-muted-foreground mb-8'>Save items you love to revisit later.</p>
        <Link to='/products'>
          <Button size='lg'>Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8'>My Wishlist ({products.length})</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div key={product._id || product.id} className='h-full'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
