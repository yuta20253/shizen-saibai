import { useEffect, useState } from 'react';
import { getDemoDiagnosis } from '@/libs/services/diagnosis';
import { DiagnosisType } from '@/types/diagnosis';

type DemoState = {
  demo: DiagnosisType | null;
  loading: boolean;
  error: boolean;
};

/** ランディングのサンプル診断（実データ）を取得する。失敗してもLPは壊さない。 */
export const useDemoDiagnosis = (): DemoState => {
  const [demo, setDemo] = useState<DiagnosisType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getDemoDiagnosis();
        if (active) setDemo(data);
      } catch (e) {
        console.error('サンプル診断の取得に失敗', e);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { demo, loading, error };
};
