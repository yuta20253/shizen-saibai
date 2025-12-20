'use client';

import { Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ImageCaptureUploader } from '../ImageCaptureUploader';

export const Footer = (): React.JSX.Element | null => {
  const pathName = usePathname();
  const hiddenPaths = ['/login', '/signup', '/mypage/edit', '/mypage/delete', '/passwordreset'];
  const hidden = hiddenPaths.some(prefix => pathName.startsWith(prefix));
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerInput = () => inputRef.current?.click();

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
      <Box
        onClick={triggerInput}
        sx={{
          position: 'absolute',
          top: -36,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'background.paper',
          width: 60,
          height: 60,
          borderRadius: '50%',
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'grey.100',
          },
        }}
      >
        <CameraAltIcon sx={{ fontSize: 32 }} />
      </Box>
      <ImageCaptureUploader ref={inputRef} />
    </Box>
  );
};
