'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RequireAuth } from '@/components/RequireAuth';
import { useAuthActions } from '@/context/AuthContext';
import { UserDeletePresenter } from './Presenter';

/** 退会 Container：同意状態・削除処理を担い、表示は Presenter へ。 */
export const UserDelete = (): React.JSX.Element => {
  const { deleteAccountAction } = useAuthActions();
  const [consent, setConsent] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await deleteAccountAction();
      router.push('/');
    } catch (error) {
      console.error(error);
      setErrorMessage('退会に失敗しました。時間をおいて再度お試しください。');
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <RequireAuth>
      <UserDeletePresenter
        consent={consent}
        onConsentChange={setConsent}
        errorMessage={errorMessage}
        confirmOpen={confirmOpen}
        deleting={deleting}
        onRequestDelete={() => setConfirmOpen(true)}
        onCancelDelete={() => setConfirmOpen(false)}
        onConfirmDelete={handleConfirm}
      />
    </RequireAuth>
  );
};
