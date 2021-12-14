import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router-dom';

const theme = createTheme();

export default function Auth() {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </Box>
  );
}
