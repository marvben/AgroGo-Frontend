import { Typography } from '@mui/material';

const ProductDetails = ({ product }) => {
  return (
    <>
      <Typography variant='h6'>{product.title}</Typography>
      <Typography variant='body2'>{product.description}</Typography>
      <Typography variant='h6'>${product.price}</Typography>
    </>
  );
};

export default ProductDetails;
