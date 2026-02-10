import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext/useAuth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { forgotPassword, resetPassword, resetExpireTime, checkUrlValidity, hashTokenExpired } = useAuth();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const params = location.search;
  const requestType = params ? 'patch' : 'post';

  const urlParams = new URLSearchParams(params);
  const getTokenParam = urlParams.get('resetToken');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const isResetLinkExpired = async () => {
      await checkUrlValidity(getTokenParam);
      await resetExpireTime();
    };

    if (getTokenParam) isResetLinkExpired();
  }, [getTokenParam, checkUrlValidity, resetExpireTime]);

  const handlePasswordReset = async (data) => {
    try {
      setLoading(true);
      setSuccessMessage('');

      let ok;
      if (requestType === 'post') {
        ok = await forgotPassword(data);
        if (ok) {
          setSuccessMessage('Check your email for the reset link.');
          // Optional: navigate after a delay or let them see the message
        }
      } else {
        ok = await resetPassword(data, getTokenParam);
        if (ok) navigate('/login');
      }

      setLoading(false);
    } catch (error) {
      console.error('Password reset failed');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950 px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>{requestType === 'post' ? 'Reset Password' : 'Set New Password'}</CardTitle>
          <CardDescription>{requestType === 'post' ? 'Enter your email to receive a password reset link.' : 'Enter your new password below.'}</CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className='mb-4 bg-green-500/10 text-green-500 border-green-500/20'>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(handlePasswordReset)} className='space-y-4'>
            {requestType === 'post' ? (
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='m@example.com' {...register('email', { required: 'Email is required' })} className={errors.email ? 'border-destructive' : ''} />
                {errors.email && <p className='text-xs text-destructive'>{errors.email.message}</p>}
              </div>
            ) : (
              <div className='space-y-2'>
                <Label htmlFor='password'>New Password</Label>
                <Input id='password' type='password' {...register('password', { required: 'Password is required' })} className={errors.password ? 'border-destructive' : ''} />
                {errors.password && <p className='text-xs text-destructive'>{errors.password.message}</p>}

                {hashTokenExpired && (
                  <div className='pt-2'>
                    <Link to='/reset-password' className='text-sm text-primary hover:underline'>
                      Expired token? Get a new link.
                    </Link>
                  </div>
                )}
              </div>
            )}

            <Button type='submit' className='w-full' disabled={loading}>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {requestType === 'post' ? 'Send Reset Link' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link to='/login' className='text-sm text-muted-foreground hover:text-primary flex items-center'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
