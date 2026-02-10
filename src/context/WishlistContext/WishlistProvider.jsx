import { useState, useEffect } from 'react';
import { WishlistContext } from './WishlistContext';
import { toast } from 'sonner';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const storedWishlist = localStorage.getItem('agrogo_wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error('Failed to parse wishlist from local storage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('agrogo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      return;
    }
    setWishlist((prev) => [...prev, productId]);
    toast.success('Added to wishlist');
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
    toast.info('Removed from wishlist');
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
