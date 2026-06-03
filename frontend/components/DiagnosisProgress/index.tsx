'use client';

import { Backdrop, Box, LinearProgress, Stack, Typography } from '@mui/material';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';

type Props = {
  open: boolean;
  /** 0-100 のアップロード進捗 */
  progress: number;
};

/**
 * 診断中の待ち画面。アップロード→解析の段階をやさしく説明し、不安を減らす。
 */
export const DiagnosisProgress = ({ open, progress }: Props): React.JSX.Element => {
  const uploading = progress < 100;
  const message = uploading ? `写真を送っています… ${progress}%` : 'AIが土を読んでいます…';
  const sub = uploading ? 'もう少しお待ちください' : 'おすすめの野菜を選んでいます';

  return (
    <Backdrop
      open={open}
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.modal + 1, bgcolor: 'rgba(43,43,39,0.6)' }}
      role="status"
      aria-live="polite"
    >
      <Stack spacing={2.5} alignItems="center" sx={{ width: '80%', maxWidth: 320 }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.15)',
            display: 'grid',
            placeItems: 'center',
            animation: 'pulse 1.4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
              '50%': { transform: 'scale(1.12)', opacity: 1 },
            },
          }}
        >
          <SpaRoundedIcon sx={{ fontSize: 40 }} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 800 }}>{message}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {sub}
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          {uploading ? (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ borderRadius: 999, height: 8 }}
            />
          ) : (
            <LinearProgress sx={{ borderRadius: 999, height: 8 }} />
          )}
        </Box>
      </Stack>
    </Backdrop>
  );
};
