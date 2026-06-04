'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '@/context/AuthContext';
import { useSubmit, LoginForm } from './hooks';
import { LoginPresenter } from './Presenter';

/** ログイン Container：フォーム状態と送信ロジックを担い、表示は Presenter へ。 */
export const Login = (): React.JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { login } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { onSubmit } = useSubmit({ login, setErrorMessage });

  return (
    <LoginPresenter
      register={register}
      errors={errors}
      errorMessage={errorMessage}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
