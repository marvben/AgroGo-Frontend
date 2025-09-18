// src/components/AuthFormLayout.jsx
import AddProductFormFields from './ProductFormFields';
import { useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Paper, Typography, Button } from '@mui/material';
import ButtonSubmit from '../AuthForm/ButtonSubmit';
import { keyframes } from '@mui/system';
import { useState } from 'react';
import UploadWidget from '../../ImageUpload/UploadWidget/UploadWidget';
import { useAuth } from '../../../context/AuthContext/useAuth';
import { useUI } from '../../../context/UIContext/useUI';
import ImagePreviewList from '../../ImagePreview/ImagePreviewList';
import { deleteImageFromCloudinary } from '../../../services/imageService';

export default function ProductForm({
  mode = 'create',
  onSubmit,
  loading,
  title,
}) {
  // Animation for the card
  const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

  const inputStyles = {
    '& .MuiInputBase-input': {
      color: '#f8fafc',
    },
    '& .MuiFormLabel-root': {
      color: '#cbd5e1',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#334155' },
      '&:hover fieldset': { borderColor: '#3b82f6' },
      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
    },
    '& .MuiInputBase-root.Mui-focused': {
      backgroundColor: '#0f172a', // background when focused
    },
    // Autofill overrides
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #0f172a inset', // background color
      WebkitTextFillColor: '#f8fafc', // text color
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '& input:-webkit-autofill:focus': {
      WebkitBoxShadow: '0 0 0 100px #0f172a inset',
      WebkitTextFillColor: '#f8fafc',
    },

    mb: 2,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const { showSuccess, showError } = useUI();

  const [images, setImages] = useState(
    user?.images || [{ url: '', public_id: '' }]
  );
  const [uploadImageText, setUploadImageText] = useState(
    'Upload product images'
  );
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleRemove = async (public_id) => {
    await deleteImageFromCloudinary(public_id);
    setImages((prev) => prev.filter((img) => img.public_id !== public_id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100%'
        bgcolor='#0f172a'
        px={2}
        py={6}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
            borderRadius: 3,
            bgcolor: '#1e293b',
            border: '1px solid #334155',
            color: '#f8fafc',
            animation: `${fadeUp} 0.6s ease-out`, // card animation
          }}
        >
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ fontWeight: 600, textAlign: 'center', color: '#f1f5f9' }}
          >
            {title}
          </Typography>
          <AddProductFormFields
            inputStyles={inputStyles}
            register={register}
            errors={errors}
          />

          {images.length > 0 && showImagePreview && (
            <ImagePreviewList images={images} onRemove={handleRemove} />
          )}
          <UploadWidget
            folderName={`Products/${user?.username}_${user?.id}`}
            multiple={true}
            resourceType='image'
            showUploadMoreButton={true}
            singleUploadAutoClose={false}
            onUpload={(error, result) => {
              if (!error && result.event === 'success') {
                const uploadedFile = {
                  url: result.info.secure_url,
                  public_id: result.info.public_id,
                };

                setImages((prev) => [
                  ...prev,
                  { url: uploadedFile.url, public_id: uploadedFile.public_id },
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
              <Button
                type='button'
                onClick={() => {
                  if (user) {
                    open();
                  } else {
                    showError('You must be logged in to upload images');
                  }
                }}
                variant='contained'
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: '#1976d2',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                {uploadImageText}
              </Button>
            )}
          </UploadWidget>
          {showSubmitButton && (
            <ButtonSubmit text='Create Product' loading={loading} />
          )}
        </Paper>
      </Box>
    </form>
  );
}
