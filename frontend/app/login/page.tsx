'use client';

import { LoginForm } from '@/components/Auth/Login';
import { Box, Typography } from '@mui/material';

const LoginPage = (): React.JSX.Element => {
  return (
    <Box sx={{ padding: 2, maxWidth: '960px', width: '100%', margin: '0 auto' }}>
      <Typography variant="h3" component="p" textAlign="center" sx={{ fontWeight: 'bold', mt: 4 }}>
        ログイン
      </Typography>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
