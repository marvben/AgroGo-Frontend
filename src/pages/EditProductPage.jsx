import ProductForm from '../components/Forms/ProductForms/ProductForm';
import { useAuth } from '../context/AuthContext/useAuth';
import { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EditProductPage() {
  const { login, user, userUrl } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, type: 'success', msg: '' });
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);

    const ok = await login(data); // expect login() returns user
    setLoading(false);
    if (ok) {
      navigate(userUrl);
    }
  };

  // If already logged in, redirect away
  if (user) return <Navigate to={userUrl} replace />;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0f172a',
      }}
    >
      <div className='w-full max-w-md bg-white p-6 rounded-2xl shadow-lg'>
        <ProductForm
          mode='create'
          onSubmit={handleLogin}
          loading={loading}
          title='Edith  product'
        />
      </div>

      <Snackbar
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
      </Snackbar>
    </Box>
  );
}
