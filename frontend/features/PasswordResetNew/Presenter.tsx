'use client';

import { Alert, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Link from 'next/link';
import { NewPasswordForm } from './hooks';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  verifying: boolean;
  tokenValid: boolean;
  register: UseFormRegister<NewPasswordForm>;
  errors: FieldErrors<NewPasswordForm>;
  errorMessage: string;
  password?: string;
  onSubmit: () => void;
};

export const PasswordResetNewPresenter = ({
  verifying,
  tokenValid,
  register,
  errors,
  errorMessage,
  password,
  onSubmit,
}: Props): React.JSX.Element => {
  if (verifying) {
    return (
      <Box sx={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!tokenValid) {
    return (
      <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, py: 6, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          リンクが無効か、期限切れです
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          お手数ですが、もう一度パスワード再設定をやり直してください。
        </Typography>
        <Box sx={{ maxWidth: 280, mx: 'auto' }}>
          <PrimaryCta href="/password/reset">再設定をやり直す</PrimaryCta>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, py: 4 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 800, textAlign: 'center', mb: 3 }}>
        新しいパスワードを設定
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={onSubmit} noValidate>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>新しいパスワード</Typography>
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
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>新しいパスワード（再入力）</Typography>
          <TextField
            fullWidth
            type="password"
            {...register('password_confirmation', {
              required: 'パスワードを入力してください',
              validate: value => value === password || 'パスワードが一致しません',
            })}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
          />
        </Box>
        <PrimaryCta type="submit">パスワードを更新する</PrimaryCta>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Link href="/login" style={{ color: '#557a3e' }}>
            ログインに戻る
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
