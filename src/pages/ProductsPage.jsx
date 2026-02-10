import ProductsList from '@/components/Products/ProductsList/ProductsList';

const ProductPage = () => {
  return (
    <div className='min-h-screen bg-background py-8 px-4 md:px-8'>
      <ProductsList title='Our Products' description='Fresh farm produce directly from farmers' />
    </div>
  );
};

export default ProductPage;
