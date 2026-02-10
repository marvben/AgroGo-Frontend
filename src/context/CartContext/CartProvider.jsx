import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { toast } from 'sonner';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('agrogo_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from local storage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('agrogo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => (item._id || item.id) === (product._id || product.id));
      if (existingItem) {
        toast.info('Item quantity updated in cart');
        return prevItems.map((item) => ((item._id || item.id) === (product._id || product.id) ? { ...item, quantity: item.quantity + quantity } : item));
      }
      toast.success('Added to cart');
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => (item._id || item.id) !== productId));
    toast.error('Removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => prevItems.map((item) => ((item._id || item.id) === productId ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
