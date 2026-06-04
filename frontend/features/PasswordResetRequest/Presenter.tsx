'use client';

import { Alert, Box, TextField, Typography } from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Link from 'next/link';
import { RequestForm } from './hooks';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  register: UseFormRegister<RequestForm>;
  errors: FieldErrors<RequestForm>;
  errorMessage: string;
  sent: boolean;
  onSubmit: () => void;
};

export const PasswordResetRequestPresenter = ({
  register,
  errors,
  errorMessage,
  sent,
  onSubmit,
}: Props): React.JSX.Element => (
  <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, py: 4 }}>
    {sent ? (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <MarkEmailReadRoundedIcon sx={{ fontSize: '3rem', color: 'primary.dark' }} />
        <Typography variant="h6" sx={{ fontWeight: 800, mt: 1 }}>
          メールを送信しました
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          ご入力のメールアドレス宛に、パスワード再設定用のリンクをお送りしました。
          メールが届かない場合は、迷惑メールフォルダもご確認ください。
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Link href="/login" style={{ color: '#557a3e', fontWeight: 700 }}>
            ログインに戻る
          </Link>
        </Box>
      </Box>
    ) : (
      <>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 800, textAlign: 'center' }}>
          パスワードの再設定
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}>
          ご登録のメールアドレスを入力してください。再設定用のリンクをお送りします。
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>メールアドレス</Typography>
            <TextField
              fullWidth
              type="email"
              {...register('email', {
                required: 'メールアドレスを入力してください',
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
                  message: 'メールアドレスの形式が正しくありません',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
          <PrimaryCta type="submit">再設定リンクを送る</PrimaryCta>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Link href="/login" style={{ color: '#557a3e' }}>
              ログインに戻る
            </Link>
          </Box>
        </Box>
      </>
    )}
  </Box>
);
