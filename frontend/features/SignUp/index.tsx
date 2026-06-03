'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '@/context/AuthContext';
import { useSubmit, SignUpForm } from './hooks';
import { SignUpPresenter } from './Presenter';

/** 新規登録 Container：フォーム状態と送信ロジックを担い、表示は Presenter へ。 */
export const SignUp = (): React.JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { signUp } = useAuthActions();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();
  const { onSubmit } = useSubmit({ signUp, setErrorMessage });

  return (
    <SignUpPresenter
      register={register}
      errors={errors}
      errorMessage={errorMessage}
      password={watch('password')}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
