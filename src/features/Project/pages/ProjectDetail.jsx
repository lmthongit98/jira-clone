import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetailBoard from '../components/ProjectDetailBoard';
import ProjectDetailDesc from '../components/ProjectDetailDesc';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import useProjectDetail from '../hooks/useProjectDetail';

export default function ProjectDetail() {
  const { projectId } = useParams();

  const [project, loading] = useProjectDetail(projectId);

  return (
    <Box sx={{ paddingLeft: '2%' }}>
      <ProjectDetailHeader project={project} />
      <ProjectDetailDesc project={project} />
      <ProjectDetailBoard members={project?.members} taskList={project?.lstTask} />
    </Box>
  );
}
