import InfoPageLayout from '../components/Layout/InfoPageLayout';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <InfoPageLayout title='Contact Support'>
      <h5 className='text-xl font-semibold text-foreground mb-4'>We are here to help</h5>
      <p className='text-muted-foreground mb-8 text-base leading-relaxed'>Have a question about an order, payment, or your account? Our support team is available Mon-Fri, 9am - 6pm.</p>

      <div className='flex flex-col gap-6 mb-10'>
        <div className='flex items-center gap-4 p-4 bg-muted/50 rounded-lg'>
          <div className='p-3 bg-primary/10 rounded-full text-primary'>
            <Mail className='h-6 w-6' />
          </div>
          <div>
            <span className='text-sm text-muted-foreground font-medium uppercase tracking-wider'>Email Us</span>
            <p className='text-lg font-semibold text-foreground mt-0.5'>support@agrogo.com</p>
          </div>
        </div>

        <div className='flex items-center gap-4 p-4 bg-muted/50 rounded-lg'>
          <div className='p-3 bg-primary/10 rounded-full text-primary'>
            <Phone className='h-6 w-6' />
          </div>
          <div>
            <span className='text-sm text-muted-foreground font-medium uppercase tracking-wider'>Call Us</span>
            <p className='text-lg font-semibold text-foreground mt-0.5'>+234 800 AGRO GO</p>
          </div>
        </div>

        <div className='flex items-center gap-4 p-4 bg-muted/50 rounded-lg'>
          <div className='p-3 bg-primary/10 rounded-full text-primary'>
            <MapPin className='h-6 w-6' />
          </div>
          <div>
            <span className='text-sm text-muted-foreground font-medium uppercase tracking-wider'>Visit Us</span>
            <p className='text-lg font-semibold text-foreground mt-0.5'>123 Farm Road, Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      <div className='space-y-6'>
        <h2 className='text-2xl font-bold tracking-tight text-foreground'>Frequently Asked Questions</h2>

        <div>
          <h3 className='font-semibold text-foreground mb-2'>How do I become a verified farmer?</h3>
          <p className='text-muted-foreground text-sm leading-relaxed'>Upload a valid ID and complete your farm profile. Our team will verify your details within 48 hours.</p>
        </div>

        <div>
          <h3 className='font-semibold text-foreground mb-2'>Is my payment safe?</h3>
          <p className='text-muted-foreground text-sm leading-relaxed'>Yes. AgroGo holds your payment in a secure escrow account until you confirm you have received your order.</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
