import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export default function BackdropProgress({ isOpen }) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
