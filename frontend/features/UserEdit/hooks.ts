import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthActions, useAuthState } from '@/context/AuthContext';

type UserEdit = {
  name: string;
  email: string;
  current_password: string;
  password: string;
  password_confirmation: string;
};

export const useSubmit = () => {
  const { updateProfileAction } = useAuthActions();
  const { user } = useAuthState();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserEdit>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });
  const onSubmit: SubmitHandler<UserEdit> = async (data: UserEdit) => {
    console.log(data);
    try {
      const patchData = {
        user: {
          name: data.name,
          email: data.email,
          current_password: data.current_password,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      };
      await updateProfileAction(patchData);
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
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    errors,
    errorMessage,
  };
};
