'use client';

import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export const Header = (): React.JSX.Element => {
  const { user } = useAuth();
  console.log(user);
  const pathName = usePathname();

  const hideAuthButtonPaths = ['/login', '/signup'];
  const showAuth = !hideAuthButtonPaths.includes(pathName);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button component="a" href="/" sx={{ backgroundColor: '#013220', color: '#ffffff' }}>
              ロゴ
            </Button>
          </Box>
          {showAuth ? (
            user ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <AccountCircleIcon />
                {user ? user.name : 'ユーザー情報取得中'}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="inherit" variant="outlined" href="/login">
                  ログイン
                </Button>
                <Button color="inherit" variant="outlined">
                  新規登録
                </Button>
              </Box>
            )
          ) : null}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
