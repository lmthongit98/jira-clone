import { Box, Container, Typography } from '@mui/material';
import projectApi from 'api/projectApi';
import React, { useEffect, useState } from 'react';
import ProjectList from '../components/ProjectList';
export default function ProjectManagement() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await projectApi.getAllProject();
        setProjectList(data?.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box>
      <Container>
        <Typography component="h1" variant="h5">
          Project management
        </Typography>
        <ProjectList projectList={projectList} />
      </Container>
    </Box>
  );
}
