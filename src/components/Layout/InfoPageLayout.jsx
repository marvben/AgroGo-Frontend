import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function InfoPageLayout({ title, children }) {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50 py-12'>
      <div className='container max-w-4xl mx-auto px-4'>
        <Button variant='ghost' className='mb-8 text-slate-400 hover:text-white hover:bg-slate-800 gap-2 pl-0' onClick={() => navigate(-1)}>
          <ArrowLeft className='h-4 w-4' /> Back
        </Button>

        <h1 className='text-4xl font-bold mb-8 text-primary'>{title}</h1>

        <div className='bg-slate-900 p-6 md:p-10 rounded-2xl border border-white/5 leading-relaxed shadow-xl'>
          <div className='prose prose-invert max-w-none text-slate-300'>{children}</div>
        </div>
      </div>
    </div>
  );
}
