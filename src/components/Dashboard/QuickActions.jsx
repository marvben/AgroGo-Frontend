import { Link as RouterLink } from 'react-router-dom';
import UploadWidget from '../ImageUpload/UploadWidget/UploadWidget';
import { useUI } from '../../context/UIContext/useUI';
import { useAuth } from '../../context/AuthContext/useAuth';
import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '../../ui/card';
import { Upload, UserCog, Lock, Plus, PackageOpen, LayoutList, CreditCard } from 'lucide-react';
import ProfileImage from './ProfileImage';
import { deleteImageFromCloudinary } from '../../services/imageService';

export default function QuickActions({ user, sendNewProfileImage }) {
  const { showSuccess, showError } = useUI();
  const { uploadProfileImage, deleteProfileImage } = useAuth();
  const [image, setImage] = useState(user?.profileImage || { secure_url: '', public_id: '' });
  const [showUploadWidget, setShowUploadWidget] = useState(false);

  useEffect(() => {
    if (user?.profileImage?.secure_url) {
      setShowUploadWidget(false);
    } else {
      setShowUploadWidget(true);
    }
  }, [user?.profileImage?.secure_url]);

  const handleRemove = async (public_id) => {
    try {
      const res = await deleteImageFromCloudinary(public_id);
      if (res.data) {
        const ok = await deleteProfileImage();
        if (ok) {
          setShowUploadWidget(true);
          showSuccess('Image removed successfully');
          setImage({ secure_url: '', public_id: '' });
          sendNewProfileImage('');
        }
      }
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to delete image');
    }
  };

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-center'>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3 items-center'>
        {/* Image Upload Section */}
        <div className='w-full flex justify-center mb-4'>
          {!showUploadWidget ? (
            <ProfileImage url={image.secure_url || 'https://i.pravatar.cc/40'} public_id={image.public_id} onRemove={handleRemove} user={user} />
          ) : (
            <UploadWidget
              folderName={`Users/${user?.username}_${user?.id}`}
              resourceType='image'
              onUpload={async (error, result) => {
                if (!error && result.event === 'success') {
                  const uploadedFile = {
                    secure_url: result.info.secure_url,
                    public_id: result.info.public_id,
                  };

                  const res = await uploadProfileImage(uploadedFile);
                  if (res.success) {
                    setImage(res.profileImage);
                    showSuccess('Image added successfully');
                    setShowUploadWidget(false);
                    await sendNewProfileImage(res.profileImage.secure_url);
                  }
                } else {
                  showError('Upload failed. Please try again.');
                }
              }}
            >
              {({ open }) => (
                <Button onClick={() => (user ? open() : showError('Login required'))} className='w-full'>
                  <Upload className='mr-2 h-4 w-4' /> Upload Profile Image
                </Button>
              )}
            </UploadWidget>
          )}
        </div>

        {/* Action Buttons */}
        <div className='w-full space-y-3'>
          <Button variant='outline' className='w-full justify-start' asChild>
            <RouterLink to='/profile'>
              <UserCog className='mr-2 h-4 w-4 text-muted-foreground' /> Update Profile
            </RouterLink>
          </Button>

          <Button variant='outline' className='w-full justify-start' asChild>
            <RouterLink to='/reset-password'>
              <Lock className='mr-2 h-4 w-4 text-muted-foreground' /> Change Password
            </RouterLink>
          </Button>

          {user?.role === 'farmer' && (
            <>
              <Button className='w-full justify-start' asChild>
                <RouterLink to='/create-product'>
                  <Plus className='mr-2 h-4 w-4' /> Create Product
                </RouterLink>
              </Button>
              <Button variant='secondary' className='w-full justify-start' asChild>
                <RouterLink to='/my-products'>
                  <PackageOpen className='mr-2 h-4 w-4 text-muted-foreground' /> Manage Products
                </RouterLink>
              </Button>
              <Button variant='secondary' className='w-full justify-start border border-border' asChild>
                <RouterLink to='/bank-details'>
                  <CreditCard className='mr-2 h-4 w-4 text-muted-foreground' /> Payout Settings
                </RouterLink>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
