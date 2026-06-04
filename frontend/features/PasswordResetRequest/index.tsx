'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmit, RequestForm } from './hooks';
import { PasswordResetRequestPresenter } from './Presenter';

/** パスワード再設定リクエスト Container。 */
export const PasswordResetRequest = (): React.JSX.Element => {
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestForm>();
  const { onSubmit } = useSubmit({ setSent, setErrorMessage });

  return (
    <PasswordResetRequestPresenter
      register={register}
      errors={errors}
      errorMessage={errorMessage}
      sent={sent}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
