import axios from 'axios';
import { DiagnosisType } from '@/types/diagnosis';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

const authHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/** 未ログイン向けサンプル診断（実データ）。トークン不要。 */
export const getDemoDiagnosis = async (): Promise<DiagnosisType> => {
  const res = await axios.get<DiagnosisType>(`${BASE}/api/v1/demo_diagnosis`);
  return res.data;
};

/** ログインユーザーの診断履歴一覧。 */
export const getDiagnoses = async (token: string): Promise<DiagnosisType[]> => {
  const res = await axios.get<DiagnosisType[]>(`${BASE}/api/v1/histories`, {
    headers: authHeaders(token),
  });
  return res.data;
};

/** 診断結果の詳細。 */
export const getDiagnosis = async (id: string, token: string): Promise<DiagnosisType> => {
  const res = await axios.get<DiagnosisType>(`${BASE}/api/v1/histories/${id}`, {
    headers: authHeaders(token),
  });
  return res.data;
};

/** 診断結果の削除。 */
export const deleteDiagnosis = async (id: string | number, token: string): Promise<void> => {
  await axios.delete(`${BASE}/api/v1/histories/${id}`, { headers: authHeaders(token) });
};
