import { Button, Typography } from '@mui/material';
import { Box, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type UserForm = {
  email: string;
  password: string;
};

export const LoginForm = (): React.JSX.Element => {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  const onSubmit: SubmitHandler<UserForm> = (data: UserForm) => {
    const url = 'http://localhost:5000/api/v1/login';
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const formData = {
      email: data.email,
      password: data.password,
    };

    console.log('formData:', formData);

    axios({ method: 'POST', headers: headers, url: url, data: formData })
      .then((res: AxiosResponse) => {
        console.log(res);
        const token = res.headers['authorization']?.split(' ')[1];
        console.log('JWT Token:', token);
        localStorage.setItem('token', token || '');
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          login(res.data.user);
        }
        router.push('/');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message);
      });
  };
  return (
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
            ログイン
          </Button>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Link href="/password-reset">パスワードをお忘れの方はこちら</Link>
        </Box>
      </Box>
    </Box>
  );
};
