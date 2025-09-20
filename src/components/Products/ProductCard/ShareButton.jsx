import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

export default function ShareButton() {
  return (
    <IconButton
      sx={{
        bgcolor: '#1e293b',
        color: '#fff',
        borderRadius: 10,
        '&:hover': {
          boxShadow: '2px 2px 10px 3px rgba(0, 255, 255, 0.6)',
        },
      }}
    >
      <ShareIcon sx={{ fontSize: 16 }} />
    </IconButton>
  );
}
