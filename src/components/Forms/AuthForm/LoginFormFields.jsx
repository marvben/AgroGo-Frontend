import { TextField, MenuItem } from '@mui/material';

const LoginFormFields = ({ inputStyles, register, errors }) => {
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
    </>
  );
};

export default LoginFormFields;
