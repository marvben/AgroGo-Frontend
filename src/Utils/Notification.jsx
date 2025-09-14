import { Box, Snackbar, Alert } from '@mui/material';

const Notification = ({ snack, setSnack }) => {
  return (
    <Snackbar
      open={snack.open}
      autoHideDuration={4000}
      onClose={() => setSnack((s) => ({ ...s, open: false }))}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        severity={snack.type}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {snack.msg}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
