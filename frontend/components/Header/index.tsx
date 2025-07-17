'use client';

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

export const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ロゴ
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" variant="outlined">
              ログイン
            </Button>
            <Button color="inherit" variant="outlined">
              新規登録
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
