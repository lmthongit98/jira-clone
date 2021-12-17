import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import Loading from 'components/Loading';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectList from '../components/ProjectList';
import { getProjects } from '../projectSlice';
export default function ProjectManagement() {
  const dispatch = useDispatch();

  const { projects, loading } = useSelector((state) => state.projectReducer);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4">Projects</Typography>
        <Link to="/project/add">
          <Button variant="contained" color="primary">
            <AddIcon />
            Add new project
          </Button>
        </Link>
      </Box>
      <ProjectList projectList={projects} />
      {loading && <Loading />}
    </Box>
  );
}
