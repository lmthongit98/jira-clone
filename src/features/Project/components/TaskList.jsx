import { Box } from '@mui/material';
import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ taskList = [] }) {
  return (
    <Box sx={{ border: 'none', display: 'flex', flexDirection: 'column' }}>
      {taskList.map((task) => (
        <TaskItem key={task.taskId} task={task} />
      ))}
    </Box>
  );
}
