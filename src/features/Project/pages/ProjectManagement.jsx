import AddIcon from '@mui/icons-material/Add';
import { Box, Breadcrumbs, Button, Link } from '@mui/material';
import projectApi from 'api/projectApi';
import CommonDialog from 'components/CommonDialog';
import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import { getProjects } from '../projectSlice';
export default function ProjectManagement() {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projectReducer);
  const [openAddProject, setOpenAddProject] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleSubmitFormAdd = async (values) => {
    try {
      setAddLoading(true);
      const data = await projectApi.createProject(values);
      toast.success('Created project successfully!');
      dispatch(getProjects());
      setOpenAddProject(false);
    } catch (error) {
      toast.error('Fail to create project!');
    } finally {
      setAddLoading(false);
    }
  };

  const handleClickAddProject = () => {
    setOpenAddProject(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Project
          </Link>
          <Link underline="hover" color="text.primary">
            Project management
          </Link>
        </Breadcrumbs>
        <Button onClick={handleClickAddProject} variant="contained" color="primary">
          <AddIcon />
          Add new project
        </Button>
      </Box>
      <ProjectList projectList={projects} />
      <CommonDialog title="Add a new project" maxWidth="lg" open={openAddProject} setOpen={setOpenAddProject}>
        <ProjectForm onSubmit={handleSubmitFormAdd} loading={addLoading} />
      </CommonDialog>
      {loading && <Loading />}
    </Box>
  );
}
