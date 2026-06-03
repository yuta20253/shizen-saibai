import axios from 'axios';
import { DiagnosisType } from '@/types/diagnosis';

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

/** 未ログイン向けサンプル診断（実データ）。トークン不要。 */
export const getDemoDiagnosis = async (): Promise<DiagnosisType> => {
  const res = await axios.get<DiagnosisType>(`${BASE}/api/v1/demo_diagnosis`);
  return res.data;
};
