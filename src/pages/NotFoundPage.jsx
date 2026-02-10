import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';

const NotFoundPage = () => {
  const { setShowHeader, setShowFooter } = useAuth();

  useEffect(() => {
    setShowHeader(false);
    setShowFooter(false);
    return () => {
      setShowHeader(true);
      setShowFooter(true);
    };
  }, [setShowHeader, setShowFooter]);

  const navigate = useNavigate();
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-center p-4 bg-background'>
      <h1 className='text-9xl font-bold text-primary mb-4'>404</h1>
      <h2 className='text-2xl font-semibold mb-2 text-foreground'>Oops! The page you’re looking for doesn’t exist.</h2>
      <p className='text-muted-foreground mb-8 max-w-md'>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Button size='lg' onClick={() => navigate('/')} className='font-semibold'>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
