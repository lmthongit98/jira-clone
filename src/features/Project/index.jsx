import AddBoxIcon from '@mui/icons-material/AddBox';
import BugReportIcon from '@mui/icons-material/BugReport';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, ListItemButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function ProjectFeature() {
  const [open, setOpen] = useState(true);
  const { current } = useSelector((state) => state.userReducer);

  const handleOpenOrClose = () => {
    setOpen((open) => !open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h5" sx={{ mr: 5 }}>
            Jira clone
          </Typography>
          <IconButton onClick={handleOpenOrClose}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Box sx={{ minWidth: '56px' }}>
                  <Box
                    component="img"
                    src={current.avatar}
                    alt={current.name}
                    sx={{ borderRadius: '50%' }}
                    height="40px"
                  ></Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                  <ListItemText primary={current.name} />
                  <ListItemText primary={current.phoneNumber} />
                </Box>
              </ListItemButton>
            </ListItem>

            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="add">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddBoxIcon sx={{ color: 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="Create project" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="list">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon sx={{ color: 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="Project management" />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalShippingIcon sx={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Release" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalShippingIcon sx={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Release" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FindInPageIcon sx={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Pages" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FilterListIcon sx={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Issue and Filter" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BugReportIcon sx={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Bug and Report" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
