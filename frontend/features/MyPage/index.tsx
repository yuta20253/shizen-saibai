'use client';

import { useAuth } from '@/context/AuthContext';
import { Box, Button, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { CameraAlt } from '@mui/icons-material';
import { RequireAuth } from '@/components/RequireAuth';

export const MyPageContent = (): React.JSX.Element | null => {
  const { user } = useAuth();

  const iconStyle = { position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' };

  const links = [
    {
      href: '/mypage/diagnoses',
      icon: <ArticleIcon sx={iconStyle} />,
      title: '診断結果一覧を見る',
    },
    {
      href: '/mypage/edit',
      icon: <EditIcon sx={iconStyle} />,
      title: 'ユーザー情報を編集する',
    },
    {
      href: '/logout',
      icon: <LogoutIcon sx={iconStyle} />,
      title: 'ログアウト',
    },
    {
      href: '/mypage/delete',
      icon: (
        <PersonOffIcon
          sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
        />
      ),
      title: '退会する',
    },
  ];

  return (
    <RequireAuth>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto',
          padding: 2,
        }}
      >
        <Box sx={{ gap: 2, padding: 2, mb: 3, width: '100%' }}>
          <Box sx={{ width: '100%', textAlign: 'center', p: 2 }}>
            <AccountCircleIcon sx={{ fontSize: '4rem' }} />
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h4">{user?.name}</Typography>
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h6">{user?.email}</Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center', mb: 3 }}>
          <Button
            sx={{
              width: '80%',
              backgroundColor: '#999999',
              color: '#ffffff',
              fontWeight: 'bold',
              p: 2,
              gap: 2,
            }}
          >
            <CameraAlt />
            <Typography variant="h6">雑草画像をアップロード</Typography>
          </Button>
          <Divider sx={{ mt: 2 }} />
        </Box>
        <Divider />
        {links.map((link, i) => (
          <Box key={i} sx={{ width: '100%', textAlign: 'center', mb: 3, px: 2 }}>
            <Link href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {link.icon}
                <Typography variant="h6">{link.title}</Typography>
              </Box>
            </Link>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
        <Divider sx={{ mt: 2 }} />
      </Box>
    </RequireAuth>
  );
};
