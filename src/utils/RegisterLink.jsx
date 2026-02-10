// RegisterLink.jsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function RegisterLink({ fullWidth = false }) {
  return (
    <Button asChild variant='outline' className={`font-semibold border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-500 hover:border-cyan-500 ${fullWidth ? 'w-full' : ''}`}>
      <Link to='/register'>Register</Link>
    </Button>
  );
}
