import { TextField, MenuItem } from '@mui/material';

const ProductFormFields = ({ inputStyles, register, errors }) => {
  const categories = [
    'Fruits',
    'Vegetables',
    'Grains & Cereals',
    'Legumes & Pulses',
    'Tubers & Roots',
    'Nuts & Seeds',
    'Oil Crops',
    'Livestock Products',
    'Spices & Herbs',
  ];
  const tags = [
    'Fresh',
    'Organic',
    'Dried',
    'Processed',
    'Seasonal',
    'Imported',
    'Local',
    'Wholesale',
    'Retail',
  ];

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

      {/*Full Description */}
      <TextField
        label='Full Description'
        fullWidth
        multiline
        rows={4}
        margin='normal'
        {...register('description', { required: 'Description is required' })}
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={inputStyles}
      />

      {/* Category */}
      <TextField
        select
        label='Category'
        fullWidth
        margin='normal'
        {...register('category', {
          required: 'Category is required',
          validate: (value) => value !== 'none',
        })}
        error={!!errors.category}
        helperText={errors.category?.message}
        sx={{
          ...inputStyles,
          '& .MuiInputBase-root': {
            backgroundColor: '#0f172a', // dark background
          },
        }}
      >
        <MenuItem value='none'>Please select product category</MenuItem>
        {categories.map((category, idx) => (
          <MenuItem key={idx} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

      {/* Tag */}
      <TextField
        select
        label='Tag'
        fullWidth
        margin='normal'
        {...register('tag', {
          required: 'Tag is required',
          validate: (value) => value !== 'none',
        })}
        error={!!errors.tag}
        helperText={errors.tag?.message}
        sx={{
          ...inputStyles,
          '& .MuiInputBase-root': {
            backgroundColor: '#0f172a', // dark background
          },
        }}
      >
        <MenuItem value='none'>Please select product tag</MenuItem>
        {tags.map((tag, idx) => (
          <MenuItem key={idx} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </TextField>

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
    </>
  );
};

export default ProductFormFields;
