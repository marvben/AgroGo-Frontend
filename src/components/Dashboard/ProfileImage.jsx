import { useState } from 'react';
import { useUI } from '../../context/UIContext/useUI';
import { Button } from '../../ui/button';
import { Loader2, X } from 'lucide-react';

const ProfileImage = ({ url, public_id, onRemove, user }) => {
  const [deletingId, setDeletingId] = useState(false);
  const { showError, showSuccess } = useUI();

  const handleDelete = async (public_id) => {
    try {
      setDeletingId(true);
      await onRemove(public_id);
      showSuccess('Image removed successfully');
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to delete image');
    } finally {
      setDeletingId(false);
    }
  };

  return (
    <div className='mb-4 flex flex-wrap gap-2'>
      <div className='relative w-48 h-48 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center group'>
        {/* Delete button */}
        <Button
          variant='destructive'
          size='icon'
          className='absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100'
          onClick={() => handleDelete(public_id)}
          disabled={deletingId}
        >
          {deletingId ? <Loader2 className='h-4 w-4 animate-spin' /> : <X className='h-4 w-4' />}
        </Button>

        {/* Image */}
        <img src={url} alt={`profile-image-${user?.name}`} className='w-full h-full object-cover' />
      </div>
    </div>
  );
};

export default ProfileImage;
