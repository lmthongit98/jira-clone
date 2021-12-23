import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import React from 'react';

export default function InputSearch() {
  return (
    <Box classes="search-block" sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        style={{
          height: '32px',
          width: '200px',
          backgroundColor: 'rgb(250, 251, 252)',
          border: '2px solid rgb(223, 225, 230)',
          borderRadius: '3px',
          paddingLeft: '32px',
        }}
      />
      <SearchIcon sx={{ position: 'absolute', left: '5%', top: '25%', color: ' #67748b' }} />
    </Box>
  );
}
