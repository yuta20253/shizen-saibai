import { Diagnosis } from '@/features/Diagnosis';

type DiagnosisPageProps = {
  params: Promise<{ id: string }>;
};

const DiagnosisPage = async ({ params }: DiagnosisPageProps) => {
  const { id } = await params;
  return <Diagnosis id={id} />;
};

export default DiagnosisPage;
