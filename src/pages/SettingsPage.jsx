import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext/useAuth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Upload } from 'lucide-react';
import { updateProfile } from '@/services/authService';
import { uploadProfileImage } from '@/services/imageService';

export default function SettingsPage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    lgas: '',
    state: '',
    country: '',
    farmName: '',
    farmDescription: '',
    farmLocation: '',
    farmSize: '',
    farmType: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        lgas: user.lgas || '',
        state: user.state || '',
        country: user.country || '',
        farmName: user.farmName || '',
        farmDescription: user.farmDescription || '',
        farmLocation: user.farmLocation || '',
        farmSize: user.farmSize || '',
        farmType: user.farmType || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData };
      // Service call
      const { data } = await updateProfile(payload);

      if (data) {
        toast.success('Profile updated successfully');
        // Update local user context
        setUser(data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const payload = { image: reader.result };
        const { data } = await uploadProfileImage(payload);

        if (data) {
          toast.success('Profile image updated');
          // If the response contains the updated user or image url, update context
          // According to routes: res.json({ message, profileImage })
          // We might need to manually update just the image in the user object
          if (data.profileImage && user) {
            setUser({ ...user, profileImage: data.profileImage });
          }
        }
      } catch (error) {
        toast.error('Failed to upload image');
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div className='max-w-4xl mx-auto space-y-8 pb-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
          <p className='text-muted-foreground'>Manage your account settings and preferences.</p>
        </div>
      </div>

      <Tabs defaultValue='profile' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='location'>Location</TabsTrigger>
          {user?.role === 'farmer' && <TabsTrigger value='farm'>Farm Details</TabsTrigger>}
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value='profile' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-6'>
                  <Avatar className='h-24 w-24'>
                    <AvatarImage src={user?.profileImage?.secure_url} />
                    <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1'>
                    <Label
                      htmlFor='image-upload'
                      className='cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2'
                    >
                      {uploading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Upload className='mr-2 h-4 w-4' />}
                      Change Avatar
                    </Label>
                    <Input id='image-upload' type='file' accept='image/*' className='hidden' onChange={handleImageUpload} disabled={uploading} />
                    <p className='text-xs text-muted-foreground'>JPG, GIF or PNG. Max 2MB.</p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input id='name' value={formData.name} onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='username'>Username</Label>
                    <Input id='username' value={formData.username} onChange={handleChange} />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' value={formData.email} onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input id='phone' value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='location' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
                <CardDescription>Help us know where you are located.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Textarea id='address' value={formData.address} onChange={handleChange} rows={3} />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input id='city' value={formData.city} onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lgas'>LGA</Label>
                    <Input id='lgas' value={formData.lgas} onChange={handleChange} />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='state'>State</Label>
                    <Input id='state' value={formData.state} onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='country'>Country</Label>
                    <Input id='country' value={formData.country} onChange={handleChange} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user?.role === 'farmer' && (
            <TabsContent value='farm' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Farm Information</CardTitle>
                  <CardDescription>Tell us about your farm.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='farmName'>Farm Name</Label>
                    <Input id='farmName' value={formData.farmName} onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='farmDescription'>Description</Label>
                    <Textarea id='farmDescription' value={formData.farmDescription} onChange={handleChange} rows={4} />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='farmType'>Farm Type</Label>
                      <Input id='farmType' value={formData.farmType} placeholder='e.g., Crop, Livestock' onChange={handleChange} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='farmSize'>Farm Size</Label>
                      <Input id='farmSize' value={formData.farmSize} placeholder='e.g., 50 Acres' onChange={handleChange} />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='farmLocation'>Farm Location</Label>
                    <Input id='farmLocation' value={formData.farmLocation} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <div className='flex justify-end mt-6'>
            <Button type='submit' disabled={loading} size='lg'>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              Save Changes
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
