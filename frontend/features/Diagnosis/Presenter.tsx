'use client';

import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { DiagnosisType } from '@/types/diagnosis';
import { DiagnosisStory } from '@/components/DiagnosisStory';
import { DiagnosisFeedback } from '@/components/DiagnosisFeedback';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  diagnosis: DiagnosisType | null;
  loading: boolean;
  notFound: boolean;
  deleting: boolean;
  confirmOpen: boolean;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
};

export const DiagnosisPresenter = ({
  diagnosis,
  loading,
  notFound,
  deleting,
  confirmOpen,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: Props): React.JSX.Element => {
  if (loading) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  if (notFound || !diagnosis) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            診断結果が見つかりませんでした
          </Typography>
          <PrimaryCta href="/mypage/diagnoses" fullWidth={false}>
            診断履歴へ
          </PrimaryCta>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', px: 2.5, py: 3 }}>
      <DiagnosisStory diagnosis={diagnosis} />

      <Box sx={{ mt: 4 }}>
        <DiagnosisFeedback diagnosisId={diagnosis.id} />
      </Box>

      <Stack spacing={1.5} sx={{ mt: 4 }}>
        <PrimaryCta href="/mypage/diagnoses" variant="outlined">
          診断履歴へ
        </PrimaryCta>
        <Button
          color="error"
          startIcon={<DeleteOutlineRoundedIcon />}
          onClick={onRequestDelete}
          sx={{ alignSelf: 'center' }}
        >
          この診断を削除する
        </Button>
      </Stack>

      <ConfirmDialog
        open={confirmOpen}
        title="この診断を削除しますか？"
        message="削除すると元に戻せません。"
        confirmLabel="削除する"
        destructive
        loading={deleting}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </Box>
  );
};
