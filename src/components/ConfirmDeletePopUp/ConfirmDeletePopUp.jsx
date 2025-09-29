import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ConfirmDeletePopUp = ({
  open,
  onClose,
  onConfirm,
  type = 'product',
  name,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {`Delete ${name.charAt(0).toUpperCase() + name.slice(1)}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to permanently delete this {type}? This action
          cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color='error'
          variant='contained'
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeletePopUp;
