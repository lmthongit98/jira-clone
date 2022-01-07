// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import AvatarGroup from './AvatarGroup';
import InputSearch from './InputSearch';
import TaskList from './TaskList';
import { applyDrag } from 'utils/dragDrop';
import { useDispatch } from 'react-redux';
import { updateTaskListDetail } from '../projectSlice';
import taskApi from 'api/taskApi';

export default function ProjectDetailBoard({ members, taskList = [] }) {
  const dispatch = useDispatch();

  const handleUpdateTask = (task) => {
    const taskToUpdate = {
      description: task.description,
      listUserAsign: task.assigness?.map((user) => user.id),
      taskId: task.taskId,
      taskName: task.taskName,
      statusId: task.statusId,
      originalEstimate: task.originalEstimate,
      timeTrackingSpent: task.timeTrackingSpent,
      timeTrackingRemaining: task.timeTrackingRemaining,
      projectId: task.projectId,
      typeId: task.taskTypeDetail.id,
      priorityId: task.priorityTask.priorityId,
    };
    (async () => {
      try {
        const data = await taskApi.updateTask(taskToUpdate);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let currentColumn = taskList.find((column) => column.statusId === columnId);
      const newTaskListOfColumn = applyDrag(currentColumn.lstTaskDeTail, dropResult);
      dispatch(updateTaskListDetail({ columnId, newTaskListOfColumn }));
      if (dropResult.addedIndex !== null) {
        const taskToUpdate = { ...dropResult.payload, statusId: columnId };
        handleUpdateTask(taskToUpdate);
      }
    }
  };

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
              minHeight: '25rem',
              marginRight: '10px',
              backgroundColor: '#f4f5f7',
              borderRadius: '0.2rem',
            }}
          >
            <Typography sx={{ color: '#5e6c84', p: 1 }}>{taskListDetail.statusName}</Typography>
            <TaskList
              columnId={taskListDetail.statusId}
              onCardDrop={onCardDrop}
              taskList={taskListDetail?.lstTaskDeTail}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
