import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { verifyResetToken, updatePassword } from '@/libs/services/password';

export type NewPasswordForm = {
  password: string;
  password_confirmation: string;
};

type VerifyState = {
  verifying: boolean;
  tokenValid: boolean;
};

/** マウント時にメールのトークンを検証する。 */
export const useVerifyToken = (email: string, token: string): VerifyState => {
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!email || !token) {
        if (active) {
          setTokenValid(false);
          setVerifying(false);
        }
        return;
      }
      try {
        await verifyResetToken(email, token);
        if (active) setTokenValid(true);
      } catch (e) {
        console.error('トークン検証に失敗', e);
        if (active) setTokenValid(false);
      } finally {
        if (active) setVerifying(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [email, token]);

  return { verifying, tokenValid };
};

type SubmitProps = {
  email: string;
  token: string;
  setErrorMessage: (m: string) => void;
};

export const useSubmit = ({ email, token, setErrorMessage }: SubmitProps) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<NewPasswordForm> = async data => {
    setErrorMessage('');
    try {
      await updatePassword({
        email,
        token,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      router.push('/login?reset=done');
    } catch (e) {
      console.error('パスワード更新に失敗', e);
      setErrorMessage(
        'パスワードの更新に失敗しました。リンクの有効期限が切れている可能性があります。'
      );
    }
  };

  return { onSubmit };
};
