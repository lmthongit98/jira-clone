import { Box, Container, Typography } from '@mui/material';
import projectApi from 'api/projectApi';
import React from 'react';
import ProjectForm from '../components/ProjectForm';

export default function ProjectBoard() {
  const handleSubmitAddProject = async (values) => {
    const data = await projectApi.createProject(values);
    console.log(data);
  };

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Create a new project
      </Typography>
      <Container>
        <ProjectForm onSubmit={handleSubmitAddProject} />
      </Container>
    </Box>
  );
}
