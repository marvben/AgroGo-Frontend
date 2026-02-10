import { useEffect, useState } from 'react';
import { useProduct } from '../context/ProductContext/useProduct';
import HeroSection from '../components/Home/HeroSection';
import CategorySection from '../components/Home/CategorySection';
import TrustSection from '../components/Home/TrustSection';
import ProductsList from '../components/Products/ProductsList/ProductsList';

const HomePage = () => {
  const { getManyProducts } = useProduct();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getManyProducts();
      if (data) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className='min-h-screen bg-slate-950 pb-10'>
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <div className='relative z-10'>
        {products?.length > 0 ? (
          <ProductsList products={products} title='Fresh Arrivals' description='Direct from farms harvested within the last 24 hours.' />
        ) : (
          <ProductsList title='Fresh Arrivals' description='Direct from farms harvested within the last 24 hours.' />
        )}
      </div>

      {/* Trust & Guarantee */}
      <TrustSection />
    </div>
  );
};

export default HomePage;
