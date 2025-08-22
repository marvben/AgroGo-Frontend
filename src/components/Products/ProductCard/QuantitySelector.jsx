import { IconButton, Box, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useState } from 'react';

const QuantitySelector = () => {
  const [qty, setQty] = useState(1);

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => setQty(Math.max(1, qty - 1))} color='primary'>
        <Remove />
      </IconButton>
      <Typography mx={2}>{qty}</Typography>
      <IconButton onClick={() => setQty(qty + 1)} color='primary'>
        <Add />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
