'use client';

import EditUser from '@/app/mypage/edit/page';
import { RequireAuth } from '@/components/RequireAuth';
import { useAuth } from '@/context/AuthContext';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type EditUser = {
  name: string;
  email: string;
  current_password: string;
  password: string;
  password_confirmation: string;
};

export const EditUserContent = (): React.JSX.Element => {
  const { user, setUser } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditUser>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const onSubmit: SubmitHandler<EditUser> = async (data: EditUser) => {
    console.log(data);
    const resEditUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:5000/api/v1/profile';
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const patchData = {
          user: {
            name: data.name,
            email: data.email,
            current_password: data.current_password,
            password: data.password,
            password_confirmation: data.password_confirmation,
          },
        };
        const response = await axios.patch(url, patchData, { headers });
        setUser(response.data.user);
        console.log(response.data.user);
        router.push('/mypage');
      } catch (error) {
        console.log(error);
        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : '不明なエラーが発生しました';
        setErrorMessage(message);
      }
    };
    resEditUser();
  };

  const newPasswordValue = watch('password');

  return (
    <RequireAuth>
      <Box>
        <Typography
          variant="h4"
          component="p"
          sx={{ fontWeight: 'bold', my: 4, textAlign: 'center' }}
        >
          ユーザー編集
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Card sx={{ padding: 2, width: '100%' }}>
          <CardContent>
            <Box
              component="form"
              sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={{ mb: 2 }}>
                <Typography>名前</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...register('name', {
                    required: '名前を入力してください',
                    maxLength: { value: 50, message: '50文字以内で入力してください' },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Box>
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
                <Typography>これまでのパスワード</Typography>
                <TextField
                  type={showCurrentPassword ? 'text' : 'password'}
                  fullWidth
                  variant="outlined"
                  {...register('current_password', {
                    required: 'パスワードを入力してください',
                    minLength: { value: 8, message: '8文字以上で入力してください' },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowCurrentPassword(prev => !prev)}
                          edge="end"
                        />
                        {showNewPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.current_password}
                  helperText={errors.current_password?.message}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography>新しいパスワード</Typography>
                <TextField
                  type={showNewPassword ? 'text' : 'password'}
                  fullWidth
                  variant="outlined"
                  {...register('password', {
                    required: 'パスワードを入力してください',
                    minLength: { value: 8, message: '8文字以上で入力してください' },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowNewPassword(prev => !prev)}
                          edge="end"
                        />
                        {showNewPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography>新しいパスワード(再確認)</Typography>
                <TextField
                  type={showNewPasswordConfirm ? 'text' : 'password'}
                  fullWidth
                  variant="outlined"
                  {...register('password_confirmation', {
                    required: '確認用パスワードを入力してください',
                    minLength: { value: 8, message: '8文字以上で入力してください' },
                    validate: value =>
                      value === newPasswordValue || '新しいパスワードと一致しません',
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowNewPasswordConfirm(prev => !prev)}
                          edge="end"
                        />
                        {showNewPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
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
                  保存
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </RequireAuth>
  );
};
