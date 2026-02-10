// LoginLink.jsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LoginLink({ fullWidth = false }) {
  return (
    <Button asChild className={`font-semibold bg-blue-500 hover:bg-blue-600 text-white shadow-md ${fullWidth ? 'w-full' : ''}`}>
      <Link to='/login'>Login</Link>
    </Button>
  );
}
