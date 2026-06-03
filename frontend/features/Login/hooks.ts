import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export type LoginForm = {
  email: string;
  password: string;
};

type Props = {
  login: (p: { email: string; password: string }) => Promise<void>;
  setErrorMessage: (message: string) => void;
};

export const useSubmit = ({ login, setErrorMessage }: Props) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = async data => {
    try {
      await login({ email: data.email, password: data.password });
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
