import { Typography, Card, CardContent } from '@mui/material';

const AccountDetails = ({ user }) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant='h6'>Account Details</Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          textTransform={'capitalize'}
        >
          Username: {user?.username}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{ textTransform: 'capitalize' }}
        >
          Name: {user?.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Email: {user?.email}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Phone: {user?.phone}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Address: {user?.address}, {user?.city}, {user?.state},{user?.country}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Role:
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Email Verified: {user?.isEmailVerified ? 'Yes' : 'No'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Phone Verified: {user?.isPhoneVerified ? 'Yes' : 'No'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Fully Verified: {user?.isVerified ? 'Yes' : 'No'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
