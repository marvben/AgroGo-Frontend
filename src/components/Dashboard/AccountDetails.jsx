import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Mail, Phone, MapPin, User, Sprout } from 'lucide-react';
import TrustBadge from '../Common/TrustBadge';

export default function AccountDetails({ user }) {
  const isVerified = user?.isVerified;

  return (
    <Card className='h-full relative overflow-hidden'>
      <div className='absolute top-4 right-4'>
        {isVerified ? (
          <TrustBadge type='verified-farmer' />
        ) : (
          <Badge variant='outline' className='border-yellow-500 text-yellow-600 bg-yellow-50'>
            Pending Verification
          </Badge>
        )}
      </div>

      <CardHeader className='pb-2'>
        <div className='flex items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
            <User className='h-8 w-8' />
          </div>
          <div>
            <CardTitle className='text-xl'>{user.name}</CardTitle>
            <p className='text-sm text-muted-foreground'>
              @{user.username} • <span className='capitalize'>{user.role}</span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-6 pt-4'>
        <Separator />

        <div className='space-y-3'>
          <div className='flex items-center gap-3 text-sm'>
            <Mail className='h-4 w-4 text-muted-foreground' />
            <span>{user.email}</span>
          </div>
          <div className='flex items-center gap-3 text-sm'>
            <Phone className='h-4 w-4 text-muted-foreground' />
            <span>{user.phone || 'No phone added'}</span>
          </div>
          <div className='flex items-center gap-3 text-sm'>
            <MapPin className='h-4 w-4 text-muted-foreground' />
            <span>{user.address ? `${user.address}, ${user.city}, ${user.country}` : 'No address added'}</span>
          </div>
        </div>

        {user.role === 'farmer' && (
          <>
            <Separator />
            <div className='space-y-3'>
              <h4 className='font-semibold flex items-center gap-2 text-primary'>
                <Sprout className='h-4 w-4' /> Farm Details
              </h4>
              <div className='pl-4 border-l-2 border-border space-y-2 text-sm'>
                <p>
                  <span className='font-medium text-foreground'>Name:</span> <span className='text-muted-foreground'>{user.farmName || 'N/A'}</span>
                </p>
                <p>
                  <span className='font-medium text-foreground'>Type:</span> <span className='text-muted-foreground'>{user.farmType || 'N/A'}</span>
                </p>
                <p>
                  <span className='font-medium text-foreground'>Size:</span> <span className='text-muted-foreground'>{user.farmSize || 'N/A'}</span>
                </p>
                <p>
                  <span className='font-medium text-foreground'>Location:</span> <span className='text-muted-foreground'>{user.farmLocation || 'N/A'}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
