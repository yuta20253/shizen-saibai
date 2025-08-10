'use client';

import { Box, IconButton } from '@mui/material';
import React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { usePathname } from 'next/navigation';

export const Footer = (): React.JSX.Element | null => {
  const pathName = usePathname();
  const hiddenPaths = ['/login', '/signup', '/mypage/diagnoses'];
  const hidden = hiddenPaths.includes(pathName);

  if (hidden) return null;

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 48,
        bgcolor: 'background.paper',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        px: 4,
        zIndex: 9999,
      }}
    >
      <IconButton
        size="large"
        sx={{
          position: 'absolute',
          top: -28,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'background.paper',
          width: 56,
          height: 56,
          borderRadius: '50%',
          boxShadow: 3,
          '&:hover': {
            bgcolor: 'background.paper',
          },
        }}
      >
        <CameraAltIcon sx={{ fontSize: '1.8rem' }} />
      </IconButton>
    </Box>
  );
};
