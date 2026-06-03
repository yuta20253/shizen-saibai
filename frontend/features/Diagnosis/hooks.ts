import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDiagnosis, deleteDiagnosis } from '@/libs/services/diagnosis';
import { DiagnosisType } from '@/types/diagnosis';

type State = {
  diagnosis: DiagnosisType | null;
  loading: boolean;
  notFound: boolean;
  deleting: boolean;
  remove: () => Promise<void>;
};

/** 診断詳細の取得と削除を担うフック。 */
export const useDiagnosis = (id: string): State => {
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState<DiagnosisType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const data = await getDiagnosis(id, token);
        if (active) setDiagnosis(data);
      } catch (e) {
        console.error('診断の取得に失敗', e);
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const remove = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('ログインが必要です。');
      await deleteDiagnosis(id, token);
      router.push('/mypage/diagnoses');
    } catch (e) {
      console.error('診断の削除に失敗', e);
      setDeleting(false);
    }
  };

  return { diagnosis, loading, notFound, deleting, remove };
};
