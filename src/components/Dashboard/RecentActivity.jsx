import { Typography, Card, CardContent } from '@mui/material';

export default function RecentActivity({ user }) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant='h6'>Recent Activity</Typography>
        <Typography variant='body2' color='text.secondary'>
          • Logged in from Chrome
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          • Updated email address
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          • Placed an order
        </Typography>
      </CardContent>
    </Card>
  );
}
