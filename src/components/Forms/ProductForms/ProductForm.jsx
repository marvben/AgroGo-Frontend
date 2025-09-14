// src/components/AuthFormLayout.jsx
import AddProductFormFields from './ProductFormFields';
import { useForm } from 'react-hook-form';
import { Box, Paper, Typography, Link } from '@mui/material';
import ButtonSubmit from '../AuthForm/ButtonSubmit';
import { keyframes } from '@mui/system';
import { useState } from 'react';

export default function ProductForm({
  mode = 'create',
  onSubmit,
  loading,
  title,
}) {
  // Animation for the card
  const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

  const inputStyles = {
    '& .MuiInputBase-input': {
      color: '#f8fafc',
    },
    '& .MuiFormLabel-root': {
      color: '#cbd5e1',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#334155' },
      '&:hover fieldset': { borderColor: '#3b82f6' },
      '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
    },
    '& .MuiInputBase-root.Mui-focused': {
      backgroundColor: '#0f172a', // background when focused
    },
    // Autofill overrides
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #0f172a inset', // background color
      WebkitTextFillColor: '#f8fafc', // text color
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '& input:-webkit-autofill:focus': {
      WebkitBoxShadow: '0 0 0 100px #0f172a inset',
      WebkitTextFillColor: '#f8fafc',
    },

    mb: 2,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100%'
        bgcolor='#0f172a'
        px={2}
        py={6}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
            borderRadius: 3,
            bgcolor: '#1e293b',
            border: '1px solid #334155',
            color: '#f8fafc',
            animation: `${fadeUp} 0.6s ease-out`, // card animation
          }}
        >
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ fontWeight: 600, textAlign: 'center', color: '#f1f5f9' }}
          >
            {title}
          </Typography>
          <AddProductFormFields
            inputStyles={inputStyles}
            register={register}
            errors={errors}
          />
          <ButtonSubmit text='Create Product' loading={loading} />
        </Paper>
      </Box>{' '}
    </form>
  );
}
