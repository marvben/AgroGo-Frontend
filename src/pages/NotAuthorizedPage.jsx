import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const NotAuthorizedPage = ({ description = 'You must be signed in to access this page.' }) => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(true);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-background text-foreground text-center p-4'>
      <ShieldAlert className='h-24 w-24 text-red-500 mb-6' />
      <h1 className='text-4xl font-bold mb-4'>🚫 Not Authorized</h1>
      <p className='text-muted-foreground text-lg mb-8 max-w-md'>{description}</p>

      {showButtons && (
        <div className='flex gap-4'>
          <Button size='lg' onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button variant='outline' size='lg' onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotAuthorizedPage;
