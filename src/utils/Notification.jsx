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
    if (snack.open && snack.msg) {
      const messageContent = Array.isArray(snack.msg) ? (
        <ul className='list-disc pl-5 space-y-1 text-sm w-full break-words text-left'>
          {snack.msg.map((m, i) => (
            <li key={i} className='leading-snug'>
              {m}
            </li>
          ))}
        </ul>
      ) : (
        snack.msg
      );

      if (snack.type === 'error') {
        toast.error(messageContent);
      } else if (snack.type === 'success') {
        toast.success(messageContent);
      } else {
        toast(messageContent);
      }
      setSnack((s) => ({ ...s, open: false }));
    }
  }, [snack, setSnack]);

  return null; // Sonner's Toaster is at the root
};

export default Notification;
