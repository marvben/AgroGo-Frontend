import { Button } from '../ui/button';
import { ArrowRight, Sprout, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className='relative overflow-hidden bg-background py-20 md:py-32'>
      {/* Background Decor */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl' />
        <div className='absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl' />
      </div>

      <div className='container px-4 md:px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Text Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='space-y-6 text-center lg:text-left'>
            <div className='inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary bg-primary/10 mb-4'>
              <span className='flex h-2 w-2 rounded-full bg-primary mr-2'></span>
              The future of agriculture is here
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground'>
              Straight from the Farm to <span className='text-primary'>Your Table</span>
            </h1>

            <p className='text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0'>
              Connect directly with verified farmers. Get fresh, organic produce at fair prices while supporting sustainable agriculture.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4'>
              <Link to='/products'>
                <Button size='lg' className='w-full sm:w-auto text-base gap-2'>
                  <ShoppingBag className='h-5 w-5' /> Shop Produce
                </Button>
              </Link>
              <Link to='/register'>
                <Button size='lg' variant='outline' className='w-full sm:w-auto text-base gap-2'>
                  <Sprout className='h-5 w-5' /> Start Selling
                </Button>
              </Link>
            </div>

            <div className='flex items-center justify-center lg:justify-start gap-8 pt-8 text-sm text-muted-foreground'>
              <div className='flex flex-col items-center lg:items-start'>
                <span className='font-bold text-2xl text-foreground'>1k+</span>
                <span>Farmers</span>
              </div>
              <div className='h-8 w-px bg-border' />
              <div className='flex flex-col items-center lg:items-start'>
                <span className='font-bold text-2xl text-foreground'>50k+</span>
                <span>Products</span>
              </div>
              <div className='h-8 w-px bg-border' />
              <div className='flex flex-col items-center lg:items-start'>
                <span className='font-bold text-2xl text-foreground'>99%</span>
                <span>Satisfaction</span>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className='relative hidden lg:block'>
            <div className='relative rounded-2xl overflow-hidden border border-border shadow-2xl'>
              {/* Use a placeholder from unsplash or similar if local image not available, but user wants full code. 
                  I'll use a color block or the generate_image approach conceptually, 
                  but for code I'll use a reliable placeholder service for now or assume an asset exists.
                  I will use a nice gradient box acting as a placeholder to be safe. 
               */}
              <div className='aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative group'>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"></div>
                <div className='absolute inset-0 bg-gradient-to-t from-background/90 to-transparent'></div>

                {/* Floating Cards */}
                <div className='absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-background/90 backdrop-blur border border-border/50 shadow-lg'>
                  <div className='flex items-center gap-4'>
                    <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600'>
                      <Sprout className='h-6 w-6' />
                    </div>
                    <div>
                      <p className='font-semibold text-foreground'>Fresh Harvest</p>
                      <p className='text-xs text-muted-foreground'>Just arrived from Kiambu Farm</p>
                    </div>
                    <div className='ml-auto font-bold text-primary'>$24.00</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
