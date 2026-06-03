'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useVerifyToken, useSubmit, NewPasswordForm } from './hooks';
import { PasswordResetNewPresenter } from './Presenter';

/** 新しいパスワード設定 Container：トークン検証とフォーム送信を担う。 */
export const PasswordResetNew = (): React.JSX.Element => {
  const params = useSearchParams();
  const email = params.get('email') ?? '';
  const token = params.get('token') ?? '';

  const { verifying, tokenValid } = useVerifyToken(email, token);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordForm>();
  const { onSubmit } = useSubmit({ email, token, setErrorMessage });

  return (
    <PasswordResetNewPresenter
      verifying={verifying}
      tokenValid={tokenValid}
      register={register}
      errors={errors}
      errorMessage={errorMessage}
      password={watch('password')}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
