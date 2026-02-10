import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useUI } from '../../context/UIContext/useUI';

const ImagePreviewList = ({ images, onRemove }) => {
  const [deletingIds, setDeletingIds] = useState([]);
  const { showError, showSuccess } = useUI();

  const handleDelete = async (public_id) => {
    try {
      setDeletingIds((prev) => [...prev, public_id]);
      await onRemove(public_id);
      setDeletingIds((prev) => prev.filter((id) => id !== public_id));
      showSuccess('Image removed successfully');
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to delete image');
      setDeletingIds((prev) => prev.filter((id) => id !== public_id));
    }
  };

  return (
    <div className='flex flex-wrap gap-3 mb-4'>
      {images.map(({ secure_url, public_id }, index) => {
        if (!secure_url) return null;
        return (
          <div key={index} className='relative w-24 h-24 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center group'>
            {/* Delete button */}
            <Button
              variant='destructive'
              size='icon'
              className='absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
              onClick={() => handleDelete(public_id)}
            >
              {deletingIds.includes(public_id) ? <Loader2 className='h-3 w-3 animate-spin' /> : <X className='h-3 w-3' />}
            </Button>

            {/* Image */}
            <img src={secure_url} alt={`uploaded-${index}`} className='w-full h-full object-cover' />
          </div>
        );
      })}
    </div>
  );
};

export default ImagePreviewList;
