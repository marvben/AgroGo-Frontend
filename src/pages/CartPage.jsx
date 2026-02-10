import { useCart } from '@/context/CartContext/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4'>
        <div className='bg-muted/30 p-8 rounded-full mb-6'>
          <ShoppingBag className='h-12 w-12 text-muted-foreground' />
        </div>
        <h2 className='text-2xl font-bold mb-2'>Your cart is empty</h2>
        <p className='text-muted-foreground mb-8'>Looks like you haven't added anything yet.</p>
        <Link to='/products'>
          <Button size='lg'>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-muted/30 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items List */}
          <div className='lg:col-span-2 space-y-4'>
            {cartItems.map((item) => (
              <Card key={item._id || item.id} className='overflow-hidden border-border/50'>
                <CardContent className='p-4 flex gap-4'>
                  {/* Image */}
                  <div className='h-24 w-24 flex-shrink-0 bg-muted rounded-md overflow-hidden'>
                    <img src={item.image || item.images?.[0]?.secure_url || 'https://placehold.co/400'} alt={item.title} className='h-full w-full object-cover' />
                  </div>

                  {/* Details */}
                  <div className='flex-grow flex flex-col justify-between'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-semibold text-lg line-clamp-1'>
                          <Link to={`/product/${item._id || item.id}`} className='hover:underline'>
                            {item.title}
                          </Link>
                        </h3>
                        <p className='text-sm text-muted-foreground'>₦{Number(item.price).toLocaleString()}</p>
                      </div>
                      <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-destructive h-8 w-8' onClick={() => removeFromCart(item._id || item.id)}>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>

                    <div className='flex items-center justify-between mt-2'>
                      <div className='flex items-center border rounded-md'>
                        <Button variant='ghost' size='icon' className='h-8 w-8 rounded-none' onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <Minus className='h-3 w-3' />
                        </Button>
                        <span className='w-8 text-center text-sm font-medium'>{item.quantity}</span>
                        <Button variant='ghost' size='icon' className='h-8 w-8 rounded-none' onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}>
                          <Plus className='h-3 w-3' />
                        </Button>
                      </div>
                      <div className='font-bold'>₦{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className='flex justify-end pt-4'>
              <Button variant='outline' onClick={clearCart} className='text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20'>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-24 border-border/50 shadow-md'>
              <CardContent className='p-6 space-y-4'>
                <h2 className='text-xl font-bold'>Order Summary</h2>
                <Separator />

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Subtotal</span>
                    <span>₦{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Shipping Estimate</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tax</span>
                    <span>₦0.00</span>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between font-bold text-lg'>
                  <span>Total</span>
                  <span className='text-primary'>₦{cartTotal.toLocaleString()}</span>
                </div>

                <Link to='/checkout'>
                  <Button size='lg' className='w-full font-semibold text-base gap-2 mt-4'>
                    Checkout <ArrowRight className='h-4 w-4' />
                  </Button>
                </Link>

                <Link to='/products' className='block text-center'>
                  <Button variant='link' className='text-muted-foreground text-xs'>
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
