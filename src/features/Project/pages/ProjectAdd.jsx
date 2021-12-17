import { Box, Container, LinearProgress } from '@mui/material';
import projectApi from 'api/projectApi';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ProjectForm from '../components/ProjectForm';

export default function ProjectBoard() {
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmitAddProject = async (values) => {
    try {
      setIsCreating(true);
      const data = await projectApi.createProject(values);
      toast.success('Created project successfully!');
    } catch (error) {
      toast.error('Fail to create project!');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Box>
      {isCreating && <LinearProgress />}
      <Container>
        <ProjectForm isCreating={isCreating} onSubmit={handleSubmitAddProject} />
      </Container>
    </Box>
  );
}
