import { useEffect, useState } from 'react';
import { getDiagnoses } from '@/libs/services/diagnosis';
import { DiagnosisType } from '@/types/diagnosis';

type RecentState = {
  recent: DiagnosisType[];
  loading: boolean;
};

/** ホーム用：直近の診断を数件取得する。 */
export const useRecentDiagnoses = (limit = 3): RecentState => {
  const [recent, setRecent] = useState<DiagnosisType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const data = await getDiagnoses(token);
        if (active) setRecent(data.slice(0, limit));
      } catch (e) {
        console.error('診断履歴の取得に失敗', e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [limit]);

  return { recent, loading };
};
