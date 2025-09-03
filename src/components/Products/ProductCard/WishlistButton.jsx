import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function WishlistButton() {
  return (
    <IconButton
      sx={{
        bgcolor: '#1e293b',
        color: '#fff',
        borderRadius: 10,
        '&:hover': {
          boxShadow: '2px 2px 10px 3px rgba(0, 255, 255, 0.6)', // neon glow on hover
        },
      }}
    >
      <FavoriteBorderIcon sx={{ fontSize: 16 }} />
    </IconButton>
  );
}
