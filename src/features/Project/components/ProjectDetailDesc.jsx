import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ProjectDetailDesc({ project }) {
  return (
    <Box component="section" sx={{ mt: 2 }}>
      <Typography component="h1" variant="h4">
        {project?.projectName}
      </Typography>
      <Box sx={{ backgroundColor: '#fbfbfb', p: 1 }} component="div">
        <Typography>Description</Typography>
        <Box
          sx={{ '&:hover': { backgroundColor: '#f4f5f7' }, p: 1 }}
          dangerouslySetInnerHTML={{ __html: project?.description }}
        />
      </Box>
    </Box>
  );
}
