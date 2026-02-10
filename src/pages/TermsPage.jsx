import InfoPageLayout from '../components/Layout/InfoPageLayout';

export default function TermsPage() {
  return (
    <InfoPageLayout title='Terms of Service'>
      <p className='text-muted-foreground mb-8 text-sm'>Last Updated: February 2026</p>

      <div className='space-y-8'>
        <div>
          <p className='text-base leading-relaxed text-foreground/90'>
            By accessing or using the AgroGo platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use
            any services.
          </p>
        </div>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>1. Account Responsibilities</h2>
          <p className='text-base leading-relaxed text-foreground/90'>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. AgroGo reserves
            the right to terminate accounts, remove or edit content, or cancel orders at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>2. Buying and Selling</h2>
          <p className='text-base leading-relaxed text-foreground/90 mb-2'>
            <strong className='font-semibold'>Farmers:</strong> By listing products, you warrant that they are fresh, accurately described, and available for immediate delivery. You agree to process
            orders promptly.
          </p>
          <p className='text-base leading-relaxed text-foreground/90'>
            <strong className='font-semibold'>Buyers:</strong> You agree to pay for items purchased. You acknowledge that AgroGo holds payments in escrow until delivery is confirmed.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>3. Prohibited Items</h2>
          <p className='text-base leading-relaxed text-foreground/90'>
            The sale of illegal, unsafe, or non-agricultural products is strictly prohibited. We reserve the right to remove any listing that violates our policies.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>4. Termination</h2>
          <p className='text-base leading-relaxed text-foreground/90'>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
