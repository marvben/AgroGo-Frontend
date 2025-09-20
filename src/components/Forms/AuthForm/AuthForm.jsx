import { useForm } from 'react-hook-form';
import AuthFormLayout from './AuthFormLayout';
import RegisterFormFields from './RegisterFormFields';
import LoginFormFields from './LoginFormFields';
import ResetPasswordFormFields from './ResetPasswordFormFields';

export default function AuthForm({ mode = 'login', onSubmit, loading }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

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
    <AuthFormLayout
      title={
        mode === 'login'
          ? 'Login'
          : mode === 'resetPassword'
          ? 'Reset Password'
          : 'Join as a farmer or buyer'
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>
        {mode === 'login' && (
          <LoginFormFields
            inputStyles={inputStyles}
            register={register}
            errors={errors}
            loading={loading}
          />
        )}
        {mode === 'register' && (
          <RegisterFormFields
            inputStyles={inputStyles}
            register={register}
            control={control}
            errors={errors}
            loading={loading}
          />
        )}
        {mode === 'resetPassword' && (
          <ResetPasswordFormFields
            inputStyles={inputStyles}
            register={register}
            errors={errors}
            loading={loading}
          />
        )}
      </form>
    </AuthFormLayout>
  );
}
