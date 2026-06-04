'use client';

import { useState } from 'react';
import { RequireAuth } from '@/components/RequireAuth';
import { useDiagnosis } from './hooks';
import { DiagnosisPresenter } from './Presenter';

/** 診断詳細 Container：取得・削除ロジックを担い、表示は Presenter へ委譲。 */
export const Diagnosis = ({ id }: { id: string }): React.JSX.Element => {
  const { diagnosis, loading, notFound, deleting, remove } = useDiagnosis(id);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <RequireAuth>
      <DiagnosisPresenter
        diagnosis={diagnosis}
        loading={loading}
        notFound={notFound}
        deleting={deleting}
        confirmOpen={confirmOpen}
        onRequestDelete={() => setConfirmOpen(true)}
        onCancelDelete={() => setConfirmOpen(false)}
        onConfirmDelete={remove}
      />
    </RequireAuth>
  );
};
