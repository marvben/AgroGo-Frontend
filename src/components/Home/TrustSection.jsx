import { ShieldCheck, Truck, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Quality',
    desc: 'Every product is vetted for freshness and organic standards.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Order today, get it delivered directly to your doorstep tomorrow.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: 'Not satisfied? We have a hassle-free return policy for you.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    desc: 'Our team is here to help you anytime, day or night.',
  },
];

const TrustSection = () => {
  return (
    <section className='py-24 bg-background border-t border-border/50'>
      <div className='container px-4 md:px-6'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground'>Why Choose AgroGo?</h2>
          <p className='text-muted-foreground mt-4 text-lg'>We are committed to revolutionizing the agricultural marketplace with trust, speed, and quality.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className='border-none shadow-none bg-transparent text-center group'>
                <CardContent className='p-0 flex flex-col items-center'>
                  <div className='h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <Icon className='h-8 w-8' />
                  </div>
                  <h3 className='font-semibold text-xl mb-3 text-foreground'>{feature.title}</h3>
                  <p className='text-muted-foreground leading-relaxed'>{feature.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
