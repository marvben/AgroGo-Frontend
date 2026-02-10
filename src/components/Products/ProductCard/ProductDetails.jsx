import { Link } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  const productUrl = `products/${product.id}`;

  return (
    <div className='flex flex-col gap-1'>
      <Link to={productUrl.toLowerCase()} className='font-bold text-foreground hover:text-primary transition-colors hover:underline text-base line-clamp-2'>
        {product.title} {product.title}
      </Link>
      <span className='font-bold text-lg text-primary'>₦{Number(product.price).toLocaleString()}</span>
    </div>
  );
};

export default ProductDetails;
