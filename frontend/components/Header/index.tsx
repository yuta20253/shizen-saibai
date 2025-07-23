'use client';

import AppBar from '@mui/material/AppBar';
import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#013220',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.75,
                cursor: 'pointer',
                width: '64px',
              }}
            >
              ロゴ
            </Link>
          </Box>
          {showAuth ? (
            user ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <AccountCircleIcon />
                {user.name}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button LinkComponent={Link} color="inherit" variant="outlined" href="/login">
                  ログイン
                </Button>
                <Button LinkComponent={Link} color="inherit" variant="outlined">
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
