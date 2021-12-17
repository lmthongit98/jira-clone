import { Box, Container, LinearProgress } from '@mui/material';
import projectApi from 'api/projectApi';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProjectForm from '../components/ProjectForm';

export default function ProjectBoard() {
  const [projectCategories, setProjectCategories] = useState([]);
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

  useEffect(() => {
    let isSubscribe = true;
    try {
      (async () => {
        const { content } = await projectApi.getProjectCategory();
        isSubscribe && setProjectCategories(content);
      })();
    } catch (error) {
      console.log('Fail to get project category', error);
    }
    return () => (isSubscribe = false);
  }, []);

  return (
    <Box>
      {isCreating && <LinearProgress />}
      <Container>
        <ProjectForm isCreating={isCreating} projectCategories={projectCategories} onSubmit={handleSubmitAddProject} />
      </Container>
    </Box>
  );
}
