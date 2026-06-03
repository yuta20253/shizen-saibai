'use client';

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  name: string;
  email: string;
  onLogout: () => void;
};

export const MyPagePresenter = ({ name, email, onLogout }: Props): React.JSX.Element => (
  <Box sx={{ maxWidth: 600, mx: 'auto', px: 2.5, py: 3 }}>
    {/* プロフィール */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2.5,
        borderRadius: 4,
        bgcolor: 'primary.light',
      }}
    >
      <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
        {name ? name.charAt(0) : 'U'}
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }} noWrap>
          {name || 'ユーザー'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {email}
        </Typography>
      </Box>
    </Box>

    {/* メニュー */}
    <List sx={{ mt: 3, bgcolor: 'background.paper', borderRadius: 4, overflow: 'hidden', p: 0 }}>
      <Row icon={<HistoryRoundedIcon />} label="診断のりれき" href="/mypage/diagnoses" />
      <Divider component="li" />
      <Row icon={<EditRoundedIcon />} label="プロフィールを編集" href="/mypage/edit" />
      <Divider component="li" />
      <Row icon={<LockResetRoundedIcon />} label="パスワードを変更" href="/password/reset" />
      <Divider component="li" />
      <Row icon={<LogoutRoundedIcon />} label="ログアウト" onClick={onLogout} />
    </List>

    <List sx={{ mt: 2, bgcolor: 'background.paper', borderRadius: 4, overflow: 'hidden', p: 0 }}>
      <Row
        icon={<PersonOffRoundedIcon color="error" />}
        label="退会する"
        href="/mypage/delete"
        danger
      />
    </List>
  </Box>
);

const Row = ({
  icon,
  label,
  href,
  onClick,
  danger = false,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}): React.JSX.Element => {
  const content = (
    <>
      <ListItemIcon sx={{ minWidth: 44, color: danger ? 'error.main' : 'primary.dark' }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        slotProps={{ primary: { fontWeight: 700, color: danger ? 'error.main' : 'text.primary' } }}
      />
      <ChevronRightRoundedIcon sx={{ color: 'text.secondary' }} />
    </>
  );

  if (href) {
    return (
      <ListItemButton LinkComponent={Link} href={href} sx={{ py: 1.75 }}>
        {content}
      </ListItemButton>
    );
  }
  return (
    <ListItemButton onClick={onClick} sx={{ py: 1.75 }}>
      {content}
    </ListItemButton>
  );
};
