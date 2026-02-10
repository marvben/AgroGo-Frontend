import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller } from 'react-hook-form';

const ProductFormFields = ({ register, errors, categories = [], tags = [], control }) => {
  return (
    <div className='space-y-4'>
      {/* Title */}
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' placeholder='Product Title' {...register('title', { required: 'Title is required' })} className={errors.title ? 'border-destructive' : ''} />
        {errors.title && <p className='text-xs text-destructive'>{errors.title.message}</p>}
      </div>

      {/* Short Description */}
      <div className='space-y-2'>
        <Label htmlFor='short_description'>Short Description</Label>
        <Input
          id='short_description'
          placeholder='Brief summary...'
          {...register('short_description', { required: 'Short description is required' })}
          className={errors.short_description ? 'border-destructive' : ''}
        />
        {errors.short_description && <p className='text-xs text-destructive'>{errors.short_description.message}</p>}
      </div>

      {/* Full Description */}
      <div className='space-y-2'>
        <Label htmlFor='description'>Full Description</Label>
        <Textarea
          id='description'
          placeholder='Detailed product information...'
          {...register('description', { required: 'Description is required' })}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && <p className='text-xs text-destructive'>{errors.description.message}</p>}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Category */}
        <div className='space-y-2'>
          <Label>Category</Label>
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className='text-xs text-destructive'>{errors.category.message}</p>}
        </div>

        {/* Tag */}
        <div className='space-y-2'>
          <Label>Tag</Label>
          <Controller
            name='tag'
            control={control}
            rules={{ required: 'Tag is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={errors.tag ? 'border-destructive' : ''}>
                  <SelectValue placeholder='Select Tag' />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag._id} value={tag._id}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.tag && <p className='text-xs text-destructive'>{errors.tag.message}</p>}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Price */}
        <div className='space-y-2'>
          <Label htmlFor='price'>Price (Note: Currency is usually KES or NGN)</Label>
          <Input
            id='price'
            type='number'
            placeholder='0.00'
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Price must be greater than 0' },
            })}
            className={errors.price ? 'border-destructive' : ''}
          />
          {errors.price && <p className='text-xs text-destructive'>{errors.price.message}</p>}
        </div>

        {/* Stock */}
        <div className='space-y-2'>
          <Label htmlFor='stock'>Stock Quantity</Label>
          <Input
            id='stock'
            type='number'
            placeholder='0'
            {...register('stock', {
              required: 'Stock is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Stock cannot be negative' },
            })}
            className={errors.stock ? 'border-destructive' : ''}
          />
          {errors.stock && <p className='text-xs text-destructive'>{errors.stock.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductFormFields;
