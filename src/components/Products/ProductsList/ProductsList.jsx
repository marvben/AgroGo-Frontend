import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import dummyProducts from '../../../data/products';
import { useAuth } from '../../../context/AuthContext/useAuth.jsx';
import { Skeleton } from '../../ui/skeleton'; // Need to define skeleton or use fallback div

const ProductsList = ({ products = dummyProducts, title = 'Latest Harvests', description = 'Freshly sourced products from verified local farmers.' }) => {
  const { loading } = useAuth();

  // Skeleton Loader Component (inline for simplicity if not exists)
  // Skeleton Loader Component
  const ProductSkeleton = () => (
    <div className='space-y-3'>
      <Skeleton className='aspect-[4/3] w-full rounded-xl' />
      <Skeleton className='h-4 w-3/4 rounded' />
      <Skeleton className='h-4 w-1/2 rounded' />
      <Skeleton className='h-8 w-full rounded mt-2' />
    </div>
  );

  if (loading) {
    return (
      <div className='container py-12 px-4 md:px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className='container py-16 text-center'>
        <div className='inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4'>
          <Leaf className='h-10 w-10 text-muted-foreground' />
        </div>
        <h3 className='text-xl font-semibold mb-2'>No products available yet</h3>
        <p className='text-muted-foreground mb-6'>Check back later for fresh harvest.</p>
        <Link to='/products'>
          <Button variant='outline'>Browse Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className='py-12 md:py-16'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-foreground'>{title}</h2>
            <p className='text-muted-foreground mt-2 max-w-[600px]'>{description}</p>
          </div>
          <Link to='/products'>
            <Button variant='ghost' className='hidden md:flex gap-2'>
              View All <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product, idx) => (
            <ProductCard key={product._id || idx} product={product} />
          ))}
        </div>

        <div className='mt-8 text-center md:hidden'>
          <Link to='/products'>
            <Button variant='outline' className='w-full'>
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
