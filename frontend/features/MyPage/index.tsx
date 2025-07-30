'use client';

import { useAuth } from '@/context/AuthContext';
import { Box, Button, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { CameraAlt } from '@mui/icons-material';

export const MyPage = (): React.JSX.Element | null => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    if (!loading && (!user || !storedToken)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || !token) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        maxWidth: '960px',
        width: '100%',
        margin: '0 auto',
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
      <Box sx={{ width: '80%', textAlign: 'center', mb: 3 }}>
        <Link
          href="/mypage/diagnoses"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <ArticleIcon sx={{ fontSize: '2rem', display: 'flex', alignItems: 'flex-start' }} />
          <Typography variant="h6">診断結果一覧を見る</Typography>
        </Link>
        <Divider sx={{ mt: 2 }} />
      </Box>
      <Divider />
      <Box sx={{ width: '80%', textAlign: 'center', mb: 3 }}>
        <Link
          href="/mypage/edit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <EditIcon sx={{ fontSize: '2rem', display: 'flex', alignItems: 'flex-start' }} />
          <Typography variant="h6">ユーザー情報を編集する</Typography>
        </Link>
        <Divider sx={{ mt: 2 }} />
      </Box>
      <Divider />
      <Box sx={{ width: '80%', textAlign: 'center', mb: 3 }}>
        <Link
          href="/logout"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <LogoutIcon sx={{ fontSize: '2rem', display: 'flex', alignItems: 'flex-start' }} />
          <Typography variant="h6">ログアウト</Typography>
        </Link>
        <Divider sx={{ mt: 2 }} />
      </Box>
      <Divider />
      <Box sx={{ width: '80%', textAlign: 'center', mb: 3 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '8px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <PersonOffIcon sx={{ fontSize: '2rem', display: 'flex', alignItems: 'flex-start' }} />
          <Typography variant="h6">退会する</Typography>
        </Link>
        <Divider sx={{ mt: 2 }} />
      </Box>
    </Box>
  );
};
