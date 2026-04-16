'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

import { useForm, SubmitHandler } from 'react-hook-form';

type PasswordResetFormType = {
  password: string;
  password_confirmation: string;
};

export const PasswordResetConfirm = (): React.JSX.Element => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [valid, setValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState<boolean>(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const token = params.token;
  const email = searchParams.get('email');

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormType>();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/password/verify';
        const headers = {
          'Content-Type': 'application/json',
        };
        const data = { email, token };
        const res = await axios({ method: 'POST', url: url, headers: headers, data: data });

        const resData = res.data;

        if (res.status === 200) {
          setValid(true);
        } else {
          setValid(false);
          setErrorMessage(resData.message || 'トークンが無効です');
        }
      } catch {
        setErrorMessage('サーバーに接続できませんでした');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [email, token]);

  if (!email || !token) {
    return <Alert severity="error">URL が無効です</Alert>;
  }

  const onSubmit: SubmitHandler<PasswordResetFormType> = async data => {
    setErrorMessage('');

    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/password/reset';
      const headers = {
        'Content-Type': 'application/json',
      };

      const { password, password_confirmation } = data;

      const patchData = {
        email,
        token,
        password,
        password_confirmation,
      };

      const res = await axios({ method: 'PATCH', url: url, headers, data: patchData });

      const resData = res.data;

      if (res.status !== 200) {
        setErrorMessage(resData.message);
        return;
      }

      router.push('/login');
    } catch (error) {
      setErrorMessage('サーバーに接続できませんでした');
    }
  };

  const newPasswordValue = watch('password');

  if (loading) return <Typography>読み込み中...</Typography>;

  if (!valid) {
    return <Alert severity="error">{errorMessage || '無効なリンクです'}</Alert>;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="p"
        sx={{ fontWeight: 'bold', my: 4, textAlign: 'center' }}
      >
        パスワード再設定
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
            sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={{ mb: 2 }}>
              <TextField
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                label="新しいパスワード"
                {...register('password', {
                  required: 'パスワードを入力してください',
                  minLength: { value: 8, message: '8文字以上で入力してください' },
                })}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowNewPassword(prev => !prev)}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                type={showNewPasswordConfirm ? 'text' : 'password'}
                fullWidth
                label="新しいパスワード(再確認)"
                variant="outlined"
                {...register('password_confirmation', {
                  required: 'パスワードを入力してください',
                  minLength: { value: 8, message: '8文字以上で入力してください' },
                  validate: value => value === newPasswordValue || '新しいパスワードと一致しません',
                })}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowNewPasswordConfirm(prev => !prev)}
                          edge="end"
                        >
                          {showNewPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
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
                更新
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
