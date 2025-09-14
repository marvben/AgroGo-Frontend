// hooks/useSnackbar.js
import { useState } from 'react';

export default function useSnackbar() {
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });

  const showSuccess = (msg) => setSnack({ open: true, type: 'success', msg });
  const showError = (msg) => setSnack({ open: true, type: 'error', msg });

  return { snack, setSnack, showSuccess, showError };
}
