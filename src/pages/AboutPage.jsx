import InfoPageLayout from '../components/Layout/InfoPageLayout';

export default function AboutPage() {
  return (
    <InfoPageLayout title='About AgroGo'>
      <h5 className='text-xl font-semibold text-foreground mb-6'>Connecting Farms to Families</h5>
      <p className='text-base leading-relaxed mb-8'>
        AgroGo is on a mission to bridge the gap between rural farmers and urban consumers. We believe that everyone deserves access to fresh, high-quality food, and that farmers deserve fair
        compensation for their hard work.
      </p>

      <section className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight text-foreground mb-3'>Our Mission</h2>
        <p className='text-base leading-relaxed'>
          To empower local farmers by providing them with a direct marketplace to sell their harvest, reducing food waste and ensuring fresher produce for families across the nation.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight text-foreground mb-3'>Our Story</h2>
        <p className='text-base leading-relaxed mb-4'>
          Started in 2024, AgroGo was built to solve a critical problem: the massive disconnect in the agricultural supply chain. Farmers were losing up to 40% of their harvest due to lack of market
          access, while city dwellers were paying premium prices for stale produce.
        </p>
        <p className='text-base leading-relaxed'>
          We created a platform that builds trust through verification, secures payments for peace of mind, and handles logistics to ensure reliable delivery.
        </p>
      </section>

      <div className='my-8 p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/20'>
        <h3 className='font-bold text-primary mb-3 text-lg'>Impact so far:</h3>
        <ul className='list-disc pl-5 space-y-2 text-slate-300'>
          <li>Over 500+ Verified Farmers onboarded.</li>
          <li>10,000+ Happy families served.</li>
          <li>Reduced post-harvest loss by 25% for our partner farms.</li>
        </ul>
      </div>
    </InfoPageLayout>
  );
}
