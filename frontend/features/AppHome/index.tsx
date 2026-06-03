'use client';

import { useRef } from 'react';
import { RequireAuth } from '@/components/RequireAuth';
import { ImageCaptureUploader } from '@/components/ImageCaptureUploader';
import { useAuthState } from '@/context/AuthContext';
import { useRecentDiagnoses } from './hooks';
import { AppHomePresenter } from './Presenter';

/** ログイン後ホーム Container：直近の診断取得と撮影トリガを担い、表示は Presenter へ。 */
export const AppHome = (): React.JSX.Element => {
  const { user } = useAuthState();
  const { recent, loading } = useRecentDiagnoses();
  const inputRef = useRef<HTMLInputElement>(null);
  const onDiagnose = () => inputRef.current?.click();

  return (
    <RequireAuth>
      <AppHomePresenter
        userName={user?.name ?? ''}
        recent={recent}
        loading={loading}
        onDiagnose={onDiagnose}
      />
      <ImageCaptureUploader ref={inputRef} />
    </RequireAuth>
  );
};
