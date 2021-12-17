import { Box } from '@mui/material';
import Loading from 'components/Loading';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      <ProjectList projectList={projects} />
      {loading && <Loading />}
    </Box>
  );
}
