import ProductForm from '../components/Forms/ProductForms/ProductForm';
import { useProduct } from '../context/ProductContext/useProduct';
import { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CreateProductPage() {
  const { addProduct } = useProduct();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateProduct = async (data) => {
    setLoading(true);
    console.log(data);
    // const ok = await addProduct(data); // expect login() returns user
    // setLoading(false);
    // if (ok) {
    //   navigate('/my-products');
    // }
  };

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
          onSubmit={handleCreateProduct}
          loading={loading}
          title='Create a new product'
        />
      </div>
    </Box>
  );
}
