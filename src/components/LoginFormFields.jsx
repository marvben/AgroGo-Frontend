import { TextField, MenuItem } from '@mui/material';
import { useAuth } from '../context/useAuth';

const LoginFormFields = ({ inputStyles, userTypesList, register, errors }) => {
  const { setUserType } = useAuth();

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
        {userTypesList.map((option, idx) => (
          <MenuItem
            key={idx}
            value={option}
            onClick={() => setUserType(option)}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default LoginFormFields;
LoginFormFields;
