'use client';

import { RequireAuth } from '@/components/RequireAuth';
import { useDiagnoses } from './hooks';
import { DiagnosesPresenter } from './Presenter';

/** 診断履歴一覧 Container：取得を担い、表示は Presenter へ委譲。 */
export const Diagnoses = (): React.JSX.Element => {
  const { diagnoses, loading } = useDiagnoses();
  return (
    <RequireAuth>
      <DiagnosesPresenter diagnoses={diagnoses} loading={loading} />
    </RequireAuth>
  );
};
