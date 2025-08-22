import { CardMedia } from '@mui/material';

const ProductImage = ({ src, alt }) => {
  return (
    <CardMedia
      component='img'
      height='200'
      image={src}
      alt={alt}
      sx={{ objectFit: 'cover' }}
    />
  );
};

export default ProductImage;
