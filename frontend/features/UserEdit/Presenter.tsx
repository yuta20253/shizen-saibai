'use client';

import { Alert, Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import { UserEditType } from '@/types/UserEdit/types';
import { PrimaryCta } from '@/components/PrimaryCta';

type Props = {
  register: UseFormRegister<UserEditType>;
  errors: FieldErrors<UserEditType>;
  errorMessage: string;
  newPassword?: string;
  onSubmit: () => void;
};

export const UserEditPresenter = ({
  register,
  errors,
  errorMessage,
  newPassword,
  onSubmit,
}: Props): React.JSX.Element => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggle = (show: boolean, setShow: (v: boolean) => void) => ({
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton aria-label="パスワードの表示切替" onClick={() => setShow(!show)} edge="end">
            {show ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
  });

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, py: 4 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 800, textAlign: 'center', mb: 3 }}>
        プロフィールを編集
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={onSubmit} noValidate>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>名前</Typography>
          <TextField
            fullWidth
            {...register('name', {
              required: '名前を入力してください',
              maxLength: { value: 50, message: '50文字以内で入力してください' },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>
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
          <TextField
            fullWidth
            label="これまでのパスワード"
            type={showCurrent ? 'text' : 'password'}
            {...register('current_password', {
              required: 'パスワードを入力してください',
              minLength: { value: 8, message: '8文字以上で入力してください' },
            })}
            slotProps={{ input: toggle(showCurrent, setShowCurrent).input }}
            error={!!errors.current_password}
            helperText={errors.current_password?.message}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="新しいパスワード（変更する場合）"
            type={showNew ? 'text' : 'password'}
            {...register('password', {
              minLength: { value: 8, message: '8文字以上で入力してください' },
            })}
            slotProps={{ input: toggle(showNew, setShowNew).input }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="新しいパスワード（再入力）"
            type={showConfirm ? 'text' : 'password'}
            {...register('password_confirmation', {
              minLength: { value: 8, message: '8文字以上で入力してください' },
              validate: value =>
                !value || value === newPassword || '新しいパスワードと一致しません',
            })}
            slotProps={{ input: toggle(showConfirm, setShowConfirm).input }}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
          />
        </Box>

        <PrimaryCta type="submit">保存する</PrimaryCta>
      </Box>
    </Box>
  );
};
