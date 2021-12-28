import AddIcon from '@mui/icons-material/Add';
import AlbumIcon from '@mui/icons-material/Album';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button, Grid, IconButton, MenuItem, Select, Slider, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import taskApi from 'api/taskApi';
import BackdropProgress from 'components/BackdropProgress';
import ConfirmDialog from 'components/ConfirmDialog';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPriorities, getProjectDetail, getStatuses, getTaskTypes } from '../projectSlice';

export default function TaskDetail({ task, setFullScreenDetailTask, setOpenDetailTask }) {
  const dispatch = useDispatch();
  const { statuses, priorities, taskTypes, projectDetail } = useSelector((state) => state.projectReducer);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isEditDesc, setEditDesc] = useState(false);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getStatuses());
    dispatch(getPriorities());
    dispatch(getTaskTypes());

    return () => dispatch(getProjectDetail(task.projectId));
  }, [dispatch, task.projectId]);

  const handleDeleteTask = () => {
    (async () => {
      try {
        const data = await taskApi.removeTask(task.taskId);
        setOpenDetailTask(false);
        dispatch(getProjectDetail(projectDetail.id));
        toast.success('Remove task successfully!');
      } catch (error) {
        toast.error('Fail to remove task!');
      }
    })();
  };

  const handleSaveDescription = () => {
    const updatedTask = {
      description,
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
        setLoading(true);
        const data = await taskApi.updateTask(updatedTask);
        dispatch(getProjectDetail(task.projectId));
        toast.success('Updated successfully!');
      } catch (error) {
        console.log(error);
        toast.error('Fail to update description!');
      } finally {
        setLoading(false);
      }
    })();
    setEditDesc(false);
  };

  const handleUpdateTask = (e) => {
    const { name, value } = e.target;
    const updatedTask = {
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
      [name]: value,
    };
    (async () => {
      try {
        const data = await taskApi.updateTask(updatedTask);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <Box>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SendOutlinedIcon sx={{ fontSize: '1rem' }} />
              <Typography sx={{ mx: 1 }}>Give Feedback</Typography>
            </Box>

            <IconButton onClick={() => setConfirmOpen(true)}>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton onClick={() => setFullScreenDetailTask((isFullScreen) => !isFullScreen)}>
              <OpenWithOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => setOpenDetailTask(false)}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={9} sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {task.taskName}
            </Typography>
            <Box>
              <Typography sx={{ fontSize: '1.2rem' }}>Description</Typography>
              {!isEditDesc && (
                <Box
                  onClick={() => setEditDesc(true)}
                  sx={{ '&:hover': { backgroundColor: '#f4f5f7' }, p: 1 }}
                  dangerouslySetInnerHTML={{ __html: task.description }}
                />
              )}
              {isEditDesc && (
                <Box sx={{ my: 1 }}>
                  <Editor
                    initialValue={task.description}
                    apiKey="088k00pywypmab32s73wfelfhll22yz3asentq9oq3vb46q0"
                    init={{
                      selector: 'textarea#myTextArea',
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
                    }}
                    onEditorChange={(content) => setDescription(content)}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Button onClick={handleSaveDescription} sx={{ mr: 2 }} variant="contained" color="primary">
                      Save
                    </Button>
                    <Button onClick={() => setEditDesc(false)} color="primary">
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ mb: 2 }}>
              <Typography>STATUS</Typography>
              <Select onChange={handleUpdateTask} name="statusId" fullWidth defaultValue={task.statusId} size="small">
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
              <Select
                onChange={handleUpdateTask}
                name="priorityId"
                fullWidth
                defaultValue={task.priorityTask.priorityId}
                size="small"
              >
                {priorities.map((priority) => (
                  <MenuItem key={priority.priorityId} value={priority.priorityId}>
                    {priority.priority}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>ORIGINAL ESTIMATE (HOURS)</Typography>
              <TextField
                onChange={handleUpdateTask}
                fullWidth
                name="originalEstimate"
                defaultValue={task.originalEstimate}
                type="number"
                variant="outlined"
                size="small"
              />
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
                    onChange={handleUpdateTask}
                    fullWidth
                    defaultValue={task.timeTrackingSpent}
                    size="small"
                    type="number"
                    name="timeTrackingSpent"
                  />
                </Box>
                <Box sx={{ ml: 1 }}>
                  <Typography variant="caption">Time remaining</Typography>
                  <TextField
                    onChange={handleUpdateTask}
                    fullWidth
                    defaultValue={task.timeTrackingRemaining}
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
      <ConfirmDialog title="Delete task?" open={confirmOpen} setOpen={setConfirmOpen} onConfirm={handleDeleteTask}>
        Are you sure you want to delete this task?
      </ConfirmDialog>
      <BackdropProgress isOpen={loading} />
    </>
  );
}
