import { Card, CardHeader, CardContent, CardTitle } from '../../ui/card';
import { History } from 'lucide-react';

export default function RecentActivity({ user }) {
  return (
    <Card className='h-full'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg flex items-center gap-2'>
          <History className='h-5 w-5 text-muted-foreground' />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
          <div className='flex items-start gap-2'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0' />
            <p>Logged in from Chrome</p>
          </div>
          <div className='flex items-start gap-2'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0' />
            <p>Updated email address</p>
          </div>
          <div className='flex items-start gap-2'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0' />
            <p>Placed an order</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
