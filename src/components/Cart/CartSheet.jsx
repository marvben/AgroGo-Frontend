import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext/useCart';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function CartSheet({ children }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='w-full sm:w-[540px] flex flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='px-1'>
          <SheetTitle className='flex items-center gap-2'>
            <ShoppingCart className='h-5 w-5' /> Shopping Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <ScrollArea className='flex-1 -mr-4 pr-6 my-4'>
              <div className='space-y-4'>
                {cartItems.map((item) => (
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
                        <p className='text-sm text-muted-foreground'>₦{Number(item.price).toLocaleString()}</p>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                          <Button variant='outline' size='icon' className='h-6 w-6' onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus className='h-3 w-3' />
                          </Button>
                          <span className='w-8 text-center text-xs'>{item.quantity}</span>
                          <Button variant='outline' size='icon' className='h-6 w-6' onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}>
                            <Plus className='h-3 w-3' />
                          </Button>
                        </div>
                        <Button variant='ghost' size='icon' className='h-8 w-8 text-muted-foreground hover:text-destructive' onClick={() => removeFromCart(item._id || item.id)}>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className='pr-6 space-y-4 pt-4 border-t mr-6'>
              <div className='flex items-center justify-between font-bold'>
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <SheetClose asChild>
                  <Button variant='outline' asChild>
                    <Link to='/cart'>View Cart</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild>
                    <Link to='/checkout'>
                      Checkout <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        ) : (
          <div className='flex-1 flex flex-col items-center justify-center space-y-4 pr-6'>
            <ShoppingCart className='h-12 w-12 text-muted-foreground' />
            <div className='text-center space-y-1'>
              <h3 className='font-semibold text-lg'>Your cart is empty</h3>
              <p className='text-muted-foreground text-sm'>Add items to your cart to checkout.</p>
            </div>
            <SheetClose asChild>
              <Button asChild variant='outline'>
                <Link to='/products'>Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
