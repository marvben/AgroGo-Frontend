import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import AuthFormLayout from './AuthFormLayout';

export default function AuthForm({ mode = 'login', onSubmit, loading }) {
  const { setUserType, userType } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userTypes = ['farmer', 'buyer'];

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

  return (
    <AuthFormLayout title={mode === 'login' ? 'Login' : 'Register'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Email'
          type='email'
          fullWidth
          margin='normal'
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={inputStyles}
        />
        <TextField
          label='Password'
          type='password'
          fullWidth
          margin='normal'
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={inputStyles}
        />
        {/* Role */}
        <TextField
          select
          label='Account Type'
          defaultValue='buyer'
          fullWidth
          margin='normal'
          {...register('userType', { required: 'Account type is required' })}
          error={!!errors.userType}
          helperText={errors.userType?.message}
          sx={{
            ...inputStyles,
            '& .MuiInputBase-root': {
              backgroundColor: '#0f172a', // makes the select field white
            },
          }}
        >
          {userTypes.map((option, idx) => (
            <MenuItem
              key={idx}
              value={option}
              onClick={() => setUserType(option)}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>

        {mode === 'register' && (
          <>
            <TextField
              label='Confirm Password'
              type='password'
              fullWidth
              {...register('confirmPassword', {
                required: 'Confirm your password',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={inputStyles}
            />
            <TextField
              label='Username'
              fullWidth
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={inputStyles}
            />
            <TextField
              label='Name'
              fullWidth
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={inputStyles}
            />
            <TextField
              label='Phone'
              type='tel'
              fullWidth
              {...register('phone', { required: 'Phone number is required' })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={inputStyles}
            />
            <TextField
              type='file'
              label='Profile Image'
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: 'image/*' }}
              fullWidth
              sx={{ ...inputStyles, mb: 3 }}
            />
            <TextField
              label='Address'
              fullWidth
              {...register('address', { required: 'Address is required' })}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={inputStyles}
            />
            <TextField
              label='City'
              fullWidth
              {...register('city', { required: 'City is required' })}
              error={!!errors.city}
              helperText={errors.city?.message}
              sx={inputStyles}
            />
            <TextField
              label='State'
              fullWidth
              {...register('state', { required: 'State is required' })}
              error={!!errors.state}
              helperText={errors.state?.message}
              sx={inputStyles}
            />
            <TextField
              label='Country'
              fullWidth
              {...register('country', { required: 'Country is required' })}
              error={!!errors.country}
              helperText={errors.country?.message}
              sx={inputStyles}
            />
          </>
        )}

        {/* Farm details */}
        {userType === 'farmer' && mode === 'register' && (
          <>
            <TextField
              label='Farm Name'
              fullWidth
              {...register('farmName', { required: 'Farm Name is required' })}
              error={!!errors.farmName}
              helperText={errors.farmName?.message}
              sx={inputStyles}
            />
            <TextField
              label='Farm Type'
              fullWidth
              {...register('farmType', { required: 'Farm Type is required' })}
              error={!!errors.farmType}
              helperText={errors.farmType?.message}
              sx={inputStyles}
            />
            <TextField
              label='Farm Size'
              fullWidth
              {...register('farmSize', { required: 'Farm Size is required' })}
              error={!!errors.farmSize}
              helperText={errors.farmSize?.message}
              sx={inputStyles}
            />
            <TextField
              label='Farm Location'
              fullWidth
              {...register('farmLocation', {
                required: 'Farm Location is required',
              })}
              error={!!errors.farmLocation}
              helperText={errors.farmLocation?.message}
              sx={inputStyles}
            />
            <TextField
              label='Farm Description'
              fullWidth
              {...register('farmDescription', {
                required: 'Farm Description is required',
              })}
              error={!!errors.farmDescription}
              helperText={errors.farmDescription?.message}
              sx={inputStyles}
            />
          </>
        )}

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
          {mode === 'login'
            ? `Login as ${userType}`
            : `Register as ${userType}`}
        </Button>
      </form>
    </AuthFormLayout>
  );
}
