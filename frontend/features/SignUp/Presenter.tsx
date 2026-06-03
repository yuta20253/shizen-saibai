'use client';

import { Alert, Box, TextField, Typography } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Link from 'next/link';
import { SignUpForm } from './hooks';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  register: UseFormRegister<SignUpForm>;
  errors: FieldErrors<SignUpForm>;
  errorMessage: string;
  password?: string;
  onSubmit: () => void;
};

export const SignUpPresenter = ({
  register,
  errors,
  errorMessage,
  password,
  onSubmit,
}: Props): React.JSX.Element => (
  <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, py: 4 }}>
    <Typography variant="h5" component="h1" sx={{ fontWeight: 800, textAlign: 'center' }}>
      無料ではじめる
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mb: 3 }}>
      登録は30秒・クレジットカードは不要です
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
      <Box sx={{ mb: 2 }}>
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
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>パスワード（再入力）</Typography>
        <TextField
          fullWidth
          type="password"
          {...register('password_confirmation', {
            required: 'パスワードを入力してください',
            minLength: { value: 8, message: '8文字以上で入力してください' },
            validate: value => value === password || '入力されたパスワードと一致しません',
          })}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation?.message}
        />
      </Box>

      <PrimaryCta type="submit">無料ではじめる</PrimaryCta>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Link href="/login" style={{ color: '#557a3e' }}>
          すでにアカウントをお持ちの方はこちら
        </Link>
      </Box>
    </Box>
  </Box>
);
