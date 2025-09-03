import { Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  const productUrl = `products/${
    product.category ? product.category + '/' : ''
  } ${product.id}`;

  const inputStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
  };
  return (
    <>
      <Typography
        component={RouterLink}
        to={productUrl.toLocaleLowerCase()}
        variant='h6'
        sx={inputStyles}
      >
        {product.title}
      </Typography>
      <Typography variant='h6' sx={inputStyles}>
        ${product.price}
      </Typography>
    </>
  );
};

export default ProductDetails;
