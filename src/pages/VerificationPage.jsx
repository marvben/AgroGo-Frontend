// src/pages/VerifyCode.jsx
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Loader from '../utils/Loader';
import { useAuth } from '../context/AuthContext/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function VerifyCode() {
  const { user, role, userUrl, verifyEmail, getEmailNewVerificationCode, loading } = useAuth();
  const [showCode, setShowCode] = useState(false);
  const [pageTitle, setPageTitle] = useState('Verify Code');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { code: '' },
  });

  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (user?.isEmailVerified) {
    return <Navigate to={userUrl} replace />;
  }

  const onSubmit = async ({ code }) => {
    setPageTitle('Verifying Code...');
    const ok = await verifyEmail(code.trim());
    if (ok) {
      navigate(userUrl);
      reset();
    }
  };

  const getNewCode = async () => {
    setPageTitle('Sending New Code...');
    const ok = await getEmailNewVerificationCode();

    if (ok) {
      setPageTitle('Code Sent');
    } else {
      throw new Error('Failed to get new code');
    }
  };

  if (user?.isVerified) return <Navigate to={userUrl} replace />;

  return (
    <div className='min-h-screen bg-slate-900 flex flex-col'>
      {/* Top Bar */}
      <div className='bg-slate-800 border-b border-slate-700 sticky top-0 z-10'>
        <div className='container mx-auto px-4 h-16 flex items-center'>
          <h1 className='text-lg font-semibold text-white'>Verify Code</h1>
        </div>
      </div>

      {/* Centered Card */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <Card className='w-full max-w-md bg-slate-800 border-slate-700 text-white shadow-xl'>
          <CardHeader>
            <CardTitle>{user.isVerified ? 'Your account is verified' : pageTitle}</CardTitle>
            <CardDescription className='text-slate-300'>
              {user.isVerified
                ? 'You can now access your dashboard.'
                : 'Please check your email for the verification code and enter it below. If you did not receive a code, please check your spam folder.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.isVerified ? (
              <Button asChild className='w-full' size='lg'>
                <Link to={`/${role}`}>Go to Dashboard</Link>
              </Button>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='code' className='text-slate-200'>
                    Verification Code
                  </Label>
                  <div className='relative'>
                    <Input
                      id='code'
                      type={showCode ? 'text' : 'password'}
                      placeholder='Enter code'
                      className='bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 pr-10'
                      {...register('code', { required: 'Code is required' })}
                    />
                    <button type='button' onClick={() => setShowCode(!showCode)} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white'>
                      {showCode ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                  </div>
                  {errors.code && <p className='text-sm text-red-400'>{errors.code.message}</p>}
                </div>

                <Button type='submit' className='w-full bg-green-700 hover:bg-green-800 text-white font-semibold' disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Verifying...
                    </>
                  ) : (
                    'Verify'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          {!user.isVerified && (
            <CardFooter>
              <Button variant='ghost' className='w-full text-blue-400 hover:text-blue-300 hover:bg-slate-700/50' onClick={getNewCode} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Get new code'}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
