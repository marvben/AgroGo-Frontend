import { TextField, MenuItem } from '@mui/material';
import { useAuth } from '../../../context/AuthContext/useAuth';
import { Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const ResetPassWordFields = ({
  inputStyles,
  userTypesList,
  register,
  errors,
}) => {
  const location = useLocation();
  const { setRole, hashTokenExpired } = useAuth();

  return location.search ? (
    <>
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
      {hashTokenExpired && (
        <Link
          component={RouterLink}
          to='/reset-password'
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
          Expired token. Get new password Link!
        </Link>
      )}
    </>
  ) : (
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
          <MenuItem key={idx} value={option} onClick={() => setRole(option)}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default ResetPassWordFields;
