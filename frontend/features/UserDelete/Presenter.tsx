'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import { ConfirmDialog } from '@/components/ConfirmDialog';

type Props = {
  consent: boolean;
  onConsentChange: (v: boolean) => void;
  errorMessage: string;
  confirmOpen: boolean;
  deleting: boolean;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
};

export const UserDeletePresenter = ({
  consent,
  onConsentChange,
  errorMessage,
  confirmOpen,
  deleting,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: Props): React.JSX.Element => (
  <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, py: 4 }}>
    <Card>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
            }}
          >
            <PriorityHighRoundedIcon fontSize="large" sx={{ color: 'error.main' }} />
          </Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 800, mt: 2 }}>
            アカウントを退会しますか？
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            退会すると、これまでに診断したデータは見られなくなります。
            元に戻すことはできません。退会後はログインできません。
          </Typography>
        </Box>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <FormControlLabel
          sx={{ m: 0, mb: 2, '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
          control={
            <Checkbox
              checked={consent}
              onChange={e => onConsentChange(e.target.checked)}
              color="primary"
            />
          }
          label="注意事項に同意しました。"
        />

        <Button
          onClick={onRequestDelete}
          fullWidth
          size="large"
          variant="contained"
          color="error"
          disabled={!consent}
        >
          退会する
        </Button>
        <Button href="/mypage" fullWidth size="large" variant="text" color="inherit" sx={{ mt: 1 }}>
          キャンセル
        </Button>
      </CardContent>
    </Card>

    <ConfirmDialog
      open={confirmOpen}
      title="本当に退会しますか？"
      message="退会するとデータは元に戻せません。"
      confirmLabel="退会する"
      destructive
      loading={deleting}
      onConfirm={onConfirmDelete}
      onCancel={onCancelDelete}
    />
  </Box>
);
