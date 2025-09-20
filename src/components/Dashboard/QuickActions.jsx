import { Link as RouterLink } from 'react-router-dom';
import UploadWidget from '../ImageUpload/UploadWidget/UploadWidget';
import { useUI } from '../../context/UIContext/useUI';
import { useAuth } from '../../context/AuthContext/useAuth';
import { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Avatar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProfileImage from './ProfileImage';
import { deleteImageFromCloudinary } from '../../services/imageService';

export default function QuickActions({ user, sendNewProfileImage }) {
  const { showSuccess, showError } = useUI();
  const { uploadProfileImage, deleteProfileImage } = useAuth();
  const [image, setImage] = useState(
    user?.profileImage || {
      secure_url: '',
      public_id: '',
    }
  );
  const [showUploadWidget, setShowUploadWidget] = useState(false);

  const handleRemove = async (public_id) => {
    try {
      const res = await deleteImageFromCloudinary(public_id);

      if (res.data) {
        const ok = await deleteProfileImage();

        if (ok) {
          setShowUploadWidget(true);
          showSuccess('Image removed successfully');
          setImage({ secure_url: '', public_id: '' });
          sendNewProfileImage('');
        }
      }
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to delete image');
    }
  };

  useEffect(() => {
    if (user?.profileImage?.secure_url) {
      setShowUploadWidget(false);
    } else {
      setShowUploadWidget(true);
    }
  }, []);

  const buttonStyles = { p: 1, fontSize: '1.2rem' };

  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
      }}
      // Animation for the card
      style={{ animation: 'fadeInUp 0.6s ease-out' }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography variant='h5' textAlign='center'>
          Quick Actions
        </Typography>
        {!showUploadWidget ? (
          <ProfileImage
            url={image.secure_url || 'https://i.pravatar.cc/40'}
            public_id={image.public_id}
            onRemove={handleRemove}
          />
        ) : (
          <UploadWidget
            folderName={`Users/${user?.username}_${user?.id}`}
            resourceType='image'
            onUpload={async (error, result) => {
              if (!error && result.event === 'success') {
                const uploadedFile = {
                  secure_url: result.info.secure_url,
                  public_id: result.info.public_id,
                };

                const res = await uploadProfileImage(uploadedFile);
                if (res.success) {
                  setImage(res.profileImage);
                  showSuccess('Image added successfully');
                  setShowUploadWidget(false);
                  await sendNewProfileImage(res.profileImage.secure_url);
                }
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
                Upload Profile Image
              </Button>
            )}
          </UploadWidget>
        )}
        <Button variant='contained' fullWidth sx={buttonStyles}>
          Update Profile
        </Button>
        <Button
          component={RouterLink}
          to='/reset-password'
          variant='contained'
          fullWidth
          sx={buttonStyles}
        >
          Change Password
        </Button>
        {user?.role === 'farmer' && (
          <>
            <Button
              component={RouterLink}
              variant='contained'
              to='/create-product'
              fullWidth
              sx={buttonStyles}
            >
              Create product
            </Button>
            <Button
              component={RouterLink}
              variant='contained'
              to='/my-products'
              fullWidth
              sx={buttonStyles}
            >
              Manage products
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
