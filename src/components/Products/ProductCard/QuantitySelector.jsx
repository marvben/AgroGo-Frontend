import { IconButton, Box, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useState } from 'react';

const QuantitySelector = () => {
  const [qty, setQty] = useState(1);

  return (
    <Box display='flex' alignItems='center'>
      <IconButton
        onClick={() => setQty(Math.max(1, qty - 1))}
        color='primary'
        sx={{ p: 0.5 }}
      >
        <Remove sx={{ fontSize: 18 }} />
      </IconButton>
      <Typography mx={1}>{qty}</Typography>
      <IconButton
        onClick={() => setQty(qty + 1)}
        color='primary'
        sx={{ p: 0.2 }}
      >
        <Add sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
