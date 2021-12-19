import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
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
import { NavLink } from 'react-router-dom';

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

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const { current } = useSelector((state) => state.userReducer);

  const handleOpenOrClose = () => {
    setOpen((open) => !open);
  };
  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      <Drawer sx={{ '& > div': { position: 'absolute', backgroundColor: '#F4F5F7' } }} variant="permanent" open={open}>
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
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="list">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsApplicationsOutlinedIcon sx={{ color: 'black' }} />
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
                  <LocalShippingOutlinedIcon sx={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Release" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FindInPageOutlinedIcon sx={{ color: 'black' }} />
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
                  <AssessmentOutlinedIcon sx={{ color: 'black' }} />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Drawer>
    </Box>
  );
}
