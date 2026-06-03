import { SubmitHandler } from 'react-hook-form';
import { requestReset } from '@/libs/services/password';

export type RequestForm = {
  email: string;
};

type Props = {
  setSent: (v: boolean) => void;
  setErrorMessage: (m: string) => void;
};

export const useSubmit = ({ setSent, setErrorMessage }: Props) => {
  const onSubmit: SubmitHandler<RequestForm> = async data => {
    setErrorMessage('');
    try {
      await requestReset(data.email);
      // ユーザー列挙を防ぐため、結果に関わらず常に成功表示
      setSent(true);
    } catch (e) {
      console.error('再設定リクエストに失敗', e);
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。');
    }
  };
  return { onSubmit };
};
