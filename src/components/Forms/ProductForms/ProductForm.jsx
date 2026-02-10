// src/components/Forms/ProductForm.jsx
import AddProductFormFields from './ProductFormFields';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { useState, useEffect } from 'react';
import UploadWidget from '../../ImageUpload/UploadWidget/UploadWidget';
import { useAuth } from '../../../context/AuthContext/useAuth';
import { useUI } from '../../../context/UIContext/useUI';
import ImagePreviewList from '../../ImagePreview/ImagePreviewList';
import { deleteImageFromCloudinary } from '../../../services/imageService';
import axios from '../../../api/axios';
import { Loader2, Upload, CloudUpload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductForm({ mode = 'create', onSubmit, loading, title, initialData }) {
  const {
    handleSubmit,
    register,
    control,
    reset, // Add reset
    formState: { errors },
  } = useForm({
    defaultValues:
      mode === 'edit' && initialData
        ? {
            title: initialData.title,
            short_description: initialData.short_description,
            description: initialData.description,
            category: typeof initialData.category === 'object' ? initialData.category._id : initialData.category,
            tag: initialData.tags?.[0] || '', // Assuming single tag for now or need adjustment
            price: initialData.price,
            stock: initialData.stock,
          }
        : {},
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset({
        title: initialData.title,
        short_description: initialData.short_description,
        description: initialData.description,
        category: typeof initialData.category === 'object' ? initialData.category._id : initialData.category,
        tag: typeof initialData.tags?.[0] === 'object' ? initialData.tags[0]._id : initialData.tags?.[0],
        price: initialData.price,
        stock: initialData.stock,
      });
      if (initialData.images) {
        setImages(initialData.images);
        setShowImagePreview(true);
        setShowSubmitButton(true);
      }
    }
  }, [initialData, mode, reset]);

  const { user } = useAuth();
  const { showSuccess, showError } = useUI();

  const [images, setImages] = useState(user?.images || [{ secure_url: '', public_id: '' }]);
  const [uploadImageText, setUploadImageText] = useState('Upload product images');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const handleRemove = async (public_id) => {
    await deleteImageFromCloudinary(public_id);
    setImages((prev) => prev.filter((img) => img.public_id !== public_id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([axios.get('/categories'), axios.get('/tags')]);
        if (catRes.data.success) setCategories(catRes.data.data);
        if (tagRes.data.success) setTags(tagRes.data.data);
      } catch (err) {
        console.error('Failed to load form data', err);
        showError('Could not load categories or tags');
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='flex justify-center py-10 px-4 min-h-screen bg-background'>
      <Card className='w-full max-w-2xl border-border bg-card shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>{title}</CardTitle>
          <CardDescription className='text-center'>Enter the details of your produce</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => onSubmit(data, images))} className='space-y-6'>
            <AddProductFormFields register={register} errors={errors} categories={categories} tags={tags} control={control} />

            <div className='space-y-4 pt-4 border-t border-border'>
              <h3 className='font-semibold text-sm text-foreground'>Product Images</h3>

              {images.length > 0 && showImagePreview && <ImagePreviewList images={images} onRemove={handleRemove} />}

              {images.length <= 5 && (
                <div className='flex justify-center'>
                  <UploadWidget
                    folderName={`Products/${user?.username}_${user?.id}`}
                    multiple={true}
                    maxFiles={5}
                    resourceType='image'
                    showUploadMoreButton={true}
                    singleUploadAutoClose={false}
                    onUpload={(error, result) => {
                      if (!error && result.event === 'success') {
                        const uploadedFile = {
                          secure_url: result.info.secure_url,
                          public_id: result.info.public_id,
                        };

                        setImages((prev) => [
                          ...prev,
                          {
                            secure_url: uploadedFile.secure_url,
                            public_id: uploadedFile.public_id,
                          },
                        ]);
                        showSuccess('Image added successfully');
                        setUploadImageText('Upload more images');
                        setShowSubmitButton(true);
                        setShowImagePreview(true);
                      } else {
                        showError('Upload failed. Please try again.');
                      }
                    }}
                  >
                    {({ open }) => (
                      <Button type='button' onClick={() => (user ? open() : showError('Login required'))} variant='secondary' className='w-full border-dashed border-2 h-24 flex-col gap-2'>
                        <CloudUpload className='h-6 w-6' />
                        {uploadImageText}
                      </Button>
                    )}
                  </UploadWidget>
                </div>
              )}
            </div>

            {showSubmitButton && (
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Create Product'}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
