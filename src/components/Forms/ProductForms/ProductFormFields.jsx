import { TextField, MenuItem } from '@mui/material';

const ProductFormFields = ({ inputStyles, register, errors }) => {
  return (
    <>
      {/* Title */}
      <TextField
        label='Title'
        fullWidth
        margin='normal'
        {...register('title', { required: 'Title is required' })}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={inputStyles}
      />

      {/* Short Description */}
      <TextField
        label='Short Description'
        fullWidth
        margin='normal'
        {...register('short_description', {
          required: 'Short description is required',
        })}
        error={!!errors.short_description}
        helperText={errors.short_description?.message}
        sx={inputStyles}
      />

      {/* Description */}
      <TextField
        label='Description'
        fullWidth
        multiline
        rows={4}
        margin='normal'
        {...register('description', { required: 'Description is required' })}
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={inputStyles}
      />

      {/* Image (URL or file) */}
      <TextField
        label='Image URL'
        fullWidth
        margin='normal'
        {...register('image', { required: 'Image is required' })}
        error={!!errors.image}
        helperText={errors.image?.message}
        sx={inputStyles}
      />

      {/* Category */}
      <TextField
        label='Category'
        fullWidth
        margin='normal'
        {...register('category', { required: 'Category is required' })}
        error={!!errors.category}
        helperText={errors.category?.message}
        sx={inputStyles}
      />

      {/* Tag */}
      <TextField
        label='Tag'
        fullWidth
        margin='normal'
        {...register('tag', { required: 'Tag is required' })}
        error={!!errors.tag}
        helperText={errors.tag?.message}
        sx={inputStyles}
      />

      {/* Price */}
      <TextField
        label='Price'
        type='number'
        fullWidth
        margin='normal'
        {...register('price', {
          required: 'Price is required',
          valueAsNumber: true,
          min: { value: 1, message: 'Price must be greater than 0' },
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
        sx={inputStyles}
      />

      {/* Stock */}
      <TextField
        label='Stock'
        type='number'
        fullWidth
        margin='normal'
        {...register('stock', {
          required: 'Stock is required',
          valueAsNumber: true,
          min: { value: 0, message: 'Stock cannot be negative' },
        })}
        error={!!errors.stock}
        helperText={errors.stock?.message}
        sx={inputStyles}
      />

      {/* Owner (Farmer ID) */}
      <TextField
        label='Owner (Farmer ID)'
        fullWidth
        margin='normal'
        {...register('owner', { required: 'Owner ID is required' })}
        error={!!errors.owner}
        helperText={errors.owner?.message}
        sx={inputStyles}
      />
    </>
  );
};

export default ProductFormFields;
