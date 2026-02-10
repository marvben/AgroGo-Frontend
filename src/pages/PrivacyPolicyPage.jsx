import InfoPageLayout from '../components/Layout/InfoPageLayout';

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout title='Privacy Policy'>
      <p className='text-muted-foreground mb-8 text-sm'>Last Updated: February 2026</p>

      <div className='space-y-8'>
        <div>
          <p className='text-base leading-relaxed text-foreground/90'>
            Your privacy is important to us. It is AgroGo's policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
        </div>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>1. Information We Collect</h2>
          <p className='text-base leading-relaxed text-foreground/90'>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. This may include your name,
            email, phone number, and delivery address.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>2. Usage of Data</h2>
          <p className='text-base leading-relaxed text-foreground/90'>
            We use your data to process orders, manage deliveries, and improve your experience on our platform. verified farmers see delivery details only when an order is confirmed.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>3. Payment Security</h2>
          <p className='text-base leading-relaxed text-foreground/90'>
            We do not store your credit card details on our servers. All payments are processed securely through trusted third-party payment gateways (e.g., Paystack, Flutterwave) that adhere to
            PCI-DSS standards.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-bold tracking-tight mb-3 text-foreground'>4. Third-Party Sharing</h2>
          <p className='text-base leading-relaxed text-foreground/90'>
            We do not share any personally identifying information publicly or with third-parties, except when required to by law or to facilitate delivery logistics.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
