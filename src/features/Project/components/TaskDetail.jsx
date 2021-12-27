import AddIcon from '@mui/icons-material/Add';
import AlbumIcon from '@mui/icons-material/Album';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Grid, IconButton, MenuItem, Select, Slider, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPriorities, getStatuses, getTaskTypes } from '../projectSlice';

export default function TaskDetail({ task }) {
  const dispatch = useDispatch();
  const { statuses, priorities, taskTypes } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch(getStatuses());
    dispatch(getPriorities());
    dispatch(getTaskTypes());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {task.taskTypeDetail.id === 1 && (
            <Tooltip title="Bug" placement="right-start" arrow>
              <AlbumIcon sx={{ color: '#e30f0f' }} />
            </Tooltip>
          )}
          {task.taskTypeDetail.id === 2 && (
            <Tooltip title="Bug" placement="right-start" arrow>
              <CheckBoxIcon sx={{ color: '#58a7f9' }} />
            </Tooltip>
          )}

          <Typography sx={{ ml: 1 }} variant="h6">
            {task.taskTypeDetail.id === 1 ? 'BUG' : 'TASK'} - {task.taskId}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SendOutlinedIcon sx={{ fontSize: '1rem' }} />
          <Typography sx={{ mr: 1 }}>Give Feedback</Typography>
          <IconButton>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {task.taskName}
          </Typography>
          <Box>
            <Typography sx={{ fontSize: '1.2rem' }}>Description</Typography>
            <Box
              sx={{ '&:hover': { backgroundColor: '#f4f5f7' } }}
              dangerouslySetInnerHTML={{ __html: task.description }}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ mb: 2 }}>
            <Typography>STATUS</Typography>
            <Select fullWidth value={task.statusId} size="small">
              {statuses.map((status) => (
                <MenuItem key={status.statusId} value={status.statusId}>
                  {status.statusName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography>ASSIGNEES</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {task.assigness.map((assignee, index) => (
                <Box
                  key={assignee.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E9EAF0',
                    mr: 1,
                    my: 1,
                    padding: '0.1rem',
                  }}
                >
                  <Box
                    key={assignee?.id}
                    component="img"
                    src={assignee.avatar}
                    alt={assignee.name}
                    height="35px"
                    sx={{ borderRadius: '50%', margin: '0 3px' }}
                  />
                  <Typography>{assignee.name}</Typography>
                  <IconButton>
                    <ClearOutlinedIcon />
                  </IconButton>
                </Box>
              ))}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton>
                  <AddIcon />
                </IconButton>
                <Typography>Add more</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography>PRIORITY</Typography>
            <Select fullWidth value={task.priorityTask.priorityId} size="small">
              {priorities.map((priority) => (
                <MenuItem key={priority.priorityId} value={priority.priorityId}>
                  {priority.priority}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography>ORIGINAL ESTIMATE (HOURS)</Typography>
            <TextField fullWidth value={task.originalEstimate} variant="outlined" size="small" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography>TIME TRACKING</Typography>
            <Box>
              <Slider
                value={task.timeTrackingSpent}
                max={task.timeTrackingSpent + task.timeTrackingRemaining}
                aria-label="Default"
                valueLabelDisplay="auto"
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">{task.timeTrackingSpent}h logged</Typography>
                <Typography variant="caption">{task.timeTrackingRemaining}h remaining</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', my: 1, mr: 1 }}>
              <Box sx={{ mr: 1 }}>
                <Typography variant="caption">Time spent</Typography>
                <TextField
                  fullWidth
                  value={task.timeTrackingSpent}
                  size="small"
                  type="number"
                  name="timeTrackingSpent"
                />
              </Box>
              <Box sx={{ ml: 1 }}>
                <Typography variant="caption">Time remaining</Typography>
                <TextField
                  fullWidth
                  value={task.timeTrackingRemaining}
                  size="small"
                  type="number"
                  name="timeTrackingRemaining"
                />
              </Box>
            </Box>
          </Box>
          <div style={{ color: '#929398' }}>Create at a month ago</div>
          <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
        </Grid>
      </Grid>
    </Box>
  );
}
