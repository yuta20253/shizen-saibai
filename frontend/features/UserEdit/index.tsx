'use client';

import { RequireAuth } from '@/components/RequireAuth';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useSubmit } from './hooks';

export const UserEdit = (): React.JSX.Element => {
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState<boolean>(false);

  const { register, handleSubmit, watch, errors, errorMessage } = useSubmit();

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
              sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}
              onSubmit={handleSubmit}
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
                <TextField
                  type={showCurrentPassword ? 'text' : 'password'}
                  fullWidth
                  label="これまでのパスワード"
                  variant="outlined"
                  {...register('current_password', {
                    required: 'パスワードを入力してください',
                    minLength: { value: 8, message: '8文字以上で入力してください' },
                  })}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowCurrentPassword(prev => !prev)}
                            edge="end"
                          >
                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  error={!!errors.current_password}
                  helperText={errors.current_password?.message}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  type={showNewPassword ? 'text' : 'password'}
                  fullWidth
                  label="新しいパスワード"
                  variant="outlined"
                  {...register('password', {
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
                    minLength: { value: 8, message: '8文字以上で入力してください' },
                    validate: value =>
                      value === newPasswordValue || '新しいパスワードと一致しません',
                  })}
                  slotProps={{
                    input: {
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
