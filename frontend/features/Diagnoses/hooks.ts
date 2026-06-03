import { useEffect, useState } from 'react';
import { getDiagnoses } from '@/libs/services/diagnosis';
import { DiagnosisType } from '@/types/diagnosis';

type State = {
  diagnoses: DiagnosisType[];
  loading: boolean;
};

/** 診断履歴一覧を取得するフック。 */
export const useDiagnoses = (): State => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const data = await getDiagnoses(token);
        if (active) setDiagnoses(data);
      } catch (e) {
        console.error('診断履歴の取得に失敗', e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { diagnoses, loading };
};
