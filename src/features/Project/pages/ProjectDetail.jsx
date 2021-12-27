import { Box } from '@mui/material';
import BackdropProgress from 'components/BackdropProgress';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProjectDetailBoard from '../components/ProjectDetailBoard';
import ProjectDetailDesc from '../components/ProjectDetailDesc';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import { clearProjectDetail, getProjectDetail } from '../projectSlice';

export default function ProjectDetail() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const { projectDetail } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch(getProjectDetail(projectId));
    return () => dispatch(clearProjectDetail());
  }, [dispatch, projectId]);

  return (
    <Box sx={{ paddingLeft: '2%' }}>
      <ProjectDetailHeader project={projectDetail} />
      <ProjectDetailDesc project={projectDetail} />
      <ProjectDetailBoard members={projectDetail?.members} taskList={projectDetail?.lstTask} />
      <BackdropProgress isOpen={!projectDetail} />
    </Box>
  );
}
