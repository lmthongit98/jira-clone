import { Breadcrumbs, Link } from '@mui/material';
import React from 'react';

export default function ProjectDetailHeader({ project }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit">
        Project
      </Link>
      <Link underline="hover" color="inherit" to="/project/list">
        Project Management
      </Link>
      <Link underline="hover" color="text.primary">
        {project?.projectName}
      </Link>
    </Breadcrumbs>
  );
}
