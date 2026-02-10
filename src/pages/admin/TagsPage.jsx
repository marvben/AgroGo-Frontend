import { Badge } from '@/components/ui/badge';

export default function TagsPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Tags</h1>
        <Badge variant='outline'>Coming Soon</Badge>
      </div>
      <div className='rounded-md border p-8 text-center text-muted-foreground'>Tag management will be implemented here.</div>
    </div>
  );
}
