import { Box, Container, Typography } from '@mui/material';
import BackdropProgress from 'components/BackdropProgress';
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
        <BackdropProgress isOpen={deleteLoading} />
        {loading && <Loading />}
      </Container>
    </Box>
  );
}
