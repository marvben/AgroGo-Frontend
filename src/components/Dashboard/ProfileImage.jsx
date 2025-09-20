import { Box, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useUI } from '../../context/UIContext/useUI';

const ProfileImage = ({ url, public_id, onRemove, user }) => {
  const [deletingId, setDeletingId] = useState(false);
  const { showError, showSuccess } = useUI();

  const handleDelete = async (public_id) => {
    try {
      setDeletingId(true);
      await onRemove(public_id);
      setDeletingId(false);
      showSuccess('Image removed successfully');
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to delete image');
      setDeletingId((prev) => prev.filter((id) => id !== public_id));
    }
  };

  return (
    <Box mb={2} display='flex' flexWrap='wrap' gap={1}>
      <Box
        sx={{
          width: 200,
          height: 200,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9',
          '&:hover .child-icon': {
            opacity: 1,
            transform: 'scale(1)', // optional: grow
          },
        }}
      >
        {/* Delete button */}
        <IconButton
          className='child-icon'
          onClick={() => handleDelete(public_id)}
          size='small'
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'rgba(240,0,0,0.9)',
            color: '#fff',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'scale(0)',
            opacity: 0,

            transition: 'all 0.4s ease',
            '&:hover': { backgroundColor: 'rgba(200,0,0,1)' },
          }}
        >
          {deletingId ? (
            <CircularProgress size={20} sx={{ color: '#fff' }} />
          ) : (
            <CloseIcon sx={{ fontSize: 20 }} />
          )}
        </IconButton>

        {/* Image */}
        <img
          src={url}
          alt={`profile-image-${user?.name}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfileImage;
