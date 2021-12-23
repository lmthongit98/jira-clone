// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import AvatarGroup from './AvatarGroup';
import InputSearch from './InputSearch';
import TaskList from './TaskList';

export default function ProjectDetailBoard({ members, taskList = [] }) {
  return (
    <Box>
      <Typography sx={{ marginBottom: '20px' }} variant="h5">
        Board
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <InputSearch />
        <AvatarGroup members={members} />
        <Button sx={{ marginLeft: '20px', textAlign: 'center', lineHeight: '35px' }}>Only My Issues</Button>
        <Button sx={{ marginLeft: '20px', textAlign: 'center', lineHeight: '35px' }}>Recently Updated</Button>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        {taskList.map((taskListDetail, index) => (
          <Box
            key={index}
            sx={{
              width: '20rem',
              height: '25rem',
              marginRight: '10px',
              backgroundColor: '#f4f5f7',
              borderRadius: '0.2rem',
            }}
          >
            <Typography sx={{ color: '#5e6c84', p: 1 }}>{taskListDetail.statusName}</Typography>
            <TaskList taskList={taskListDetail?.lstTaskDeTail} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
