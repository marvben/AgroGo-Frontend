// Notification.jsx
// This component was using MUI Snackbar.
// We have migrated to 'sonner' for notifications globally (see App.jsx).
// This component should ideally be removed and replaced with direct toast() calls.
// For now, we'll make it a no-op or a wrapper if used for legacy compatibility,
// but since we are refactoring, let's just expose a dummy or encourage removal.

// Actually, let's make it use sonner if it's still being rendered.
import { toast } from 'sonner';
import { useEffect } from 'react';

const Notification = ({ snack, setSnack }) => {
  useEffect(() => {
    if (snack.open) {
      if (snack.type === 'error') {
        toast.error(snack.msg);
      } else if (snack.type === 'success') {
        toast.success(snack.msg);
      } else {
        toast(snack.msg);
      }
      // Close the internal state immediately so it doesn't loop
      setSnack((s) => ({ ...s, open: false }));
    }
  }, [snack, setSnack]);

  return null; // Sonner's Toaster is at the root
};

export default Notification;
