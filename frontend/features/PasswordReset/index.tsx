'use client';

import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormValues = { email: string };

export const PasswordReset = (): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setErrorMessage('');

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/password/reset/request',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      const body = await res.json();

      if (!res.ok) throw new Error(body.message || 'エラーが発生しました');

      router.push('/passwordreset/sent');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : '不明なエラーが発生しました';

      setErrorMessage(message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        送信先メールアドレス
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          placeholder="example@gmail.com"
          sx={{ mb: 2 }}
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ background: '#000', color: '#fff', p: 1.5 }}
        >
          送信
        </Button>
      </Box>
    </Box>
  );
};
