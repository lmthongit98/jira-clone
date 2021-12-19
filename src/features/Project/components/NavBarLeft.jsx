import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import CommonDialog from 'components/CommonDialog';
import React, { useState } from 'react';
import TaskForm from './TaskForm';

export default function NavBarLeft() {
  const [openAddIssue, setOpenAddIssue] = useState(false);

  const handleClickAddIssue = () => {
    setOpenAddIssue(true);
  };

  return (
    <Box
      sx={{
        width: '64px',
        height: '100vh',
        backgroundColor: '#0747A6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& > div': {
          display: 'flex',
          flexDirection: 'column',
          '& > button': {
            color: '#fff',
          },
        },
      }}
    >
      <Box>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Tooltip title="Create issue" placement="right-end" arrow>
          <IconButton onClick={handleClickAddIssue}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Search issues" placement="right-end" arrow>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <Tooltip title="About" placement="right-start" arrow>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <CommonDialog title="Add a issue" maxWidth="md" open={openAddIssue} setOpen={setOpenAddIssue}>
        <TaskForm setOpen={setOpenAddIssue} />
      </CommonDialog>
    </Box>
  );
}
