'use client';

import { useAuthState, useAuthActions } from '@/context/AuthContext';
import { Box, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { CameraAlt } from '@mui/icons-material';
import { RequireAuth } from '@/components/RequireAuth';
import { Fragment, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ImageCaptureUploader } from '@/components/ImageCaptureUploader';

export const MyPageContent = (): React.JSX.Element | null => {
  const { user } = useAuthState();
  const { logout } = useAuthActions();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const triggerInput = () => inputRef.current?.click();

  const iconStyle = { position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

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
      href: null,
      icon: <LogoutIcon sx={iconStyle} />,
      title: 'ログアウト',
      onClick: handleLogout,
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
          mt: 6,
          mb: 8,
        }}
      >
        <Box sx={{ gap: 2, mb: 3, width: '100%' }}>
          <Box sx={{ textAlign: 'center' }}>
            <AccountCircleIcon sx={{ fontSize: '4rem' }} />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">{user?.name}</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{user?.email}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            p: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#999',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderRadius: 1,
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={triggerInput}
          >
            <CameraAlt />
            <Typography variant="h6">雑草画像をアップロード</Typography>
          </Box>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <ImageCaptureUploader ref={inputRef} />
        {links.map((link, i) => (
          <Fragment key={i}>
            <Box sx={{ width: '100%', textAlign: 'center', p: 2 }}>
              {link.onClick ? (
                <Box style={{ textDecoration: 'none', color: 'inherit' }} onClick={link.onClick}>
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
                </Box>
              ) : (
                <Link href={link.href!} style={{ textDecoration: 'none', color: 'inherit' }}>
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
              )}
            </Box>
            <Divider sx={{ width: '100%' }} />
          </Fragment>
        ))}
      </Box>
    </RequireAuth>
  );
};
