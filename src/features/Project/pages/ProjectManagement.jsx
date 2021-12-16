import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material';
import Loading from 'components/Loading';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectList from '../components/ProjectList';
import { deleteProject, getProjects } from '../projectSlice';
export default function ProjectManagement() {
  const dispatch = useDispatch();

  const { projects, loading, deleteLoading } = useSelector((state) => state.projectReducer);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleDeleteProject = async (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <Box>
      <Container>
        <Typography component="h1" variant="h5">
          Project management
        </Typography>
        <ProjectList onDeleteProject={handleDeleteProject} projectList={projects} />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={deleteLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {loading && <Loading />}
      </Container>
    </Box>
  );
}
