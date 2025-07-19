import { Button, Typography } from '@mui/material';
import { Box, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

type UserForm = {
  email: string;
  password: string;
};

export const LoginForm = (): React.JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserForm>();
  const onSubmit: SubmitHandler<UserForm> = (data: UserForm) => {
    console.log(data);
  };
  return (
    <Box sx={{ padding: 2, width: '100%' }}>
      <Box component="form" sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <Typography>メールアドレス</Typography>
          <TextField fullWidth variant="outlined" {...register('email', { required: 'メールアドレスを入力してください' })} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>パスワード</Typography>
          <TextField fullWidth variant="outlined" {...register('password', { required: 'パスワードを入力してください' })} />
        </Box>
        <Box sx={{ my: 4 }}>
          <Button type='submit' sx={{ width: '100%', backgroundColor: '#000000', color: '#ffffff', p: 2, fontSize: 'large' }}>ログイン</Button>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Link href="/">パスワードをお忘れの方はこちら</Link>
        </Box>
      </Box>
    </Box>
  );
};
