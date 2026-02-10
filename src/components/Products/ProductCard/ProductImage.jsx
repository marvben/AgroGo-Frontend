const ProductImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className='h-48 w-full object-cover rounded-t-lg' />;
};

export default ProductImage;
