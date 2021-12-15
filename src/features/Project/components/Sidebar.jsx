import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Box sx={{ maxWidth: '100%', bgcolor: 'inherit' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="add">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Create project" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="list">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
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
              <ListItemText primary="Release" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Issue and filters" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
