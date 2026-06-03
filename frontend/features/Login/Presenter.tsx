'use client';

import { Alert, Box, TextField, Typography } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Link from 'next/link';
import { LoginForm } from './hooks';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  register: UseFormRegister<LoginForm>;
  errors: FieldErrors<LoginForm>;
  errorMessage: string;
  onSubmit: () => void;
};

export const LoginPresenter = ({
  register,
  errors,
  errorMessage,
  onSubmit,
}: Props): React.JSX.Element => (
  <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, py: 4 }}>
    <Typography variant="h5" component="h1" sx={{ fontWeight: 800, textAlign: 'center', mb: 3 }}>
      ログイン
    </Typography>

    {errorMessage && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {errorMessage}
      </Alert>
    )}

    <Box component="form" onSubmit={onSubmit} noValidate>
      <Box sx={{ mb: 2 }}>
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
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>パスワード</Typography>
        <TextField
          fullWidth
          type="password"
          {...register('password', {
            required: 'パスワードを入力してください',
            minLength: { value: 8, message: '8文字以上で入力してください' },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>

      <PrimaryCta type="submit">ログイン</PrimaryCta>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Link href="/password/reset" style={{ color: '#557a3e', fontWeight: 700 }}>
          パスワードをお忘れですか？
        </Link>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 1.5 }}>
        <Link href="/signup" style={{ color: '#557a3e' }}>
          アカウントをお持ちでない方はこちら
        </Link>
      </Box>
    </Box>
  </Box>
);
