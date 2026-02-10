import { useState } from 'react';
import { useCart } from '@/context/CartContext/useCart';
import { useUI } from '@/context/UIContext/useUI';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showSuccess } = useUI();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);

      showSuccess('Order placed successfully!');
      // Generate a random order ID
      const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      navigate('/payment-confirmation', { state: { orderId, total: cartTotal } });
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className='min-h-screen bg-muted/30 py-8'>
      <div className='container mx-auto px-4'>
        <div className='mb-6'>
          <Link to='/cart' className='inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Cart
          </Link>
        </div>

        <h1 className='text-3xl font-bold mb-8'>Checkout</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column: Shipping & Payment Form */}
          <div className='lg:col-span-2 space-y-6'>
            <Card className='border-border/50 shadow-sm'>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form id='checkout-form' onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input id='firstName' placeholder='John' {...register('firstName', { required: 'Required' })} className={errors.firstName ? 'border-destructive' : ''} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input id='lastName' placeholder='Doe' {...register('lastName', { required: 'Required' })} className={errors.lastName ? 'border-destructive' : ''} />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' placeholder='john@example.com' {...register('email', { required: 'Required' })} className={errors.email ? 'border-destructive' : ''} />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='address'>Address</Label>
                    <Input id='address' placeholder='123 Farm Road' {...register('address', { required: 'Required' })} className={errors.address ? 'border-destructive' : ''} />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='city'>City</Label>
                      <Input id='city' placeholder='Lagos' {...register('city', { required: 'Required' })} className={errors.city ? 'border-destructive' : ''} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone</Label>
                      <Input id='phone' placeholder='+234...' {...register('phone', { required: 'Required' })} className={errors.phone ? 'border-destructive' : ''} />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className='border-border/50 shadow-sm'>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-4 p-4 border rounded-lg bg-muted/50'>
                  <CreditCard className='h-6 w-6 text-primary' />
                  <div>
                    <p className='font-medium'>Pay with Card / Bank Transfer</p>
                    <p className='text-sm text-muted-foreground'>Secured by Paystack</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-24 border-border/50 shadow-md'>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='max-h-[300px] overflow-y-auto space-y-3 pr-2'>
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className='flex gap-3 text-sm'>
                      <div className='h-12 w-12 bg-muted rounded overflow-hidden flex-shrink-0'>
                        <img src={item.image || item.images?.[0]?.secure_url} alt={item.title} className='h-full w-full object-cover' />
                      </div>
                      <div className='flex-grow'>
                        <p className='font-medium line-clamp-1'>{item.title}</p>
                        <p className='text-muted-foreground'>Qty: {item.quantity}</p>
                      </div>
                      <div className='font-medium'>₦{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Subtotal</span>
                    <span>₦{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className='flex justify-between font-bold text-lg pt-2 border-t'>
                  <span>Total</span>
                  <span className='text-primary'>₦{cartTotal.toLocaleString()}</span>
                </div>

                <Button type='submit' form='checkout-form' size='lg' className='w-full font-semibold text-base mt-2' disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Processing...
                    </>
                  ) : (
                    `Pay ₦${cartTotal.toLocaleString()}`
                  )}
                </Button>

                <p className='text-xs text-center text-muted-foreground mt-2'>By placing this order, you agree to our Terms of Service.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
