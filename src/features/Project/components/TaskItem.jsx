import AlbumIcon from '@mui/icons-material/Album';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import CommonDialog from 'components/CommonDialog';
import React, { useState } from 'react';
import TaskDetail from './TaskDetail';

export default function TaskItem({ task = {} }) {
  const [openDetailTask, setOpenDetailTask] = useState(false);
  const [fullScreenDetailTask, setFullScreenDetailTask] = useState(false);

  const handleTaskClick = () => {
    setOpenDetailTask(true);
  };

  return (
    <>
      <Box onClick={handleTaskClick}>
        <Paper sx={{ cursor: 'pointer', margin: '5px', p: 1 }}>
          <Typography sx={{ my: 1 }}>{task.taskName}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              {task.priorityTask?.priorityId === 1 && (
                <Tooltip title="High" placement="right-start" arrow>
                  <ArrowUpwardIcon sx={{ color: 'red' }} />
                </Tooltip>
              )}
              {task.priorityTask?.priorityId === 2 && (
                <Tooltip title="Medium" placement="right-start" arrow>
                  <DensityMediumIcon sx={{ color: 'orange' }} />
                </Tooltip>
              )}
              {task.priorityTask?.priorityId === 3 && (
                <Tooltip title="Low" placement="right-start" arrow>
                  <ArrowDownwardIcon color="primary" />
                </Tooltip>
              )}
              {task.priorityTask?.priorityId === 4 && (
                <Tooltip title="Lowest" placement="right-start" arrow>
                  <ArrowDownwardIcon sx={{ color: '#39b139' }} />
                </Tooltip>
              )}
              {task.taskTypeDetail?.id === 1 && (
                <Tooltip title="Bug" placement="right-start" arrow>
                  <AlbumIcon sx={{ color: '#e30f0f' }} />
                </Tooltip>
              )}
              {task.taskTypeDetail?.id === 2 && (
                <Tooltip title="Task" placement="right-start" arrow>
                  <CheckBoxIcon sx={{ color: '#58a7f9' }} />
                </Tooltip>
              )}
            </Box>
            <Box>
              <Box classes="avatar-group" sx={{ display: 'flex' }}>
                {task.assigness?.slice(0, 3).map((assignee) => (
                  <Tooltip key={assignee.id} title={assignee.name}>
                    <Box
                      component="img"
                      src={assignee.avatar}
                      alt={assignee.name}
                      height="25px"
                      sx={{ borderRadius: '50%', margin: '0 3px' }}
                    />
                  </Tooltip>
                ))}
                {task.assigness?.length > 3 ? (
                  <Box
                    component="div"
                    sx={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      backgroundColor: '#dfdfdf',
                      textAlign: 'center',
                      lineHeight: '20px',
                    }}
                  >
                    ...
                  </Box>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <CommonDialog
        fullScreen={fullScreenDetailTask}
        isShowTitle={false}
        maxWidth="lg"
        open={openDetailTask}
        setOpen={setOpenDetailTask}
      >
        <TaskDetail
          setFullScreenDetailTask={setFullScreenDetailTask}
          setOpenDetailTask={setOpenDetailTask}
          task={task}
        />
      </CommonDialog>
    </>
  );
}
