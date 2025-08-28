import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Card, CardContent, Box, Snackbar, Alert } from '@mui/material';
import API from '../api/axios';
import { useAuth } from '../context/useAuth';

export default function ImageUpload() {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { control, handleSubmit, reset } = useForm();
  const [profileImage, setProfileImage] = useState(
    user?.profileImageUrl?.secure_url || ''
  );
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });

  const handleImageAction = async (data, method = 'post') => {
    const formData = new FormData();
    formData.append('profileImage', data.image[0]); // matches multer field name

    try {
      const res = await API[method](
        `/api/${user.role}s/profileImage`,
        formData
      );

      setProfileImage(res.data);
      setSnack({
        open: true,
        type: 'success',
        msg: method === 'post' ? 'Upload successful' : 'Update successful',
      });
      reset();
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg: err.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const onUpload = (data) => handleImageAction(data, 'post');
  const onUpdate = (data) => handleImageAction(data, 'put');

  const onDelete = async () => {
    try {
      await API.delete(`/api/${user.role}s/profileImage`, {
        data: { public_id: user.profileImageUrl.public_id },
      });

      setProfileImage(null);
      setSnack({ open: true, type: 'success', msg: 'Delete successful' });
      reset();
    } catch (err) {
      setSnack({
        open: true,
        type: 'error',
        msg: err.response?.data || 'Delete failed',
      });
    }
  };

  return (
    <Card
      sx={{ maxWidth: '100%', margin: 'auto', mt: 5, p: 2, borderRadius: 3 }}
    >
      <CardContent>
        {/* Show current image if available */}
        {profileImage && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src={profileImage}
              alt='Profile'
              style={{ width: '120px', height: '120px', borderRadius: '50%' }}
            />
          </Box>
        )}

        <form onSubmit={handleSubmit(profileImage ? onUpdate : onUpload)}>
          <Controller
            name='image'
            control={control}
            rules={{ required: !profileImage }}
            render={({ field }) => (
              <input
                type='file'
                accept='image/*'
                onChange={(e) => field.onChange(e.target.files[0])}
              />
            )}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {/* Upload or Update button */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 600,
                bgcolor: '#3b82f6',
                color: '#f8fafc',
                '&:hover': {
                  bgcolor: '#60a5fa',
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {profileImage ? 'Change Profile Image' : 'Upload Profile Image'}
            </Button>

            {/* Delete button only if image exists */}
            {profileImage && (
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 600,
                  bgcolor: '#3b82f6',
                  color: '#f8fafc',
                  '&:hover': {
                    bgcolor: '#60a5fa',
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                Delete
              </Button>
            )}
          </Box>
        </form>
      </CardContent>
      {/* <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.type}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snack.msg}
        </Alert>
      </Snackbar> */}
    </Card>
  );
}
