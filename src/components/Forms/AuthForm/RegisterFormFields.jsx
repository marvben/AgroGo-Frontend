import {
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Link,
} from '@mui/material';
import ButtonSubmit from './ButtonSubmit';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const RegisterFormFields = ({
  inputStyles,
  register,
  errors,
  control,
  loading,
}) => {
  const roles = ['customer', 'farmer'];
  const [selectedRole, setSelectedRole] = useState('');
  const [stepBtnDisabled, setStepBtnDisabled] = useState(true);
  const [showOtherFields, setShowOtherFields] = useState(false);

  return (
    <>
      <Box sx={{ display: showOtherFields ? 'none' : 'block' }}>
        <Controller
          name='role'
          control={control}
          rules={{ required: 'Account type is required' }}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(e) => {
                field.onChange(e); // ✅ update react-hook-form
                setSelectedRole(e.target.value); // ✅ update local state
                setStepBtnDisabled(false);
              }}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                my: 3,
              }}
            >
              {roles.map((option, idx) => (
                <FormControlLabel
                  sx={{ m: 0 }}
                  key={idx}
                  value={option}
                  control={<Radio sx={{ display: 'none' }} />} // hide default radio
                  label={
                    <Box
                      sx={(theme) => ({
                        px: 3,
                        py: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor:
                          field.value === option ? '#16a34a' : '#1e293b', // green if selected, gray otherwise
                        color: field.value === option ? '#fff' : '#cbd5e1',
                        border:
                          field.value === option.role
                            ? '2px solid #16a34a'
                            : '2px solid #334155',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor:
                            field.value === option ? '#15803d' : '#334155',
                        },
                      })}
                    >
                      {option === 'customer'
                        ? "I'm sourcing products"
                        : "I'm selling my harvest"}
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          )}
        />

        <Button
          type='button'
          variant='contained'
          onClick={() => setShowOtherFields(true)}
          disabled={stepBtnDisabled}
          sx={{
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
            // 🔹 Custom disabled styling
            '&.Mui-disabled': {
              bgcolor: '#60a5fa', // lighter blue
              color: '#e2e8f0', // softer white/gray text
              opacity: 0.7, // more visible than default (which is ~0.5)
            },
          }}
        >
          {stepBtnDisabled ? 'Create Account' : `Join as a ${selectedRole}`}
        </Button>
      </Box>
      <Box sx={{ display: showOtherFields ? 'block' : 'none' }}>
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
        {/* <TextField
        select
        label='Account Type'
        defaultValue='customer'
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
      </TextField> */}
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
        {selectedRole === 'farmer' && (
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
        <ButtonSubmit loading={loading} text={`Register as ${selectedRole}`} />

        <Box mt={3} textAlign='center'>
          <Typography variant='body2' sx={{ color: '#cbd5e1' }}>
            Already have an account?
            <Link
              component={RouterLink}
              to='/login'
              sx={{
                color: '#3b82f6',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  color: '#60a5fa',
                },
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default RegisterFormFields;
