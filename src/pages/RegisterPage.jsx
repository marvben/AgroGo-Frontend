import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext/useAuth';
import { useUI } from '@/context/UIContext/useUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sprout, ShoppingBasket, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Role Selection, 2: Form
  const [selectedRole, setSelectedRole] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'customer',
    },
  });

  const password = watch('password');

  const onRoleSelect = (role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  const onContinue = () => {
    if (selectedRole) {
      setStep(2);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const success = await registerUser(data);
      if (success) {
        showSuccess('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Role Selection Card Component
  const RoleCard = ({ role, icon: Icon, title, description }) => (
    <div
      onClick={() => onRoleSelect(role)}
      className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:border-primary/50 hover:bg-accent ${
        selectedRole === role ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-card'
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className={`rounded-lg p-3 ${selectedRole === role ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          <Icon className='h-6 w-6' />
        </div>
        {selectedRole === role && <CheckCircle2 className='h-6 w-6 text-primary' />}
      </div>
      <h3 className='mt-4 font-semibold text-foreground'>{title}</h3>
      <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
    </div>
  );

  return (
    <div className='min-h-screen bg-muted/30 flex items-center justify-center p-4 py-8'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`w-full ${step === 1 ? 'max-w-3xl' : 'max-w-md'}`}>
        <Link to='/' className='inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Home
        </Link>

        {step === 2 && (
          <button
            onClick={() => {
              setStep(1);
              setSelectedRole(null);
              setTimeout(() => {
                reset({
                  name: '',
                  username: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  lgas: '',
                  state: '',
                  country: '',
                  role: 'owner',
                  password: '',
                  confirmPassword: '',
                  farmName: '',
                  farmType: '',
                  farmSize: '',
                  farmLocation: '',
                  farmDescription: '',
                });
              }, 0);
            }}
            className='block mb-4 text-sm text-muted-foreground hover:text-primary transition-colors'
          >
            &larr; Change Role
          </button>
        )}

        <Card className='border-border/50 shadow-xl bg-card overflow-hidden'>
          <AnimatePresence mode='wait'>
            {step === 1 ? (
              <motion.div key='step1' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className='p-8'>
                <div className='text-center mb-8'>
                  <h1 className='text-3xl font-bold tracking-tight mb-2'>Join AgroGo</h1>
                  <p className='text-muted-foreground'>Choose how you want to use the platform</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                  <RoleCard role='customer' icon={ShoppingBasket} title="I'm a Buyer" description='I want to browse and buy fresh produce directly from farmers.' />
                  <RoleCard role='farmer' icon={Sprout} title="I'm a Farmer" description='I want to sell my harvest and reach more customers.' />
                </div>

                <div className='text-center'>
                  <Button size='lg' onClick={onContinue} disabled={!selectedRole} className='w-full md:w-auto md:min-w-[200px]'>
                    {selectedRole ? 'Create Account' : 'Select a Role to Continue'}
                  </Button>
                  <p className='mt-4 text-sm text-muted-foreground'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-primary hover:underline font-medium'>
                      Log In
                    </Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div key='step2' initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className='p-6'>
                <div className='pb-6 text-center'>
                  <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary'>
                    {selectedRole === 'farmer' ? <Sprout className='h-6 w-6' /> : <ShoppingBasket className='h-6 w-6' />}
                  </div>
                  <h1 className='text-2xl font-bold tracking-tight'>Sign up as a {selectedRole === 'farmer' ? 'Farmer' : 'Buyer'}</h1>
                  <p className='text-sm text-muted-foreground mt-2'>Complete your profile to get started</p>
                </div>

                <CardContent className='p-0'>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' autoComplete='off'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Full Name</Label>
                        <Input
                          id='name'
                          placeholder='John Doe'
                          {...register('name', { required: 'Name is required' })}
                          className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.name && <p className='text-xs text-destructive'>{errors.name.message}</p>}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                          id='username'
                          placeholder='johndoe'
                          {...register('username', { required: 'Username is required' })}
                          className={errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.username && <p className='text-xs text-destructive'>{errors.username.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          placeholder='name@example.com'
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                          })}
                          className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.email && <p className='text-xs text-destructive'>{errors.email.message}</p>}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='phone'>Phone</Label>
                        <Input
                          id='phone'
                          placeholder='+234...'
                          {...register('phone', { required: 'Phone is required' })}
                          className={errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.phone && <p className='text-xs text-destructive'>{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='country'>Country</Label>
                        <Input
                          id='country'
                          placeholder='Country'
                          {...register('country', { required: 'Country is required' })}
                          className={errors.country ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.country && <p className='text-xs text-destructive'>{errors.country.message}</p>}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='state'>State</Label>
                        <Input
                          id='state'
                          placeholder='State'
                          {...register('state', { required: 'State is required' })}
                          className={errors.state ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.state && <p className='text-xs text-destructive'>{errors.state.message}</p>}
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='city'>City</Label>
                        <Input
                          id='city'
                          placeholder='City'
                          {...register('city', { required: 'City is required' })}
                          className={errors.city ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.city && <p className='text-xs text-destructive'>{errors.city.message}</p>}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='lgas'>Local Government</Label>
                        <Input id='lgas' placeholder='LGA' {...register('lgas', { required: 'LGA is required' })} className={errors.lgas ? 'border-destructive focus-visible:ring-destructive' : ''} />
                        {errors.lgas && <p className='text-xs text-destructive'>{errors.lgas.message}</p>}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='address'>Address</Label>
                      <Input
                        id='address'
                        placeholder='Full Address'
                        {...register('address', { required: 'Address is required' })}
                        className={errors.address ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {errors.address && <p className='text-xs text-destructive'>{errors.address.message}</p>}
                    </div>

                    {selectedRole === 'farmer' && (
                      <div className='space-y-4 border-t pt-4 mt-4'>
                        <h3 className='text-sm font-semibold'>Farm Details</h3>
                        <div className='space-y-2'>
                          <Label htmlFor='farmName'>Farm Name</Label>
                          <Input
                            id='farmName'
                            placeholder='Green Acres'
                            {...register('farmName', { required: 'Farm Name is required' })}
                            className={errors.farmName ? 'border-destructive focus-visible:ring-destructive' : ''}
                          />
                          {errors.farmName && <p className='text-xs text-destructive'>{errors.farmName.message}</p>}
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='farmType'>Farm Type</Label>
                            <Input id='farmType' placeholder='e.g. Crop, Livestock' {...register('farmType')} />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='farmSize'>Farm Size</Label>
                            <Input id='farmSize' placeholder='e.g. 50 Acres' {...register('farmSize')} />
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='farmLocation'>Farm Location</Label>
                          <Input id='farmLocation' placeholder='Farm Address (if different)' {...register('farmLocation')} />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='farmDescription'>Description</Label>
                          <Input id='farmDescription' placeholder='Short description of your farm' {...register('farmDescription')} />
                        </div>
                      </div>
                    )}

                    <div className='grid grid-cols-2 gap-4 pt-2'>
                      <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                          id='password'
                          type='password'
                          autoComplete='new-password'
                          placeholder='••••••••'
                          {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Min 6 characters' },
                          })}
                          className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.password && <p className='text-xs text-destructive'>{errors.password.message}</p>}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='confirmPassword'>Confirm</Label>
                        <Input
                          id='confirmPassword'
                          type='password'
                          autoComplete='new-password'
                          placeholder='••••••••'
                          {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: (value) => value === password || 'Passwords do not match',
                          })}
                          className={errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {errors.confirmPassword && <p className='text-xs text-destructive'>{errors.confirmPassword.message}</p>}
                      </div>
                    </div>

                    <Button type='submit' className='w-full' disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Creating account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </CardContent>

                <div className='pt-6 text-center text-sm'>
                  <span className='text-muted-foreground'>Already have an account? </span>
                  <Link to='/login' className='text-primary hover:underline font-medium'>
                    Sign in
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
