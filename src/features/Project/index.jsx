import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBarLeft from './components/NavBarLeft';
import SideBar from './components/SideBar';

export default function ProjectFeature() {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBarLeft />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
