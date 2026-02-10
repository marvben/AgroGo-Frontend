import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const QuantitySelector = () => {
  const [qty, setQty] = useState(1);

  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' size='icon' className='h-8 w-8' onClick={() => setQty(Math.max(1, qty - 1))}>
        <Minus className='h-4 w-4' />
      </Button>
      <span className='w-8 text-center font-medium'>{qty}</span>
      <Button variant='outline' size='icon' className='h-8 w-8' onClick={() => setQty(qty + 1)}>
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default QuantitySelector;
