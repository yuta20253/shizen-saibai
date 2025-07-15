'use client';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box, IconButton } from '@mui/material';

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 60,
          zIndex: 999,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="100%"
          height="60"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
              M0,0
              H35
              Q50,30 65,0
              H100
              V60
              H0
              Z
            "
            fill="#fff"
            stroke="#ccc"
            strokeWidth="1"
          />
        </svg>
      </Box>
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 56,
          backgroundColor: '#fff',
          zIndex: 998,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <IconButton
          sx={{
            width: 64,
            height: 64,
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            border: '4px solid #fff',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
        >
          <CameraAltIcon fontSize="medium" />
        </IconButton>
      </Box>
    </>
  );
}
