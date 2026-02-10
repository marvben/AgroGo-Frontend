import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

export default function WizardStep({ currentStep, totalSteps, title, subtitle, onBack, children }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className='w-full animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* Progress Bar */}
      <div className='mb-8'>
        <div className='flex justify-between mb-2 text-xs uppercase tracking-wider font-semibold'>
          <span className='text-muted-foreground'>
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className='text-primary'>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className='h-2' />
      </div>

      {/* Header */}
      <div className='mb-6 text-center'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>{title}</h2>
        {subtitle && <p className='text-muted-foreground text-sm'>{subtitle}</p>}
      </div>

      {/* Content */}
      <div className='mb-8'>{children}</div>

      {/* Back Button */}
      {onBack && (
        <Button variant='ghost' onClick={onBack} className='text-muted-foreground hover:text-foreground pl-0 gap-2'>
          <ArrowLeft className='h-4 w-4' /> Back
        </Button>
      )}
    </div>
  );
}
