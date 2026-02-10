import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, ShieldCheck, Truck, Banknote } from 'lucide-react';
import { useState } from 'react';

export default function PaymentExplainer({ collapsed = false }) {
  const [isVisible, setIsVisible] = useState(!collapsed);

  const steps = [
    {
      icon: <Wallet className='h-8 w-8 text-blue-500' />,
      title: '1. Buyer Pays',
      desc: 'Buyer pays AgroGo. We hold the money safely.',
    },
    {
      icon: <ShieldCheck className='h-8 w-8 text-emerald-500' />,
      title: '2. We Confirm',
      desc: 'We tell you when it is safe to start packing.',
    },
    {
      icon: <Truck className='h-8 w-8 text-amber-500' />,
      title: '3. You Deliver',
      desc: 'Ship the product to the buyer.',
    },
    {
      icon: <Banknote className='h-8 w-8 text-green-600' />,
      title: '4. You Get Paid',
      desc: 'Money is sent directly to your bank account.',
    },
  ];

  if (!isVisible) {
    return (
      <Button variant='ghost' onClick={() => setIsVisible(true)} className='text-muted-foreground hover:text-foreground mb-4 pl-0'>
        How do payments work?
      </Button>
    );
  }

  return (
    <div className='mb-8 p-6 bg-slate-900 rounded-xl border border-slate-700 relative animate-in fade-in zoom-in-95 duration-300'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-bold text-white flex items-center gap-2'>
          <ShieldCheck className='text-blue-500 h-5 w-5' />
          How You Get Paid safely
        </h3>
        {collapsed && (
          <Button variant='ghost' size='sm' onClick={() => setIsVisible(false)} className='text-slate-400 hover:text-white'>
            Hide
          </Button>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {steps.map((step, index) => (
          <div key={index} className='bg-slate-950 p-4 rounded-lg flex flex-col md:items-center text-center gap-3 border border-slate-800'>
            <div className='p-2 bg-slate-800/50 rounded-full inline-flex items-center justify-center'>{step.icon}</div>
            <div>
              <h4 className='font-semibold text-slate-200 mb-1'>{step.title}</h4>
              <p className='text-sm text-slate-400 leading-snug'>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 p-3 bg-blue-500/10 rounded-lg border-l-4 border-blue-500'>
        <p className='text-sm text-blue-200'>
          <strong>AgroGo Platform Protection:</strong> We protect both you and the buyer. You are guaranteed to get paid for delivered goods.
        </p>
      </div>
    </div>
  );
}
