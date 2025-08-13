'use client';

import {
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
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const DeletePageContent = (): React.JSX.Element => {
  const [consent, setConsent] = useState<boolean>(false);
  const router = useRouter();
  const handleWithdrawal = async () => {
    if (consent) {
      try {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:5000/api/v1/user';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        await axios.delete(url, { headers });
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        router.push('/');
      } catch (error) {
        console.log(error);
      }
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
