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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@/context/AuthContext';

export const UserDelete = (): React.JSX.Element => {
  const { deleteAccountAction } = useAuthActions();
  const [consent, setConsent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const handleWithdrawal = async () => {
    if (consent) {
      try {
        await deleteAccountAction();
        setErrorMessage('');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorMessage('退会するには注意事項に同意してください。');
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 980,
          borderRadius: 4,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
        }}
        elevation={0}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
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
                <PriorityHighIcon fontSize="large" sx={{ color: 'error.main' }} />
              </Box>

              <Typography variant="h5" component="h1" sx={{ fontWeight: 800, mt: 2 }}>
                アカウントを退会しますか？
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                退会すると、これまでに診断したデータは閲覧できなくなります。
                復元はできません。退会後はログインできません。
              </Typography>
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errorMessage}
              </Alert>
            )}

            <FormControlLabel
              sx={{
                m: 0,
                p: 0,
                '& .MuiCheckbox-root': { mt: 0.2 },
                '& .MuiFormControlLabel-label': { fontSize: 14, color: 'text.secondary' },
              }}
              control={
                <Checkbox
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  color="primary"
                />
              }
              label="注意事項に同意しました。"
            />

            <Button
              onClick={handleWithdrawal}
              fullWidth
              size="large"
              variant="contained"
              color="error"
              disabled={!consent}
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none',
                '&:disabled': { opacity: 0.5 },
              }}
            >
              退会する
            </Button>

            <Button
              href="/mypage"
              fullWidth
              size="large"
              variant="text"
              color="inherit"
              sx={{
                mt: 0.5,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              キャンセル
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
