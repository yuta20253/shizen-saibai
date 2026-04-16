import { Box, Typography } from '@mui/material';

export const SentEmail = (): React.JSX.Element => {
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        メール送信完了
      </Typography>
      <Typography>
        ご入力のメールアドレス宛に、パスワード再設定用のリンクを送信しました。
      </Typography>
    </Box>
  );
};
