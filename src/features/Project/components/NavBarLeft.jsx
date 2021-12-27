import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import taskApi from 'api/taskApi';
import CommonDialog from 'components/CommonDialog';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPriorities, getProjects, getStatuses, getTaskTypes } from '../projectSlice';
import TaskForm from './TaskForm';

export default function NavBarLeft() {
  const dispatch = useDispatch();
  const [openAddTask, setOpenAddTask] = useState(false);
  const { projects } = useSelector((state) => state.projectReducer);
  const { current } = useSelector((state) => state.userReducer);
  const [myProjects, setMyProjects] = useState([]);
  const { statuses, priorities, taskTypes } = useSelector((state) => state.projectReducer);
  const [task, setTask] = useState({
    listUserAsign: [],
    taskName: '',
    description: '',
    statusId: 0,
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: 0,
    typeId: 0,
    priorityId: 0,
  });

  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      statusId: statuses[0]?.statusId,
      priorityId: priorities[0]?.priorityId,
      typeId: taskTypes[0]?.id,
    }));
  }, [statuses, priorities, taskTypes]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    setMyProjects(projects.filter((project) => project.creator.id === current.id));
  }, [projects, current]);

  useEffect(() => {
    setTask((prevTask) => ({ ...prevTask, projectId: myProjects[0]?.id }));
  }, [myProjects]);

  useEffect(() => {
    dispatch(getStatuses());
    dispatch(getPriorities());
    dispatch(getTaskTypes());
  }, [dispatch]);

  const handleClickAddIssue = () => {
    setOpenAddTask(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      const data = await taskApi.createTask(values);
      toast.success('Created task successfully!');
      setOpenAddTask(false);
      return data;
    } catch (error) {
      console.log(error);
      toast.error('Fail to create task!');
    }
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
      <CommonDialog title="Add task" maxWidth="md" open={openAddTask} setOpen={setOpenAddTask}>
        {task.projectId && task.priorityId && task.statusId && task.typeId && (
          <TaskForm
            onSubmit={handleFormSubmit}
            setOpen={setOpenAddTask}
            initialValue={task}
            statuses={statuses}
            priorities={priorities}
            taskTypes={taskTypes}
            myProjects={myProjects}
          />
        )}
      </CommonDialog>
    </Box>
  );
}
