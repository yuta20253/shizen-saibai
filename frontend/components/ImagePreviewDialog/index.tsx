'use client';

import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { JSX } from 'react';

type Props = {
  open: boolean;
  previewUrl: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

export const ImagePreviewDialog = ({
  open,
  previewUrl,
  onConfirm,
  onClose,
}: Props): JSX.Element => (
  <>
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: 'center',
          width: 320,
        }}
      >
        <Typography variant="subtitle1">この写真をアップロードしますか？</Typography>
        {previewUrl && (
          <Box
            component="img"
            src={previewUrl}
            alt="プレビュー"
            sx={{ width: '100%', borderRadius: 2, mt: 2 }}
          />
        )}
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Button variant="outlined" onClick={onClose}>
            キャンセル
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            アップロード
          </Button>
        </Stack>
      </Box>
    </Modal>
  </>
);
