'use client';

import { Diagnosis } from '@/features/Diagnosis';
import { useParams } from 'next/navigation';

const DiagnosisPage = (): React.JSX.Element => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  return <Diagnosis id={id} />;
};

export default DiagnosisPage;
