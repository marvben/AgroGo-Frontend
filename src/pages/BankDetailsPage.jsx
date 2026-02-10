import BankAccountForm from '../components/Forms/BankAccountForm/BankAccountForm';
import { useState } from 'react';
import { useUI } from '../context/UIContext/useUI';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BankDetailsPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useUI();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // TOD: Integrate with backend API
      console.log('Bank Details Submitted:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showSuccess('Bank details saved successfully');
      navigate('/dashboard');
    } catch (error) {
      showError('Failed to save bank details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-muted/30 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <Button variant='ghost' onClick={() => navigate('/dashboard')} className='mb-6 text-muted-foreground hover:text-primary pl-0 hover:bg-transparent'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Dashboard
        </Button>

        <BankAccountForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
