import { useAuth } from '@/context/AuthContext/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Edit, Tractor } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div className='p-8 text-center'>Loading profile...</div>;
  }

  return (
    <div className='max-w-4xl mx-auto space-y-8 pb-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Profile</h1>
          <p className='text-muted-foreground'>View your personal and account information.</p>
        </div>
        <Link to='/dashboard/settings'>
          <Button>
            <Edit className='mr-2 h-4 w-4' /> Edit Profile
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <Avatar className='h-24 w-24 border-4 border-muted'>
              <AvatarImage src={user?.profileImage?.secure_url} alt={user.name} />
              {console.log(user)}
              <AvatarFallback className='text-2xl'>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className='text-center md:text-left space-y-2 flex-1'>
              <div className='flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start'>
                <h2 className='text-2xl font-bold'>{user.name.toUpperCase() || 'User'}</h2>
                <Badge variant='outline' className='capitalize'>
                  {user.role}
                </Badge>
              </div>
              <p className='text-muted-foreground'>@{user.username}</p>
              <div className='flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground pt-1'>
                <div className='flex items-center gap-1'>
                  <Mail className='h-3.5 w-3.5' />
                  {user.email}
                </div>
                {user.phone && (
                  <div className='flex items-center gap-1'>
                    <Phone className='h-3.5 w-3.5' />
                    {user.phone}
                  </div>
                )}
                {(user.city || user.state) && (
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-3.5 w-3.5' />
                    {[user.city, user.state, user.country].filter(Boolean).join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <span className='font-medium text-muted-foreground'>Full Name:</span>
              <span>{user.name || '-'}</span>

              <span className='font-medium text-muted-foreground'>Username:</span>
              <span>@{user.username || '-'}</span>

              <span className='font-medium text-muted-foreground'>Email:</span>
              <span>{user.email}</span>

              <span className='font-medium text-muted-foreground'>Phone:</span>
              <span>{user.phone || '-'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <span className='font-medium text-muted-foreground'>Address:</span>
              <span className='break-words'>{user.address || '-'}</span>

              <span className='font-medium text-muted-foreground'>City:</span>
              <span>{user.city || '-'}</span>

              <span className='font-medium text-muted-foreground'>LGA:</span>
              <span>{user.lgas || '-'}</span>

              <span className='font-medium text-muted-foreground'>State:</span>
              <span>{user.state || '-'}</span>

              <span className='font-medium text-muted-foreground'>Country:</span>
              <span>{user.country || '-'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Farm Details - Only for Farmers */}
      {user.role === 'farmer' && (
        <Card>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Tractor className='h-5 w-5 text-green-600' />
              <CardTitle>Farm Details</CardTitle>
            </div>
            <CardDescription>Information about your agricultural operations.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='font-semibold text-lg mb-1'>{user.farmName || 'Farm Name Not Set'}</h3>
              <p className='text-sm text-muted-foreground'>{user.farmDescription || 'No description provided.'}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <div className='p-3 bg-muted/50 rounded-lg'>
                <span className='block font-medium text-muted-foreground mb-1'>Farm Type</span>

                <span>{user.farmType || '-'}</span>
              </div>
              <div className='p-3 bg-muted/50 rounded-lg'>
                <span className='block font-medium text-muted-foreground mb-1'>Farm Size</span>
                <span>{user.farmSize || '-'}</span>
              </div>
              <div className='p-3 bg-muted/50 rounded-lg'>
                <span className='block font-medium text-muted-foreground mb-1'>Location</span>
                <span>{user.farmLocation || '-'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
