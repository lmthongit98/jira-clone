import AddIcon from '@mui/icons-material/Add';
import { Box, Breadcrumbs, Button, Link } from '@mui/material';
import Loading from 'components/Loading';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProjectList from '../components/ProjectList';
import { getProjects } from '../projectSlice';
export default function ProjectManagement() {
  const dispatch = useDispatch();

  const { projects, loading } = useSelector((state) => state.projectReducer);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

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
        <NavLink to="/project/add">
          <Button variant="contained" color="primary">
            <AddIcon />
            Add new project
          </Button>
        </NavLink>
      </Box>
      <ProjectList projectList={projects} />
      {loading && <Loading />}
    </Box>
  );
}
