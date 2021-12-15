import { Box, Container, LinearProgress, Typography } from '@mui/material';
import projectApi from 'api/projectApi';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProjectForm from '../components/ProjectForm';

export default function ProjectBoard() {
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

  const [projectCategories, setProjectCategories] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const { content } = await projectApi.getProjectCategory();
        setProjectCategories(content);
      })();
    } catch (error) {
      console.log('Fail to get project category', error);
    }
  }, []);

  return (
    <Box>
      {isCreating && <LinearProgress />}

      <Typography component="h1" variant="h5">
        Create a new project
      </Typography>
      <Container>
        <ProjectForm isCreating={isCreating} projectCategories={projectCategories} onSubmit={handleSubmitAddProject} />
      </Container>
    </Box>
  );
}
