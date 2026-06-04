import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export type SignUpForm = {
  email: string;
  password: string;
  password_confirmation: string;
};

type Props = {
  signUp: (p: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
  }) => Promise<void>;
  setErrorMessage: (message: string) => void;
};

export const useSubmit = ({ signUp, setErrorMessage }: Props) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpForm> = async data => {
    const { email, password, password_confirmation } = data;
    const name = email.split('@')[0];
    try {
      await signUp({ email, password, password_confirmation, name });
      router.push('/mypage');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : '不明なエラーが発生しました';
      setErrorMessage(message);
    }
  };

  return { onSubmit };
};
