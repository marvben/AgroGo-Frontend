import { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle2, Package, ArrowRight, Home, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentConfirmationPage = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};
  const { clearCart } = useCart();

  useEffect(() => {
    if (orderId) {
      clearCart();
    }
  }, [orderId, clearCart]);

  if (!orderId) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='min-h-screen bg-muted/30 flex items-center justify-center p-4'>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='w-full max-w-lg'>
        <Card className='border-border/50 shadow-xl overflow-hidden'>
          <div className='bg-green-50/50 p-8 text-center border-b border-green-100'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className='mx-auto h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner'
            >
              <CheckCircle2 className='h-12 w-12' />
            </motion.div>
            <h1 className='text-3xl font-bold text-green-900'>Order Confirmed!</h1>
            <p className='text-green-700 mt-2 font-medium'>Thank you for your purchase.</p>
          </div>

          <CardContent className='p-8 space-y-6'>
            <div className='space-y-4 text-sm bg-card rounded-lg border p-4 shadow-sm'>
              <div className='flex justify-between py-2 border-b border-dashed'>
                <span className='text-muted-foreground'>Order Reference</span>
                <span className='font-mono font-bold text-primary'>{orderId}</span>
              </div>
              <div className='flex justify-between py-2 border-b border-dashed'>
                <span className='text-muted-foreground'>Amount Paid</span>
                <span className='font-bold text-lg'>₦{Number(total).toLocaleString()}</span>
              </div>
              <div className='flex justify-between py-2'>
                <span className='text-muted-foreground'>Estimated Delivery</span>
                <span className='font-medium flex items-center gap-1 text-green-600'>3-5 Business Days</span>
              </div>
            </div>

            <div className='bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex items-start gap-3 border border-blue-100'>
              <Package className='h-5 w-5 flex-shrink-0 mt-0.5' />
              <p>We've sent a detailed confirmation email to your inbox.</p>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-3 p-8 pt-0'>
            <Button asChild className='w-full h-11 text-base shadow-md hover:shadow-lg transition-all' size='lg'>
              <Link to='/products'>
                Continue Shopping <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>

            <div className='grid grid-cols-2 gap-3 w-full'>
              <Button asChild variant='outline' className='w-full hover:bg-muted/50'>
                <Link to='/dashboard'>
                  <LayoutDashboard className='mr-2 h-4 w-4' /> Dashboard
                </Link>
              </Button>
              <Button asChild variant='ghost' className='w-full hover:bg-muted/50'>
                <Link to='/'>
                  <Home className='mr-2 h-4 w-4' /> Home
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentConfirmationPage;
