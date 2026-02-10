import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Landmark, Lock, Loader2 } from 'lucide-react';

const banks = [
  'Access Bank',
  'Citibank',
  'Ecobank',
  'Fidelity Bank',
  'First Bank',
  'FCMB',
  'GTBank',
  'Heritage Bank',
  'Keystone Bank',
  'Polaris Bank',
  'Stanbic IBTC',
  'Standard Chartered',
  'Sterling Bank',
  'Union Bank',
  'UBA',
  'Unity Bank',
  'Wema Bank',
  'Zenith Bank',
];

export default function BankAccountForm({ onSubmit, loading }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Landmark className='h-6 w-6 text-primary' />
          <CardTitle>Bank Payout Details</CardTitle>
        </div>
        <CardDescription>This is where we will send your money after you deliver products.</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className='mb-6 bg-primary/10 border-primary/20 text-primary'>
          <Lock className='h-4 w-4' />
          <AlertTitle>Secure & Private</AlertTitle>
          <AlertDescription>Bank details are encrypted and stored securely.</AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label>Select Bank</Label>
            <Controller
              name='bankName'
              control={control}
              rules={{ required: 'Please select your bank' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={errors.bankName ? 'border-destructive' : ''}>
                    <SelectValue placeholder='Select your bank' />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bankName && <p className='text-xs text-destructive'>{errors.bankName.message}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='accountNumber'>Account Number</Label>
            <Input
              id='accountNumber'
              type='tel'
              placeholder='0123456789'
              {...register('accountNumber', {
                required: 'Account number is required',
                minLength: { value: 10, message: 'Must be 10 digits' },
                maxLength: { value: 10, message: 'Must be 10 digits' },
              })}
              className={errors.accountNumber ? 'border-destructive' : ''}
            />
            {errors.accountNumber && <p className='text-xs text-destructive'>{errors.accountNumber.message}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='accountName'>Account Name</Label>
            <Input
              id='accountName'
              placeholder='As it appears on your bank card'
              {...register('accountName', { required: 'Account name is required' })}
              className={errors.accountName ? 'border-destructive' : ''}
            />
            {errors.accountName && <p className='text-xs text-destructive'>{errors.accountName.message}</p>}
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Saving...
              </>
            ) : (
              'Save Bank Details'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
