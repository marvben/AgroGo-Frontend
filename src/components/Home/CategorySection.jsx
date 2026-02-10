import { useState, useEffect } from 'react';
import { getCategories } from '../../services/categoryService';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) return null;

  return (
    <section className='py-12 bg-background border-b relative overflow-hidden'>
      {/* CSS for seamless marquee loop & pause */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className='container px-4 md:px-6 mb-8 flex items-center justify-between'>
        <h2 className='text-3xl md:text-4xl font-black tracking-tighter uppercase text-foreground'>
          Shop by <span className='text-primary decoration-4 decoration-primary/30 underline underline-offset-4'>Category</span>
        </h2>
        <Link
          to='/products'
          className='flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-primary pb-0.5'
        >
          View All <ArrowRight className='h-4 w-4' />
        </Link>
      </div>

      <div className='relative w-full group py-4'>
        {/* Gradient blur edges */}
        <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none' />

        {loading ? (
          <div className='flex gap-8 overflow-hidden px-4'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='flex flex-col items-center gap-3'>
                <Skeleton className='h-32 w-32 rounded-full' />
                <Skeleton className='h-4 w-24' />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex overflow-hidden'>
            {/* 
              We duplicate the list once to ensure a seamless loop. 
              The CSS animation 'marquee' translates -50% of the total width.
            */}
            <div className='flex gap-12 animate-marquee min-w-max p-6 items-center' style={{ width: 'max-content' }}>
              {[...categories, ...categories].map((cat, idx) => (
                <CategoryItem key={`${cat._id}-${idx}`} cat={cat} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const CategoryItem = ({ cat }) => (
  <motion.div whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }} className='relative flex flex-col items-center gap-4'>
    <Link to={`/products?category=${cat.slug || cat.name}`} className='group/item flex flex-col items-center'>
      <div className='relative h-28 w-28 md:h-32 md:w-32 rounded-full p-1 bg-gradient-to-br from-border via-muted to-border group-hover/item:from-primary group-hover/item:via-primary/50 group-hover/item:to-primary transition-all duration-500 shadow-md group-hover/item:shadow-xl'>
        <div className='h-full w-full rounded-full overflow-hidden border-4 border-background relative bg-white'>
          <img
            src={cat.image || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80'}
            alt={cat.name}
            className='h-full w-full object-cover grayscale brightness-90 contrast-125 group-hover/item:grayscale-0 group-hover/item:brightness-100 transition-all duration-500 transform group-hover/item:scale-110'
          />
          {/* Shine effect */}
          <div className='absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none' />
        </div>
      </div>

      <span className='mt-3 text-sm md:text-base font-bold tracking-wider uppercase text-foreground/70 group-hover/item:text-primary transition-colors duration-300'>{cat.name}</span>
    </Link>
  </motion.div>
);

export default CategorySection;
