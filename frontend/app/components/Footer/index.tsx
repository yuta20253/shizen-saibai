'use client';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Box } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ width: '100%', py: 2, textAlign: 'center', mt: 'auto' }}>
      <CameraAltIcon fontSize="large" />
    </Box>
  );
}
