import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React from 'react';

export default function CommonDialog(props) {
  const { title, children, open, setOpen, maxWidth = 'sm' } = props;
  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">
        {title}
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
