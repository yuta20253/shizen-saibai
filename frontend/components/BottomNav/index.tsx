'use client';

import { Box, Paper, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, JSX } from 'react';
import { useAuthState } from '@/context/AuthContext';
import {
  ImageCaptureUploader,
  type ImageCaptureUploaderHandle,
} from '@/components/ImageCaptureUploader';

const HIDE_PATHS = ['/login', '/signup', '/mypage/edit', '/mypage/delete'];
const HIDE_PREFIXES = ['/password'];

type Item = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const LEFT: Item[] = [
  { href: '/', label: 'ホーム', icon: <HomeRoundedIcon /> },
  { href: '/mypage/diagnoses', label: 'りれき', icon: <HistoryRoundedIcon /> },
];
const RIGHT: Item[] = [{ href: '/mypage', label: 'マイページ', icon: <PersonRoundedIcon /> }];

const isActive = (pathname: string, href: string): boolean =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);

/** ログイン後の主導線。下部固定タブ＋中央の浮き出し「診断する」ボタン。 */
export const BottomNav = (): JSX.Element | null => {
  const pathname = usePathname();
  const { user } = useAuthState();
  const uploaderRef = useRef<ImageCaptureUploaderHandle>(null);

  const hidden =
    !user || HIDE_PATHS.includes(pathname) || HIDE_PREFIXES.some(p => pathname.startsWith(p));
  if (hidden) return null;

  const triggerDiagnose = () => uploaderRef.current?.open();

  return (
    <Paper
      component="nav"
      aria-label="メインナビゲーション"
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(64px + env(safe-area-inset-bottom))',
        pb: 'env(safe-area-inset-bottom)',
        borderTop: '1px solid rgba(43, 43, 39, 0.1)',
        bgcolor: 'background.paper',
        zIndex: 1200,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 88px 1fr',
        alignItems: 'center',
      }}
    >
      {LEFT.map(item => (
        <NavTab key={item.href} item={item} active={isActive(pathname, item.href)} />
      ))}

      {/* 中央: 診断する（浮き出し） */}
      <Box sx={{ display: 'grid', placeItems: 'center', position: 'relative' }}>
        <Box
          component="button"
          onClick={triggerDiagnose}
          aria-label="雑草を撮って診断する"
          sx={{
            position: 'absolute',
            top: -28,
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            bgcolor: 'primary.main',
            color: '#fff',
            boxShadow: '0 6px 16px rgba(106,153,78,0.45)',
            display: 'grid',
            placeItems: 'center',
            '&:active': { transform: 'scale(0.96)' },
          }}
        >
          <CameraAltRoundedIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="caption" sx={{ mt: 4.5, fontWeight: 700, color: 'primary.dark' }}>
          診断
        </Typography>
      </Box>

      {RIGHT.map(item => (
        <NavTab key={item.href} item={item} active={isActive(pathname, item.href)} />
      ))}

      <ImageCaptureUploader ref={uploaderRef} />
    </Paper>
  );
};

const NavTab = ({ item, active }: { item: Item; active: boolean }): JSX.Element => (
  <Box
    component={Link}
    href={item.href}
    aria-current={active ? 'page' : undefined}
    sx={{
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0.25,
      minHeight: 56,
      color: active ? 'primary.dark' : 'text.secondary',
    }}
  >
    {item.icon}
    <Typography variant="caption" sx={{ fontWeight: active ? 700 : 500 }}>
      {item.label}
    </Typography>
  </Box>
);
