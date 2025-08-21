import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UpdateProfilePayload } from '@/libs/services/user';
import { UserEditType } from '@/types/UserEdit/types';

type Props = {
  updateProfileAction: (patch: UpdateProfilePayload) => Promise<void>;
  setErrorMessage: (message: string) => void;
};

export const useSubmit = ({ updateProfileAction, setErrorMessage }: Props) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<UserEditType> = async (data: UserEditType) => {
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
    onSubmit,
  };
};
