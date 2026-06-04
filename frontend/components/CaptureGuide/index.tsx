'use client';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onPickCamera: () => void;
  onPickAlbum: () => void;
};

const TIPS = [
  '雑草に近づいて、大きく写す',
  '明るい場所で撮る',
  '1種類だけを画面いっぱいに',
  'ピントを合わせる',
];

export const HIDE_GUIDE_KEY = 'hideCaptureGuide';

/** カメラ起動の前に出す撮影ガイド。コツを示し、カメラ/アルバムを選べる。 */
export const CaptureGuide = ({
  open,
  onClose,
  onPickCamera,
  onPickAlbum,
}: Props): React.JSX.Element => {
  const [dontShow, setDontShow] = useState(false);

  const applyHide = () => {
    if (dontShow) localStorage.setItem(HIDE_GUIDE_KEY, '1');
  };

  const handleCamera = () => {
    applyHide();
    onPickCamera();
  };
  const handleAlbum = () => {
    applyHide();
    onPickAlbum();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, textAlign: 'center', mb: 0.5 }}>
          上手に撮るコツ
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}>
          これだけで、診断がぐっと正確になります
        </Typography>

        <Stack spacing={1.25} sx={{ mb: 2.5 }}>
          {TIPS.map(tip => (
            <Stack key={tip} direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon sx={{ color: 'primary.main', fontSize: '1.3rem' }} />
              <Typography variant="body1">{tip}</Typography>
            </Stack>
          ))}
        </Stack>

        <Stack spacing={1.25}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<CameraAltRoundedIcon />}
            onClick={handleCamera}
          >
            カメラを起動する
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<PhotoLibraryRoundedIcon />}
            onClick={handleAlbum}
          >
            アルバムから選ぶ
          </Button>
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={dontShow}
                onChange={e => setDontShow(e.target.checked)}
              />
            }
            label={<Typography variant="caption">次回から表示しない</Typography>}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
