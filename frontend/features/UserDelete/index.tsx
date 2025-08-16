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
  const { signOut } = useAuthActions();
  const [consent, setConsent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const handleWithdrawal = async () => {
    if (consent) {
      try {
        await signOut();
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
    <Box>
      <Typography
        variant="h4"
        component="p"
        sx={{ fontWeight: 'bold', my: 4, textAlign: 'center' }}
      >
        退会
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Card sx={{ width: '100%', textAlign: 'center', boxShadow: 'none' }}>
        <CardContent>
          <Box>
            <PriorityHighIcon fontSize="large" />
            <Box>
              <Typography
                variant="h5"
                component="p"
                sx={{ fontWeight: 'bold', my: 4, textAlign: 'center' }}
              >
                本当に退会しますか？
              </Typography>
              <Typography sx={{ my: 2 }}>
                退会すると、これまでに診断したデータは
                <br />
                閲覧できなくなります。復元はできません。
              </Typography>
              <Typography sx={{ my: 2 }}>退会後はログイン不可</Typography>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  color="primary"
                  sx={{ m: 2 }}
                />
              }
              label="注意事項に同意しました。"
            />
            <Box onClick={handleWithdrawal}>
              <Button sx={{ width: '100%' }}>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                    px: 2,
                    backgroundColor: '#FF3366',
                    color: '#ffffff',
                    borderRadius: '8px',
                  }}
                >
                  退会する
                </Typography>
              </Button>
            </Box>
            <Box>
              <Button href="/mypage" sx={{ width: '100%' }}>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                    px: 2,
                    color: '#000000',
                    borderRadius: '8px',
                  }}
                >
                  キャンセル
                </Typography>
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
