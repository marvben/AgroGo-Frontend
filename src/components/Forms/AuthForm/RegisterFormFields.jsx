import { TextField, MenuItem } from '@mui/material';
import { useAuth } from '../../../context/AuthContext/useAuth';

const RegisterFormFields = ({ inputStyles, roles, register, errors }) => {
  const { role, setRole } = useAuth();

  return (
    <>
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
      {/* Roles */}
      <TextField
        select
        label='Account Type'
        defaultValue='buyer'
        fullWidth
        margin='normal'
        {...register('role', { required: 'Account type is required' })}
        error={!!errors.role}
        helperText={errors.role?.message}
        sx={{
          ...inputStyles,
          '& .MuiInputBase-root': {
            backgroundColor: '#0f172a', // makes the select field white
          },
        }}
      >
        {roles.map((option, idx) => (
          <MenuItem key={idx} value={option} onClick={() => setRole(option)}>
            {option}
          </MenuItem>
        ))}
      </TextField>
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

      {/* Farm details */}
      {role === 'farmer' && (
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
    </>
  );
};

export default RegisterFormFields;
