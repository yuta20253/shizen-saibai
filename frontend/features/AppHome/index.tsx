'use client';

import { useRef } from 'react';
import { RequireAuth } from '@/components/RequireAuth';
import {
  ImageCaptureUploader,
  type ImageCaptureUploaderHandle,
} from '@/components/ImageCaptureUploader';
import { useAuthState } from '@/context/AuthContext';
import { useRecentDiagnoses } from './hooks';
import { AppHomePresenter } from './Presenter';

/** ログイン後ホーム Container：直近の診断取得と撮影トリガを担い、表示は Presenter へ。 */
export const AppHome = (): React.JSX.Element => {
  const { user } = useAuthState();
  const { recent, loading } = useRecentDiagnoses();
  const uploaderRef = useRef<ImageCaptureUploaderHandle>(null);
  const onDiagnose = () => uploaderRef.current?.open();

  return (
    <RequireAuth>
      <AppHomePresenter
        userName={user?.name ?? ''}
        recent={recent}
        loading={loading}
        onDiagnose={onDiagnose}
      />
      <ImageCaptureUploader ref={uploaderRef} />
    </RequireAuth>
  );
};
