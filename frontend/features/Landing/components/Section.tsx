'use client';

import { Box, Container, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  /** 背景色を淡い緑にして区切りを強調する */
  tinted?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg';
  sx?: SxProps<Theme>;
};

/** 全画面で縦リズム・最大幅・見出しを統一するセクション枠 */
export const Section = ({
  title,
  subtitle,
  children,
  tinted = false,
  maxWidth = 'sm',
  sx,
}: Props): React.JSX.Element => (
  <Box
    component="section"
    sx={{
      py: { xs: 5, sm: 7 },
      ...(tinted ? { bgcolor: 'primary.light' } : null),
      ...sx,
    }}
  >
    <Container maxWidth={maxWidth} sx={{ px: { xs: 2.5, sm: 3 } }}>
      {title && (
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 800, textAlign: 'center', mb: subtitle ? 1 : 3 }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}
        >
          {subtitle}
        </Typography>
      )}
      {children}
    </Container>
  </Box>
);
