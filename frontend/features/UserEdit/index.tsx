'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RequireAuth } from '@/components/RequireAuth';
import { useAuthState, useAuthActions } from '@/context/AuthContext';
import { UserEditType } from '@/types/UserEdit/types';
import { useSubmit } from './hooks';
import { UserEditPresenter } from './Presenter';

/** ユーザー編集 Container：フォーム状態と送信ロジックを担い、表示は Presenter へ。 */
export const UserEdit = (): React.JSX.Element => {
  const { user } = useAuthState();
  const { updateProfileAction } = useAuthActions();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditType>({
    defaultValues: { name: user?.name, email: user?.email },
  });
  const { onSubmit } = useSubmit({ updateProfileAction, setErrorMessage });

  return (
    <RequireAuth>
      <UserEditPresenter
        register={register}
        errors={errors}
        errorMessage={errorMessage}
        newPassword={watch('password')}
        onSubmit={handleSubmit(onSubmit)}
      />
    </RequireAuth>
  );
};
