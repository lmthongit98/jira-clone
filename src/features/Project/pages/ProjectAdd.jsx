import { Box, Breadcrumbs, LinearProgress, Link } from '@mui/material';
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
    <Box sx={{ maxWidth: '1200px' }}>
      {isCreating && <LinearProgress />}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit">
          Project
        </Link>
        <Link underline="hover" color="text.primary">
          Create a new project
        </Link>
      </Breadcrumbs>
      <ProjectForm isCreating={isCreating} onSubmit={handleSubmitAddProject} />
    </Box>
  );
}
