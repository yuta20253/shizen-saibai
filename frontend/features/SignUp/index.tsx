import { Alert, Button, Typography } from '@mui/material';
import { Box, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

type SignUpForm = {
  email: string;
  password: string;
  password_confirmation: string;
};

export const SignUp = (): React.JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();

  const password = watch('password');

  const onSubmit: SubmitHandler<SignUpForm> = async (data: SignUpForm) => {
    const { email, password, password_confirmation } = data;
    const name = email.split('@')[0];
    try {
      await signUp({ email, password, password_confirmation, name });
      router.push('/mypage');
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
    <Box sx={{ padding: 2, maxWidth: '960px', width: '100%', margin: '0 auto' }}>
      <Typography
        variant="h4"
        component="p"
        sx={{ fontWeight: 'bold', mt: 4, textAlign: 'center' }}
      >
        新規登録
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ padding: 2, width: '100%' }}>
        <Box
          component="form"
          sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={{ mb: 2 }}>
            <Typography>メールアドレス</Typography>
            <TextField
              fullWidth
              variant="outlined"
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
            <Typography>パスワード</Typography>
            <TextField
              type="password"
              fullWidth
              variant="outlined"
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: { value: 8, message: '8文字以上で入力してください' },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography>パスワード(再入力)</Typography>
            <TextField
              type="password"
              fullWidth
              variant="outlined"
              {...register('password_confirmation', {
                required: 'パスワードを入力してください',
                minLength: { value: 8, message: '8文字以上で入力してください' },
                validate: value => value === password || '入力されたパスワードと一致しません',
              })}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
            />
          </Box>
          <Box sx={{ my: 4 }}>
            <Button
              type="submit"
              sx={{
                width: '100%',
                backgroundColor: '#000000',
                color: '#ffffff',
                p: 2,
                fontSize: 'large',
              }}
            >
              新規登録
            </Button>
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Link href="/login">すでにアカウントをお持ちの方はこちら</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
