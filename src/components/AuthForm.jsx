import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth';
import AuthFormLayout from './AuthFormLayout';
import RegisterFormFields from './RegisterFormFields';
import LoginFormFields from './LoginFormFields';
import ButtonSubmit from './ButtonSubmit';

export default function AuthForm({ mode = 'login', onSubmit, loading }) {
  const { userType } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const userTypesList = ['farmer', 'buyer'];

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
        {mode === 'login' && (
          <LoginFormFields
            inputStyles={inputStyles}
            userTypesList={userTypesList}
            register={register}
            errors={errors}
          />
        )}

        {mode === 'register' && (
          <RegisterFormFields
            inputStyles={inputStyles}
            userTypesList={userTypesList}
            register={register}
            errors={errors}
          />
        )}

        <ButtonSubmit
          loading={loading}
          text={
            mode === 'login'
              ? `Login as ${userType}`
              : `Register as ${userType}`
          }
        />
      </form>
    </AuthFormLayout>
  );
}
