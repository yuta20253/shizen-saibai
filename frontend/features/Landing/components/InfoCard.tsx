'use client';

import { Card, CardContent, Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  /** 横並び（アイコン左）にするか。デフォルトは縦中央寄せ。 */
  horizontal?: boolean;
  sx?: SxProps<Theme>;
};

/** アイコン＋見出し＋説明のシンプルな情報カード（価値訴求やヒントに使う） */
export const InfoCard = ({
  icon,
  title,
  children,
  horizontal = false,
  sx,
}: Props): React.JSX.Element => (
  <Card sx={sx}>
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: horizontal ? 'flex-start' : 'center',
        textAlign: horizontal ? 'left' : 'center',
        gap: 1.5,
        p: 2.5,
      }}
    >
      {icon && (
        <Box
          sx={{
            color: 'primary.dark',
            display: 'grid',
            placeItems: 'center',
            fontSize: '2.5rem',
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      )}
      <Box>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {children && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {children}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);
