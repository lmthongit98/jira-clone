import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material';
import projectApi from 'api/projectApi';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProjectList from '../components/ProjectList';
export default function ProjectManagement() {
  const [projectList, setProjectList] = useState([]);
  const [openBackdropLoading, setOpenBackdropLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribe = true;
    (async () => {
      try {
        setLoading(true);
        const data = await projectApi.getAllProject();
        if (isSubscribe) {
          setProjectList(data?.content);
        }
      } catch (error) {
        console.log(error);
      } finally {
        isSubscribe && setLoading(false);
      }
    })();
    return () => (isSubscribe = false);
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      setOpenBackdropLoading(true);
      const data = await projectApi.deleteProject(id);
      const deletedId = data.content?.[0];
      if (deletedId) {
        setProjectList((prevList) => prevList.filter((item) => item.id !== deletedId));
      }
      toast.success('Delete project successfully!');
    } catch (error) {
      console.log('Fail to delete project', error);
      toast.error('Fail to delete project');
    } finally {
      setOpenBackdropLoading(false);
    }
  };

  return (
    <Box>
      <Container>
        <Typography component="h1" variant="h5">
          Project management
        </Typography>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && <ProjectList onDeleteProject={handleDeleteProject} projectList={projectList} />}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdropLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Box>
  );
}
