import { Box } from '@mui/system';
import React from 'react';

export default function AvatarGroup({ members = [] }) {
  return (
    <Box
      classes="avatar-group"
      sx={{
        display: 'flex',
        marginLeft: '20px',
        '& > img': {
          width: '40px',
          border: '1px solid transparent',
          height: '40px',
          borderRadius: '50$',
        },
        '& > img > img': {
          width: '40px',
          border: '1px solid transparent',
          height: '40px',
          borderRadius: '50$',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {members.map((member) => (
          <Box
            key={member.userId}
            component="img"
            src={member.avatar}
            height="35px"
            alt={member.name}
            sx={{ borderRadius: '50%', margin: '0 3px' }}
          />
        ))}
      </Box>
    </Box>
  );
}
