'use client';

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  showAuthButton?: boolean;
  user?: User;
};

export const Header = ({ showAuthButton = false, user }: Props): React.JSX.Element => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ロゴ
          </Typography>
          {showAuthButton && user ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <AccountCircleIcon />
              {user.name}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" variant="outlined">
                ログイン
              </Button>
              <Button color="inherit" variant="outlined">
                新規登録
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
